import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  BrainCircuit,
  Users,
  FileCheck,
  RotateCcw,
  ArrowLeft,
  Search,
  Send,
  Bot,
  Sparkles,
  BarChart3,
  FileText,
  ChevronRight,
  CheckCircle2,
  Clock,
  Tag,
  BookOpen,
  UserCheck,
  ShieldCheck,
  PenTool,
  MessageCircle,
  Link,
  Hash,
  Calendar,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const steps = [
  {
    id: 1,
    title: "提问捕获",
    subtitle: "AI 检索知识库",
    icon: MessageSquare,
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
    textLight: "text-sky-700",
    dotColor: "bg-sky-500",
  },
  {
    id: 2,
    title: "缺口识别与分派",
    subtitle: "AI 智能中枢",
    icon: BrainCircuit,
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    borderLight: "border-violet-200",
    textLight: "text-violet-700",
    dotColor: "bg-violet-500",
  },
  {
    id: 3,
    title: "专家应答与协同编辑",
    subtitle: "专家工作台",
    icon: Users,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    textLight: "text-amber-700",
    dotColor: "bg-amber-500",
  },
  {
    id: 4,
    title: "知识沉淀与结构化",
    subtitle: "AI 辅助生成知识卡片",
    icon: FileCheck,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    textLight: "text-emerald-700",
    dotColor: "bg-emerald-500",
  },
  {
    id: 5,
    title: "反哺知识库",
    subtitle: "闭环验证",
    icon: RotateCcw,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    textLight: "text-rose-700",
    dotColor: "bg-rose-500",
  },
];

// ─── Step 1: AI Chat Mock ───
function Step1Mock() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 to-sky-600">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold">AI 智能助手</div>
            <div className="text-[10px] text-[hsl(var(--muted-foreground))]">基于知识库的智能问答</div>
          </div>
        </div>
        {/* Messages */}
        <div className="p-4 space-y-3">
          {/* User */}
          <div className="flex justify-end">
            <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-md bg-[hsl(var(--navy-600))] text-white text-xs leading-relaxed">
              企业年金投资组合的合规边界是什么？
            </div>
          </div>
          {/* AI - searching */}
          <div className="flex justify-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] text-xs leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
                <Search className="w-3 h-3 animate-pulse" />
                <span>正在检索知识库...</span>
              </div>
              <div className="flex items-center gap-1.5 text-sky-600 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>关键词识别：企业年金、投资组合、合规边界</span>
              </div>
            </div>
          </div>
          {/* AI - not found */}
          <div className="flex justify-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-amber-50 border border-amber-200 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>该问题在现有知识库中未找到匹配答案</span>
              </div>
              <div className="text-[hsl(var(--muted-foreground))]">
                已为您记录为<span className="text-amber-700 font-medium">知识缺口</span>，系统将自动分派至对应专家。
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">缺口已记录</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">智能分派中</span>
              </div>
            </div>
          </div>
        </div>
        {/* Input */}
        <div className="px-4 py-3 border-t border-[hsl(var(--border))]">
          <div className="rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] px-3 py-2 flex items-center gap-2">
            <span className="text-xs text-[hsl(var(--muted-foreground))] flex-1">输入你的问题...</span>
            <Send className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
          </div>
        </div>
      </div>
      {/* Annotation */}
      <div className="mt-4 flex items-start gap-2 text-xs text-[hsl(var(--muted-foreground))]">
        <Sparkles className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
        <p>AI 首先在知识库中检索匹配。若命中则直接返回答案；若未命中，自动触发"知识缺口"流程，进入下一步智能分派。</p>
      </div>
    </div>
  );
}

