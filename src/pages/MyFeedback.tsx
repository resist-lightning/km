import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  FileText,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Building,
  User,
  Wrench,
  Bell,
  Stamp,
  Archive,
  Activity,
} from "lucide-react";

/* ─── 动画 ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

/* ─── 类型 ─── */
interface Comment {
  id: string;
  user: string;
  dept: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  isReply?: boolean;
  replyTo?: string;
}

interface ArticleComment {
  docId: string;
  docTitle: string;
  category: string;
  totalComments: number;
  unread: number;
  comments: Comment[];
}

interface DislikeRecord {
  id: string;
  docTitle: string;
  reason: string;
  user: string;
  dept: string;
  time: string;
  autoTicket: boolean;
}

interface OptimizeTicket {
  id: string;
  docTitle: string;
  triggerReason: string;
  triggeredBy: string;
  status: "待处理" | "处理中" | "已完结" | "已驳回";
  priority: "高" | "中" | "低";
  createTime: string;
  deadline: string;
  handler: string;
  owner: string;
  progress: number;
  logs: { time: string; action: string; operator: string }[];
}

interface DocControlItem {
  id: string;
  title: string;
  type: string;
  status: "生效" | "待审" | "废止" | "修订中";
  version: string;
  updateTime: string;
  owner: string;
  sealStatus: "已盖章" | "待盖章" | "无需盖章";
  archiveStatus: "已归档" | "待归档";
  nextReview: string;
}

/* ─── Mock 数据：文章评论 ─── */
const articleComments: ArticleComment[] = [
  {
    docId: "D001",
    docTitle: "养老保险业务操作手册（2026版）",
    category: "制度规范",
    totalComments: 5,
    unread: 2,
    comments: [
      { id: "C001", user: "王建国", dept: "运营管理部", avatar: "王", content: "第三章的缴费流程描述需要更新，目前系统已经支持线上自动扣款。", time: "2026-06-09 14:30", likes: 3 },
      { id: "C002", user: "李智慧", dept: "客户服务部", avatar: "李", content: "建议增加异地转移接续的操作说明，客户咨询量很大。", time: "2026-06-08 11:20", likes: 5 },
      { id: "C003", user: "陈思颖", dept: "信息技术部", avatar: "陈", content: "已补充API接口文档链接，请查阅最新附件。", time: "2026-06-08 09:15", likes: 2, isReply: true, replyTo: "李智慧" },
      { id: "C004", user: "赵文博", dept: "战略发展部", avatar: "赵", content: "数据分析部分的图表建议用新版BI工具的模板。", time: "2026-06-07 16:45", likes: 1 },
      { id: "C005", user: "孙晓梅", dept: "财务部", avatar: "孙", content: "第5.2节的税率表还是2025年的，需要同步更新。", time: "2026-06-06 10:30", likes: 4 },
    ],
  },
  {
    docId: "D002",
    docTitle: "数据治理规范（试行）",
    category: "技术文档",
    totalComments: 3,
    unread: 1,
    comments: [
      { id: "C006", user: "周建国", dept: "信息技术部", avatar: "周", content: "标签体系设计部分缺少元数据管理规范。", time: "2026-06-09 09:00", likes: 2 },
      { id: "C007", user: "吴丽萍", dept: "数据部", avatar: "吴", content: "建议增加数据质量评分规则的具体示例。", time: "2026-06-05 14:20", likes: 3 },
      { id: "C008", user: "郑志强", dept: "合规部", avatar: "郑", content: "个人信息保护章节需要对照最新监管要求修订。", time: "2026-06-04 11:10", likes: 1 },
    ],
  },
  {
    docId: "D003",
    docTitle: "客户服务标准化流程V3.0",
    category: "业务流程",
    totalComments: 2,
    unread: 0,
    comments: [
      { id: "C009", user: "钱伟", dept: "客户服务部", avatar: "钱", content: "投诉处理时效建议从3个工作日缩短至2个。", time: "2026-06-03 15:40", likes: 6 },
      { id: "C010", user: "马云", dept: "质量管理部", avatar: "马", content: "已记录，将在V3.1版本中评估调整。", time: "2026-06-03 16:00", likes: 2, isReply: true, replyTo: "钱伟" },
    ],
  },
];

