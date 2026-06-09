import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Sparkles,
  TrendingUp,
  Eye,
  Clock,
  UserCheck,
  ChevronRight,
  Flame,
  Bell,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Send,
  MessageSquare,
  ArrowRight,
  Trophy,
  Zap,
  Upload,
  Globe,
  Crown,
  Medal,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const quickQuestions = [
  "养老保险业务操作规范",
  "企业年金管理办法",
  "客户服务标准流程",
  "数据治理规范要求",
  "合规监管最新政策",
];

const hotQuestions = [
  { title: "外部法规库能否按月同步？", status: "已转合规专家 · 等待回复", color: "text-amber-600" },
  { title: "知识不存在时如何触发需求？", status: "已进入需求分发流程", color: "text-blue-600" },
  { title: "历史版本是否会被智能体召回？", status: "已答复 · 仅人工查阅", color: "text-emerald-600" },
  { title: "新员工培训资料如何申请更新？", status: "已转人力资源部 · 处理中", color: "text-amber-600" },
  { title: "跨部门知识权限如何申请？", status: "已进入审批流程", color: "text-blue-600" },
  { title: "AI助手能否直接引用制度原文？", status: "已答复 · 支持引用", color: "text-emerald-600" },
];

const stats = [
  { label: "知识总量", value: "12,847", change: "+156", icon: BookOpen, color: "text-[hsl(var(--navy-600))]" },
  { label: "待审批", value: "23", change: "+5", icon: ClipboardCheck, color: "text-[hsl(var(--gold-600))]" },
  { label: "本月更新", value: "342", change: "+28", icon: TrendingUp, color: "text-emerald-600" },
  { label: "专家在线", value: "18", change: "", icon: UserCheck, color: "text-sky-600" },
];

const recentDocs = [
  { title: "养老保险业务操作手册（2026版）", dept: "运营管理部", time: "2小时前", type: "制度", hot: true },
  { title: "信息安全管理制度修订说明", dept: "信息科技部", time: "5小时前", type: "制度", hot: false },
  { title: "客户服务标准化流程V3.0", dept: "客户服务部", time: "1天前", type: "流程", hot: true },
  { title: "年度绩效考核方案", dept: "人力资源部", time: "2天前", type: "方案", hot: false },
  { title: "数据治理规范（试行）", dept: "信息科技部", time: "3天前", type: "规范", hot: false },
];

const todos = [
  { title: "审批《养老保险业务操作手册》更新", deadline: "今天", urgent: true },
  { title: "补充信息安全管理制度标签", deadline: "明天", urgent: false },
  { title: "回复客户服务部知识需求", deadline: "2天后", urgent: false },
];

