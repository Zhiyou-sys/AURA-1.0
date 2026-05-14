import { useParams, Link } from "react-router";
import { Star, ChevronRight, User } from "lucide-react";

export function PlotDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex-1 pb-24">
      {/* Top Gallery Slider (Simplified mock) */}
      <div className="w-full h-[45vh] min-h-[400px] bg-[#E8E2D9] relative flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        <img
          src="https://images.unsplash.com/photo-1761329707861-767a160525ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBwYXRjaCUyMHN1bm55fGVufDF8fHx8MTc3MzczNzg0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Plot View 1"
          className="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center border-r-2 border-[#FAF9F6]"
        />
        <img
          src="https://images.unsplash.com/photo-1657383765722-1e2354dbba61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzczNzM3ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Plot View 2"
          className="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center border-r-2 border-[#FAF9F6]"
        />
        <img
          src="https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlJTIwZ3Jvd2luZyUyMGZhcm18ZW58MXx8fHwxNzczNzM3ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Plot View 3"
          className="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center"
        />
        {/* Navigation Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Main Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#87A96B] text-white text-xs px-2 py-1 rounded-md font-medium">A 区可选</span>
                <span className="bg-[#F5F0E8] text-[#5A5A5A] text-xs px-2 py-1 rounded-md font-medium">20㎡</span>
              </div>
              <h1 className="text-3xl font-serif text-[#2A2A2A]">绿漪 {id?.toUpperCase() || 'A01'} 号地块</h1>
            </div>
            <div className="text-left sm:text-right">
              <div className="inline-block bg-[#87A96B]/10 text-[#87A96B] px-4 py-2 rounded-xl text-lg font-semibold mt-2 border border-[#87A96B]/20">试营业免费</div>
            </div>
          </div>
        </div>

        {/* Reviews / UGC */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif text-[#2A2A2A]">前任地主评价</h2>
            <div className="flex items-center gap-1 text-[#E8A86C]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current opacity-50" />
              <span className="text-[#5A5A5A] text-sm ml-2">4.8 (12条评价)</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E2D9]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#87A96B]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2A2A2A]">李女士</p>
                    <p className="text-[10px] text-[#5A5A5A]">认领周期：2025春季</p>
                  </div>
                </div>
                <p className="text-sm text-[#2A2A2A] leading-relaxed mb-3">
                  土质非常好，托管模式省心省力。每周都能收到管家发来的照片，上周去采摘了第一波小西红柿，孩子特别开心！
                </p>
                <div className="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1753172433718-d0c2a99443d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0JTIwdmVnZXRhYmxlcyUyMGJhc2tldHxlbnwxfHx8fDE3NzM3Mzc4NDh8MA&ixlib=rb-4.1.0&q=80&w=200" alt="Harvest" className="w-16 h-16 rounded-lg object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Bar (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E2D9] p-4 sm:p-6 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-[#5A5A5A]">试营业特惠</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-xl font-semibold text-[#87A96B]">
                免费体验
              </span>
              <span className="text-xs text-[#5A5A5A] mb-1">免认领及套餐费</span>
            </div>
          </div>
          <Link
            to={`/booking/${id}`}
            className="bg-[#B35C44] text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:bg-[#9E513A] hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            立即预约 <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}