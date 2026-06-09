import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Download,
  Clock,
  Tag,
  FileEdit,
  Trash2,
  Share2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Heart,
} from "lucide-react";

const logTabs = [
  { key: "all", label: "全部日志" },
  { key: "view", label: "浏览记录" },
  { key: "edit", label: "编辑记录" },
  { key: "audit", label: "审计日志" },
];

const logs = [
  { id: 1, action: "浏览", target: "养老保险业务操作手册（2026版）", user: "李明远", dept: "信息科技部", time: "2026-05-27 14:32:18", type: "view", ip: "10.20.30.45", detail: "在线预览第3-5页", likes: 12, dislikes: 0, collections: 3 },
  { id: 2, action: "编辑", target: "信息安全管理制度", user: "李强", dept: "信息科技部", time: "2026-05-27 13:15:42", type: "edit", ip: "10.20.30.12", detail: "修订第2.3节网络安全条款", likes: 8, dislikes: 1, collections: 2 },
  { id: 3, action: "下载", target: "客户服务标准化流程V3.0", user: "王芳", dept: "客户服务部", time: "2026-05-27 11:08:55", type: "view", ip: "10.20.30.78", detail: "下载PDF格式", likes: 15, dislikes: 0, collections: 5 },
  { id: 4, action: "审批通过", target: "数据治理规范（试行）", user: "陈建国", dept: "信息科技部", time: "2026-05-27 10:45:30", type: "audit", ip: "10.20.30.01", detail: "审批意见：符合规范，准予入库", likes: 5, dislikes: 0, collections: 1 },
  { id: 5, action: "标签变更", target: "年度绩效考核方案", user: "陈静", dept: "人力资源部", time: "2026-05-26 17:22:10", type: "edit", ip: "10.20.30.33", detail: "新增标签：绩效管理、2026年度", likes: 3, dislikes: 2, collections: 0 },
  { id: 6, action: "分享", target: "企业年金管理办法", user: "刘洋", dept: "产品部", time: "2026-05-26 16:05:18", type: "view", ip: "10.20.30.56", detail: "分享给部门全体成员", likes: 22, dislikes: 1, collections: 8 },
  { id: 7, action: "驳回", target: "第三方系统对接规范", user: "陈建国", dept: "信息科技部", time: "2026-05-26 15:30:00", type: "audit", ip: "10.20.30.01", detail: "驳回原因：缺少安全评审意见", likes: 0, dislikes: 3, collections: 0 },
  { id: 8, action: "删除", target: "过期培训资料（2024版）", user: "系统", dept: "系统", time: "2026-05-26 03:00:00", type: "audit", ip: "127.0.0.1", detail: "自动清理：超过保留期限", likes: 0, dislikes: 0, collections: 0 },
  { id: 9, action: "浏览", target: "监管政策汇编（2026Q2）", user: "周婷", dept: "合规部", time: "2026-05-25 09:18:36", type: "view", ip: "10.20.30.22", detail: "在线预览全文", likes: 18, dislikes: 0, collections: 4 },
  { id: 10, action: "版本回滚", target: "软件开发流程标准", user: "赵敏", dept: "信息科技部", time: "2026-05-25 08:45:12", type: "edit", ip: "10.20.30.15", detail: "回滚至 V1.2", likes: 2, dislikes: 1, collections: 0 },
];

const actionIcons: Record<string, React.ReactNode> = {
  浏览: <Eye className="w-4 h-4" />,
  编辑: <FileEdit className="w-4 h-4" />,
  下载: <Download className="w-4 h-4" />,
  审批通过: <CheckCircle2 className="w-4 h-4" />,
  标签变更: <Tag className="w-4 h-4" />,
  分享: <Share2 className="w-4 h-4" />,
  驳回: <AlertCircle className="w-4 h-4" />,
  删除: <Trash2 className="w-4 h-4" />,
  版本回滚: <Clock className="w-4 h-4" />,
};