/* ─── Mock 数据：点踩记录（逆向反馈） ─── */
const dislikeRecords: DislikeRecord[] = [
  { id: "DS-001", docTitle: "年度绩效考核方案", reason: "内容过时，与现行制度不符", user: "王建国", dept: "运营管理部", time: "2026-06-09 10:20", autoTicket: true },
  { id: "DS-002", docTitle: "第三方系统对接规范", reason: "缺少安全评审章节", user: "李智慧", dept: "信息技术部", time: "2026-06-08 16:45", autoTicket: true },
  { id: "DS-003", docTitle: "客户服务话术手册", reason: "部分表述不准确", user: "陈思颖", dept: "客户服务部", time: "2026-06-08 09:10", autoTicket: true },
  { id: "DS-004", docTitle: "养老保险业务操作手册（2026版）", reason: "知识老旧", user: "赵文博", dept: "战略发展部", time: "2026-06-07 14:00", autoTicket: true },
  { id: "DS-005", docTitle: "文书档案管理制度", reason: "知识缺失", user: "孙晓梅", dept: "法律合规部", time: "2026-06-06 11:30", autoTicket: true },
];

/* ─── Mock 数据：优化工单 ─── */
const optimizeTickets: OptimizeTicket[] = [
  {
    id: "OT-2026-0609-001",
    docTitle: "年度绩效考核方案",
    triggerReason: "内容过时，与现行制度不符",
    triggeredBy: "王建国 · 运营管理部",
    status: "处理中",
    priority: "高",
    createTime: "2026-06-09 10:25",
    deadline: "2026-06-12",
    handler: "陈静",
    owner: "刘雨馨",
    progress: 45,
    logs: [
      { time: "2026-06-09 10:25", action: "系统自动生成工单（点踩触发）", operator: "系统" },
      { time: "2026-06-09 10:30", action: "推送Owner", operator: "系统" },
      { time: "2026-06-09 11:00", action: "指派处理人", operator: "刘雨馨" },
      { time: "2026-06-09 14:20", action: "开始处理", operator: "陈静" },
    ],
  },
  {
    id: "OT-2026-0608-003",
    docTitle: "第三方系统对接规范",
    triggerReason: "缺少安全评审章节",
    triggeredBy: "李智慧 · 信息技术部",
    status: "待处理",
    priority: "中",
    createTime: "2026-06-08 16:50",
    deadline: "2026-06-13",
    handler: "—",
    owner: "刘雨馨",
    progress: 0,
    logs: [
      { time: "2026-06-08 16:50", action: "系统自动生成工单（点踩触发）", operator: "系统" },
      { time: "2026-06-08 16:55", action: "推送Owner", operator: "系统" },
    ],
  },
  {
    id: "OT-2026-0608-002",
    docTitle: "客户服务话术手册",
    triggerReason: "部分表述不准确",
    triggeredBy: "陈思颖 · 客户服务部",
    status: "已完结",
    priority: "低",
    createTime: "2026-06-08 09:15",
    deadline: "2026-06-11",
    handler: "王芳",
    owner: "刘雨馨",
    progress: 100,
    logs: [
      { time: "2026-06-08 09:15", action: "系统自动生成工单（点踩触发）", operator: "系统" },
      { time: "2026-06-08 09:20", action: "推送Owner", operator: "系统" },
      { time: "2026-06-08 10:00", action: "指派处理人", operator: "刘雨馨" },
      { time: "2026-06-08 11:30", action: "内容修正完成", operator: "王芳" },
      { time: "2026-06-08 14:00", action: "Owner确认闭环", operator: "刘雨馨" },
    ],
  },
  {
    id: "OT-2026-0607-005",
    docTitle: "养老保险业务操作手册（2026版）",
    triggerReason: "知识老旧",
    triggeredBy: "赵文博 · 战略发展部",
    status: "处理中",
    priority: "高",
    createTime: "2026-06-07 14:05",
    deadline: "2026-06-10",
    handler: "张强",
    owner: "刘雨馨",
    progress: 70,
    logs: [
      { time: "2026-06-07 14:05", action: "系统自动生成工单（点踩触发）", operator: "系统" },
      { time: "2026-06-07 14:10", action: "推送Owner", operator: "系统" },
      { time: "2026-06-07 15:00", action: "指派处理人", operator: "刘雨馨" },
      { time: "2026-06-07 16:00", action: "开始处理", operator: "张强" },
    ],
  },
];

