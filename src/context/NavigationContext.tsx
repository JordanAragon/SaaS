import { createContext, useContext, useState, ReactNode } from "react"

export type Page =
  | "landing"
  | "login"
  | "register"
  | "forgot-password"
  | "dashboard-supervisor"
  | "dashboard-admin"
  | "dashboard-operario"
  | "inventory"
  | "production"
  | "traceability"
  | "environmental"
  | "quality"
  | "costs"
  | "personnel"
  | "reports"
  | "settings"
  | "design-system"

export type Role = "admin" | "supervisor" | "operario"

interface NavContextType {
  page: Page
  role: Role
  navigate: (page: Page) => void
  setRole: (role: Role) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
}

const NavContext = createContext<NavContextType>({} as NavContextType)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("landing")
  const [role, setRole] = useState<Role>("supervisor")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <NavContext.Provider
      value={{
        page,
        role,
        navigate: setPage,
        setRole,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}
