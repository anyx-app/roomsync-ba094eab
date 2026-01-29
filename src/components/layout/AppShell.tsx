import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  Users, 
  Settings, 
  Menu, 
  Bell,
  Search,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();

  // Get initials from email or metadata if available
  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'RS';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-50 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className={`flex items-center gap-3 font-bold text-xl text-blue-600 tracking-tight transition-opacity duration-200 ${!isSidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-md">
              R
            </div>
            {(isSidebarOpen || isMobileMenuOpen) && <span className="whitespace-nowrap">RoomSync</span>}
          </div>
          {/* Mobile Close Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isSidebarOpen} active />
          <NavItem icon={<Map size={20} />} label="Floor Map" isOpen={isSidebarOpen} />
          <NavItem icon={<CheckSquare size={20} />} label="Tasks" isOpen={isSidebarOpen} />
          <NavItem icon={<Users size={20} />} label="Staff" isOpen={isSidebarOpen} />
          <div className="pt-4 mt-4 border-t border-slate-100">
             <NavItem icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={() => signOut()}
            className={`flex items-center gap-3 w-full p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 group ${(!isSidebarOpen && !isMobileMenuOpen) && 'justify-center'}`}
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {(isSidebarOpen || isMobileMenuOpen) && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors md:hidden"
            >
              <Menu size={20} />
            </button>
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors hidden md:block"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">
              Operations Overview
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search rooms, staff..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent border focus:border-blue-500/50 focus:bg-white rounded-full text-sm focus:ring-4 focus:ring-blue-500/10 outline-none w-64 transition-all duration-300"
              />
            </div>
            
            <button className="relative p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-all hover:scale-105 active:scale-95">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block leading-tight">
                <p className="text-sm font-semibold text-slate-900 truncate max-w-[150px]">{user?.email}</p>
                <p className="text-xs text-slate-500">Floor Manager</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-md ring-1 ring-slate-100 cursor-pointer hover:ring-blue-200 transition-all">
                {getUserInitials()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50 scroll-smooth">
          <div className="container mx-auto max-w-7xl pb-20">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

function NavItem({ icon, label, isOpen, active = false }: { icon: React.ReactNode, label: string, isOpen: boolean, active?: boolean }) {
  return (
    <button 
      className={`
        flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
        ${active 
          ? 'bg-blue-50 text-blue-700 font-medium shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }
        ${!isOpen && 'justify-center'}
      `}
    >
      <span className={`relative z-10 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      
      {isOpen && (
        <span className="relative z-10 text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
          {label}
        </span>
      )}
      
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
      )}
    </button>
  );
}
