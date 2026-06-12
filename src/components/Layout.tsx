import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { LayoutDashboard, Layers, Briefcase, Calendar, FolderOpen, PieChart, Sparkles, LogOut, Settings } from "lucide-react";

export function Layout() {
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Brands", href: "/brands", icon: Briefcase },
    { name: "Content Hub", href: "/content", icon: Layers },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "AI Studio", href: "/ai", icon: Sparkles },
    { name: "Media", href: "/media", icon: FolderOpen },
    { name: "Reports", href: "/reports", icon: PieChart },
  ];

  return (
    <div className="flex h-screen bg-[#09090B] text-slate-300 font-sans transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121214] border-r border-white/5 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3 font-semibold text-lg tracking-tight text-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            Agency OS
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-2 mb-2">Master Control</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium border ${
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                      : "text-slate-300 hover:bg-white/5 border-transparent"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center overflow-hidden text-white">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} />
              ) : (
                <span className="text-xs font-medium">{user?.email?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">{user?.displayName || "User"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-white/5 rounded-md transition-colors border border-transparent"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#09090B] relative">
        <Outlet />
      </main>
    </div>
  );
}
