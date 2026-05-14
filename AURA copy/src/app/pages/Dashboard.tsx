import { useState, useEffect } from "react";
import { Play, Activity, ListTodo, Users, MoreHorizontal, CheckCircle2, Circle, Sprout, Wind, Droplet, Sun, Clock, Calendar, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";

export function Dashboard() {
  const [progress, setProgress] = useState(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitorCount, setVisitorCount] = useState(1);
  const [visitSuccess, setVisitSuccess] = useState(false);
  const [bookings, setBookings] = useState([
    { id: 1, date: "2026-03-20", time: "上午 (09:00 - 12:00)", count: 2, status: "upcoming" }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(65); // 65% to harvest
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = {
      id: Date.now(),
      date: visitDate,
      time: visitTime,
      count: visitorCount,
      status: "upcoming"
    };
    setBookings(prev => [...prev, newBooking].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    
    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setIsVisitModalOpen(false);
      setVisitDate("");
      setVisitTime("");
      setVisitorCount(1);
    }, 2000);
  };

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* User Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1769225962029-f333de0c1116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc21pbGluZyUyMGdhcmRlbnxlbnwxfHx8fDE3NzM3Mzc4NDh8MA&ixlib=rb-4.1.0&q=80&w=200"
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#87A96B] w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <Sprout className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-serif text-[#2A2A2A] mb-1">下午好，林女士</h1>
              <p className="text-[#5A5A5A] text-sm">绿漪农场见证了您的 128 天田园时光</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsVisitModalOpen(true)}
              className="bg-[#2A2A2A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              预约入场
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area: Camera & Status */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Camera Feed */}
            

            {/* Growth Progress */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#87A96B]" />
                  <h2 className="text-xl font-medium text-[#2A2A2A]">A01 种植进度</h2>
                  <div className="relative ml-1">
                    <select className="appearance-none bg-[#F5F0E8] border border-[#E8E2D9] hover:border-[#87A96B] text-sm font-medium rounded-full px-4 py-1.5 pr-8 outline-none text-[#87A96B] cursor-pointer transition-colors focus:ring-2 focus:ring-[#87A96B]/20">
                      <option>🍅 小番茄</option>
                      <option>🥬 生菜</option>
                      <option>🥕 小萝卜</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#87A96B]"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="relative h-4 bg-[#F5F0E8] rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B0D3A1] to-[#87A96B] rounded-full"
                />
              </div>

              <div className="flex justify-between text-sm text-[#5A5A5A] mb-8">
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-[#87A96B] mx-auto mb-2" />
                  <p>播种期</p>
                  <p className="text-[10px] text-[#8C867D]">3月10日</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-[#87A96B] mx-auto mb-2" />
                  <p>发芽期</p>
                  <p className="text-[10px] text-[#8C867D]">3月25日</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-[#87A96B] mx-auto mb-2 relative ring-4 ring-[#87A96B]/20" />
                  <p className="font-medium text-[#2A2A2A]">花果期 (当前)</p>
                  <p className="text-[10px] text-[#8C867D]">预计持续20天</p>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-3 h-3 rounded-full bg-[#D1CCC5] mx-auto mb-2" />
                  <p>采收期</p>
                  <p className="text-[10px] text-[#8C867D]">约5月中旬</p>
                </div>
              </div>

              {/* Recommendation Accordion */}
              <details className="group bg-[#F5F0E8]/40 rounded-2xl border border-[#E8E2D9] overflow-hidden transition-all duration-300">
                <summary className="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-medium text-sm text-[#2A2A2A] hover:bg-[#E8E2D9]/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4.5 h-4.5 text-[#87A96B]" />
                    小番茄花果期种植建议
                  </div>
                  <div className="transform group-open:rotate-180 transition-transform duration-300">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5A5A5A]"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </summary>
                <div className="p-4 pt-0 text-sm text-[#5A5A5A] bg-white border-t border-[#E8E2D9]">
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Droplet className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2A2A2A] mb-1">水分管理</p>
                        <p className="text-xs leading-relaxed">需水量较大，建议保持土壤微湿，但避免根部积水引发烂根。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sun className="w-4 h-4 text-[#E8A86C] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2A2A2A] mb-1">光照需求</p>
                        <p className="text-xs leading-relaxed">保证每天 6-8 小时充足直射光，有助于果实上色和糖分积累。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sprout className="w-4 h-4 text-[#B35C44] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2A2A2A] mb-1">修剪打杈</p>
                        <p className="text-xs leading-relaxed">及时摘除底部发黄的老叶和多余的侧枝，保证植株通风透光，集中养分供果。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>

          {/* Sidebar Area: Tasks & Community */}
          <div className="space-y-8">
            {/* Task List */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-[#2A2A2A] flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#87A96B]"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  菜园整理 & 归纳拍摄窗口
                </h3>
                <MoreHorizontal className="w-5 h-5 text-[#8C867D]" />
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start bg-[#F5F0E8]/50 p-4 rounded-2xl border border-transparent hover:border-[#E8E2D9] transition-all cursor-pointer group">
                  <div className="mt-0.5">
                    <Circle className="w-5 h-5 text-[#E8A86C]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-[#2A2A2A] text-sm">拍摄花果期实况</h4>
                      <span className="text-[10px] bg-white px-2 py-1 rounded text-[#E8A86C] border border-[#E8A86C]/20">待拍摄</span>
                    </div>
                    <p className="text-xs text-[#5A5A5A] leading-relaxed mb-3">
                      小番茄已经结出可爱的青色果实啦！快用镜头捕捉这份生机，顺便记录一下今天清理杂草的数量吧。
                    </p>
                    <div className="flex gap-2">
                      <div className="w-16 h-12 bg-white rounded-lg border border-dashed border-[#D1CCC5] flex items-center justify-center text-[#8C867D] group-hover:border-[#87A96B] group-hover:text-[#87A96B] transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                      </div>
                      <div className="w-16 h-12 bg-[#E8E2D9]/30 rounded-lg border border-dashed border-[#D1CCC5] flex items-center justify-center text-[#8C867D] opacity-50"></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-[#E8E2D9] opacity-70">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-[#87A96B]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2A2A2A] text-sm mb-1 line-through">初芽萌发纪念照</h4>
                    <p className="text-xs text-[#5A5A5A] mb-2">已于 3月25日 归档，并记录清理枯叶 2 片。</p>
                    <div className="w-12 h-12 rounded-lg bg-[#F5F0E8] flex items-center justify-center text-[#BDB6AC]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#87A96B] text-white rounded-xl text-sm font-medium hover:bg-[#7a9960] shadow-sm shadow-[#87A96B]/20 transition-colors flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  立即启动拍摄
                </button>
              </div>
            </div>

            {/* My Bookings */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-[#2A2A2A] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#87A96B]" />
                  我的预约
                </h3>
                <MoreHorizontal className="w-5 h-5 text-[#8C867D]" />
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-[#F5F0E8]/50 p-4 rounded-2xl border border-transparent hover:border-[#E8E2D9] transition-all flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#2A2A2A] mb-1">{booking.date}</div>
                        <div className="text-xs text-[#5A5A5A]">{booking.time} · {booking.count}人入场</div>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-full text-xs text-[#87A96B] border border-[#87A96B]/20 font-medium shadow-sm">
                        待出行
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#5A5A5A]">
                  <Calendar className="w-10 h-10 mx-auto text-[#D1CCC5] mb-3 opacity-50" />
                  <p className="text-sm">暂无预约，期待您的到来</p>
                </div>
              )}
            </div>

            {/* Community Teaser */}
            
          </div>
        </div>
      </div>

      {/* Book Visit Modal */}
      <AnimatePresence>
        {isVisitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisitModalOpen(false)}
              className="absolute inset-0 bg-[#2A2A2A]/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#FAF9F6] rounded-3xl p-6 shadow-xl border border-[#E8E2D9]"
            >
              <button
                onClick={() => setIsVisitModalOpen(false)}
                className="absolute right-6 top-6 text-[#A09C96] hover:text-[#2A2A2A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-serif text-[#2A2A2A] mb-2">预约入场</h2>
              <p className="text-sm text-[#5A5A5A] mb-6">试营业期间预约入场完全免费，我们为您准备了基础农具及指导服务。</p>

              {visitSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#87A96B]/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#2A2A2A] mb-2">预约成功</h3>
                  <p className="text-[#5A5A5A] text-sm">期待��绿漪农场与您相见</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2A2A2A] mb-2">预约日期</label>
                    <input
                      required
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#E8E2D9] rounded-xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2A2A2A] mb-2">预计到达时间</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["上午 (09:00 - 12:00)", "下午 (14:00 - 18:00)"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setVisitTime(time)}
                          className={clsx(
                            "py-3 px-4 rounded-xl text-sm text-center transition-all border",
                            visitTime === time
                              ? "border-[#87A96B] bg-[#87A96B]/10 text-[#87A96B] font-medium"
                              : "border-[#E8E2D9] bg-white text-[#5A5A5A] hover:border-[#B0D3A1]"
                          )}
                        >
                          {time.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2A2A2A] mb-2">入场人数</label>
                    <div className="flex items-center gap-4 bg-white border border-[#E8E2D9] rounded-xl px-4 py-2 w-fit">
                      <button
                        type="button"
                        onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))}
                        className="w-8 h-8 flex items-center justify-center text-[#5A5A5A] hover:bg-[#F5F0E8] rounded-full transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-[#2A2A2A]">{visitorCount}</span>
                      <button
                        type="button"
                        onClick={() => setVisitorCount(Math.min(10, visitorCount + 1))}
                        className="w-8 h-8 flex items-center justify-center text-[#5A5A5A] hover:bg-[#F5F0E8] rounded-full transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  

                  <button
                    type="button"
                    onClick={(e) => handleBookVisit(e as any)}
                    disabled={!visitDate || !visitTime}
                    className="w-full py-4 bg-[#2A2A2A] text-white rounded-xl font-medium hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    确认免费预约
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}