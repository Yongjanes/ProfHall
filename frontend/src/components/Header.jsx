import { useAuth } from "../context/AuthContext.jsx"

function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm"></div>
          <span className="font-semibold text-lg tracking-tight">ProfHall</span>
        </div>

        <div className="flex items-center gap-4">
          <button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
            Sign In
          </button>
          <button size="sm">Get Started</button>
        </div>
      </header>
    )
}

export default Header