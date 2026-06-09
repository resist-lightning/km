import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Award,
  Star,
  Eye,
  Clock,
  ChevronRight,
  FolderOpen,
  Folder,
  Target,
  Building2,
  ChevronDown,
  MapPin,
  FileText,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
  CircleCheck,
  Clock as ClockIcon,
  AlertCircle,
  UserCheck,
  Cpu,
  ArrowRight,
} from "lucide-react";

interface KbNode {
  name: string;
  count: number;
  children?: KbNode[];
}

const deptKnowledgeBases: KbNode[] = [
  {
    name: "部门知识库",
    count: 48,
    children: [
      { name: "通用资料", count: 18 },
      { name: "会议纪要", count: 12 },
      { name: "需求文档", count: 10 },
      { name: "合作项目", count: 8 },
    ],
  },
];

const deptDocs = [
  { title: "养老保险战略规划2026", category: "战略文档", views: 2560, updated: "2026-05-26", hot: true },
  { title: "市场竞品分析报告Q2", category: "研究报告", views: 1890, updated: "2026-05-25", hot: true },
  { title: "监管政策解读汇编", category: "制度规范", views: 1560, updated: "2026-05-22", hot: true },
  { title: "战略发展部工作手册", category: "业务流程", views: 1230, updated: "2026-05-20", hot: false },
  { title: "年金产品发展路径图", category: "战略文档", views: 980, updated: "2026-05-18", hot: false },
];

const achievements = [
  { title: "知识贡献之星", desc: "本月部门知识贡献排名第一", icon: Award, color: "text-[hsl(var(--gold-500))]" },
  { title: "文档质量奖", desc: "审批通过率达99%", icon: Star, color: "text-[hsl(var(--navy-600))]" },
  { title: "活跃度冠军", desc: "人均访问量最高", icon: TrendingUp, color: "text-emerald-600" },
];

