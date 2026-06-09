import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  ChevronDown,
  ChevronRight,
  Package,
  Calendar,
  AlertTriangle,
  FileText,
  RefreshCw,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

const disclosureSections = [
  {
    title: "产品信息",
    icon: Package,
    items: ["在售产品信息", "停售产品信息", "停售及变更公告"],
  },
  {
    title: "年度信息",
    icon: Calendar,
    items: ["年度报告", "年度信息披露", "财务会计信息"],
  },
  {
    title: "重大事项",
    icon: AlertTriangle,
    items: ["重大关联交易", "重大投资决策", "重大赔付事件", "风险评级信息"],
  },
  {
    title: "专项信息",
    icon: FileText,
    items: [
      "关联交易",
      "股东股权",
      "偿付能力",
      "资金运用",
      "分红产品红利实现率",
      "产品预定利率公告",
      "互联网保险",
      "新型产品",
      "独立董事任职声明",
      "社会责任",
    ],
  },
];

const syncLogs = [
  { section: "产品信息", status: "success", time: "2小时前", count: 12 },
  { section: "年度信息", status: "success", time: "昨天", count: 3 },
  { section: "重大事项", status: "pending", time: "进行中", count: 0 },
  { section: "专项信息", status: "success", time: "3天前", count: 28 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function WebsiteSync() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "产品信息": true,
    "专项信息": true,
  });

  const toggle = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">官网信息同步</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">自动采集官网信息披露内容，保持知识库与官网同步</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
          <RefreshCw className="w-4 h-4" />
          立即同步
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧：官网信息披露模块 */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6" />
              <h2 className="text-lg font-bold">国民养老保险官网信息披露</h2>
            </div>
            <p className="text-sm text-white/80">同步来源：国民养老保险股份有限公司官方网站 · 信息披露专栏</p>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <h3 className="font-bold text-[hsl(var(--foreground))]">信息披露分类</h3>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">共 {disclosureSections.length} 大类</span>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {disclosureSections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expanded[section.title];
                return (
                  <div key={section.title}>
                    <button
                      onClick={() => toggle(section.title)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-sm font-bold text-[hsl(var(--foreground))]">{section.title}</span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">{section.items.length} 项</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      )}
                    </button>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                          {section.items.map((item) => (
                            <button
                              key={item}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[hsl(var(--muted))] hover:bg-red-50 hover:text-red-600 transition-colors text-left text-sm text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:border-red-200"
                            >
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{item}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* 右侧：同步状态 */}
        <motion.div variants={itemVariants} className="space-y-5">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
              <h3 className="font-bold text-[hsl(var(--foreground))]">同步状态</h3>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {syncLogs.map((log) => (
                <div key={log.section} className="px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {log.status === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                    )}
                    <span className="text-sm text-[hsl(var(--foreground))]">{log.section}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {log.time}
                    </div>
                    {log.count > 0 && (
                      <div className="text-[10px] text-emerald-600 font-medium">+{log.count} 条更新</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-3">同步设置</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[hsl(var(--foreground))]">自动同步</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">已开启</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[hsl(var(--foreground))]">同步周期</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">每日 02:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[hsl(var(--foreground))]">来源地址</span>
                <a href="#" className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-0.5">
                  官网 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
