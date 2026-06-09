import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Search,
  TrendingUp,
  ThumbsUp,
  Heart,
  MessageSquare,
  Target,
  BarChart3,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  FolderOpen,
  Flame,
  Award,
  Crown,
  Medal,
  Trophy,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// ─── 动画 ───
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// ─── 维度 ───
type Dimension = "overall" | "dept";

const dimensionTabs: { key: Dimension; label: string }[] = [
  { key: "overall", label: "总体维度" },
  { key: "dept", label: "分部门维度" },
];

// ─── 颜色板 ───
const COLORS = ["hsl(var(--navy-600))", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#ec4899"];

// ─── 概览 KPI ───
const overallKpi = [
  { label: "知识总量", value: "12,847", change: "+156", icon: BookOpen, color: "text-[hsl(var(--navy-600))]", bg: "bg-[hsl(var(--navy-50))]" },
  { label: "日活跃用户", value: "1,240", change: "+8.3%", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "搜索次数", value: "8,620", change: "+12%", icon: Search, color: "text-sky-600", bg: "bg-sky-50" },
  { label: "本月新增知识", value: "342", change: "+28", icon: FileText, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "活跃专家", value: "18/25", change: "72%", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "缺口闭环数", value: "86", change: "+12", icon: CheckCircle2, color: "text-rose-600", bg: "bg-rose-50" },
];

const deptKpi = [
  { label: "知识总量", value: "12,847", change: "+156", icon: BookOpen, color: "text-[hsl(var(--navy-600))]", bg: "bg-[hsl(var(--navy-50))]" },
  { label: "Top 部门", value: "信息技术部", change: "3,240篇", icon: Trophy, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "搜索次数", value: "8,620", change: "+12%", icon: Search, color: "text-sky-600", bg: "bg-sky-50" },
  { label: "本月新增", value: "342", change: "+28", icon: FileText, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "活跃专家", value: "18/25", change: "72%", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "缺口闭环", value: "86", change: "+12", icon: CheckCircle2, color: "text-rose-600", bg: "bg-rose-50" },
];

// ─── 新增/更新趋势 ───
const trendData = [
  { date: "05/01", new: 8, update: 3 },
  { date: "05/05", new: 12, update: 5 },
  { date: "05/09", new: 15, update: 8 },
  { date: "05/13", new: 10, update: 4 },
  { date: "05/17", new: 18, update: 6 },
  { date: "05/21", new: 22, update: 9 },
  { date: "05/25", new: 14, update: 7 },
  { date: "05/29", new: 20, update: 10 },
  { date: "05/30", new: 25, update: 12 },
];

// ─── 知识分类分布 ───
const categoryDist = [
  { name: "制度规范", value: 3840 },
  { name: "业务流程", value: 2860 },
  { name: "技术文档", value: 2120 },
  { name: "培训资料", value: 1680 },
  { name: "外部法规", value: 1347 },
  { name: "其他", value: 1000 },
];

// ─── 部门知识分布 ───
const deptDist = [
  { name: "信息技术部", value: 3240 },
  { name: "运营管理部", value: 2890 },
  { name: "客户服务部", value: 2650 },
  { name: "战略发展部", value: 1980 },
  { name: "法律合规部", value: 1760 },
  { name: "人力资源部", value: 1327 },
];

// ─── 热门知识排行 ───
const hotKnowledge = [
  { title: "养老保险业务操作手册（2026版）", views: 3421, likes: 156, dept: "运营管理部" },
  { title: "监管政策汇编（2026Q2）", views: 1987, likes: 89, dept: "合规部" },
  { title: "客户服务标准化流程V3.0", views: 1890, likes: 76, dept: "客户服务部" },
  { title: "信息安全管理制度修订说明", views: 1650, likes: 62, dept: "信息科技部" },
  { title: "数据治理规范（试行）", views: 1420, likes: 54, dept: "信息科技部" },
];

// ─── 反馈趋势 ───
const feedbackTrend = [
  { date: "05/01", likes: 45, dislikes: 2, collections: 18 },
  { date: "05/05", likes: 62, dislikes: 3, collections: 24 },
  { date: "05/09", likes: 58, dislikes: 1, collections: 22 },
  { date: "05/13", likes: 72, dislikes: 4, collections: 30 },
  { date: "05/17", likes: 68, dislikes: 2, collections: 28 },
  { date: "05/21", likes: 85, dislikes: 3, collections: 35 },
  { date: "05/25", likes: 90, dislikes: 5, collections: 38 },
  { date: "05/29", likes: 102, dislikes: 4, collections: 42 },
  { date: "05/30", likes: 110, dislikes: 3, collections: 45 },
];

// ─── 点踩工单 ───
const dislikeTickets = [
  { id: "DT-2026-0529-001", doc: "年度绩效考核方案", reason: "内容过时，与现行制度不符", status: "处理中", handler: "陈静", hours: 2.5 },
  { id: "DT-2026-0528-003", doc: "第三方系统对接规范", reason: "缺少安全评审章节", status: "已完成", handler: "李强", hours: 4.0 },
  { id: "DT-2026-0527-005", doc: "客户服务话术手册", reason: "部分表述不准确", status: "处理中", handler: "王芳", hours: 1.5 },
];

// ─── 用户部门分布 ───
const userDeptDist = [
  { name: "信息技术部", users: 86 },
  { name: "运营管理部", users: 72 },
  { name: "客户服务部", users: 68 },
  { name: "战略发展部", users: 45 },
  { name: "法律合规部", users: 38 },
  { name: "人力资源部", users: 32 },
  { name: "产品部", users: 28 },
  { name: "财务部", users: 28 },
];

// ─── 用户行为分布 ───
const behaviorDist = [
  { name: "浏览", value: 65 },
  { name: "搜索", value: 45 },
  { name: "下载", value: 25 },
  { name: "点赞", value: 18 },
  { name: "收藏", value: 12 },
  { name: "分享", value: 8 },
  { name: "评论", value: 5 },
];

// ─── 活跃用户排行 ───
const activeUsers = [
  { name: "王建国", dept: "战略规划部", score: 98, actions: 245 },
  { name: "李智慧", dept: "运营管理部", score: 95, actions: 210 },
  { name: "陈思颖", dept: "数据分析部", score: 92, actions: 186 },
  { name: "李娟", dept: "客户服务部", score: 88, actions: 150 },
  { name: "刘子豪", dept: "金融产品部", score: 85, actions: 142 },
];

// ─── 提问/回答数据 ───
const qaData = [
  { dept: "信息技术部", questions: 86, answers: 72, avgResponse: "2.1h" },
  { dept: "运营管理部", questions: 65, answers: 58, avgResponse: "3.5h" },
  { dept: "客户服务部", questions: 58, answers: 52, avgResponse: "4.2h" },
  { dept: "战略发展部", questions: 42, answers: 38, avgResponse: "5.1h" },
  { dept: "法律合规部", questions: 38, answers: 35, avgResponse: "6.0h" },
  { dept: "人力资源部", questions: 28, answers: 25, avgResponse: "3.8h" },
];

// ─── 分部门对比 ───
const deptCompare = [
  { dept: "信息技术部", docs: 3240, views: 8920, search: 2450, likes: 420 },
  { dept: "运营管理部", docs: 2890, views: 7650, search: 1980, likes: 380 },
  { dept: "客户服务部", docs: 2650, views: 6980, search: 1860, likes: 350 },
  { dept: "战略发展部", docs: 1980, views: 5120, search: 1420, likes: 260 },
  { dept: "法律合规部", docs: 1760, views: 4680, search: 1280, likes: 210 },
  { dept: "人力资源部", docs: 1327, views: 3650, search: 980, likes: 180 },
];

// ─── 排名图标 ───
function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-4 h-4 text-amber-500" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-slate-400" />;
  if (rank === 3) return <Trophy className="w-4 h-4 text-orange-400" />;
  return <span className="w-4 h-4 flex items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">{rank}</span>;
}

