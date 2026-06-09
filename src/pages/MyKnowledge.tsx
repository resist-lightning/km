import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Clock as ClockIcon,
  Eye,
  FileEdit,
  Heart,
  History,
  Award,
  Download,
  ChevronRight,
  PenTool,
  CheckCircle2,
  Tag,
  Upload,
  X,
  Building,
  User,
  FileText,
  AlertCircle,
  MessageSquare,
  MoreHorizontal,
  GitCompare,
  FileCheck,
  Lock,
  Users,
  Settings,
  Save,
  ArrowUpCircle,
  ShieldCheck,
  Globe,
} from "lucide-react";

interface DocVersion {
  version: string;
  date: string;
  author: string;
  changes: string;
  size: string;
}

interface KnowledgeDoc {
  id: number;
  title: string;
  category: string;
  tags: string[];
  updated: string;
  views: number;
  likes: number;
  status: string;
  version: string;
  author: string;
  dept: string;
  content: string;
  permission: "public" | "dept" | "private";
  versions: DocVersion[];
}

const createdDocs: KnowledgeDoc[] = [
  {
    id: 1,
    title: "数据分析周报模板V2.0",
    category: "制度规范",
    tags: ["数据", "周报", "模板"],
    updated: "2026-05-27",
    views: 342,
    likes: 56,
    status: "已发布",
    version: "v2.0",
    author: "刘雨馨",
    dept: "战略发展部",
    content: "本模板用于规范各部门数据分析周报的编制，包含数据来源、分析方法、结论建议等标准模块。",
    permission: "dept",
    versions: [
      { version: "v2.0", date: "2026-05-27", author: "刘雨馨", changes: "优化数据展示模块，新增趋势对比图表", size: "2.4MB" },
      { version: "v1.1", date: "2026-04-15", author: "刘雨馨", changes: "修正计算公式错误", size: "2.1MB" },
      { version: "v1.0", date: "2026-03-01", author: "刘雨馨", changes: "初始版本", size: "1.8MB" },
    ],
  },
  {
    id: 2,
    title: "团队知识治理复盘总结",
    category: "业务流程",
    tags: ["知识治理", "复盘"],
    updated: "2026-05-25",
    views: 189,
    likes: 32,
    status: "已发布",
    version: "v1.0",
    author: "周怡媛",
    dept: "战略发展部",
    content: "本次复盘总结了知识治理项目的关键成果、存在问题及改进方向。",
    permission: "public",
    versions: [
      { version: "v1.0", date: "2026-05-25", author: "周怡媛", changes: "初始版本", size: "1.2MB" },
    ],
  },
  {
    id: 3,
    title: "趋势分析方法论",
    category: "技术文档",
    tags: ["分析", "方法论"],
    updated: "2026-05-20",
    views: 267,
    likes: 45,
    status: "审核中",
    version: "v1.0",
    author: "张禹轩",
    dept: "战略发展部",
    content: "系统介绍趋势分析的常用方法和工具。",
    permission: "private",
    versions: [
      { version: "v1.0", date: "2026-05-20", author: "张禹轩", changes: "初始版本", size: "3.1MB" },
    ],
  },
];

const favoriteDocs = [
  { title: "养老保险业务操作手册（2026版）", category: "制度规范", dept: "运营管理部", updated: "2026-05-27", views: 3421 },
  { title: "监管政策汇编（2026Q2）", category: "外部法规", dept: "合规部", updated: "2026-05-15", views: 987 },
  { title: "客户服务标准化流程V3.0", category: "业务流程", dept: "客户服务部", updated: "2026-05-24", views: 1890 },
];

const historyDocs = [
  { title: "养老保险业务操作手册（2026版）", category: "制度规范", viewedAt: "10分钟前", duration: "5分钟" },
  { title: "数据治理规范（试行）", category: "技术文档", viewedAt: "1小时前", duration: "12分钟" },
  { title: "年度绩效考核方案", category: "制度规范", viewedAt: "3小时前", duration: "8分钟" },
  { title: "企业年金管理办法", category: "制度规范", viewedAt: "昨天", duration: "15分钟" },
];

