import React, { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Hash, Type, AlignLeft } from "lucide-react";

export function AiGenerator() {
  const [prompt, setPrompt] = useState("");
  const [brandId, setBrandId] = useState("");
  const [format, setFormat] = useState("Legenda para Instagram");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Gere um conteúdo de tipo: ${format}. Contexto: ${prompt}`,
          systemInstruction: "Você é um Social Media Manager Sênior. Forneça o conteúdo formatado com título, copy, emojis adequados e até 5 hashtags relevantes no final."
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.text);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar conteúdo.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto flex gap-8 h-[calc(100vh-theme(spacing.16))]">
      {/* Left Col - Form */}
      <div className="w-1/2 flex flex-col gap-6 overflow-y-auto pr-4 pb-12">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Gen AI Studio</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gere ideias, legendas ou roteiros baseados no contexto da marca.</p>
        </div>

        <div className="space-y-4 bg-[#121214] border border-white/5 p-6 rounded-2xl shadow-xl">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Marca / Workspace</label>
            <select 
              value={brandId} 
              onChange={e => setBrandId(e.target.value)}
              className="w-full bg-[#09090B] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 transition-colors"
            >
              <option value="">Selecione uma marca primeiro...</option>
              {/* This would be populated dynamically */}
              <option value="b1">Alimentação S/A</option>
              <option value="b2">Hotelaria Co.</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Formato</label>
            <div className="grid grid-cols-2 gap-2">
              {['Legenda para Instagram', 'Roteiro de Reels', 'Carrossel (5 cards)', 'Artigo LinkedIn'].map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border text-left transition-colors ${
                    format === f 
                    ? 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400' 
                    : 'border-white/10 bg-[#09090B] text-slate-400 hover:border-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contexto ou Tema</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Descreva o objetivo do conteúdo. Ex: Lançamento do novo cardápio de inverno..."
              className="w-full h-32 bg-[#09090B] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full h-11 bg-indigo-500 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            GERAR CONTEÚDO
          </button>
        </div>
      </div>

      {/* Right Col - Result */}
      <div className="w-1/2 flex flex-col">
        <div className="flex-1 bg-[#121214] border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <AlignLeft className="w-4 h-4" /> Preview do Conteúdo
            </h3>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="text-indigo-400 hover:bg-indigo-500/20 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1.5 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'COPIADO!' : 'COPIAR'}
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto text-sm text-slate-300 whitespace-pre-wrap font-sans custom-scrollbar">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <p className="text-[10px] uppercase font-bold tracking-wider">Analisando contexto da marca...</p>
              </div>
            ) : result ? (
              result
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 font-medium">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Nenhum conteúdo gerado ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
