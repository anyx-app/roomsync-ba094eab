import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  MoreVertical,
  Layers,
  Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Improvised mock data for UI Skeleton
  const stats = [
    { label: 'Rooms Cleaned', value: '42', total: '120', color: 'text-emerald-600', bg: 'bg-emerald-100', icon: CheckCircle2 },
    { label: 'Pending Tasks', value: '18', total: 'High Priority', color: 'text-amber-600', bg: 'bg-amber-100', icon: Clock },
    { label: 'Staff Active', value: '12', total: 'On Shift', color: 'text-blue-600', bg: 'bg-blue-100', icon: Users },
    { label: 'Urgent Alerts', value: '3', total: 'Requires Action', color: 'text-red-600', bg: 'bg-red-100', icon: AlertCircle },
  ];

  const recentActivity = [
    { room: '304', action: 'marked as Clean', user: 'Maria G.', time: '2 mins ago', status: 'clean' },
    { room: '501', action: 'requested Towels', user: 'Guest', time: '15 mins ago', status: 'alert' },
    { room: '102', action: 'started Inspection', user: 'Sarah J.', time: '23 mins ago', status: 'progress' },
    { room: 'Penthouse', action: 'VIP Check-in', user: 'System', time: '1 hour ago', status: 'vip' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Good Morning{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h2>
          <p className="text-slate-500 mt-1">Here's what's happening on the floors today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md shadow-blue-600/20 flex items-center gap-2">
            <Zap size={16} />
            Quick Assign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white/60 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} bg-opacity-50`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color} bg-opacity-30`}>
                +12%
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              <p className="text-xs text-slate-400 mt-1">{stat.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Floor Map Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers className="text-blue-500" size={20} />
              Floor Status Map
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Full Map</button>
          </div>
          
          <div className="aspect-[16/9] bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
             {/* Abstract Map Visual */}
             <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
             
             <div className="grid grid-cols-4 gap-4 w-3/4 h-3/4 opacity-80 z-10">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`rounded-lg border-2 ${i === 2 ? 'border-red-400 bg-red-50' : i === 5 ? 'border-amber-400 bg-amber-50' : 'border-emerald-400 bg-emerald-50'} flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm transition-transform hover:scale-105 cursor-pointer`}>
                    10{i+1}
                  </div>
                ))}
             </div>
             
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 shadow-sm">
                Floor 1
             </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Live Activity</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start group cursor-pointer">
                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 
                  ${item.status === 'clean' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                    item.status === 'alert' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                    item.status === 'vip' ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]' :
                    'bg-blue-500'}
                `} />
                <div className="flex-1">
                  <p className="text-sm text-slate-800 font-medium">
                    Room {item.room} <span className="text-slate-500 font-normal">{item.action}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.user} • {item.time}</p>
                </div>
                <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all font-medium">
            View All Activity
          </button>
        </div>

      </div>
    </div>
  );
}