const drafts = [
  { title: "Q2数据监测报告（未完工）", savedAt: "2小时前", progress: 65 },
  { title: "北大光华合作方案草案", savedAt: "昨天", progress: 30 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function MyKnowledge() {
  const navigate = useNavigate();
  const [activeTab] = useState("created");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc | null>(null);
  const [detailTab, setDetailTab] = useState<"info" | "version" | "control">("info");
  const [newVersionOpen, setNewVersionOpen] = useState(false);
  const [permissionSetting, setPermissionSetting] = useState<"public" | "dept" | "private">("dept");
  const [formData, setFormData] = useState({
    title: "",
    company: "国民养老保险",
    dept: "战略发展部",
    applicant: "刘雨馨",
    date: "2026-05-28",
    type: "",
    attr: "",
    fileClass: "",
    ruleClass1: "",
    ruleClass2: "",
    ruleClass3: "",
    belongDept: "",
    deptClass: "",
    fileStatus: "",
    reviewer: "",
    approver: "",
    storageDir: "",
    notifyDept: "",
    notifyScope: "",
    manager: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const openDetail = (doc: KnowledgeDoc) => {
    setSelectedDoc(doc);
    setDetailTab("info");
    setPermissionSetting(doc.permission);
    setDetailModalOpen(true);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6" onClick={() => setActionMenuOpen(null)}>
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">我的知识</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">个人知识资产中心 · 创建、收藏、浏览与草稿管理</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
        >
          <Upload className="w-4 h-4" />
          上传知识
        </button>
      </motion.div>

      {/* Personal Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-5 gap-4">
        {[
          { label: "我的创建", value: "12", icon: PenTool, color: "text-[hsl(var(--navy-600))]" },
          { label: "我的收藏", value: "28", icon: Heart, color: "text-rose-500" },
          { label: "本周浏览", value: "56", icon: Eye, color: "text-sky-600" },
          { label: "草稿待完成", value: "2", icon: FileEdit, color: "text-amber-600" },
          { label: "知识积分", value: "1,240", icon: Award, color: "text-[hsl(var(--gold-600))]" },
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

      {/* 我的知识需求 */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[hsl(var(--navy-600))]" />
            <h3 className="font-bold text-[hsl(var(--foreground))]">我的知识需求</h3>
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            待处理 <span className="font-bold text-[hsl(var(--foreground))]">2</span> 条 · 已闭环 <span className="font-bold text-[hsl(var(--foreground))]">5</span> 条
          </span>
        </div>
        <div className="divide-y divide-[hsl(var(--border))]">
          {[
            { id: "KR-2026-0601-008", title: "企业年金投资组合的合规边界是什么？", type: "制度合规咨询", deadline: "3 个工作日", status: "待应答", statusColor: "amber", asker: "李明远", dept: "金融产品部" },
            { id: "KR-2026-0531-006", title: "数据治理规范中标签体系如何设计？", type: "运营数据分析", deadline: "3 个工作日", status: "已完成", statusColor: "emerald", asker: "赵敏", dept: "信息科技部" },
          ].map((ticket) => (
            <div key={ticket.id} className="px-6 py-4 hover:bg-[hsl(var(--muted))] transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">#{ticket.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 ${
                    ticket.statusColor === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    ticket.statusColor === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    "bg-slate-50 text-slate-700 border-slate-200"
                  }`}>
                    {ticket.statusColor === "amber" ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {ticket.status}
                  </span>
                </div>
                <button className="text-[10px] px-3 py-1.5 rounded-lg bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-1">
                  查看详情 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">{ticket.title}</div>
              <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))] flex-wrap">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> {ticket.type}</span>
                <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3" /> 承诺时效：{ticket.deadline}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 提问人：{ticket.asker} · {ticket.dept}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="max-w-[1400px]">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                {activeTab === "created" && "共 12 篇创建"}
                {activeTab === "favorites" && "共 28 篇收藏"}
                {activeTab === "history" && "近7天浏览记录"}
                {activeTab === "drafts" && "2 篇草稿待完成"}
              </span>
              {activeTab === "drafts" && (
                <button className="px-4 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-xs font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
                  + 新建草稿
                </button>
              )}
            </div>

            {/* Created */}
            {activeTab === "created" && (
              <div className="divide-y divide-[hsl(var(--border))]">
                {createdDocs.map((doc, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="px-6 py-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1" onClick={() => openDetail(doc)}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--navy-600))] transition-colors">{doc.title}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">{doc.category}</span>
                          {doc.status === "审核中" ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">审核中</span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />已发布</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {doc.tags.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updated}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {doc.views}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {doc.likes}</span>
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {doc.version}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 relative">
                        <button onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg hover:bg-[hsl(var(--navy-50))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-600))] transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={(e) => { e.stopPropagation(); setActionMenuOpen(actionMenuOpen === idx ? null : idx); }}
                            className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          {actionMenuOpen === idx && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-[var(--shadow-elevated)] z-20 py-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); setActionMenuOpen(null); openDetail(doc); setDetailTab("version"); }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                              >
                                <GitCompare className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                                版本管理
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setActionMenuOpen(null); openDetail(doc); setDetailTab("control"); }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                              >
                                <FileCheck className="w-4 h-4 text-[hsl(var(--gold-600))]" />
                                文控管理
                              </button>
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Favorites */}
            {activeTab === "favorites" && (
              <div className="divide-y divide-[hsl(var(--border))]">
                {favoriteDocs.map((doc, idx) => (
                  <motion.div key={idx} variants={itemVariants} onClick={() => navigate(`/document/${idx}`)} className="px-6 py-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{doc.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium shrink-0">{doc.category}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                        <span>{doc.dept}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updated}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {doc.views}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* History */}
            {activeTab === "history" && (
              <div className="divide-y divide-[hsl(var(--border))]">
                {historyDocs.map((doc, idx) => (
                  <motion.div key={idx} variants={itemVariants} onClick={() => navigate(`/document/${idx}`)} className="px-6 py-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center shrink-0">
                      <History className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[hsl(var(--foreground))]">{doc.title}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] text-[10px]">{doc.category}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.viewedAt}</span>
                        <span>阅读时长 {doc.duration}</span>
                      </div>
                    </div>
                    <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      继续阅读
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Drafts */}
            {activeTab === "drafts" && (
              <div className="divide-y divide-[hsl(var(--border))]">
                {drafts.map((draft, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="px-6 py-5 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                          <FileEdit className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[hsl(var(--foreground))]">{draft.title}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">上次保存：{draft.savedAt}</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] text-xs font-medium hover:bg-[hsl(var(--navy-100))] transition-colors">
                        继续编辑
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">完成度</span>
                      <div className="flex-1 h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${draft.progress}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-[hsl(var(--navy-500))]"
                        />
                      </div>
                      <span className="text-xs font-bold text-[hsl(var(--foreground))]">{draft.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailModalOpen && selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setDetailModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[800px] max-w-[95vw] max-h-[90vh] bg-[hsl(var(--card))] rounded-2xl shadow-[var(--shadow-elevated)] flex flex-col overflow-hidden border border-[hsl(var(--border))]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">{selectedDoc.title}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{selectedDoc.category} · {selectedDoc.author} · {selectedDoc.dept}</p>
                </div>
                <button onClick={() => setDetailModalOpen(false)} className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-4 border-b border-[hsl(var(--border))]">
                <div className="flex gap-1">
                  {[
                    { key: "info", label: "基本信息", icon: FileText },
                    { key: "version", label: "版本管理", icon: GitCompare },
                    { key: "control", label: "文控管理", icon: Settings },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setDetailTab(tab.key as "info" | "version" | "control")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all border-b-2 ${
                          detailTab === tab.key
                            ? "border-[hsl(var(--navy-600))] text-[hsl(var(--navy-600))]"
                            : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {detailTab === "info" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                        <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">当前版本</div>
                        <div className="text-lg font-bold text-[hsl(var(--foreground))]">{selectedDoc.version}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                        <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">浏览量</div>
                        <div className="text-lg font-bold text-[hsl(var(--foreground))]">{selectedDoc.views}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                        <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">点赞数</div>
                        <div className="text-lg font-bold text-[hsl(var(--foreground))]">{selectedDoc.likes}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-2">文档内容</h4>
                      <div className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] leading-relaxed">
                        {selectedDoc.content}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">创建人</span>
                        <div className="text-sm font-medium text-[hsl(var(--foreground))]">{selectedDoc.author}</div>
                      </div>
                      <div>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">所属部门</span>
                        <div className="text-sm font-medium text-[hsl(var(--foreground))]">{selectedDoc.dept}</div>
                      </div>
                      <div>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">最后更新</span>
                        <div className="text-sm font-medium text-[hsl(var(--foreground))]">{selectedDoc.updated}</div>
                      </div>
                      <div>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">文档状态</span>
                        <div className="text-sm font-medium text-emerald-600">{selectedDoc.status}</div>
                      </div>
                    </div>
                  </div>
                )}

                {detailTab === "version" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">版本历史</h4>
                      <button
                        onClick={() => setNewVersionOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-xs font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
                      >
                        <ArrowUpCircle className="w-3.5 h-3.5" />
                        发布新版本
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedDoc.versions.map((v, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                          <div className="w-10 h-10 rounded-full bg-[hsl(var(--navy-50))] flex items-center justify-center shrink-0">
                            <History className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[hsl(var(--foreground))]">{v.version}</span>
                              {idx === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium">当前版本</span>}
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{v.changes}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs text-[hsl(var(--foreground))] font-medium">{v.author}</div>
                            <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{v.date} · {v.size}</div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button className="p-1.5 rounded hover:bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-colors" title="下载">
                              <Download className="w-4 h-4" />
                            </button>
                            {idx !== 0 && (
                              <button className="p-1.5 rounded hover:bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-colors" title="恢复">
                                <ArrowUpCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {newVersionOpen && (
                      <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] space-y-4">
                        <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">发布新版本</h4>
                        <div>
                          <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">版本号</label>
                          <input type="text" placeholder="例如：v2.1" className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">变更说明</label>
                          <textarea rows={3} placeholder="描述本次版本变更内容..." className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none resize-none" />
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setNewVersionOpen(false)} className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] transition-colors">取消</button>
                          <button onClick={() => setNewVersionOpen(false)} className="px-4 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">发布</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {detailTab === "control" && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">文档权限设置</h4>
                      <div className="space-y-2">
                        {[
                          { key: "public", label: "公开", desc: "全公司可见", icon: Globe },
                          { key: "dept", label: "部门可见", desc: "仅本部门可见", icon: Users },
                          { key: "private", label: "私有", desc: "仅自己可见", icon: Lock },
                        ].map((perm) => {
                          const Icon = perm.icon;
                          return (
                            <button
                              key={perm.key}
                              onClick={() => setPermissionSetting(perm.key as "public" | "dept" | "private")}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                permissionSetting === perm.key
                                  ? "border-[hsl(var(--navy-200))] bg-[hsl(var(--navy-50))]"
                                  : "border-[hsl(var(--border))] bg-[hsl(var(--muted))] hover:border-[hsl(var(--navy-200))]"
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${permissionSetting === perm.key ? "text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium text-[hsl(var(--foreground))]">{perm.label}</div>
                                <div className="text-xs text-[hsl(var(--muted-foreground))]">{perm.desc}</div>
                              </div>
                              {permissionSetting === perm.key && <CheckCircle2 className="w-5 h-5 text-[hsl(var(--navy-600))]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-[hsl(var(--border))] pt-5">
                      <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">审批配置</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                          <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                            <div>
                              <div className="text-sm font-medium text-[hsl(var(--foreground))]">发布审批</div>
                              <div className="text-xs text-[hsl(var(--muted-foreground))]">文档发布需经部门负责人审批</div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-medium">已启用</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                          <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                            <div>
                              <div className="text-sm font-medium text-[hsl(var(--foreground))]">变更审批</div>
                              <div className="text-xs text-[hsl(var(--muted-foreground))]">文档变更需经部门负责人审批</div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-medium">已启用</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                          <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                            <div>
                              <div className="text-sm font-medium text-[hsl(var(--foreground))]">删除审批</div>
                              <div className="text-xs text-[hsl(var(--muted-foreground))]">文档删除需经部门负责人审批</div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-medium">已启用</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[hsl(var(--border))] pt-5">
                      <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">访问日志</h4>
                      <div className="space-y-2">
                        {[
                          { user: "李明远", action: "浏览", time: "10分钟前" },
                          { user: "周婷", action: "下载", time: "1小时前" },
                          { user: "刘洋", action: "收藏", time: "2小时前" },
                        ].map((log, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[hsl(var(--navy-50))] flex items-center justify-center text-xs font-bold text-[hsl(var(--navy-600))]">{log.user[0]}</div>
                              <span className="text-[hsl(var(--foreground))]">{log.user}</span>
                              <span className="text-[hsl(var(--muted-foreground))]">{log.action}</span>
                            </div>
                            <span className="text-xs text-[hsl(var(--muted-foreground))]">{log.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex justify-end gap-3">
                <button onClick={() => setDetailModalOpen(false)} className="px-5 py-2 rounded-xl text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors">关闭</button>
                {detailTab === "control" && (
                  <button className="px-5 py-2 rounded-xl bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    保存设置
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Knowledge Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-end"
            onClick={() => setUploadOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[720px] max-w-[95vw] h-screen bg-[hsl(var(--card))] shadow-[var(--shadow-elevated)] flex flex-col overflow-hidden border-l border-[hsl(var(--border))]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between bg-gradient-to-r from-[hsl(var(--navy-50))] to-[hsl(var(--navy-100))]">
                <div>
                  <h2 className="text-base font-bold text-[hsl(var(--foreground))]">上传知识</h2>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">填写知识文档信息并提交审批</p>
                </div>
                <button onClick={() => setUploadOpen(false)} className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                    基本信息
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">标题 <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.title} onChange={(e) => handleFormChange("title", e.target.value)} placeholder="请输入知识文档标题" className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">申请公司</label>
                      <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                        <Building className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span>{formData.company}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">申请部门</label>
                      <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                        <Building className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span>{formData.dept}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[hsl(var(--border))] pt-5">
                  <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                    <FileEdit className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                    文件信息
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">申请类型 <span className="text-red-500">*</span></label>
                      <select value={formData.type} onChange={(e) => handleFormChange("type", e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none transition-all appearance-none">
                        <option value="">请选择</option>
                        <option value="新建">新建</option>
                        <option value="变更">变更</option>
                        <option value="废止">废止</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">文件属性</label>
                      <select value={formData.attr} onChange={(e) => handleFormChange("attr", e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none transition-all appearance-none">
                        <option value="">请选择</option>
                        <option value="制度">制度</option>
                        <option value="规范">规范</option>
                        <option value="流程">流程</option>
                        <option value="标准">标准</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[hsl(var(--border))] pt-5">
                  <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                    附件上传
                  </h3>
                  <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-xl p-8 text-center hover:border-[hsl(var(--navy-200))] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--muted-foreground))]" />
                    <div className="text-sm font-medium text-[hsl(var(--foreground))]">点击上传附件</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">支持 PDF、Word、Excel、PPT，最大 5M/个</div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex items-center justify-between bg-[hsl(var(--muted))]">
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  带 <span className="text-red-500">*</span> 的为必填项
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setUploadOpen(false)} className="px-5 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] transition-colors">取消</button>
                  <button className="px-5 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] transition-colors">保存草稿</button>
                  <button className="px-5 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">提交审批</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
