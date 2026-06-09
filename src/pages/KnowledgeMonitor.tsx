import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Send,
  Archive,
  ArchiveRestore,
  XCircle,
  FileX,
  RotateCcw,
  Eraser,
  FileText,
  ChevronDown,
  Search,
  ThumbsUp,
  ThumbsDown,
  Heart,
  BarChart3,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const actions = [
  { label: "删除", icon: Trash2, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
  { label: "发布", icon: Send, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "归档", icon: Archive, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
  { label: "重新打开归档", icon: ArchiveRestore, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  { label: "失效", icon: XCircle, color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-100" },
  { label: "作废", icon: FileX, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
  { label: "重新打开作废", icon: RotateCcw, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100" },
  { label: "清理", icon: Eraser, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
];

const docs = [
  { title: "千岛湖", owner: "演示账号", status: "正常", statusColor: "text-emerald-600 bg-emerald-50", time: "2026-05-28 14:32", folder: "公共知识库/01..." },
  { title: "文书档案管理制度", owner: "演示账号", status: "正常", statusColor: "text-emerald-600 bg-emerald-50", time: "2026-05-28 11:05", folder: "公共知识库/01..." },
  { title: "版本1", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-28 10:48", folder: "公共知识库/01..." },
  { title: "正文模板", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-28 09:22", folder: "公共知识库/01..." },
  { title: "套模板", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-28 09:15", folder: "公共知识库/01..." },
  { title: "工作周报", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-27 18:30", folder: "公共知识库/01..." },
  { title: "1编号", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-27 16:45", folder: "公共知识库/01..." },
  { title: "编号", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-27 15:20", folder: "公共知识库/01..." },
  { title: "照片档案管理办法", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-27 11:10", folder: "公共知识库/01..." },
  { title: "11111", owner: "演示账号", status: "正常", statusColor: "text-emerald-600 bg-emerald-50", time: "2026-05-27 10:05", folder: "公共知识库/01..." },
  { title: "会计档案管理制度", owner: "演示账号", status: "生效", statusColor: "text-blue-600 bg-blue-50", time: "2026-05-26 17:40", folder: "公共知识库/01..." },
  { title: "12345", owner: "演示账号", status: "正常", statusColor: "text-emerald-600 bg-emerald-50", time: "2026-05-26 14:22", folder: "公共知识库/01..." },
];

const feedbackDocs = [
  { title: "养老保险业务操作手册（2026版）", likes: 128, dislikes: 3, collections: 45, lastFeedback: "2026-05-28 16:20", details: [
    { type: "dislike" as const, reason: "知识老旧", user: "王建国", time: "2026-05-28 10:20" },
    { type: "dislike" as const, reason: "知识缺失", user: "李智慧", time: "2026-05-27 16:45" },
    { type: "dislike" as const, reason: "知识错误", user: "陈思颖", time: "2026-05-26 09:10" },
  ]},
  { title: "文书档案管理制度", likes: 86, dislikes: 2, collections: 32, lastFeedback: "2026-05-28 14:10", details: [
    { type: "dislike" as const, reason: "知识老旧", user: "刘子豪", time: "2026-05-27 11:30" },
    { type: "dislike" as const, reason: "知识缺失", user: "张雅婷", time: "2026-05-26 14:20" },
  ]},
  { title: "客户服务标准化流程V3.0", likes: 74, dislikes: 5, collections: 28, lastFeedback: "2026-05-28 11:05", details: [
    { type: "dislike" as const, reason: "知识错误", user: "赵文博", time: "2026-05-28 09:15" },
    { type: "dislike" as const, reason: "知识缺失", user: "孙晓梅", time: "2026-05-27 10:40" },
    { type: "dislike" as const, reason: "知识老旧", user: "周建国", time: "2026-05-26 16:00" },
    { type: "dislike" as const, reason: "知识错误", user: "吴丽萍", time: "2026-05-25 11:20" },
    { type: "dislike" as const, reason: "知识缺失", user: "郑志强", time: "2026-05-24 09:30" },
  ]},
  { title: "信息安全管理制度修订说明", likes: 62, dislikes: 1, collections: 19, lastFeedback: "2026-05-27 18:30", details: [
    { type: "dislike" as const, reason: "知识老旧", user: "钱伟", time: "2026-05-25 15:10" },
  ]},
  { title: "年度绩效考核方案", likes: 55, dislikes: 8, collections: 15, lastFeedback: "2026-05-27 15:40", details: [
    { type: "dislike" as const, reason: "知识错误", user: "冯晓", time: "2026-05-27 14:00" },
    { type: "dislike" as const, reason: "知识缺失", user: "陈晨", time: "2026-05-26 10:30" },
    { type: "dislike" as const, reason: "知识老旧", user: "杨帆", time: "2026-05-25 09:20" },
    { type: "dislike" as const, reason: "知识错误", user: "黄磊", time: "2026-05-24 16:45" },
  ]},
  { title: "数据治理规范（试行）", likes: 48, dislikes: 2, collections: 22, lastFeedback: "2026-05-27 09:15", details: [
    { type: "dislike" as const, reason: "知识缺失", user: "林峰", time: "2026-05-26 11:10" },
    { type: "dislike" as const, reason: "知识老旧", user: "徐静", time: "2026-05-25 13:20" },
  ]},
  { title: "照片档案管理办法", likes: 41, dislikes: 0, collections: 12, lastFeedback: "2026-05-26 16:50", details: [] },
  { title: "会计档案管理制度", likes: 38, dislikes: 1, collections: 10, lastFeedback: "2026-05-26 14:22", details: [
    { type: "dislike" as const, reason: "知识错误", user: "马云", time: "2026-05-24 10:00" },
  ]},
];

export default function KnowledgeMonitor() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [expandedFeedback, setExpandedFeedback] = useState<number[]>([]);

  const toggleFeedback = (i: number) => {
    setExpandedFeedback((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const toggleAll = () => {
    if (selected.length === docs.length) setSelected([]);
    else setSelected(docs.map((_, i) => i));
  };

  const toggleOne = (i: number) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const filtered = docs.filter((d) => d.title.includes(search));

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-5">
      <motion.div variants={itemVariants}>
        <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">知识监控</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">知识文档全生命周期状态监控与批量操作</p>
      </motion.div>

      {/* 操作按钮栏 */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl ${a.bg} border ${a.border} hover:shadow-sm transition-all min-w-[72px]`}
            >
              <Icon className={`w-5 h-5 ${a.color}`} />
              <span className={`text-xs font-medium ${a.color}`}>{a.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* 搜索与筛选 */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索文档标题..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
          />
        </div>
        <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]">
          <span className="text-[hsl(var(--foreground))]">文档状态</span>
          <ChevronDown className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]">
          <span className="text-[hsl(var(--foreground))]">所属文件夹</span>
          <ChevronDown className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
        </button>
      </motion.div>

      {/* 表格 */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[hsl(var(--muted))]">
              <tr>
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === docs.length && docs.length > 0}
                    onChange={toggleAll}
                    className="rounded border-[hsl(var(--border))]"
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] w-12">序号</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">文档标题</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">负责人</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">文档状态</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">更新时间</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">所属文件夹</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filtered.map((doc, i) => (
                <tr key={i} className="hover:bg-[hsl(var(--muted))]/50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(i)}
                      onChange={() => toggleOne(i)}
                      className="rounded border-[hsl(var(--border))]"
                    />
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-[hsl(var(--foreground))] truncate max-w-[200px]">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--foreground))]">{doc.owner}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${doc.statusColor}`}>{doc.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{doc.time}</td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] truncate max-w-[140px]">{doc.folder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 点赞点踩监控 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-[hsl(var(--navy-600))]" />
          <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">反馈监控</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] ml-2">管理员可查看全站文档点赞、点踩、收藏详细统计</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">总点赞数</span>
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-bold text-[hsl(var(--foreground))]">572</div>
            <div className="text-xs text-emerald-600 mt-1">+32 本周</div>
          </div>
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">总点踩数</span>
              <ThumbsDown className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-xl font-bold text-[hsl(var(--foreground))]">22</div>
            <div className="text-xs text-rose-500 mt-1">+4 本周</div>
          </div>
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">总收藏数</span>
              <Heart className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-bold text-[hsl(var(--foreground))]">183</div>
            <div className="text-xs text-emerald-600 mt-1">+18 本周</div>
          </div>
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">好评率</span>
              <ThumbsUp className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-xl font-bold text-[hsl(var(--foreground))]">96.3%</div>
            <div className="text-xs text-emerald-600 mt-1">+0.5% 较上周</div>
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--muted))]">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">文档标题</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">点赞数</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">点踩数</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">收藏数</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">好评率</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">最近反馈时间</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {feedbackDocs.map((doc, i) => {
                  const total = doc.likes + doc.dislikes;
                  const rate = total > 0 ? ((doc.likes / total) * 100).toFixed(1) : "100.0";
                  const isExpanded = expandedFeedback.includes(i);
                  return (
                    <>
                      <tr key={i} className="hover:bg-[hsl(var(--muted))]/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="text-[hsl(var(--foreground))] truncate max-w-[240px]">{doc.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-emerald-600 font-medium">{doc.likes}</td>
                        <td className="px-4 py-3 text-rose-500 font-medium">{doc.dislikes}</td>
                        <td className="px-4 py-3 text-amber-600 font-medium">{doc.collections}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{ width: `${rate}%` }}
                              />
                            </div>
                            <span className="text-xs text-[hsl(var(--muted-foreground))]">{rate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{doc.lastFeedback}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleFeedback(i)}
                            className="flex items-center gap-1 text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] font-medium transition-colors"
                          >
                            查看详情
                            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                        </td>
                      </tr>
                      {isExpanded && doc.details.length > 0 && (
                        <tr className="bg-[hsl(var(--muted))]/30">
                          <td colSpan={7} className="px-4 py-3">
                            <div className="space-y-2">
                              <div className="text-xs font-bold text-[hsl(var(--foreground))] mb-2">反馈理由明细</div>
                              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {doc.details.map((detail, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                    <ThumbsDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs text-[hsl(var(--foreground))]">
                                        <span className="font-medium">{detail.user}</span>
                                        <span className="text-[hsl(var(--muted-foreground))]"> · {detail.reason}</span>
                                      </div>
                                      <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{detail.time}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
