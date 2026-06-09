import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircleQuestion,
  Search,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronRight,
  ThumbsUp,
  Eye,
  Award,
  Mail,
  BookOpen,
  Shield,
  FileText,
  Users,
  BarChart,
  Tag,
  Flame,
  HelpCircle,
  Reply,
  UserPlus,
  Cpu,
  ShieldCheck,
  FileCheck,
  BellRing,
} from "lucide-react";

const experts = [
  { id: 1, name: "王建国", field: "战略规划", response: "1 小时", score: 1860, answers: 128, online: true, avatar: "王", honor: "知识贡献之星" },
  { id: 2, name: "陈思颖", field: "数据分析与知识沉淀", response: "2 小时", score: 1240, answers: 96, online: true, avatar: "陈", honor: "活跃度冠军" },
  { id: 3, name: "李文博", field: "UI/UE、合规与知识运营", response: "2 小时", score: 1120, answers: 87, online: false, avatar: "李", honor: "文档质量奖" },
  { id: 4, name: "张雅婷", field: "项目研发与渠道运营", response: "1.5 小时", score: 980, answers: 76, online: true, avatar: "张", honor: "" },
  { id: 5, name: "刘子豪", field: "金融产品与知识建模", response: "3 小时", score: 890, answers: 64, online: true, avatar: "刘", honor: "" },
  { id: 6, name: "赵晓燕", field: "模型算法与数据能力", response: "2.5 小时", score: 760, answers: 58, online: false, avatar: "赵", honor: "" },
  { id: 7, name: "孙伟强", field: "信息安全与合规审计", response: "1 小时", score: 720, answers: 52, online: true, avatar: "孙", honor: "" },
  { id: 8, name: "周美玲", field: "客户运营与服务管理", response: "2 小时", score: 680, answers: 48, online: true, avatar: "周", honor: "" },
  { id: 9, name: "吴志远", field: "技术架构与基础设施", response: "3 小时", score: 640, answers: 45, online: false, avatar: "吴", honor: "" },
  { id: 10, name: "郑佳琪", field: "产品设计与用户体验", response: "1.5 小时", score: 580, answers: 40, online: true, avatar: "郑", honor: "" },
  { id: 11, name: "黄浩然", field: "数据科学与人工智能", response: "2 小时", score: 520, answers: 36, online: true, avatar: "黄", honor: "" },
  { id: 12, name: "杨思涵", field: "知识管理与培训体系", response: "1 小时", score: 480, answers: 32, online: false, avatar: "杨", honor: "" },
];

