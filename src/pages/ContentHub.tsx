import React, { useState } from "react";
import { Search, Filter, Plus, GripVertical, CheckCircle2, Clock, Palette } from "lucide-react";

export function ContentHub() {
  const [activeView, setActiveView] = useState<'board' | 'list'>('board');

  const columns = [
    { id: 'draft', title: 'Rascunho', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    { id: 'review', title: 'Revisão Interna', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { id: 'client', title: 'Cliente', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'approved', title: 'Aprovado', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
  ];

  const mockCards = [
    { title: "Dicas de Decoração Inverno", type: "Carrossel", brand: "Bricolagem Pro", status: "draft" },
    { title: "Review Novo Cardápio", type: "Reels", brand: "Alimentação S/A", status: "review" },
    { title: "Promoção Dia dos Pais", type: "Estático", brand: "Hotelaria Co.", status: "client" },
  ];

  return (
    <div className="p-8 h-screen flex flex-col max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Central de Conteúdo</h1>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Gerencie ideias, formatos e o fluxo de aprovação.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#121214] border border-white/5 p-1 rounded-lg">
            <button 
              onClick={() => setActiveView('board')}
              className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-all ${activeView === 'board' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
            >
              Kanban
            </button>
            <button 
              onClick={() => setActiveView('list')}
              className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-all ${activeView === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
            >
              Lista
            </button>
          </div>
          <button className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Novo Conteúdo
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search contents..." 
            className="w-full bg-[#121214] border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/5 hover:bg-white/10 transition-colors text-slate-300">
          <Filter className="w-3.5 h-3.5" />
          Filtros
        </button>
      </div>

      {/* Board View */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map(col => (
            <div key={col.id} className="w-80 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${col.color}`}>
                    {col.title.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-600 font-bold">
                    {mockCards.filter(c => c.status === col.id).length}
                  </span>
                </div>
                <button className="text-slate-500 hover:text-white"><Plus className="w-4 h-4" /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {mockCards.filter(c => c.status === col.id).map((card, i) => (
                  <div key={i} className="bg-[#121214] p-4 rounded-xl border border-white/5 shadow-xl cursor-pointer hover:border-indigo-500/30 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5" /> {card.brand}
                      </span>
                      <GripVertical className="w-4 h-4 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm font-bold text-white leading-snug mb-3">{card.title}</p>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded font-bold text-slate-400 uppercase tracking-wider">
                         {card.type}
                       </span>
                       <Clock className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                  </div>
                ))}
                
                <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mb-2">
                     <span className="text-lg text-white/40">+</span>
                   </div>
                   <span className="text-[10px] font-bold text-white/40 tracking-wider">ADD TO PIPELINE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