/* ─── Mock 数据：文控管理 ─── */
const docControlItems: DocControlItem[] = [
  { id: "DC-001", title: "数据分析周报模板V2.0", type: "制度规范", status: "生效", version: "v2.0", updateTime: "2026-05-27", owner: "刘雨馨", sealStatus: "已盖章", archiveStatus: "已归档", nextReview: "2026-11-27" },
  { id: "DC-002", title: "团队知识治理复盘总结", type: "业务流程", status: "生效", version: "v1.0", updateTime: "2026-05-25", owner: "刘雨馨", sealStatus: "已盖章", archiveStatus: "已归档", nextReview: "2026-11-25" },
  { id: "DC-003", title: "趋势分析方法论", type: "技术文档", status: "修订中", version: "v1.1", updateTime: "2026-05-20", owner: "刘雨馨", sealStatus: "待盖章", archiveStatus: "待归档", nextReview: "2026-08-20" },
  { id: "DC-004", title: "养老保险业务操作手册（2026版）", type: "制度规范", status: "生效", version: "v3.2", updateTime: "2026-06-01", owner: "刘雨馨", sealStatus: "已盖章", archiveStatus: "已归档", nextReview: "2026-12-01" },
];

/* ─── Tabs ─── */
type TabKey = "feedback" | "tickets" | "comments" | "doccontrol";

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "feedback", label: "逆向反馈", icon: ThumbsDown },
  { key: "tickets", label: "优化工单", icon: Wrench },
  { key: "comments", label: "文章评论", icon: MessageSquare },
  { key: "doccontrol", label: "文控管理", icon: ShieldCheck },
];

