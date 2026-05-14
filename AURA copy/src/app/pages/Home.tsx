import { Link } from "react-router";
import { ShoppingBag, Mail, Sprout, ArrowRight, Sun, Droplets, MapPin } from "lucide-react";

export function Home() {
  return (
    <div className="flex-1 w-full text-[#2A2A2A]">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1642676677233-9bc8e693dc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBvcmdhbmljJTIwZ2FyZGVuJTIwc3Vubnl8ZW58MXx8fHwxNzczNzM3ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Family farming in a sunny organic garden"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 via-[#2A2A2A]/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-32">
          <h1 className="text-5xl md:text-6xl font-serif text-[#FAF9F6] mb-6 tracking-tight">
            在城里，拥有一块田
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F0E8] mb-12 font-light">
            远离都市喧嚣，认领你的私家小菜园，感受播种到收获的自然喜悦。
          </p>
          <Link
            to="/map"
            className="inline-flex items-center gap-2 bg-[#E8A86C] text-[#2A2A2A] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#D99A60] hover:scale-105 transition-all shadow-lg"
          >
            立即选地 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] mb-4">简单三步，成为农场主</h2>
          <p className="text-[#5A5A5A] max-w-2xl mx-auto">我们提供完善的配套服务，无论是自耕还是全托管，都能让你轻松享受田园生活。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div className="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#87A96B] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#87A96B] group-hover:text-white transition-colors">
              <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium mb-3">线上下单</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">在地图上挑选心仪地块,一键完成认领</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div className="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#B35C44] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#B35C44] group-hover:text-white transition-colors">
              <Mail className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium mb-3">邮件通知</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">认领成功后，系统将自动发送确认邮件，包含您的专属地块凭证、农场导航及新手种植指南等</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div className="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#E8A86C] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8A86C] group-hover:text-white transition-colors">
              <Sprout className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium mb-3">前往种地</h3>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">凭邮件指引前往绿漪农场，领取农具与种子，挽起袖子，即可开启属于你的田园种植之旅</p>
          </div>
        </div>
      </section>

      {/* Plot Preview (Live Map Teaser) */}
      
    </div>
  );
}