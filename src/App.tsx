import React from "react"
import { NavigationProvider, useNav } from "./context/NavigationContext"
import AppLayout from "./components/AppLayout"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import DashboardSupervisor from "./pages/DashboardSupervisor"
import DashboardAdmin from "./pages/DashboardAdmin"
import DashboardOperario from "./pages/DashboardOperario"
import Inventory from "./pages/Inventory"
import Production from "./pages/Production"
import Traceability from "./pages/Traceability"
import Environmental from "./pages/Environmental"
import Quality from "./pages/Quality"
import Costs from "./pages/Costs"
import Personnel from "./pages/Personnel"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import DesignSystem from "./pages/DesignSystem"

const PUBLIC_PAGES = ["landing", "login", "register", "forgot-password"]
const DESIGN_PAGE = "design-system"

function Router() {
  const { page } = useNav()

  if (PUBLIC_PAGES.includes(page)) {
    return (
      <div className="h-full">
        {page === "landing" && <Landing />}
        {page === "login" && <Login />}
        {page === "register" && <Register />}
        {page === "forgot-password" && <ForgotPassword />}
      </div>
    )
  }

  const pageMap: Partial<Record<typeof page, React.ReactElement>> = {
    "dashboard-supervisor": <DashboardSupervisor />,
    "dashboard-admin": <DashboardAdmin />,
    "dashboard-operario": <DashboardOperario />,
    inventory: <Inventory />,
    production: <Production />,
    traceability: <Traceability />,
    environmental: <Environmental />,
    quality: <Quality />,
    costs: <Costs />,
    personnel: <Personnel />,
    reports: <Reports />,
    settings: <Settings />,
    "design-system": <DesignSystem />,
  }
  const pageContent = pageMap[page]

  return (
    <AppLayout>
      {pageContent ?? <DashboardSupervisor />}
    </AppLayout>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <Router />
    </NavigationProvider>
  )
}