// ─── Step 2: AI Recognition Mock ───
function Step2Mock() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Recognition Panel */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold">AI 智能中枢</div>
            <div className="text-[10px] text-[hsl(var(--muted-foreground))]">意图识别 · 实体识别 · 业务域判定 · 智能分派</div>
          </div>
        </div>

        {/* Original Question */}
        <div className="p-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
          <div className="text-[10px] text-[hsl(var(--muted-foreground))] mb-1">原始问题</div>
          <div className="text-sm text-[hsl(var(--foreground))]">
            企业年金投资组合的<span className="bg-violet-100 text-violet-700 px-1 rounded">合规边界</span>是什么？
          </div>
        </div>

        {/* Analysis Results */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-violet-200 bg-violet-50">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">意图识别</span>
            </div>
            <div className="text-sm font-bold text-violet-800">制度合规咨询</div>
            <div className="text-[10px] text-violet-600 mt-1">置信度 96.4%</div>
          </div>
          <div className="p-3 rounded-lg border border-violet-200 bg-violet-50">
            <div className="flex items-center gap-1.5 mb-2">
              <Hash className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">实体识别</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {["企业年金", "投资组合", "合规边界"].map((e) => (
                <span key={e} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white text-violet-700 border border-violet-200">{e}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-amber-200 bg-amber-50">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">业务域判定</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-800">金融产品部</span>
            <ChevronRight className="w-3 h-3 text-amber-600" />
            <span className="text-sm text-amber-700">合规管理组</span>
          </div>
        </div>

        {/* Dispatch Result */}
        <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50">
          <div className="flex items-center gap-1.5 mb-2">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">智能分派结果</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">刘</div>
            <div>
              <div className="text-sm font-bold text-emerald-800">刘子豪 · 金融产品与知识建模</div>
              <div className="text-[10px] text-emerald-600">平均响应 3 小时 · 在线</div>
            </div>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-medium">已分派</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Expert Workspace Mock ───
function Step3Mock() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Ticket Card */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold">知识缺口工单 #KR-2026-0601-008</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium">待应答</span>
        </div>
        <div className="space-y-2 text-xs text-[hsl(var(--foreground))]">
          <div className="font-medium">企业年金投资组合的合规边界是什么？</div>
          <div className="flex items-center gap-3 text-[hsl(var(--muted-foreground))]">
            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> 金融产品部</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 承诺时效：3 个工作日</span>
            <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> 提问人：李明远</span>
          </div>
        </div>
      </div>

      {/* Collaborative Editor */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
        <div className="px-4 py-2.5 border-b border-[hsl(var(--border))] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold">在线协作编辑</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">刘</div>
              <div className="w-5 h-5 rounded-full bg-violet-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">李</div>
            </div>
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">2 人协作中</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-xs text-[hsl(var(--foreground))] leading-relaxed space-y-2">
            <p><span className="bg-amber-100 text-amber-800 px-1 rounded text-[10px] font-medium">刘子豪</span> 企业年金投资组合的合规边界主要包括以下方面：</p>
            <p className="pl-3 border-l-2 border-amber-200 text-[hsl(var(--muted-foreground))]">
              1. 投资范围限制：权益类资产比例不得超过投资组合净资产的 40%...<br />
              2. 集中度限制：单只证券投资比例不得超过该证券发行规模的 5%...<br />
              3. 流动性要求：投资组合中现金及等价物比例不得低于 5%...
            </p>
            <p><span className="bg-violet-100 text-violet-800 px-1 rounded text-[10px] font-medium">李文博</span> 建议补充监管依据：《企业年金基金管理办法》第 48-52 条。</p>
            <p className="pl-3 border-l-2 border-violet-200 text-[hsl(var(--muted-foreground))]">
              已补充，并添加了适用场景说明。
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-[hsl(var(--border))]">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">已通过审核</span>
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">审核人：李文博 · 合规部</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Structured Knowledge Card Mock ───
function Step4Mock() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <FileCheck className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold">结构化知识卡片</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] text-emerald-600 font-medium">AI 辅助生成</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {/* Fields */}
          {[
            { label: "问题描述", value: "企业年金投资组合的合规边界是什么？", icon: MessageCircle },
            { label: "答案摘要", value: "企业年金投资组合需遵守投资范围限制（权益类≤40%）、集中度限制（单只≤5%）、流动性要求（现金类≥5%）三大合规边界。监管依据为《企业年金基金管理办法》第48-52条。", icon: FileText },
            { label: "适用场景", value: "企业年金投资管理、合规审查、年度审计、投资方案制定", icon: BookOpen },
            { label: "关联知识", value: "《企业年金基金管理办法》全文、企业年金业务操作手册、合规审查 checklist", icon: Link, tag: true },
            { label: "业务标签", value: "企业年金、合规管理、投资组合、监管政策", icon: Hash, tag: true },
            { label: "有效期", value: "2026-06-01 至 2027-06-01", icon: Calendar },
          ].map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="p-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-medium text-emerald-700">{field.label}</span>
                </div>
                {field.tag ? (
                  <div className="flex flex-wrap gap-1">
                    {field.value.split("、").map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{t}</span>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-[hsl(var(--foreground))] leading-relaxed">{field.value}</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="px-4 py-3 border-t border-[hsl(var(--border))] flex items-center justify-between">
          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">生成时间：2026-06-01 14:32</span>
          <div className="flex items-center gap-2">
            <button className="text-[10px] px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]">人工微调</button>
            <button className="text-[10px] px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">确认入库</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Feedback Loop Mock ───
function Step5Mock() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Knowledge Inserted */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
            <RotateCcw className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold">知识已入库</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />
        </div>
        <div className="p-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] text-xs">
          <div className="font-medium text-[hsl(var(--foreground))] mb-1">企业年金投资组合的合规边界</div>
          <div className="text-[hsl(var(--muted-foreground))]">来源：知识缺口闭环沉淀 · 入库时间：2026-06-01</div>
        </div>
      </div>

      {/* Re-ask Mock */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-[hsl(var(--border))]">
          <span className="text-sm font-bold">再次提问验证</span>
        </div>
        <div className="p-4 space-y-3">
          {/* User */}
          <div className="flex justify-end">
            <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-md bg-[hsl(var(--navy-600))] text-white text-xs leading-relaxed">
              企业年金投资组合的合规边界是什么？
            </div>
          </div>
          {/* AI - hit */}
          <div className="flex justify-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-emerald-50 border border-emerald-200 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>知识库命中！直接返回答案</span>
              </div>
              <div className="text-[hsl(var(--foreground))]">
                企业年金投资组合需遵守以下合规边界：<br />
                1. 投资范围限制：权益类资产比例不得超过 40%<br />
                2. 集中度限制：单只证券投资比例不得超过 5%<br />
                3. 流动性要求：现金及等价物比例不得低于 5%
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600">
                <Link className="w-3 h-3" />
                <span>答案来自：《企业年金投资组合合规边界》知识卡片</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "本月缺口沉淀", value: "86", icon: FileCheck, color: "text-emerald-600" },
          { label: "AI 命中率提升", value: "+12.3%", icon: BarChart3, color: "text-sky-600" },
          { label: "平均闭环周期", value: "2.1 天", icon: Clock, color: "text-amber-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-3 text-center">
              <Icon className={`w-5 h-5 ${s.color} mx-auto mb-1.5`} />
              <div className="text-lg font-bold text-[hsl(var(--foreground))]">{s.value}</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function KnowledgeLoop() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  const StepMock = [Step1Mock, Step2Mock, Step3Mock, Step4Mock, Step5Mock][activeStep - 1];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-[1100px] mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">AI 智能知识闭环</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            提问 → 缺口识别 → 专家应答 → 知识沉淀 → 反哺知识库
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-sm font-medium hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]"
        >
          <ArrowLeft className="w-4 h-4" />
          返回上一页
        </button>
      </motion.div>

      {/* Step Navigator */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;
              const isLast = idx === steps.length - 1;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                      isActive
                        ? `${step.bgLight} border ${step.borderLight}`
                        : "hover:bg-[hsl(var(--muted))]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${step.color} text-white shadow-sm`
                          : isPast
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-xs font-bold ${
                          isActive ? step.textLight : "text-[hsl(var(--foreground))]"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{step.subtitle}</div>
                    </div>
                  </button>
                  {!isLast && (
                    <div className="w-6 flex items-center justify-center shrink-0">
                      <ChevronRight className={`w-4 h-4 ${isPast ? "text-emerald-400" : "text-[hsl(var(--border))]"}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Step Content */}
      <motion.div variants={itemVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
              {/* Step Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${steps[activeStep - 1].color} flex items-center justify-center shadow-sm`}>
                  {(() => {
                    const Icon = steps[activeStep - 1].icon;
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[hsl(var(--foreground))]">
                    步骤 {activeStep}：{steps[activeStep - 1].title}
                  </h2>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{steps[activeStep - 1].subtitle}</p>
                </div>
              </div>

              {/* Mock UI */}
              <StepMock />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