export default function Analytics() {
  const [dimension, setDimension] = useState<Dimension>("overall");

  const kpiData = dimension === "overall" ? overallKpi : deptKpi;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1440px] mx-auto space-y-5">
      {/* Header + 维度切换 */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">运营看板</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">实时监控知识平台运营数据，支持总体与分部门维度分析</p>
        </div>
        <div className="flex items-center rounded-xl overflow-hidden border border-[hsl(var(--border))]">
          {dimensionTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDimension(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                dimension === tab.key
                  ? "bg-[hsl(var(--navy-600))] text-white"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── KPI Cards ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">{kpi.value}</div>
              <div className="text-[10px] text-emerald-600 mt-0.5">{kpi.change}</div>
            </div>
          );
        })}
      </motion.div>

      {/* ── 新增/更新知识趋势 ── */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">新增 / 更新知识趋势</h3>
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">近 30 天</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="new" name="新增知识" stroke="hsl(var(--navy-600))" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="update" name="更新知识" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ── 分类分布 + 部门分布 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">知识分类分布</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {categoryDist.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">部门知识分布</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptDist} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} width={80} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} />
                <Bar dataKey="value" name="知识数量" fill="hsl(var(--navy-600))" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ── 热门知识排行 + 更新率/覆盖度 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-[hsl(var(--gold-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">热门知识排行</h3>
          </div>
          <div className="space-y-3">
            {hotKnowledge.map((item, idx) => {
              const rank = idx + 1;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 flex justify-center shrink-0"><RankIcon rank={rank} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{item.title}</div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{item.dept} · <ThumbsUp className="w-3 h-3 inline-block text-rose-400 mr-0.5" />{item.likes}</div>
                  </div>
                  <div className="text-sm font-bold text-[hsl(var(--foreground))] shrink-0">{item.views}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">知识更新率</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "制度规范", rate: 92 },
                { label: "业务流程", rate: 85 },
                { label: "技术文档", rate: 78 },
                { label: "培训资料", rate: 65 },
                { label: "外部法规", rate: 98 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[hsl(var(--foreground))]">{item.label}</span>
                    <span className="text-xs font-bold text-[hsl(var(--navy-600))]">{item.rate}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.rate}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${item.rate >= 90 ? "bg-emerald-500" : item.rate >= 75 ? "bg-[hsl(var(--navy-500))]" : "bg-amber-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-violet-600" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">场景覆盖度</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "业务办理", value: "96%", color: "text-emerald-600" },
                { label: "合规审查", value: "88%", color: "text-[hsl(var(--navy-600))]" },
                { label: "培训学习", value: "82%", color: "text-sky-600" },
                { label: "客户服务", value: "91%", color: "text-emerald-600" },
                { label: "项目管理", value: "75%", color: "text-amber-600" },
                { label: "数据分析", value: "79%", color: "text-sky-600" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-lg bg-[hsl(var(--muted))]">
                  <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 反馈趋势 + 点踩工单 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">反馈趋势</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={feedbackTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="likes" name="点赞" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="dislikes" name="点踩" stroke="#64748b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="collections" name="收藏" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">点踩反馈工单</h3>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">平均处理工时 2.7h</span>
          </div>
          <div className="divide-y divide-[hsl(var(--border))]">
            {dislikeTickets.map((t) => (
              <div key={t.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">#{t.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${t.status === "已完成" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">{t.doc}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">{t.reason}</div>
                <div className="flex items-center gap-3 text-[10px] text-[hsl(var(--muted-foreground))]">
                  <span>处理人：{t.handler}</span>
                  <span>工时：{t.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── 用户维度 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">用户部门分布</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userDeptDist} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} width={80} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} />
                <Bar dataKey="users" name="用户数" fill="#10b981" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">用户行为分布</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={behaviorDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {behaviorDist.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ── 活跃用户排行 + 提问/回答 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[hsl(var(--gold-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">活跃用户排行</h3>
          </div>
          <div className="space-y-2">
            {activeUsers.map((user, idx) => {
              const rank = idx + 1;
              return (
                <div key={idx} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors">
                  <div className="w-5 flex justify-center shrink-0"><RankIcon rank={rank} /></div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[hsl(var(--foreground))]">{user.name}</div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{user.dept} · {user.actions} 次操作</div>
                  </div>
                  <div className="text-sm font-bold text-[hsl(var(--foreground))]">{user.score}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">提问 / 回答数据</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="px-5 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">部门</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">提问数</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">回答数</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">平均响应</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {qaData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[hsl(var(--muted))] transition-colors">
                    <td className="px-5 py-3 text-sm text-[hsl(var(--foreground))]">{row.dept}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--foreground))]">{row.questions}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--foreground))]">{row.answers}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--muted-foreground))]">{row.avgResponse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ── 分部门对比表格（仅在分部门维度显示） ── */}
      {dimension === "dept" && (
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">部门运营对比</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="px-5 py-3 text-left text-xs font-medium text-[hsl(var(--muted-foreground))]">部门</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">知识数</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">浏览量</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">搜索次数</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-[hsl(var(--muted-foreground))]">点赞数</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {deptCompare.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[hsl(var(--muted))] transition-colors">
                    <td className="px-5 py-3 text-sm text-[hsl(var(--foreground))]">{row.dept}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--foreground))]">{row.docs.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--foreground))]">{row.views.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--foreground))]">{row.search.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-right text-[hsl(var(--foreground))]">{row.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