/* ─── 部门消息数据 ─── */
const deptTickets = [
  {
    id: "KR-2026-0601-008",
    title: "企业年金投资组合的合规边界是什么？",
    type: "制度合规咨询",
    expert: "刘子豪",
    expertField: "金融产品与知识建模",
    deadline: "3 个工作日",
    status: "待应答",
    statusColor: "amber",
    asker: "李明远",
    dept: "金融产品部",
  },
  {
    id: "KR-2026-0601-009",
    title: "新员工培训资料如何快速获取？",
    type: "培训资料获取",
    expert: "杨思涵",
    expertField: "知识管理与培训体系",
    deadline: "1 个工作日",
    status: "处理中",
    statusColor: "blue",
    asker: "王小明",
    dept: "人力资源部",
  },
  {
    id: "KR-2026-0601-010",
    title: "跨部门知识共享的权限申请流程是什么？",
    type: "制度规范查询",
    expert: "孙伟强",
    expertField: "信息安全与合规审计",
    deadline: "3 个工作日",
    status: "待认领",
    statusColor: "slate",
    asker: "刘强",
    dept: "运营管理部",
  },
  {
    id: "KR-2026-0531-006",
    title: "数据治理规范中标签体系如何设计？",
    type: "运营数据分析",
    expert: "赵晓燕",
    expertField: "模型算法与数据能力",
    deadline: "3 个工作日",
    status: "已完成",
    statusColor: "emerald",
    asker: "赵敏",
    dept: "信息科技部",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function FolderTreeNode({
  node,
  depth = 0,
  defaultExpanded = false,
}: {
  node: KbNode;
  depth?: number;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left hover:bg-[hsl(var(--muted))] ${
          depth === 0
            ? "font-bold text-[hsl(var(--foreground))]"
            : depth === 1
            ? "font-medium text-[hsl(var(--foreground))]"
            : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[hsl(var(--muted-foreground))]" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[hsl(var(--muted-foreground))]" />
          )
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {depth === 0 ? (
          <FolderOpen className="w-4 h-4 shrink-0 text-[hsl(var(--navy-600))]" />
        ) : hasChildren ? (
          <Folder className="w-4 h-4 shrink-0 text-amber-500" />
        ) : (
          <FileText className="w-4 h-4 shrink-0 text-[hsl(var(--muted-foreground))]" />
        )}
        <span className="flex-1 truncate">{node.name}</span>
        <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">{node.count}篇</span>
      </button>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child, idx) => (
            <FolderTreeNode key={idx} node={child} depth={depth + 1} defaultExpanded={depth < 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyDepartment() {
  const [tickets, setTickets] = useState(deptTickets);

  const handleReturn = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "已退回", statusColor: "rose" }
          : t
      )
    );
  };

  const statusBadge = (color: string) => {
    const map: Record<string, string> = {
      amber: "bg-amber-50 text-amber-700 border-amber-200",
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      slate: "bg-slate-50 text-slate-700 border-slate-200",
      emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rose: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return map[color] || map.slate;
  };

  const statusIcon = (color: string) => {
    switch (color) {
      case "amber":
        return <AlertCircle className="w-3 h-3" />;
      case "blue":
        return <ClockIcon className="w-3 h-3" />;
      case "slate":
        return <Cpu className="w-3 h-3" />;
      case "emerald":
        return <CircleCheck className="w-3 h-3" />;
      case "rose":
        return <RotateCcw className="w-3 h-3" />;
      default:
        return <Cpu className="w-3 h-3" />;
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">我的部门</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">国民养老保险 · 战略发展部 · 部门知识管理与需求分派</p>
      </motion.div>

      {/* Company Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: "员工总数", value: "397", icon: Users, color: "text-[hsl(var(--navy-600))]" },
          { label: "总部人数", value: "245", icon: Building2, color: "text-sky-600" },
          { label: "分公司数", value: "6", icon: MapPin, color: "text-emerald-600" },
          { label: "部门总数", value: "22", icon: FolderOpen, color: "text-[hsl(var(--gold-600))]" },
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 部门知识库 */}
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[hsl(var(--navy-600))]" />
              <h3 className="font-bold text-[hsl(var(--foreground))]">部门知识库</h3>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">48 篇</span>
          </div>
          <div className="p-2 max-h-[640px] overflow-y-auto">
            {deptKnowledgeBases.map((node, idx) => (
              <FolderTreeNode key={idx} node={node} defaultExpanded={true} />
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* 部门知识缺口工单 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">部门消息</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  待处理 <span className="font-bold text-[hsl(var(--foreground))]">{tickets.filter((t) => t.status !== "已完成" && t.status !== "已退回").length}</span> 条
                </span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  已闭环 <span className="font-bold text-[hsl(var(--foreground))]">{tickets.filter((t) => t.status === "已完成").length}</span> 条
                </span>
              </div>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="px-6 py-4 hover:bg-[hsl(var(--muted))] transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">#{ticket.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${statusBadge(ticket.statusColor)}`}>
                        {statusIcon(ticket.statusColor)}
                        {ticket.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {ticket.status !== "已完成" && ticket.status !== "已退回" && (
                        <button
                          onClick={() => handleReturn(ticket.id)}
                          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          退回
                        </button>
                      )}
                      <button className="text-[10px] px-2 py-1 rounded-lg bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-1">
                        查看详情 <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">{ticket.title}</div>
                  <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))] flex-wrap">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> {ticket.type}</span>
                    <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> 指派专家：{ticket.expert} · {ticket.expertField}</span>
                    <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3" /> 承诺时效：{ticket.deadline}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 提问人：{ticket.asker} · {ticket.dept}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 部门知识 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[hsl(var(--gold-600))]" />
                <h3 className="font-bold text-[hsl(var(--foreground))]">部门知识</h3>
              </div>
              <button className="text-sm text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-1 transition-colors">
                查看全部 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {deptDocs.map((doc, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center gap-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    doc.category === "战略文档" ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))]" :
                    doc.category === "研究报告" ? "bg-violet-50 text-violet-600" :
                    doc.category === "制度规范" ? "bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-600))]" :
                    "bg-emerald-50 text-emerald-600"
                  }`}>
                    {doc.category.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{doc.title}</span>
                      {doc.hot && <Star className="w-3.5 h-3.5 text-[hsl(var(--gold-500))] fill-[hsl(var(--gold-500))] shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {doc.views}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updated}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements & Goals */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
          <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[hsl(var(--gold-600))]" />
            部门荣誉
          </h3>
          <div className="space-y-3">
            {achievements.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--muted))] hover:bg-[hsl(var(--gold-50))] transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-5 h-5 ${ach.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[hsl(var(--foreground))]">{ach.title}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{ach.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
          <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            本月目标
          </h3>
          <div className="space-y-5">
            {[
              { label: "知识入库数量", current: 48, target: 50 },
              { label: "文档审批通过率", current: 99, target: 95 },
              { label: "成员活跃度", current: 85, target: 80 },
            ].map((goal) => (
              <div key={goal.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[hsl(var(--foreground))]">{goal.label}</span>
                  <span className="text-sm font-bold text-[hsl(var(--navy-600))]">{goal.current} / {goal.target}</span>
                </div>
                <div className="h-2.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${goal.current >= goal.target ? "bg-emerald-500" : "bg-[hsl(var(--navy-500))]"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
