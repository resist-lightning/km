import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  MessageSquare,
  ChevronRight,
  Zap,
  FileText,
  Upload,
  Globe,
  BarChart3,
  Bot,
  ShieldCheck,
  Search,
  BrainCircuit,
  LayoutTemplate,
  Bookmark,
  Library,
} from "lucide-react";

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

const categories = ["智能办公", "智能搜索", "数字分身", "个人知识库", "智能体", "业务知识库"];

type Msg = { role: "user" | "assistant"; content: string };

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function AICenter() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "您好，我是知识管理平台AI助手。我可以帮您搜索知识、解答问题、辅助撰写文档。请问有什么可以帮您的？" },
    { role: "assistant", content: "您可以试试问：养老保险业务操作规范、OA操作流程、文档模板、专家咨询等" },
  ]);
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [showGapGuide, setShowGapGuide] = useState(false);
  const [searching, setSearching] = useState(false);

  const [activeTemplateTab, setActiveTemplateTab] = useState<"my" | "standard">("my");

  const myTemplates = [
    { title: "养老保险政策解读", desc: "自动提取政策要点并生成解读报告", tags: ["政策", "解读"] },
    { title: "合规审查 checklist", desc: "针对新制度进行合规性逐项检查", tags: ["合规", "审查"] },
    { title: "数据周报生成", desc: "汇总本周数据指标并生成分析周报", tags: ["数据", "周报"] },
    { title: "会议纪要结构化", desc: "将会议记录整理为标准格式纪要", tags: ["会议", "纪要"] },
  ];

  const standardTemplates = [
    { title: "知识库智能搜索", desc: "基于自然语言查询精准定位知识文档", tags: ["搜索", "通用"] },
    { title: "制度对比分析", desc: "对比新旧制度差异并标注重点变更", tags: ["制度", "对比"] },
    { title: "客户问题应答", desc: "根据知识库生成标准客户应答话术", tags: ["客服", "应答"] },
    { title: "培训大纲生成", desc: "基于岗位能力模型生成培训大纲", tags: ["培训", "大纲"] },
    { title: "风险评估报告", desc: "结合法规与案例生成风险评估框架", tags: ["风险", "评估"] },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setSearching(true);
    setShowGapGuide(false);

    // Step 1: searching
    setTimeout(() => {
      setSearching(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `正在检索知识库...\n\n关键词识别：${userMsg.slice(0, 8)}...\n\n未在现有知识库中找到匹配答案。`,
        },
      ]);
      // Step 2: show gap guide
      setTimeout(() => {
        setShowGapGuide(true);
      }, 600);
    }, 1500);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">AI 助手</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">基于知识库的智能问答，秒级响应</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid lg:grid-cols-5 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-0 flex flex-col overflow-hidden h-[720px]">
          {/* Header */}
          <div className="px-5 py-3 border-b border-[hsl(var(--border))] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="./images/ai-assistant-icon.png" alt="AI" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[hsl(var(--foreground))]">AI 智能助手</h2>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">基于知识库的智能问答，秒级响应</p>
            </div>
          </div>

          {/* 分类标签 */}
          <div className="px-5 py-2 border-b border-[hsl(var(--border))] flex gap-2 overflow-x-auto">
            {categories.map((tag, idx) => (
              <button
                key={tag}
                onClick={() => setActiveCategory(idx)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                  idx === activeCategory
                    ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium border border-[hsl(var(--navy-200))]"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full gradient-navy flex items-center justify-center mr-2 shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[hsl(var(--navy-600))] text-white rounded-br-md"
                      : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] rounded-bl-md border border-[hsl(var(--border))]"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Searching indicator */}
          <AnimatePresence>
            {searching && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pb-2"
              >
                <div className="flex items-center gap-2 text-xs text-sky-600">
                  <Search className="w-3.5 h-3.5 animate-pulse" />
                  <span>AI 正在检索知识库，识别意图与实体...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Knowledge Gap Guide */}
          <AnimatePresence>
            {showGapGuide && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="px-5 pb-3"
              >
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-amber-800 mb-1">该问题已转入知识缺口流程</div>
                      <div className="text-xs text-amber-700 leading-relaxed mb-3">
                        AI 在知识库中未找到匹配答案，已自动记录为知识缺口。
                        系统将智能识别业务域并分派至对应专家进行应答，最终沉淀为结构化知识反哺知识库。
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate("/knowledge-loop")}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          查看 AI 闭环处理流程
                        </button>
                        <button
                          onClick={() => setShowGapGuide(false)}
                          className="px-3 py-2 rounded-lg text-xs text-amber-700 hover:bg-amber-100 transition-colors"
                        >
                          忽略
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="px-5 py-3 border-t border-[hsl(var(--border))]">
            <div className="rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入你的问题，AI 将基于知识库为你解答..."
                  className="flex-1 text-xs bg-transparent outline-none"
                />
                <button
                  onClick={handleSend}
                  className="p-1.5 rounded-lg bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))] transition-colors"
                >
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
                    onClick={() => setInput(q)}
                    className="px-2 py-0.5 rounded-md bg-[hsl(var(--navy-50))] border border-[hsl(var(--navy-200))] text-[10px] text-[hsl(var(--navy-600))] hover:bg-[hsl(var(--navy-100))] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* 大家都在问 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">大家都在问</h3>
              </div>
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

          {/* 模板库 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">模板库</h3>
              </div>
            </div>
            <div className="px-5 pt-3 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setActiveTemplateTab("my")}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                    activeTemplateTab === "my"
                      ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] border border-[hsl(var(--navy-200))]"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <Bookmark className="w-3 h-3 inline-block mr-1" />
                  我的模板
                </button>
                <button
                  onClick={() => setActiveTemplateTab("standard")}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                    activeTemplateTab === "standard"
                      ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] border border-[hsl(var(--navy-200))]"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <Library className="w-3 h-3 inline-block mr-1" />
                  标准模板
                </button>
              </div>
              <div className="space-y-2 max-h-[260px] overflow-y-auto">
                {(activeTemplateTab === "my" ? myTemplates : standardTemplates).map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setInput(t.title)}
                    className="p-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--navy-50))] transition-colors cursor-pointer border border-transparent hover:border-[hsl(var(--navy-200))]"
                  >
                    <div className="text-xs font-bold text-[hsl(var(--foreground))] mb-1">{t.title}</div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))] leading-relaxed mb-1.5">{t.desc}</div>
                    <div className="flex gap-1">
                      {t.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">AI 能力</h3>
            <div className="grid grid-cols-2 gap-2">
              {["智能搜索", "辅助撰写", "生成摘要", "推荐模板"].map((item) => (
                <button
                  key={item}
                  className="px-3 py-2 rounded-lg bg-[hsl(var(--muted))] text-xs text-[hsl(var(--foreground))] hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))] transition-colors border border-[hsl(var(--border))] text-center"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
