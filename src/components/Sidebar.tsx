import {
  LayoutDashboard,
  Package,
  Sprout,
  GitBranch,
  Thermometer,
  ShieldCheck,
  CircleDollarSign,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react"
import { useNav, Page, Role } from "../context/NavigationContext"

interface NavItem {
  label: string
  page: Page
  icon: React.ReactNode
  adminOnly?: boolean
  notOperario?: boolean
}

const navItems: NavItem[] = [
  { label: "Dashboard", page: "dashboard-supervisor", icon: <LayoutDashboard size={18} /> },
  { label: "Inventario", page: "inventory", icon: <Package size={18} /> },
  { label: "Producción", page: "production", icon: <Sprout size={18} /> },
  { label: "Trazabilidad", page: "traceability", icon: <GitBranch size={18} /> },
  { label: "Ambiental", page: "environmental", icon: <Thermometer size={18} /> },
  { label: "Calidad", page: "quality", icon: <ShieldCheck size={18} /> },
  { label: "Costos", page: "costs", icon: <CircleDollarSign size={18} />, notOperario: true },
  { label: "Personal", page: "personnel", icon: <Users size={18} />, notOperario: true },
  { label: "Reportes", page: "reports", icon: <BarChart3 size={18} />, notOperario: true },
  { label: "Configuración", page: "settings", icon: <Settings size={18} /> },
]

function getDashboardPage(role: Role): Page {
  if (role === "admin") return "dashboard-admin"
  if (role === "operario") return "dashboard-operario"
  return "dashboard-supervisor"
}

export default function Sidebar() {
  const { page, role, navigate, sidebarCollapsed, setSidebarCollapsed } = useNav()

  const dashboardPage = getDashboardPage(role)

  const isDashboardActive =
    page === "dashboard-admin" || page === "dashboard-supervisor" || page === "dashboard-operario"

  const filteredItems = navItems.filter((item) => {
    if (item.notOperario && role === "operario") return false
    return true
  })

  return (
    <aside
      style={{
        width: sidebarCollapsed ? 64 : 240,
        minWidth: sidebarCollapsed ? 64 : 240,
        transition: "width 0.2s ease, min-width 0.2s ease",
      }}
      className="flex flex-col bg-white border-r border-[#E5EDE8] h-full relative"
    >
      <div
        className="flex items-center px-4 py-4 border-b border-[#E5EDE8]"
        style={{ height: 64, minHeight: 64 }}
      >
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-aiden-primary rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span
              className="font-display font-bold text-aiden-primary text-lg tracking-tight"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              AiDEN
            </span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="w-8 h-8 bg-aiden-primary rounded-lg flex items-center justify-center mx-auto">
            <Leaf size={16} className="text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive =
            item.label === "Dashboard" ? isDashboardActive : page === item.page
          return (
            <button
              key={item.page}
              onClick={() =>
                item.label === "Dashboard" ? navigate(dashboardPage) : navigate(item.page)
              }
              className={`sidebar-item w-full text-left ${isActive ? "active" : ""}`}
              style={{ justifyContent: sidebarCollapsed ? "center" : "flex-start" }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="px-3 py-4 border-t border-[#E5EDE8]">
          <div className="rounded-lg bg-aiden-light p-3">
            <p className="text-xs font-medium text-aiden-primary mb-1">Rol activo</p>
            <p className="text-xs text-aiden-muted capitalize">{role}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-[#E5EDE8] rounded-full flex items-center justify-center shadow-sm hover:bg-aiden-light transition-colors z-10"
      >
        {sidebarCollapsed ? (
          <ChevronRight size={12} className="text-aiden-muted" />
        ) : (
          <ChevronLeft size={12} className="text-aiden-muted" />
        )}
      </button>
    </aside>
  )
}
