import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  Cpu,
  ShieldCheck,
  FileCheck,
  BellRing,
  ArrowRight,
  ArrowLeft,
  CircleCheck,
  CircleDot,
  RotateCcw,
  Building2,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const flowSteps = [
  {
    id: 1,
    title: "员工发起知识需求",
    desc: "员工在知识平台发起知识需求，描述所需知识内容，包括知识需求场景、时效要求、可能涉及领域等内容。",
    icon: UserPlus,
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-sky-50",
    textLight: "text-sky-700",
    borderLight: "border-sky-200",
  },
  {
    id: 2,
    title: "系统智能识别自动派发",
    desc: "系统根据知识责任领域关键词自动匹配并派发至归口部门（候选部门可多选），实现精准路由。",
    icon: Cpu,
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textLight: "text-violet-700",
    borderLight: "border-violet-200",
  },
  {
    id: 3,
    title: "责任部门认领 / 退回",
    desc: "归口部门认领需求并生产知识，或退回说明原因。退回情形：该知识确不属本部门职责范围。",
    icon: ShieldCheck,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textLight: "text-amber-700",
    borderLight: "border-amber-200",
    subActions: [
      { label: "认领需求", icon: CircleCheck, color: "text-emerald-600" },
      { label: "退回说明", icon: RotateCcw, color: "text-rose-600" },
    ],
  },
  {
    id: 4,
    title: "OA审核自动入库",
    desc: "认领部门相关岗位员工负责知识内容生产，完成新增知识审核后自动同步至知识库。",
    icon: FileCheck,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textLight: "text-emerald-700",
    borderLight: "border-emerald-200",
  },
  {
    id: 5,
    title: "知识回传通知需求人",
    desc: "知识自动同步至管理系统，入库完成后自动通知原始需求人，形成需求闭环。",
    icon: BellRing,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    textLight: "text-rose-700",
    borderLight: "border-rose-200",
  },
];

const stats = [
  { label: "月均需求发起", value: "1,240", icon: Users, color: "text-sky-600" },
  { label: "平均派发耗时", value: "15min", icon: Clock, color: "text-violet-600" },
  { label: "部门认领率", value: "96.5%", icon: Building2, color: "text-emerald-600" },
  { label: "平均闭环周期", value: "2.3天", icon: BarChart3, color: "text-rose-600" },
];

export default function KnowledgeFlow() {
  const navigate = useNavigate();
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">知识需求处理流程</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">从需求发起到知识入库的完整闭环管理</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-sm font-medium hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]"
        >
          <ArrowLeft className="w-4 h-4" />
          返回上一页
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[hsl(var(--card))] rounded-xl p-5 border border-[hsl(var(--border))]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{s.value}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Flow Steps - Vertical */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-8">
        <div className="space-y-0">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === flowSteps.length - 1;
            return (
              <div key={step.id} className="relative flex gap-6">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-[19px] top-[48px] w-[2px] h-[calc(100%-24px)] bg-[hsl(var(--border))]" />
                )}

                {/* Icon circle */}
                <div className="relative z-10 shrink-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={`pb-8 ${isLast ? "pb-0" : ""} flex-1`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${step.bgLight} ${step.textLight} border ${step.borderLight}`}>
                      步骤 {step.id}
                    </span>
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-3">
                    {step.desc}
                  </p>

                  {step.subActions && (
                    <div className="flex items-center gap-4 mt-2">
                      {step.subActions.map((action) => {
                        const AIcon = action.icon;
                        return (
                          <div key={action.label} className="flex items-center gap-1.5 text-xs font-medium">
                            <AIcon className={`w-3.5 h-3.5 ${action.color}`} />
                            <span className={action.color}>{action.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Example status chips for certain steps */}
                  {step.id === 1 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["需求场景", "时效要求", "涉及领域", "知识类型"].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.id === 2 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["关键词匹配", "责任领域", "多部门候选", "自动路由"].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.id === 4 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["内容生产", "OA审核", "自动入库", "版本管理"].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.id === 5 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["自动同步", "消息通知", "需求闭环", "满意度评价"].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Flow Diagram - Horizontal (Desktop) */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
        <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-6">流程概览</h3>
        <div className="hidden lg:flex items-center justify-between gap-2">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === flowSteps.length - 1;
            return (
              <div key={step.id} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[hsl(var(--foreground))] whitespace-nowrap">{step.title}</div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">步骤 {step.id}</div>
                  </div>
                </div>
                {!isLast && (
                  <ArrowRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] shrink-0 mx-1" />
                )}
              </div>
            );
          })}
        </div>
        {/* Mobile fallback */}
        <div className="lg:hidden space-y-3">
          {flowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--muted))]">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[hsl(var(--foreground))]">{step.title}</div>
                  <div className="text-[10px] text-[hsl(var(--muted-foreground))]">步骤 {step.id}</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Rules & Notes */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-3">
            <CircleDot className="w-4 h-4 text-[hsl(var(--navy-600))]" />
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">退回规则</h3>
          </div>
          <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
              该知识确不属本部门职责范围时可退回
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
              退回需填写原因说明，系统将重新派发
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
              同一需求最多允许退回 2 次
            </li>
          </ul>
        </div>
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[hsl(var(--navy-600))]" />
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">时效要求</h3>
          </div>
          <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
              普通需求：认领后 3 个工作日内完成
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
              紧急需求：认领后 1 个工作日内完成
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground))] mt-2 shrink-0" />
              超期未处理将自动升级至部门负责人
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