const notices = [
  { title: "关于启用知识模板标准化功能的通知", date: "2026-05-26", type: "系统" },
  { title: "5月份知识贡献排名已发布", date: "2026-05-25", type: "运营" },
  { title: "OA系统知识自动同步功能上线", date: "2026-05-20", type: "系统" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-[1400px] mx-auto"
    >
      {/* Hero Banner */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl gradient-hero text-white p-8">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur-sm">KM 知识管理平台</span>
              <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--gold-500))]/20 text-[hsl(var(--gold-300))] text-xs font-medium backdrop-blur-sm">一期上线</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">欢迎回来，刘雨馨</h1>
            <p className="text-white/70 text-sm max-w-xl">
              知识管理平台已实现 OA 制度类知识自动入库，支持智能搜索、专家咨询、知识审批等核心功能。
              今日待处理审批 23 项，新入库知识 12 篇。
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => navigate("/knowledge-space")}
                className="px-5 py-2.5 rounded-xl bg-white text-[hsl(var(--navy-700))] text-sm font-bold hover:bg-white/90 transition-colors"
              >
                浏览知识库
              </button>
              <button
                onClick={() => navigate("/ai-center")}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              >
                <Sparkles className="w-4 h-4 inline-block mr-1.5" />
                AI 智能助手
              </button>
            </div>
          </div>

          {/* 知识影响力入口 */}
          <div
            onClick={() => navigate("/personal-analytics")}
            className="hidden lg:block shrink-0 w-64 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 cursor-pointer hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[hsl(var(--gold-300))]" />
                <span className="text-sm font-bold">我的知识影响力</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-lg font-bold">386</div>
                <div className="text-[10px] text-white/60">阅读总量</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-lg font-bold">152</div>
                <div className="text-[10px] text-white/60">获赞数量</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Trophy className="w-3.5 h-3.5 text-[hsl(var(--gold-300))]" />
              <span>全站排名第 42 名</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI 助手 + 大家都在问 */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-5 gap-6">
        {/* AI 智能助手 */}
        <div className="lg:col-span-3 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-0 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-[hsl(var(--border))] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/images/ai-assistant-icon.png" alt="AI" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[hsl(var(--foreground))]">AI 智能助手</h2>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">基于知识库的智能问答，秒级响应</p>
            </div>
          </div>

          {/* 分类标签 */}
          <div className="px-5 py-2 border-b border-[hsl(var(--border))] flex gap-2 overflow-x-auto">
            {["智能办公", "智能搜索", "数字分身", "个人知识库", "智能体", "业务知识库"].map((tag, idx) => (
              <button
                key={tag}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                  idx === 0
                    ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium border border-[hsl(var(--navy-200))]"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 对话预览 */}
          <div className="flex-1 px-5 py-4 space-y-3 min-h-[140px]">
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] text-xs leading-relaxed">
                您好，我是知识管理平台AI助手。我可以帮您搜索知识、解答问题、辅助撰写文档。请问有什么可以帮您的？
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] text-xs leading-relaxed">
                您可以试试问：养老保险业务操作规范、OA操作流程、文档模板、专家咨询等
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-5 py-3 border-t border-[hsl(var(--border))]">
            <div className="rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2">
                <input
                  type="text"
                  placeholder="输入你的问题，AI 将基于知识库为你解答..."
                  className="flex-1 text-xs bg-transparent outline-none"
                />
                <button className="p-1.5 rounded-lg bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))] transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border-t border-[hsl(var(--border))] flex-wrap">
                <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
                  <FileText className="w-3 h-3" /> 文件选择
                </button>
                <button className="flex items-center gap-0.5 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors">
                  <Sparkles className="w-3 h-3" /> DeepSeek <ChevronRight className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] bg-blue-50 text-blue-600 border border-blue-200">
                  <Zap className="w-3 h-3" /> 思考
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
                  <Upload className="w-3 h-3" /> 办公意图
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] bg-blue-50 text-blue-600 border border-blue-200">
                  <BarChart3 className="w-3 h-3" /> 内部资料
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
                  <Globe className="w-3 h-3" /> 联网
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    className="px-2 py-0.5 rounded-md bg-[hsl(var(--navy-50))] border border-[hsl(var(--navy-200))] text-[10px] text-[hsl(var(--navy-600))] hover:bg-[hsl(var(--navy-100))] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                onClick={() => navigate("/ai-center")}
                className="text-[10px] text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-0.5 font-medium shrink-0 ml-2"
              >
                进入 AI 助手 <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 大家都在问 */}
        <div className="lg:col-span-2 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[hsl(var(--navy-600))]" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">大家都在问</h3>
            </div>
            <button
              onClick={() => navigate("/ask-expert")}
              className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-1 transition-colors"
            >
              去提问 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-[hsl(var(--border))]">
            {hotQuestions.map((q, idx) => (
              <div key={idx} className="px-5 py-3.5 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group">
                <div className="flex items-start gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--navy-600))] transition-colors truncate">
                      {q.title}
                    </div>
                    <div className={`text-xs mt-1 font-medium ${q.color}`}>
                      {q.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
              {stat.change && (
                <div className="text-xs text-emerald-600 mt-1 font-medium">{stat.change} 较上周</div>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Knowledge */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[hsl(var(--gold-500))]" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">最近更新 / 热门知识</h3>
            </div>
            <button onClick={() => navigate("/knowledge-space")} className="text-sm text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-1 transition-colors">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-[hsl(var(--border))]">
            {recentDocs.map((doc, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center gap-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  doc.type === "制度" ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))]" :
                  doc.type === "流程" ? "bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-600))]" :
                  "bg-emerald-50 text-emerald-600"
                }`}>
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{doc.title}</span>
                    {doc.hot && <Flame className="w-3.5 h-3.5 text-[hsl(var(--gold-500))] shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{doc.dept}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {doc.time}
                    </span>
                  </div>
                </div>
                <Eye className="w-4 h-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* My Todos */}
          <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">我的待办</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-700))] font-medium">{todos.length} 项</span>
            </div>
            <div className="p-3 space-y-2">
              {todos.map((todo, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--navy-50))] transition-colors cursor-pointer border border-transparent hover:border-[hsl(var(--navy-200))]">
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${todo.urgent ? "text-[hsl(var(--destructive))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                    <div>
                      <div className="text-sm text-[hsl(var(--foreground))]">{todo.title}</div>
                      <div className={`text-xs mt-1 ${todo.urgent ? "text-[hsl(var(--destructive))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                        截止：{todo.deadline}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notices */}
          <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center gap-2">
              <Bell className="w-5 h-5 text-[hsl(var(--navy-600))]" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">通知公告</h3>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {notices.map((notice, idx) => (
                <div key={idx} className="px-5 py-3 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer">
                  <div className="text-sm text-[hsl(var(--foreground))] line-clamp-1">{notice.title}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">{notice.type}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mini Chart */}
          <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[hsl(var(--navy-600))]" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">知识访问趋势</h3>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[45, 62, 38, 75, 55, 88, 72].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full rounded-t-md bg-gradient-to-t from-[hsl(var(--navy-200))] to-[hsl(var(--navy-400))]"
                  />
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{["一","二","三","四","五","六","日"][i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 运营数据看板 + 排行榜 */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
        {/* 运营数据看板 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 折线图 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">知识总量趋势</h3>
              </div>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">近 30 天</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { day: "5/2", total: 11800, new: 120 },
                  { day: "5/6", total: 11950, new: 150 },
                  { day: "5/10", total: 12080, new: 130 },
                  { day: "5/14", total: 12200, new: 120 },
                  { day: "5/18", total: 12350, new: 150 },
                  { day: "5/22", total: 12500, new: 150 },
                  { day: "5/26", total: 12650, new: 150 },
                  { day: "5/30", total: 12847, new: 197 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "12px" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line type="monotone" dataKey="total" name="知识总量" stroke="hsl(var(--navy-600))" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="new" name="新增知识" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 运营统计卡片 */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "本月缺口闭环数", value: "86", change: "+12", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "AI 命中率提升", value: "+12.3%", change: "较上月", icon: Zap, color: "text-sky-600", bg: "bg-sky-50" },
              { label: "在线专家占比", value: "72%", change: "18/25 人", icon: UserCheck, color: "text-violet-600", bg: "bg-violet-50" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-[hsl(var(--card))] rounded-xl p-4 border border-[hsl(var(--border))]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                    <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
                  <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">{stat.change}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 排行榜预览 */}
        <div className="space-y-6">
          {/* 贡献排行 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[hsl(var(--gold-600))]" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">贡献排行</h3>
              </div>
              <button onClick={() => navigate("/leaderboard")} className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-0.5 transition-colors">
                全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2.5">
              {[
                { name: "王建国", dept: "战略规划部", score: 1860 },
                { name: "陈思颖", dept: "数据分析部", score: 1240 },
                { name: "李文博", dept: "合规运营部", score: 1120 },
                { name: "张雅婷", dept: "项目研发部", score: 980 },
                { name: "刘子豪", dept: "金融产品部", score: 890 },
              ].map((item, idx) => {
                const rank = idx + 1;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 flex justify-center shrink-0">
                      {rank === 1 ? <Crown className="w-4 h-4 text-amber-500" /> :
                       rank === 2 ? <Medal className="w-4 h-4 text-slate-400" /> :
                       rank === 3 ? <Trophy className="w-4 h-4 text-orange-400" /> :
                       <span className="text-xs text-[hsl(var(--muted-foreground))]">{rank}</span>}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{item.name}</div>
                      <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{item.dept}</div>
                    </div>
                    <div className="text-sm font-bold text-[hsl(var(--foreground))] shrink-0">{item.score}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 学习排行 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">学习排行</h3>
              </div>
              <button onClick={() => navigate("/leaderboard")} className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-0.5 transition-colors">
                全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2.5">
              {[
                { name: "王建国", dept: "战略规划部", reads: 245 },
                { name: "李智慧", dept: "运营管理部", reads: 210 },
                { name: "陈思颖", dept: "数据分析部", reads: 186 },
                { name: "李娟", dept: "客户服务部", reads: 150 },
                { name: "刘子豪", dept: "金融产品部", reads: 142 },
              ].map((item, idx) => {
                const rank = idx + 1;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 flex justify-center shrink-0">
                      {rank === 1 ? <Crown className="w-4 h-4 text-amber-500" /> :
                       rank === 2 ? <Medal className="w-4 h-4 text-slate-400" /> :
                       rank === 3 ? <Trophy className="w-4 h-4 text-orange-400" /> :
                       <span className="text-xs text-[hsl(var(--muted-foreground))]">{rank}</span>}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{item.name}</div>
                      <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{item.dept}</div>
                    </div>
                    <div className="text-sm font-bold text-[hsl(var(--foreground))] shrink-0">{item.reads}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
