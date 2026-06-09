import { Bell } from 'lucide-react'
import type { Profile } from '@axis/core'

interface HeaderProps {
  user: Pick<Profile, 'full_name' | 'role' | 'avatar_url'>
}

const ROLE_LABELS: Record<string, string> = {
  admin:     'Administrador',
  therapist: 'Terapeuta',
  client:    'Cliente',
  student:   'Aluno',
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-surface-100 bg-surface-50 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-surface-100">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-axis-700 flex items-center justify-center">
            <span className="text-xs font-medium text-axis-200">
              {user.full_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-white leading-none">{user.full_name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{ROLE_LABELS[user.role]}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
