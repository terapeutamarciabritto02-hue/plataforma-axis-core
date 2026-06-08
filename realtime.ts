// apps/frontend/lib/supabase/realtime.ts
// Hook de Realtime do Supabase para AXIS CORE™
// Assina canais de sessões, telemetria e notificações em tempo real

import { useEffect, useRef, useCallback, useState } from "react";
import { createClient } from "./client";

// ─── TIPOS ────────────────────────────────────────────────────────────────────
export type RealtimeEvent<T = Record<string, unknown>> = {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: T;
  old: Partial<T>;
  table: string;
  schema: string;
};

export type SessionRow = {
  id: string;
  status: string;
  client_id: string;
  therapist_id: string;
  tenant_id: string;
  started_at: string | null;
  ended_at: string | null;
  updated_at: string;
};

export type TelemetryRow = {
  id: string;
  session_id: string;
  tenant_id: string;
  timestamp: string;
  source: string;
  payload: Record<string, unknown>;
};

export type NotificationRow = {
  id: string;
  recipient_id: string;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
};

// ─── useRealtimeSessions ──────────────────────────────────────────────────────
// Assina mudanças em sessões do tenant em tempo real
export function useRealtimeSessions(
  tenantId: string | null,
  onUpdate: (event: RealtimeEvent<SessionRow>) => void
) {
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    const channel = supabase
      .channel(`sessions:tenant:${tenantId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sessions",
          filter: `tenant_id=eq.${tenantId}`,
        },
        (payload) => {
          onUpdate(payload as RealtimeEvent<SessionRow>);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.info(`[Realtime] Subscribed to sessions:${tenantId}`);
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tenantId]);
}

// ─── useRealtimeTelemetry ─────────────────────────────────────────────────────
// Assina telemetria de uma sessão específica
export function useRealtimeTelemetry(
  sessionId: string | null,
  onData: (row: TelemetryRow) => void
) {
  const supabase = createClient();

  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`telemetry:session:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "telemetry_logs",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          onData(payload.new as TelemetryRow);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);
}

// ─── useRealtimeNotifications ─────────────────────────────────────────────────
// Assina notificações do usuário logado
export function useRealtimeNotifications(
  userId: string | null,
  onNotification: (notification: NotificationRow) => void
) {
  const supabase = createClient();
  const [unreadCount, setUnreadCount] = useState(0);

  // Busca contagem inicial
  useEffect(() => {
    if (!userId) return;
    supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("recipient_id", userId)
      .eq("is_read", false)
      .then(({ count }) => setUnreadCount(count ?? 0));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:user:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const notification = payload.new as NotificationRow;
          setUnreadCount((prev) => prev + 1);
          onNotification(notification);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          if ((payload.new as NotificationRow).is_read) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      await supabase
        .from("notifications")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("id", notificationId);
    },
    []
  );

  const markAllAsRead = useCallback(
    async () => {
      if (!userId) return;
      await supabase
        .from("notifications")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("recipient_id", userId)
        .eq("is_read", false);
      setUnreadCount(0);
    },
    [userId]
  );

  return { unreadCount, markAsRead, markAllAsRead };
}

// ─── useRealtimeDeviceStatus ──────────────────────────────────────────────────
// Assina status dos dispositivos físicos (ESP32) do tenant
export function useRealtimeDeviceStatus(
  tenantId: string | null,
  onStatusChange: (tableId: string, status: string) => void
) {
  const supabase = createClient();

  useEffect(() => {
    if (!tenantId) return;

    const channel = supabase
      .channel(`devices:tenant:${tenantId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "axis_tables",
          filter: `tenant_id=eq.${tenantId}`,
        },
        (payload) => {
          const updated = payload.new as { id: string; device_status: string };
          onStatusChange(updated.id, updated.device_status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tenantId]);
}

// ─── useBroadcastSession ──────────────────────────────────────────────────────
// Canal de broadcast para eventos de sessão ao vivo (sem persistência no DB)
export function useBroadcastSession(sessionId: string | null) {
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase.channel(`broadcast:session:${sessionId}`, {
      config: { broadcast: { self: false } },
    });

    channelRef.current = channel;
    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const broadcast = useCallback(
    (event: string, payload: Record<string, unknown>) => {
      channelRef.current?.send({
        type: "broadcast",
        event,
        payload,
      });
    },
    []
  );

  const onBroadcast = useCallback(
    (event: string, handler: (payload: Record<string, unknown>) => void) => {
      channelRef.current?.on("broadcast", { event }, ({ payload }) => {
        handler(payload);
      });
    },
    []
  );

  return { broadcast, onBroadcast };
}
