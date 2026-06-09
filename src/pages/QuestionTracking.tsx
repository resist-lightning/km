import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  Cpu,
  ShieldCheck,
  FileCheck,
  BellRing,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CircleCheck,
  RotateCcw,
  MessageSquare,
  Eye,
  ThumbsUp,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const flowSteps = [
  {
    id: 1,
    title: "员工发起知识需求",
    desc: "描述所需知识内容、场景、时效要求等",
    icon: UserPlus,
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
    textLight: "text-sky-700",
  },
  {
    id: 2,
    title: "系统智能识别自动派发",
    desc: "关键词匹配并派发至归口部门",
    icon: Cpu,
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    borderLight: "border-violet-200",
    textLight: "text-violet-700",
  },
  {
    id: 3,
    title: "责任部门认领/退回",
    desc: "归口部门认领或退回说明原因",
    icon: ShieldCheck,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    textLight: "text-amber-700",
  },
  {
    id: 4,
    title: "OA审核自动入库",
    desc: "完成知识内容生产并审核入库",
    icon: FileCheck,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    textLight: "text-emerald-700",
  },
  {
    id: 5,
    title: "知识回传通知需求人",
    desc: "入库完成后自动通知原始需求人",
    icon: BellRing,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    textLight: "text-rose-700",
  },
];

// Simulate current step (1-5)
const currentStep = 2;

export default function QuestionTracking() {
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState<number | null>(currentStep);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1000px] mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">需求已提交</h1>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">您的知识需求已成功提交，系统正在处理中。您可以在此页面实时追踪处理进度。</p>
        </div>
        <button
          onClick={() => navigate("/ask-expert")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-sm font-medium hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]"
        >
          <ArrowLeft className="w-4 h-4" />
          返回知识提问
        </button>
      </motion.div>

      {/* Question Detail Card */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">需求详情</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium border border-[hsl(var(--navy-200))]">
            流程中
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">问题标题</div>
            <div className="text-sm font-medium text-[hsl(var(--foreground))]">养老保险个人账户转移流程具体如何操作？</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">需求场景</div>
              <div className="text-sm text-[hsl(var(--foreground))]">制度规范查询</div>
            </div>
            <div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">时效要求</div>
              <div className="text-sm text-[hsl(var(--foreground))]">普通（3个工作日内）</div>
            </div>
            <div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">涉及领域</div>
              <div className="text-sm text-[hsl(var(--foreground))]">养老保险、制度规范</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">详细描述</div>
            <div className="text-sm text-[hsl(var(--foreground))] leading-relaxed">
              需要了解养老保险个人账户在不同单位之间转移的具体操作流程、所需材料以及办理时限等信息。
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 提问人：李明远</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 提交时间：刚刚</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 浏览：0</span>
          </div>
        </div>
      </motion.div>

      {/* Flow Tracker */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">处理进度</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">当前步骤：{flowSteps[currentStep - 1].title}</span>
          </div>
        </div>

        <div className="space-y-0">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = step.id === currentStep;
            const isPast = step.id < currentStep;
            const isLast = idx === flowSteps.length - 1;

            return (
              <div key={step.id} className="relative">
                <div
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                    isCurrent ? "bg-[hsl(var(--muted))] border border-[hsl(var(--border))]" : "hover:bg-[hsl(var(--muted))]"
                  }`}
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                >
                  {/* Icon */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isPast
                          ? "bg-emerald-100 text-emerald-600"
                          : isCurrent
                          ? `bg-gradient-to-br ${step.color} text-white shadow-sm`
                          : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                      }`}
                    >
                      {isPast ? <CircleCheck className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    {!isLast && (
                      <div className={`absolute left-1/2 -translate-x-1/2 top-[42px] w-[2px] h-[calc(100%+8px)] ${isPast ? "bg-emerald-200" : "bg-[hsl(var(--border))]"}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-bold ${isCurrent ? "text-[hsl(var(--foreground))]" : isPast ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                        {step.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                          进行中
                        </span>
                      )}
                      {isPast && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 font-medium border border-slate-200">
                          已完成
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${isCurrent ? "text-[hsl(var(--muted-foreground))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                      {step.desc}
                    </p>

                    {/* Expanded detail */}
                    {expandedStep === step.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-3 rounded-lg bg-white/50 border border-[hsl(var(--border))]"
                      >
                        {step.id === 1 && (
                          <div className="text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                            <p>• 需求编号：KR-2026-0601-001</p>
                            <p>• 提交人：李明远（信息科技部）</p>
                            <p>• 需求类型：制度规范查询</p>
                            <p>• 优先级：普通</p>
                          </div>
                        )}
                        {step.id === 2 && (
                          <div className="text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                            <p>• 系统已识别关键词：养老保险、个人账户、转移流程</p>
                            <p>• 匹配责任领域：人力资源部 · 员工关系组</p>
                            <p>• 候选部门：人力资源部、信息科技部</p>
                            <p>• 派发状态：<span className="text-emerald-600 font-medium">已派发，等待认领</span></p>
                          </div>
                        )}
                        {step.id === 3 && (
                          <div className="text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                            <p>• 归口部门：人力资源部 · 员工关系组</p>
                            <p>• 处理人：待认领</p>
                            <p>• 预计处理时间：3个工作日内</p>
                            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[hsl(var(--border))]">
                              <span className="flex items-center gap-1 text-emerald-600"><CircleCheck className="w-3 h-3" /> 认领需求</span>
                              <span className="flex items-center gap-1 text-rose-600"><RotateCcw className="w-3 h-3" /> 退回说明</span>
                            </div>
                          </div>
                        )}
                        {step.id === 4 && (
                          <div className="text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                            <p>• 知识生产：待进行</p>
                            <p>• OA审核：待进行</p>
                            <p>• 入库状态：未开始</p>
                          </div>
                        )}
                        {step.id === 5 && (
                          <div className="text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                            <p>• 通知方式：站内消息 + 邮件</p>
                            <p>• 通知状态：未发送</p>
                            <p>• 需求闭环：未完成</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {isCurrent && (
                      <div className="mt-2 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        预计剩余时间：2小时15分钟
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <button
          onClick={() => navigate("/ask-expert")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回知识提问
        </button>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-sm font-medium hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
            <ThumbsUp className="w-4 h-4" />
            催办
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-sm font-medium hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
            <MessageSquare className="w-4 h-4" />
            补充说明
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
