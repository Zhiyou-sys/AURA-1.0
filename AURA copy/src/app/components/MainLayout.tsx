import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import { Sprout, Map, Settings, Home, Menu, X } from "lucide-react";
import { clsx } from "clsx";

export function MainLayout() {
  const location = useLocation();
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2A2A2A] font-sans selection:bg-[#B0D3A1] selection:text-[#2A2A2A] flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-[#E8E2D9]/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <Sprout className="w-8 h-8 text-[#87A96B]" strokeWidth={1.5} />
              <span className="font-semibold text-lg tracking-wide text-[#2A2A2A]">
                绿漪 <span className="text-[#87A96B] font-medium text-sm ml-1">Aura</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={clsx(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#87A96B]",
                  location.pathname === "/"
                    ? "text-[#87A96B]"
                    : "text-[#5A5A5A]"
                )}
              >
                <Home className="w-4 h-4" strokeWidth={1.5} />
                {lang === "zh" ? "首页" : "Home"}
              </Link>
              
              <Link
                to="/map"
                className={clsx(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#87A96B]",
                  location.pathname.startsWith("/map") || location.pathname.startsWith("/plot") || location.pathname.startsWith("/booking")
                    ? "text-[#87A96B]"
                    : "text-[#5A5A5A]"
                )}
              >
                <Map className="w-4 h-4" strokeWidth={1.5} />
                {lang === "zh" ? "选地认领" : "Plots"}
              </Link>
              
              <div className="h-4 w-[1px] bg-[#E8E2D9]" />
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLang(lang === "zh" ? "en" : "zh")}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] text-[#5A5A5A] hover:bg-[#E8E2D9] transition-colors text-xs font-semibold tracking-wider"
                  title={lang === "zh" ? "切换为英文" : "Switch to Chinese"}
                >
                  {lang === "zh" ? "EN" : "中"}
                </button>

                <Link
                  to="/settings"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] text-[#5A5A5A] hover:bg-[#E8E2D9] transition-colors"
                  title={lang === "zh" ? "设置" : "Settings"}
                >
                  <Settings className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "zh" ? "en" : "zh")}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] text-[#5A5A5A] hover:bg-[#E8E2D9] transition-colors text-xs font-semibold tracking-wider"
                title={lang === "zh" ? "切换为英文" : "Switch to Chinese"}
              >
                {lang === "zh" ? "EN" : "中"}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#2A2A2A] p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"
                aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#E8E2D9]/50 shadow-lg animate-in slide-in-from-top-2">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  location.pathname === "/"
                    ? "bg-[#87A96B]/10 text-[#87A96B]"
                    : "text-[#5A5A5A] hover:bg-[#F5F0E8]"
                )}
              >
                <Home className="w-5 h-5" strokeWidth={1.5} />
                {lang === "zh" ? "首页" : "Home"}
              </Link>
              
              <Link
                to="/map"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  location.pathname.startsWith("/map") || location.pathname.startsWith("/plot") || location.pathname.startsWith("/booking")
                    ? "bg-[#87A96B]/10 text-[#87A96B]"
                    : "text-[#5A5A5A] hover:bg-[#F5F0E8]"
                )}
              >
                <Map className="w-5 h-5" strokeWidth={1.5} />
                {lang === "zh" ? "选地认领" : "Plots"}
              </Link>

              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  location.pathname.startsWith("/settings")
                    ? "bg-[#87A96B]/10 text-[#87A96B]"
                    : "text-[#5A5A5A] hover:bg-[#F5F0E8]"
                )}
              >
                <Settings className="w-5 h-5" strokeWidth={1.5} />
                {lang === "zh" ? "设置" : "Settings"}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-[#E8E2D9] text-[#5A5A5A] py-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-[#87A96B]" strokeWidth={1.5} />
            <span className="font-medium tracking-wide text-[#2A2A2A]">绿漪 Aura</span>
          </div>
          <p className="text-sm">© 2026 Aura. {lang === "zh" ? "保留所有权利。" : "All rights reserved."}</p>
        </div>
      </footer>
    </div>
  );
}