const questions = [
  { id: 1, title: "养老保险个人账户转移流程具体如何操作？", asker: "李明远", dept: "信息科技部", expert: "王建国", status: "answered", time: "2小时前", views: 56, likes: 12, replies: 3, type: "制度" },
  { id: 2, title: "最新的监管政策对信息披露有哪些新要求？", asker: "周婷", dept: "合规部", expert: "李文博", status: "answered", time: "5小时前", views: 89, likes: 24, replies: 5, type: "法规" },
  { id: 3, title: "企业年金投资组合的合规边界", asker: "刘洋", dept: "产品部", expert: "刘子豪", status: "pending", time: "1天前", views: 34, likes: 5, replies: 0, type: "流程" },
  { id: 4, title: "绩效考核中的知识贡献如何量化？", asker: "吴磊", dept: "人力资源部", expert: "陈思颖", status: "answered", time: "2天前", views: 112, likes: 31, replies: 7, type: "制度" },
  { id: 5, title: "数据治理规范中标签体系如何设计？", asker: "赵敏", dept: "信息科技部", expert: "赵晓燕", status: "pending", time: "3天前", views: 45, likes: 8, replies: 1, type: "数据" },
  { id: 6, title: "新员工入职培训资料如何快速获取？", asker: "王小明", dept: "人力资源部", expert: "杨思涵", status: "answered", time: "4小时前", views: 78, likes: 15, replies: 4, type: "培训" },
  { id: 7, title: "OA系统与知识库的单点登录如何配置？", asker: "张伟", dept: "信息科技部", expert: "吴志远", status: "pending", time: "6小时前", views: 42, likes: 6, replies: 2, type: "文档" },
  { id: 8, title: "客户服务标准流程V3.0的更新内容有哪些？", asker: "陈丽", dept: "客户服务部", expert: "周美玲", status: "answered", time: "1天前", views: 95, likes: 18, replies: 5, type: "流程" },
  { id: 9, title: "跨部门知识共享的权限申请流程是什么？", asker: "刘强", dept: "运营管理部", expert: "孙伟强", status: "pending", time: "2天前", views: 67, likes: 9, replies: 3, type: "制度" },
  { id: 10, title: "保险产品预定利率调整后的合规审查要点", asker: "赵丽", dept: "合规部", expert: "刘子豪", status: "answered", time: "3天前", views: 88, likes: 22, replies: 6, type: "法规" },
  { id: 11, title: "如何利用AI助手自动生成制度文档摘要？", asker: "周杰", dept: "战略发展部", expert: "黄浩然", status: "answered", time: "5小时前", views: 120, likes: 35, replies: 8, type: "文档" },
  { id: 12, title: "知识库中历史版本的归档与检索规则", asker: "吴芳", dept: "信息科技部", expert: "郑佳琪", status: "pending", time: "1天前", views: 53, likes: 7, replies: 1, type: "数据" },
];

