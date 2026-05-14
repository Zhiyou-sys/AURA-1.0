import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Leaf, Info, X } from "lucide-react";
import { clsx } from "clsx";

interface Plot {
  id: string;
  name: string;
  size: number;
  status: "available" | "rented" | "pending" | "unavailable";
  tags: string[];
  image: string;
  description?: string;
}

const PLOTS: Plot[] = [
  // 左侧三个长条 (不可使用)
  { id: "L1", name: "保育区 一", size: 40, status: "unavailable", tags: ["保育中"], image: "https://images.unsplash.com/photo-1592424001815-581d4b6555cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsfGVufDB8fHx8MTcyNjU2MjM3MHww&ixlib=rb-4.0.3&q=80&w=1080", description: "当前地块正在进行土壤养护，暂不可用。" },
  { id: "L2", name: "保育区 二", size: 40, status: "unavailable", tags: ["保育中"], image: "https://images.unsplash.com/photo-1505929281313-05ec2f42a03f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsfGVufDB8fHx8MTcyNjU2MjM3MHww&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: "L3", name: "保育区 三", size: 40, status: "unavailable", tags: ["保育中"], image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnklMjBlYXJ0aHxlbnwwfHx8fDE3MjY1NjIzNzB8MA&ixlib=rb-4.0.3&q=80&w=1080" },

  // 右侧 4 个小长方形
  { id: "R1", name: "绿漪 R1 号", size: 15, status: "available", tags: ["近水源", "新手友好"], image: "https://images.unsplash.com/photo-1657383765722-1e2354dbba61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudHxlbnwwfHx8fDE3MjY1NjIzNzB8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "位于右侧上方的优质地块，采光良好。" },
  { id: "R2", name: "绿漪 R2 号", size: 15, status: "rented", tags: ["含种子套餐"], image: "https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlJTIwZmFybXxlbnwwfHx8fDE3MjY1NjIzNzB8MA&ixlib=rb-4.0.3&q=80&w=1080", description: "该地块已被其他农场主认领。" },
  { id: "R3", name: "绿漪 R3 号", size: 15, status: "available", tags: ["深土层", "半遮阴"], image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3RzJTIwZ2FyZGVufGVufDB8fHx8MTcyNjU2MjM3MHww&ixlib=rb-4.0.3&q=80&w=1080", description: "右下角区域，适合种植根茎类蔬菜。" },
  { id: "R4", name: "绿漪 R4 号", size: 15, status: "pending", tags: ["独立灌溉"], image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXN0YXJkJTIwZ3JlZW5zfGVufDB8fHx8MTcyNjU2MjM3MHww&ixlib=rb-4.0.3&q=80&w=1080", description: "该地块正在等待确认中。" },
];

export function MapSelection() {
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectedPlot = selectedPlotId ? PLOTS.find(p => p.id === selectedPlotId) : null;

  const getPlotStyles = (id: string, customBaseColor?: string) => {
    const plot = PLOTS.find(p => p.id === id);
    if (!plot) return "";
    
    let stateStyles = "";
    if (plot.status === "available") {
      stateStyles = `${customBaseColor || "bg-[#87A96B]"} hover:brightness-110 cursor-pointer text-white shadow-sm`;
    } else if (plot.status === "rented") {
      stateStyles = `bg-[#B8B2A9] opacity-70 cursor-not-allowed bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] text-[#5A5A5A]`;
    } else if (plot.status === "pending") {
      stateStyles = `bg-[#E8A86C]/90 cursor-pointer text-white shadow-sm`;
    } else if (plot.status === "unavailable") {
      stateStyles = `bg-[#E8E2D9] text-[#BDB6AC] cursor-not-allowed border border-dashed border-[#D1CCC5] shadow-inner inset-shadow-sm`;
    }

    const selectedStyles = selectedPlotId === id && plot.status !== "unavailable" 
        ? "ring-4 ring-white shadow-xl z-20 scale-[1.03] font-bold text-white border-2 border-[#87A96B]" 
        : "border border-white/20";

    return clsx(
      "transition-all duration-300 relative flex items-center justify-center text-center font-medium overflow-hidden",
      stateStyles,
      selectedStyles
    );
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[#FAF9F6] overflow-hidden">
      {/* Top Bar with Map Title and Legend */}
      <div className="w-full bg-white/90 backdrop-blur-md px-6 py-4 md:px-10 md:py-5 shadow-sm border-b border-[#E8E2D9] z-30 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-[#2A2A2A] font-medium text-xl flex items-center gap-2">
           绿漪农场全景图
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-[#5A5A5A]">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#87A96B] rounded shadow-sm border border-black/5" /> 可选</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#E8A86C] rounded shadow-sm border border-black/5" /> 待审核</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#B8B2A9] rounded shadow-sm border border-black/5" /> 已认领</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#E8E2D9] border border-dashed border-[#D1CCC5] rounded" /> 保育中</div>
        </div>
      </div>

      <div className="relative flex-1 flex overflow-hidden">
        {/* Floating Card for Selected Plot */}
      {selectedPlot && selectedPlot.status !== "unavailable" && (
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-[#E8E2D9] animate-in fade-in slide-in-from-bottom-8">
          <button 
            onClick={() => setSelectedPlotId(null)}
            className="absolute top-4 right-4 text-[#8C867D] hover:text-[#2A2A2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <img
            src={selectedPlot.image}
            alt={selectedPlot.name}
            className="w-full h-32 object-cover rounded-xl mb-4"
          />
          
          <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-lg text-[#2A2A2A]">{selectedPlot.name}</h3>
              <span className="text-[#87A96B] bg-[#87A96B]/10 px-2.5 py-0.5 rounded-full text-xs font-semibold">试营业免费</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {selectedPlot.size}㎡
              </span>
              {selectedPlot.status === "rented" && <span className="text-white bg-[#B8B2A9] px-2 py-0.5 rounded text-xs">已认领</span>}
              {selectedPlot.status === "pending" && <span className="text-white bg-[#E8A86C] px-2 py-0.5 rounded text-xs">待审核</span>}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPlot.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-[#F5F0E8] text-[#5A5A5A]">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#5A5A5A] mb-5 line-clamp-2">
            {selectedPlot.description || "现在预订，立享新手种���大��包。"}
          </p>

          {selectedPlot.status === "available" ? (
            <button
              onClick={() => navigate(`/plot/${selectedPlot.id}`)}
              className="w-full bg-[#87A96B] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#76965B] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Leaf className="w-4 h-4" />
              查看地块详情
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-[#F5F0E8] text-[#BDB6AC] py-3 rounded-xl text-sm font-medium cursor-not-allowed"
            >
              不可预订
            </button>
          )}
        </div>
      )}

        {/* The Map Container */}
        <div className="flex-1 overflow-auto flex p-6 md:p-10 lg:p-16 relative w-full h-full">
          {/* subtle background pattern to simulate gravel/dirt */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1546132715-dbfbcf2cc2f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF2ZWx8ZW58MHx8fHwxNzI2NTYyMzcwfDA&ixlib=rb-4.0.3&q=80&w=400')]"></div>

          <div className="m-auto shrink-0 w-full min-w-[800px] min-h-[600px] md:min-h-0 max-w-5xl aspect-[4/3] md:aspect-[16/9] bg-[#E8E2D9]/40 p-6 md:p-8 rounded-[2rem] flex flex-col gap-6 md:gap-8 shadow-inner relative transform origin-center hover:scale-[1.01] transition-transform duration-700 border-2 border-[#D1CCC5]/30">
           
           {/* Top Garden Area */}
           <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 w-full min-h-0 justify-center items-center">
             {/* Left Section: 3 Vertical Long Plots (Unavailable) */}
             <div className="w-full md:w-[450px] lg:w-[500px] flex gap-4 md:gap-6 h-full shrink-0">
                <div className={clsx("flex-1 rounded-2xl flex-col flex items-center justify-center", getPlotStyles("L1"))}>
                    <span className="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">保育区 一</span>
                </div>
                <div className={clsx("flex-1 rounded-2xl flex-col flex items-center justify-center", getPlotStyles("L2"))}>
                    <span className="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">保育区 二</span>
                </div>
                <div className={clsx("flex-1 rounded-2xl flex-col flex items-center justify-center", getPlotStyles("L3"))}>
                    <span className="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">保育区 三</span>
                </div>
             </div>

             {/* Spacer */}
             <div className="hidden md:block flex-1"></div>

             {/* Right Section: 4 Vertical Rectangular Plots (2x2 Grid with vertical emphasis) */}
             <div className="w-full md:w-[260px] lg:w-[320px] shrink-0 grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 h-full">
                <div onClick={() => setSelectedPlotId("R1")} className={clsx("rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center", getPlotStyles("R1", "bg-[#94B3D2]"))}>
                   <span className="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R1</span>
                </div>
                <div onClick={() => setSelectedPlotId("R2")} className={clsx("rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center", getPlotStyles("R2", "bg-[#94B3D2]"))}>
                   <span className="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R2</span>
                </div>
                <div onClick={() => setSelectedPlotId("R3")} className={clsx("rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center", getPlotStyles("R3", "bg-[#94B3D2]"))}>
                   <span className="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R3</span>
                </div>
                <div onClick={() => setSelectedPlotId("R4")} className={clsx("rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center", getPlotStyles("R4", "bg-[#94B3D2]"))}>
                   <span className="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R4</span>
                </div>
             </div>
           </div>

           {/* Bottom Corridor and Gate */}
           <div className="w-full h-14 md:h-20 flex gap-4 md:gap-6 shrink-0">
              {/* Main Corridor */}
              <div className="flex-1 bg-[#D1CCC5]/30 rounded-2xl flex items-center justify-center relative overflow-hidden border border-[#D1CCC5]/60 shadow-inner">
                 {/* Path texture */}
                 <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1546132715-dbfbcf2cc2f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF2ZWx8ZW58MHx8fHwxNzI2NTYyMzcwfDA&ixlib=rb-4.0.3&q=80&w=400')]"></div>
                 {/* Dashed center line */}
                 <div className="w-full border-t-[3px] border-dashed border-[#BDB6AC]/30 absolute top-1/2 -translate-y-1/2"></div>
                 {/* Label */}
                 <div className="z-10 bg-[#E8E2D9] px-6 py-1.5 rounded-full shadow-sm border border-[#D1CCC5]/60 text-[#8C867D] text-sm md:text-base font-medium tracking-[0.5em] pl-[calc(1.5rem+0.5em)]">
                    主连廊
                 </div>
              </div>

              {/* Farm Gate */}
              <div className="w-24 md:w-32 bg-[#C2A383] rounded-2xl border-[3px] md:border-4 border-[#8C6B4E] shadow-sm flex items-center justify-center relative overflow-hidden group hover:brightness-105 transition-all cursor-pointer">
                 {/* Wood texture */}
                 <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZXxlbnwwfHx8fDE3MjY1NjIzNzB8MA&ixlib=rb-4.0.3&q=80&w=400')] bg-cover"></div>
                 <div className="flex flex-col items-center gap-0.5 md:gap-1 z-10 text-white font-medium drop-shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M4 20V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"/><path d="M10 12v.01"/><path d="M14 12v.01"/></svg>
                    <span className="text-[10px] md:text-xs tracking-widest ml-1">大门</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
      </div>
    </div>
  );
}