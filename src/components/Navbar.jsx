import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="w-full border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-lg font-semibold text-gray-900">
          AJ AutoParts
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <NavItem to="/" label="Dashboard" />
          <NavItem to="/inventory" label="Inventory" />
          <NavItem to="/sales" label="Sales" />
          <NavItem to="/expenses" label="Expenses" />
        </div>
      </div>
    </nav>
  )
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {label}
    </NavLink>
  )
}