const questionTypes = [
  { key: "制度", label: "制度规范", icon: Shield, color: "text-sky-600" },
  { key: "流程", label: "业务流程", icon: BookOpen, color: "text-emerald-600" },
  { key: "文档", label: "技术文档", icon: FileText, color: "text-violet-600" },
  { key: "培训", label: "培训资料", icon: Users, color: "text-amber-600" },
  { key: "法规", label: "外部法规", icon: Tag, color: "text-rose-600" },
  { key: "数据", label: "运营数据", icon: BarChart, color: "text-indigo-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function AskExpert() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"experts" | "questions">("questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [questionFilter, setQuestionFilter] = useState("全部");
  const [questionType, setQuestionType] = useState("");
  const [scenario, setScenario] = useState("");
  const [urgency, setUrgency] = useState("普通");
  const [domain, setDomain] = useState("");

  const filteredExperts = experts.filter((e) =>
    !searchQuery || e.name.includes(searchQuery) || e.field.includes(searchQuery)
  );

  const filteredQuestions = questions.filter((q) => {
    if (questionFilter === "全部") return true;
    if (questionFilter === "待解答") return q.status === "pending";
    if (questionFilter === "已解答") return q.status === "answered";
    return true;
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">知识提问</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">知识专家网络与单线求助，配套积分荣誉激励</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: "专家总数", value: "200+", icon: UserCheck, color: "text-[hsl(var(--navy-600))]" },
          { label: "本月解答", value: "1,240", icon: MessageSquare, color: "text-emerald-600" },
          { label: "平均响应", value: "1.8h", icon: Clock, color: "text-sky-600" },
          { label: "积分最高", value: "1860", icon: Award, color: "text-[hsl(var(--gold-600))]" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <div className="flex bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-1">
          {[
            { key: "questions", label: "问题广场" },
            { key: "experts", label: "专家网络" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "experts" | "questions")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[hsl(var(--navy-600))] text-white shadow-sm"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setAskModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-2"
        >
          <MessageCircleQuestion className="w-4 h-4" />
          发起提问
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* 左侧主内容 */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === "experts" ? (
              <motion.div key="experts" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="space-y-6">
                {/* Search */}
                <motion.div variants={itemVariants} className="relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索专家姓名、领域..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all text-sm"
                  />
                </motion.div>

                {/* Expert Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExperts.map((expert) => (
                    <motion.div
                      key={expert.id}
                      variants={itemVariants}
                      whileHover={{ y: -3, boxShadow: "var(--shadow-elevated)" }}
                      className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 hover:border-[hsl(var(--navy-200))] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white text-lg font-bold">
                              {expert.avatar}
                            </div>
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${expert.online ? "bg-green-500" : "bg-[hsl(var(--muted-foreground))]"}`} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[hsl(var(--foreground))]">{expert.name}</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))]">{expert.field}</div>
                          </div>
                        </div>
                        {expert.honor && (
                          <span className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-600))] font-medium border border-[hsl(var(--gold-200))]">
                            {expert.honor}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                        <div className="p-2 rounded-lg bg-[hsl(var(--muted))]">
                          <div className="text-sm font-bold text-[hsl(var(--foreground))]">{expert.score}</div>
                          <div className="text-[10px] text-[hsl(var(--muted-foreground))]">荣誉积分</div>
                        </div>
                        <div className="p-2 rounded-lg bg-[hsl(var(--muted))]">
                          <div className="text-sm font-bold text-[hsl(var(--foreground))]">{expert.answers}</div>
                          <div className="text-[10px] text-[hsl(var(--muted-foreground))]">已解答</div>
                        </div>
                        <div className="p-2 rounded-lg bg-[hsl(var(--muted))]">
                          <div className="text-sm font-bold text-[hsl(var(--foreground))]">{expert.response}</div>
                          <div className="text-[10px] text-[hsl(var(--muted-foreground))]">平均响应</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSelectedExpert(expert.id); setAskModalOpen(true); }}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-xs font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
                        >
                          <MessageCircleQuestion className="w-3.5 h-3.5" />
                          提问
                        </button>
                        <button
                          onClick={() => { setSelectedExpert(expert.id); setMessageModalOpen(true); }}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-xs font-medium hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))] transition-colors border border-[hsl(var(--border))]"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          站内信
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="questions" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      共 <span className="font-bold text-[hsl(var(--foreground))]">{filteredQuestions.length}</span> 个问题
                    </span>
                    <div className="flex gap-2">
                      {["全部", "待解答", "已解答"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setQuestionFilter(f)}
                          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                            questionFilter === f
                              ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium"
                              : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))]"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="divide-y divide-[hsl(var(--border))]">
                    {filteredQuestions.map((q) => (
                      <motion.div
                        key={q.id}
                        variants={itemVariants}
                        className="px-6 py-5 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--navy-600))] transition-colors">{q.title}</h4>
                              {q.status === "answered" ? (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> 已解答
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-700))] font-medium border border-[hsl(var(--gold-200))] flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> 待解答
                                </span>
                              )}
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">
                                {questionTypes.find((t) => t.key === q.type)?.label || q.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                              <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {q.asker} · {q.dept}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.time}</span>
                              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {q.views}</span>
                              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {q.likes}</span>
                              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {q.replies} 回复</span>
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center gap-2">
                            <div className="text-right">
                              <div className="text-xs text-[hsl(var(--muted-foreground))]">指定专家</div>
                              <div className="text-sm font-medium text-[hsl(var(--navy-600))]">{q.expert}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 右侧侧边栏 */}
        <div className="space-y-5">
          {/* 知识需求处理流程 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[hsl(var(--navy-600))]" />
              <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">知识需求处理流程</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { id: 1, title: "员工发起知识需求", icon: UserPlus, color: "bg-sky-500", active: false },
                { id: 2, title: "系统智能识别自动派发", icon: Cpu, color: "bg-violet-500", active: true },
                { id: 3, title: "责任部门认领/退回", icon: ShieldCheck, color: "bg-amber-500", active: true },
                { id: 4, title: "OA审核自动入库", icon: FileCheck, color: "bg-emerald-500", active: false },
                { id: 5, title: "知识回传通知需求人", icon: BellRing, color: "bg-rose-500", active: true },
              ].map((step, idx, arr) => {
                const SIcon = step.icon;
                return (
                  <div key={step.id} className="relative">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full ${step.color} flex items-center justify-center shrink-0 ${step.active ? '' : 'opacity-50'}`}>
                        <SIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className={`text-xs ${step.active ? 'font-medium text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                        {step.title}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="absolute left-[11px] top-[26px] w-[2px] h-[10px] bg-[hsl(var(--border))]" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-2 border-t border-[hsl(var(--border))]">
              <a href="/knowledge-flow" className="text-xs text-[hsl(var(--navy-600))] hover:underline flex items-center gap-1">
                查看完整流程 <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 搜索 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="搜索问题、专家..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* 我的提问 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[hsl(var(--navy-600))]" />
              <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">我的提问</h3>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {[
                { title: "外部法规库能否按月同步？", status: "系统智能识别自动派发", step: 2, stepColor: "bg-violet-500", stepIcon: Cpu },
                { title: "知识不存在时如何触发需求？", status: "责任部门认领/退回", step: 3, stepColor: "bg-amber-500", stepIcon: ShieldCheck },
                { title: "历史版本是否会被智能体召回？", status: "知识回传通知需求人", step: 5, stepColor: "bg-rose-500", stepIcon: BellRing },
              ].map((q, idx) => {
                const SIcon = q.stepIcon;
                return (
                  <div key={idx} className="px-4 py-3 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer">
                    <div className="text-sm text-[hsl(var(--foreground))] line-clamp-1">{q.title}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className={`w-4 h-4 rounded-full ${q.stepColor} flex items-center justify-center shrink-0`}>
                        <SIcon className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">步骤 {q.step} · {q.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 我的回答 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center gap-2">
              <Reply className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">我的回答</h3>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {[
                { title: "养老保险个人账户转移流程", likes: 12, time: "2小时前", step: 5, stepLabel: "已闭环", stepColor: "bg-rose-500", stepIcon: BellRing },
                { title: "新员工培训资料更新申请指引", likes: 8, time: "昨天", step: 4, stepLabel: "审核入库中", stepColor: "bg-emerald-500", stepIcon: FileCheck },
                { title: "跨部门知识权限申请流程说明", likes: 5, time: "3天前", step: 3, stepLabel: "部门认领", stepColor: "bg-amber-500", stepIcon: ShieldCheck },
              ].map((a, idx) => {
                const SIcon = a.stepIcon;
                return (
                  <div key={idx} className="px-4 py-3 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer">
                    <div className="text-sm text-[hsl(var(--foreground))] line-clamp-1">{a.title}</div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        <div className={`w-4 h-4 rounded-full ${a.stepColor} flex items-center justify-center shrink-0`}>
                          <SIcon className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">步骤 {a.step} · {a.stepLabel}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]"><ThumbsUp className="w-3 h-3" /> {a.likes}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{a.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 热门问题 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[hsl(var(--gold-600))]" />
              <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">热门问题</h3>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {[
                { title: "养老保险业务操作规范", views: 342 },
                { title: "企业年金管理办法解读", views: 289 },
                { title: "客户服务标准流程V3.0", views: 256 },
                { title: "数据治理规范要求", views: 198 },
                { title: "合规监管最新政策", views: 175 },
              ].map((q, idx) => (
                <div key={idx} className="px-4 py-3 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer flex items-center gap-3">
                  <span className={`text-xs font-bold w-4 text-center ${idx < 3 ? "text-[hsl(var(--gold-600))]" : "text-[hsl(var(--muted-foreground))]"}`}>{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[hsl(var(--foreground))] truncate">{q.title}</div>
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{q.views}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ask Modal */}
      <AnimatePresence>
        {askModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setAskModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[520px] max-w-[90vw] bg-[hsl(var(--card))] rounded-2xl shadow-[var(--shadow-elevated)] flex flex-col overflow-hidden border border-[hsl(var(--border))]"
            >
              <div className="px-6 py-4 border-b border-[hsl(var(--border))]">
                <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">向专家提问</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">请清晰描述您的问题，专家将尽快为您解答</p>
              </div>
              <div className="p-6 space-y-4">
                {/* Question Type */}
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">问题类型 <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {questionTypes.map((type) => {
                      const Icon = type.icon;
                      const selected = questionType === type.key;
                      return (
                        <button
                          key={type.key}
                          onClick={() => setQuestionType(type.key)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border ${
                            selected
                              ? "bg-[hsl(var(--navy-50))] border-[hsl(var(--navy-200))] text-[hsl(var(--navy-700))] font-medium"
                              : "bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--navy-200))]"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${selected ? type.color : "text-[hsl(var(--muted-foreground))]"}`} />
                          <span>{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                    选择问题类型后，回答将遵循对应的审批流程。
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">选择专家</label>
                  <select
                    value={selectedExpert || ""}
                    onChange={(e) => setSelectedExpert(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
                  >
                    <option value="">请选择专家（可选）</option>
                    {experts.map((e) => (
                      <option key={e.id} value={e.id}>{e.name} · {e.field}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">需求场景 <span className="text-red-500">*</span></label>
                  <select
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
                  >
                    <option value="">请选择需求场景</option>
                    <option value="制度规范查询">制度规范查询</option>
                    <option value="业务流程咨询">业务流程咨询</option>
                    <option value="技术文档查阅">技术文档查阅</option>
                    <option value="培训资料获取">培训资料获取</option>
                    <option value="外部法规解读">外部法规解读</option>
                    <option value="运营数据分析">运营数据分析</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">时效要求 <span className="text-red-500">*</span></label>
                  <div className="flex gap-3">
                    {["普通", "紧急", "特急"].map((u) => (
                      <button
                        key={u}
                        onClick={() => setUrgency(u)}
                        className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                          urgency === u
                            ? "bg-[hsl(var(--navy-50))] border-[hsl(var(--navy-200))] text-[hsl(var(--navy-700))]"
                            : "bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--navy-200))]"
                        }`}
                      >
                        {u}
                        {u === "普通" && <span className="block text-[10px] font-normal text-[hsl(var(--muted-foreground))]">3个工作日内</span>}
                        {u === "紧急" && <span className="block text-[10px] font-normal text-[hsl(var(--muted-foreground))]">1个工作日内</span>}
                        {u === "特急" && <span className="block text-[10px] font-normal text-[hsl(var(--muted-foreground))]">4小时内</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">涉及领域 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="请输入可能涉及的领域，如：养老保险、制度规范等"
                    className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">问题标题 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="简要概括您的问题"
                    className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-2 block">详细描述 <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    placeholder="详细描述您遇到的问题或需要了解的内容..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm resize-none"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex justify-end gap-3">
                <button
                  onClick={() => setAskModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => { setAskModalOpen(false); navigate("/question-tracking"); }}
                  className="px-5 py-2.5 rounded-xl bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  提交问题
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {messageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setMessageModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[480px] max-w-[90vw] bg-[hsl(var(--card))] rounded-2xl shadow-[var(--shadow-elevated)] flex flex-col overflow-hidden border border-[hsl(var(--border))]"
            >
              <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-navy flex items-center justify-center text-white text-sm font-bold">
                  {selectedExpert ? experts.find((e) => e.id === selectedExpert)?.avatar : "?"}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">发站内信</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    给 {selectedExpert ? experts.find((e) => e.id === selectedExpert)?.name : "专家"} 发送站内消息
                  </p>
                </div>
              </div>
              <div className="p-6">
                <textarea
                  rows={5}
                  placeholder="输入您想对专家说的话..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm resize-none"
                />
              </div>
              <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex justify-end gap-3">
                <button
                  onClick={() => setMessageModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => setMessageModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  发送
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