/* ─── 工具函数 ─── */
const statusBadge = (status: string) => {
  switch (status) {
    case "待处理":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "处理中":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "已完结":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "已驳回":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "生效":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "待审":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "废止":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "修订中":
      return "bg-sky-50 text-sky-700 border-sky-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const priorityBadge = (p: string) => {
  switch (p) {
    case "高":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "中":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "低":
      return "bg-slate-50 text-slate-700 border-slate-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

/* ─── 组件 ─── */
export default function MyFeedback() {
  const [activeTab, setActiveTab] = useState<TabKey>("feedback");
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [expandedTickets, setExpandedTickets] = useState<string[]>([]);
  const [ticketFilter, setTicketFilter] = useState<"all" | "pending" | "processing" | "done">("all");

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleTicket = (id: string) => {
    setExpandedTickets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredTickets = optimizeTickets.filter((t) => {
    if (ticketFilter === "all") return true;
    if (ticketFilter === "pending") return t.status === "待处理";
    if (ticketFilter === "processing") return t.status === "处理中";
    if (ticketFilter === "done") return t.status === "已完结" || t.status === "已驳回";
    return true;
  });

  const unreadComments = articleComments.reduce((sum, a) => sum + a.unread, 0);
  const pendingTickets = optimizeTickets.filter((t) => t.status === "待处理" || t.status === "处理中").length;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">评论反馈</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">文控管理 · 逆向反馈 · 优化工单 · 评论聚合</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
          <Bell className="w-4 h-4" />
          <span>Owner视角：您作为 {optimizeTickets.length} 个文档的知识Owner</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "收到点踩", value: dislikeRecords.length.toString(), icon: ThumbsDown, color: "text-rose-500", sub: `${dislikeRecords.filter((d) => d.autoTicket).length} 个已自动生成工单` },
          { label: "待处理工单", value: pendingTickets.toString(), icon: Wrench, color: "text-amber-600", sub: "点踩触发，需Owner跟进" },
          { label: "未读评论", value: unreadComments.toString(), icon: MessageSquare, color: "text-sky-600", sub: "来自您的知识文档" },
          { label: "文控文档", value: docControlItems.length.toString(), icon: ShieldCheck, color: "text-[hsl(var(--navy-600))]", sub: "您负责的知识资产" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{stat.sub}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="flex border-b border-[hsl(var(--border))]">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-[hsl(var(--navy-600))] text-[hsl(var(--navy-600))]"
                    : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {/* ─── 逆向反馈 ─── */}
            {activeTab === "feedback" && (
              <motion.div key="feedback" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-rose-500" />
                    <h3 className="font-bold text-[hsl(var(--foreground))]">逆向反馈记录</h3>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">用户对您文档的点踩反馈，已自动关联优化工单</span>
                  </div>
                </div>
                <div className="divide-y divide-[hsl(var(--border))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                  {dislikeRecords.map((record) => (
                    <div key={record.id} className="px-5 py-4 hover:bg-[hsl(var(--muted))] transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">#{record.id}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full border bg-rose-50 text-rose-700 border-rose-200 font-medium flex items-center gap-1">
                              <ThumbsDown className="w-3 h-3" /> 点踩
                            </span>
                            {record.autoTicket && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full border bg-sky-50 text-sky-700 border-sky-200 font-medium flex items-center gap-1">
                                <Wrench className="w-3 h-3" /> 已生成工单
                              </span>
                            )}
                          </div>
                          <div className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">{record.docTitle}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))] mb-2">反馈原因：{record.reason}</div>
                          <div className="flex items-center gap-4 text-[10px] text-[hsl(var(--muted-foreground))] flex-wrap">
                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {record.user}</span>
                            <span className="flex items-center gap-1"><Building className="w-3 h-3" /> {record.dept}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {record.time}</span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <button className="text-[10px] px-3 py-1.5 rounded-lg bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-1">
                            查看工单 <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── 优化工单 ─── */}
            {activeTab === "tickets" && (
              <motion.div key="tickets" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                    <h3 className="font-bold text-[hsl(var(--foreground))]">点踩优化工单</h3>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">点踩行为自动生成，已推送给Owner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(["all", "pending", "processing", "done"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setTicketFilter(f)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-medium transition-colors ${
                          ticketFilter === f
                            ? "bg-[hsl(var(--navy-600))] text-white border-[hsl(var(--navy-600))]"
                            : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy-600))]"
                        }`}
                      >
                        {f === "all" ? "全部" : f === "pending" ? "待处理" : f === "processing" ? "处理中" : "已闭环"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="divide-y divide-[hsl(var(--border))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                  {filteredTickets.map((ticket) => {
                    const isExpanded = expandedTickets.includes(ticket.id);
                    return (
                      <div key={ticket.id} className="hover:bg-[hsl(var(--muted))] transition-colors">
                        <div className="px-5 py-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">#{ticket.id}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusBadge(ticket.status)}`}>
                                  {ticket.status}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${priorityBadge(ticket.priority)}`}>
                                  {ticket.priority}优先级
                                </span>
                              </div>
                              <div className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">{ticket.docTitle}</div>
                              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
                                触发原因：{ticket.triggerReason} · 由 {ticket.triggeredBy} 点踩触发
                              </div>
                              <div className="flex items-center gap-4 text-[10px] text-[hsl(var(--muted-foreground))] flex-wrap">
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> Owner：{ticket.owner}</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> 处理人：{ticket.handler}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 创建：{ticket.createTime}</span>
                                <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> 截止：{ticket.deadline}</span>
                              </div>
                              {/* Progress */}
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      ticket.progress === 100 ? "bg-emerald-500" : "bg-[hsl(var(--navy-600))]"
                                    }`}
                                    style={{ width: `${ticket.progress}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-[hsl(var(--muted-foreground))] w-8 text-right">{ticket.progress}%</span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleTicket(ticket.id)}
                              className="shrink-0 text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] font-medium flex items-center gap-1"
                            >
                              处理日志
                              <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-5 pb-4">
                            <div className="bg-[hsl(var(--muted))]/40 rounded-lg p-3 space-y-2">
                              <div className="text-xs font-bold text-[hsl(var(--foreground))] mb-1">工单处理日志</div>
                              {ticket.logs.map((log, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.operator === "系统" ? "bg-sky-500" : "bg-[hsl(var(--navy-600))]"}`} />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[hsl(var(--muted-foreground))]">{log.time}</span>
                                    <span className="text-[hsl(var(--foreground))] mx-1">{log.action}</span>
                                    <span className="text-[hsl(var(--muted-foreground))]">— {log.operator}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── 文章评论 ─── */}
            {activeTab === "comments" && (
              <motion.div key="comments" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sky-600" />
                    <h3 className="font-bold text-[hsl(var(--foreground))]">文章评论情况</h3>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">按文档聚合查看所有评论</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {articleComments.map((article) => {
                    const isExpanded = expandedArticles.includes(article.docId);
                    return (
                      <div key={article.docId} className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleArticle(article.docId)}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[hsl(var(--muted))] transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[hsl(var(--navy-600))] shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-[hsl(var(--foreground))]">{article.docTitle}</div>
                              <div className="flex items-center gap-2 text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">
                                <span className="px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">{article.category}</span>
                                <span>{article.totalComments} 条评论</span>
                                {article.unread > 0 && <span className="text-rose-500 font-medium">{article.unread} 条未读</span>}
                              </div>
                            </div>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-[hsl(var(--muted-foreground))] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-4 space-y-3">
                                {article.comments.map((comment) => (
                                  <div key={comment.id} className={`flex gap-3 ${comment.isReply ? "pl-8" : ""}`}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                                      {comment.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <span className="text-xs font-medium text-[hsl(var(--foreground))]">{comment.user}</span>
                                        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{comment.dept}</span>
                                        <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{comment.time}</span>
                                        {comment.isReply && comment.replyTo && (
                                          <span className="text-[10px] text-sky-600">回复 {comment.replyTo}</span>
                                        )}
                                      </div>
                                      <div className="text-xs text-[hsl(var(--foreground))] leading-relaxed">{comment.content}</div>
                                      <div className="flex items-center gap-3 mt-1">
                                        <button className="flex items-center gap-1 text-[10px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-600))] transition-colors">
                                          <ThumbsUp className="w-3 h-3" /> {comment.likes}
                                        </button>
                                        <button className="flex items-center gap-1 text-[10px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-600))] transition-colors">
                                          <MessageSquare className="w-3 h-3" /> 回复
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── 文控管理 ─── */}
            {activeTab === "doccontrol" && (
              <motion.div key="doccontrol" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                    <h3 className="font-bold text-[hsl(var(--foreground))]">我的文控管理</h3>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">文档版本、受控章、归档与复审状态</span>
                  </div>
                </div>
                <div className="overflow-x-auto border border-[hsl(var(--border))] rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-[hsl(var(--muted))]">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">文档标题</th>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">类型</th>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">状态</th>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">版本</th>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">受控章</th>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">归档</th>
                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">下次复审</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(var(--border))]">
                      {docControlItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[hsl(var(--muted))]/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                              <span className="text-[hsl(var(--foreground))] truncate max-w-[240px]">{item.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{item.type}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusBadge(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{item.version}</td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1 text-xs">
                              {item.sealStatus === "已盖章" ? (
                                <><Stamp className="w-3.5 h-3.5 text-emerald-600" /> <span className="text-emerald-600">已盖章</span></>
                              ) : item.sealStatus === "待盖章" ? (
                                <><Stamp className="w-3.5 h-3.5 text-amber-600" /> <span className="text-amber-600">待盖章</span></>
                              ) : (
                                <><Stamp className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" /> <span className="text-[hsl(var(--muted-foreground))]">无需盖章</span></>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1 text-xs">
                              {item.archiveStatus === "已归档" ? (
                                <><Archive className="w-3.5 h-3.5 text-emerald-600" /> <span className="text-emerald-600">已归档</span></>
                              ) : (
                                <><Archive className="w-3.5 h-3.5 text-amber-600" /> <span className="text-amber-600">待归档</span></>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{item.nextReview}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
