'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    checkUser()
    subscribeSessions()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  const subscribeSessions = () => {
    const subscription = supabase
      .channel('sessions')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sessions' },
        (payload) => {
          setSessions(prev => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Carregando AXIS CORE™...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🌟 AXIS CORE™</h1>
          <p className="text-gray-400 mb-8">Plataforma Terapêutica Multidimensional</p>
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Entrar com Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌟</div>
            <div>
              <h1 className="text-xl font-bold text-white">AXIS CORE™</h1>
              <p className="text-xs text-gray-400">v1.0.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {['dashboard', 'sessions', 'biometry', 'engine'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold transition ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold text-blue-100 mb-2">Sessões Agendadas</h3>
              <p className="text-3xl font-bold">{sessions.filter(s => s.status === 'scheduled').length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold text-green-100 mb-2">Sessões Completadas</h3>
              <p className="text-3xl font-bold">{sessions.filter(s => s.status === 'completed').length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold text-purple-100 mb-2">Status</h3>
              <p className="text-sm">🟢 Sistema Online</p>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Sessões Terapêuticas</h2>
            {sessions.length === 0 ? (
              <p className="text-gray-400">Nenhuma sessão encontrada</p>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="bg-slate-700 rounded p-4 border border-slate-600 hover:border-blue-500 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-semibold">{session.session_type}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(session.scheduled_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        session.status === 'completed' ? 'bg-green-900 text-green-200' :
                        session.status === 'in_progress' ? 'bg-blue-900 text-blue-200' :
                        'bg-yellow-900 text-yellow-200'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Biometry Tab */}
        {activeTab === 'biometry' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">📊 Biometria</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700 rounded p-4">
                <p className="text-gray-400 text-sm mb-2">BPM</p>
                <p className="text-3xl font-bold text-red-400">--</p>
              </div>
              <div className="bg-slate-700 rounded p-4">
                <p className="text-gray-400 text-sm mb-2">HRV RMSSD</p>
                <p className="text-3xl font-bold text-blue-400">--</p>
              </div>
              <div className="bg-slate-700 rounded p-4">
                <p className="text-gray-400 text-sm mb-2">Coerência</p>
                <p className="text-3xl font-bold text-green-400">--</p>
              </div>
              <div className="bg-slate-700 rounded p-4">
                <p className="text-gray-400 text-sm mb-2">Stress</p>
                <p className="text-3xl font-bold text-yellow-400">--</p>
              </div>
            </div>
          </div>
        )}

        {/* Engine Tab */}
        {activeTab === 'engine' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">⚡ Engine AXIS™</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Hado Quantum', freq: '440 Hz' },
                { name: 'Frequências', freq: '528 Hz' },
                { name: 'Chakras', freq: '396-963 Hz' },
                { name: 'Radiônica', freq: 'Config' },
              ].map((mesa) => (
                <button
                  key={mesa.name}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg p-4 text-white transition transform hover:scale-105"
                >
                  <h3 className="font-semibold text-sm mb-2">{mesa.name}</h3>
                  <p className="text-xs text-blue-200">{mesa.freq}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
