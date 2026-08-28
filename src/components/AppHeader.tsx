import { Search, Bell, ChevronDown, User, LogOut, Shield } from "lucide-react"
import { useState } from "react"
import { useNav } from "../context/NavigationContext"

export default function AppHeader() {
  const { role, setRole, navigate } = useNav()
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)

  const roleLabel = {
    admin: "Administrador",
    supervisor: "Supervisor",
    operario: "Operario",
  }[role]

  const roleColor = {
    admin: "badge-red",
    supervisor: "badge-blue",
    operario: "badge-green",
  }[role]

  const notifs = [
    { id: 1, text: "Alerta de temperatura en Invernadero 2", time: "hace 5 min", type: "warning" },
    { id: 2, text: "Lote LT-2024-089 listo para cosecha", time: "hace 22 min", type: "success" },
    { id: 3, text: "Stock bajo: Sustrato Premium < mínimo", time: "hace 1 h", type: "danger" },
  ]

  return (
    <header className="h-16 bg-white border-b border-[#E5EDE8] flex items-center justify-between px-6 shrink-0 relative z-20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-aiden-muted" />
          <input
            className="aiden-input pl-9 w-64"
            style={{ padding: "0.45rem 0.875rem 0.45rem 2.25rem" }}
            placeholder="Buscar módulos, lotes, empleados..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false) }}
            className="relative w-9 h-9 rounded-lg hover:bg-aiden-light flex items-center justify-center transition-colors"
          >
            <Bell size={18} className="text-aiden-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-aiden-danger rounded-full" />
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 aiden-card py-2 shadow-lg z-30">
              <p className="text-xs font-semibold text-aiden-muted uppercase tracking-wide px-4 py-2">
                Notificaciones
              </p>
              {notifs.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-aiden-bg cursor-pointer border-b border-[#E5EDE8] last:border-0">
                  <p className="text-sm text-aiden-text leading-snug">{n.text}</p>
                  <p className="text-xs text-aiden-muted mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false) }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-aiden-light transition-colors"
          >
            <div className="w-7 h-7 bg-aiden-primary rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-aiden-text leading-none">
                {role === "admin" ? "Ana García" : role === "supervisor" ? "Carlos Méndez" : "Luis Torres"}
              </p>
              <p className="text-xs text-aiden-muted mt-0.5">{roleLabel}</p>
            </div>
            <ChevronDown size={14} className="text-aiden-muted" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-52 aiden-card py-2 shadow-lg z-30">
              <div className="px-4 py-3 border-b border-[#E5EDE8]">
                <p className="text-xs font-medium text-aiden-text">Cambiar rol (demo)</p>
              </div>
              {(["admin", "supervisor", "operario"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r)
                    setShowProfile(false)
                    navigate(r === "admin" ? "dashboard-admin" : r === "supervisor" ? "dashboard-supervisor" : "dashboard-operario")
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-aiden-light flex items-center gap-2 capitalize ${role === r ? "text-aiden-primary font-medium" : "text-aiden-text"}`}
                >
                  <Shield size={14} />
                  {r === "admin" ? "Administrador" : r === "supervisor" ? "Supervisor" : "Operario"}
                </button>
              ))}
              <div className="border-t border-[#E5EDE8] mt-1 pt-1">
                <button
                  onClick={() => navigate("landing")}
                  className="w-full text-left px-4 py-2.5 text-sm text-aiden-danger hover:bg-aiden-danger-bg flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