const actionColors: Record<string, string> = {
  浏览: "bg-sky-50 text-sky-600",
  编辑: "bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-600))]",
  下载: "bg-violet-50 text-violet-600",
  审批通过: "bg-emerald-50 text-emerald-600",
  标签变更: "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))]",
  分享: "bg-teal-50 text-teal-600",
  驳回: "bg-red-50 text-red-600",
  删除: "bg-gray-100 text-gray-600",
  版本回滚: "bg-orange-50 text-orange-600",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function DocLogs() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const filtered = logs.filter((l) => activeTab === "all" || l.type === activeTab);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">文档日志</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">记录知识的访问、编辑、审批等全生命周期操作，满足审计合规要求</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: "今日操作", value: "156", change: "+12%" },
          { label: "浏览量", value: "3,240", change: "+8%" },
          { label: "编辑次数", value: "86", change: "+5%" },
          { label: "审批记录", value: "24", change: "+2" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]">
            <div className="text-sm text-[hsl(var(--muted-foreground))] mb-2">{stat.label}</div>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
              <div className="text-xs text-emerald-600 mb-1">{stat.change}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* 反馈统计 */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: "总点赞数", value: "1,284", change: "+156", icon: ThumbsUp, color: "text-rose-500", bg: "bg-rose-50" },
          { label: "总点踩数", value: "42", change: "-8", icon: ThumbsDown, color: "text-slate-500", bg: "bg-slate-50" },
          { label: "收藏数", value: "368", change: "+45", icon: Heart, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "好评率", value: "96.8%", change: "+1.2%", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
                <div className={`text-xs mb-1 ${stat.change.startsWith("-") ? "text-rose-600" : "text-emerald-600"}`}>{stat.change}</div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="flex bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-1">
          {logTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[hsl(var(--navy-600))] text-white"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="搜索用户、文档、操作类型..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
          <Calendar className="w-4 h-4" />
          时间范围
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
          <Filter className="w-4 h-4" />
          更多筛选
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] text-sm font-medium hover:bg-[hsl(var(--navy-100))] transition-colors border border-[hsl(var(--navy-200))]">
          <Download className="w-4 h-4" />
          导出日志
        </button>
      </motion.div>

      {/* Log Table */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">操作类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">操作对象</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">操作人员</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">操作时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">IP地址</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">反馈</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filtered.map((log) => (
                <>
                  <tr
                    key={log.id}
                    className="hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer"
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${actionColors[log.action] || "bg-gray-100 text-gray-600"}`}>
                        {actionIcons[log.action]}
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[hsl(var(--foreground))] max-w-xs truncate">{log.target}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full gradient-navy flex items-center justify-center text-white text-[10px] font-bold">
                          {log.user.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm text-[hsl(var(--foreground))]">{log.user}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{log.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[hsl(var(--muted-foreground))]">{log.time}</td>
                    <td className="px-6 py-4 text-xs text-[hsl(var(--muted-foreground))] font-mono">{log.ip}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-rose-500">
                          <ThumbsUp className="w-3 h-3" /> {log.likes}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <ThumbsDown className="w-3 h-3" /> {log.dislikes}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-amber-500">
                          <Heart className="w-3 h-3" /> {log.collections}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] font-medium">
                        {expandedLog === log.id ? "收起" : "查看"}
                      </button>
                    </td>
                  </tr>
                  {expandedLog === log.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-[hsl(var(--muted))]">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-[hsl(var(--foreground))] space-y-3"
                        >
                          <div>
                            <div className="font-medium mb-1">操作详情</div>
                            <div className="text-[hsl(var(--muted-foreground))]">{log.detail}</div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="w-4 h-4 text-rose-500" />
                              <span className="text-sm font-medium">{log.likes}</span>
                              <span className="text-xs text-[hsl(var(--muted-foreground))]">点赞</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ThumbsDown className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{log.dislikes}</span>
                              <span className="text-xs text-[hsl(var(--muted-foreground))]">点踩</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4 text-amber-500" />
                              <span className="text-sm font-medium">{log.collections}</span>
                              <span className="text-xs text-[hsl(var(--muted-foreground))]">收藏</span>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
