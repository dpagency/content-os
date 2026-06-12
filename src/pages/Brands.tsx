import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/auth-context";
import { getBrands } from "../lib/db";
import { Brand } from "../types";
import { Plus, Building2, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Brands() {
  const { user } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getBrands(user.uid).then(data => {
      setBrands(data);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hub de Marcas</h1>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Gerencie os workspaces de cada marca da sua agência.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          NOVA MARCA
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
             <div key={i} className="h-64 bg-[#121214] border border-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : brands.length === 0 ? (
        <div className="border hover:border-indigo-500/30 border-dashed border-white/10 rounded-2xl p-12 text-center bg-white/5 transition-colors">
          <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Nenhuma marca cadastrada</h3>
          <p className="text-[10px] text-slate-500 mb-6 max-w-sm mx-auto uppercase tracking-wider">Comece adicionando seu primeiro cliente para gerenciar conteúdo e campanhas.</p>
          <button className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider hover:opacity-90 transition-opacity mx-auto">
            <Plus className="w-4 h-4" />
            CADASTRAR PRIMEIRA MARCA
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map(brand => (
            <Link key={brand.id} to={`/brands/${brand.id}`} className="block group">
              <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: brand.primaryColor }}>
                    {brand.logoUrl ? <img src={brand.logoUrl} className="w-6 h-6 object-contain" /> : brand.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    brand.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {brand.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1 tracking-tight">{brand.name}</h3>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-4 line-clamp-1">{brand.segment}</p>
                
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mt-4 pt-4 border-t border-white/5 uppercase tracking-wider">
                   <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      12 Conteúdos
                   </div>
                   <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      2 Campanhas
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
