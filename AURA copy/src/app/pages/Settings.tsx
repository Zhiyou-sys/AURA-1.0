import { useState } from "react";
import { Bell, Shield, ChevronRight, Moon, Globe } from "lucide-react";
import { clsx } from "clsx";

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("zh");

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-[#2A2A2A] mb-8">账户设置</h1>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
            <h2 className="text-lg font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#E8A86C]" />
              偏好与通知
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#E8E2D9] last:border-0">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#5A5A5A]" />
                  <div>
                    <p className="font-medium text-[#2A2A2A]">语言 / Language</p>
                    <p className="text-sm text-[#5A5A5A]">切换应用的显示语言</p>
                  </div>
                </div>
                <div className="flex items-center bg-[#FAF9F6] rounded-lg p-1 border border-[#E8E2D9]">
                  <button
                    type="button"
                    onClick={() => setLanguage("zh")}
                    className={clsx(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      language === "zh" ? "bg-white text-[#87A96B] shadow-sm" : "text-[#5A5A5A] hover:text-[#2A2A2A]"
                    )}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={clsx(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      language === "en" ? "bg-white text-[#87A96B] shadow-sm" : "text-[#5A5A5A] hover:text-[#2A2A2A]"
                    )}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[#E8E2D9] last:border-0">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-[#5A5A5A]" />
                  <div>
                    <p className="font-medium text-[#2A2A2A]">深色模式</p>
                    <p className="text-sm text-[#5A5A5A]">切换应用的主题外观</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={clsx(
                    "w-12 h-6 rounded-full transition-colors relative",
                    darkMode ? "bg-[#2A2A2A]" : "bg-[#D1CCC5]"
                  )}
                >
                  <div
                    className={clsx(
                      "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm",
                      darkMode ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
            <h2 className="text-lg font-medium text-[#2A2A2A] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#5A5A5A]" />
              账户与安全
            </h2>

            <div className="space-y-2">
              <button type="button" className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span className="text-[#2A2A2A]">隐私政策</span>
                <ChevronRight className="w-4 h-4 text-[#8C867D]" />
              </button>
              <button type="button" className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span className="text-[#2A2A2A]">用户协议</span>
                <ChevronRight className="w-4 h-4 text-[#8C867D]" />
              </button>
              <details className="rounded-xl border border-[#E8E2D9] overflow-hidden">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 hover:bg-[#FAF9F6] transition-colors">
                  <span className="text-[#2A2A2A] font-medium">认领协议</span>
                  <ChevronRight className="w-4 h-4 text-[#8C867D] shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-sm text-[#5A5A5A] leading-relaxed border-t border-[#E8E2D9] pt-3">
                  <p className="font-medium text-[#2A2A2A] mb-2">《绿漪共享菜园认领协议》（摘要）</p>
                  <p>
                    认领即表示您已阅读并同意相关条款，承诺在种植过程中不使用化学农药与违禁投入品，配合农场管理，共同维护土壤与周边环境。具体权利义务、费用与解约规则以完整协议及现场说明为准。
                  </p>
                </div>
              </details>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="px-8 py-3 bg-[#2A2A2A] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-black transition-all"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
