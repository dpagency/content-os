import React from "react";
import { BarChart3, CheckCircle2, Clock, PlayCircle, Grid, FileText, CheckSquare, MoreHorizontal } from "lucide-react";

export function Dashboard() {
  const metrics = [
    { label: "Conteúdos Criados", value: "142", icon: FileText, change: "+12%" },
    { label: "Aprovados", value: "86", icon: CheckCircle2, change: "+5%" },
    { label: "Em Revisão", value: "24", icon: Clock, change: "-2%" },
    { label: "Reels em Produção", value: "18", icon: PlayCircle, change: "+24%" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Executive Dashboard</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visão geral de todas as 13 marcas operadas pela agência.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          const isPos = m.change.startsWith("+");
          return (
            <div key={i} className="bg-[#121214] border border-white/5 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-start justify-between relative">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{m.label}</p>
                  <p className="text-3xl font-bold text-white">{m.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {m.change}
                </span>
                <span className="text-slate-500 uppercase tracking-tighter">vs. mês anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Performance de Conteúdo</h2>
            <button className="text-slate-500 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {/* Fake chart bars */}
            {[40, 70, 45, 90, 65, 85, 120, 60, 80, 50, 110, 95].map((h, i) => (
              <div key={i} className="w-full bg-indigo-500/20 rounded-t-sm flex items-end justify-center group relative cursor-pointer" style={{ height: '100%' }}>
                <div 
                  className="w-full bg-indigo-500 rounded-t-sm transition-all group-hover:opacity-80" 
                  style={{ height: `${(h / 120) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
          </div>
        </div>

        <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Ações Pendentes</h2>
          <div className="space-y-4">
            {[
              { t: 'Aprovar roteiros da campanha de Inverno', b: 'Hotelaria Co.', s: 'Urgente' },
              { t: 'Revisar legendas semanais', b: 'Bricolagem Pro', s: 'Hoje' },
              { t: 'Criar briefing para Creators', b: 'Alimentação S/A', s: '2 dias' },
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-indigo-500/30 cursor-pointer">
                <div className="mt-0.5"><CheckSquare className="w-4 h-4 text-slate-500" /></div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight mb-1">{p.t}</p>
                  <div className="flex gap-2 text-[10px] text-slate-500 uppercase tracking-tighter">
                    <span>{p.b}</span>
                    <span>•</span>
                    <span className={p.s === 'Urgente' ? 'text-orange-400 font-bold' : ''}>{p.s}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
