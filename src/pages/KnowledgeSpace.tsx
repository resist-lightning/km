import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  FolderOpen,
  Folder,
  Tag,
  Clock,
  Eye,
  Download,
  Star,
  ChevronRight,
  Layers,
  ChevronDown,
  ChevronUp,
  History,
  UserCheck,
  Lock,
  Unlock,
  Building2,
  Sparkles,
  Flame,
  ArrowRight,
  Plus,
  Globe,
  User,
} from "lucide-react";

const knowledgeBaseTree = [
  {
    name: "公共知识库",
    count: 549,
    icon: Globe,
    children: [
      {
        name: "总部",
        count: 341,
        children: [
          { name: "资产管理部", count: 65 },
          { name: "风险合规部", count: 43 },
          { name: "运营部", count: 41 },
          { name: "财务部", count: 36 },
          { name: "产品精算部", count: 30 },
          { name: "人力和党建", count: 28 },
          { name: "营业部", count: 22 },
          { name: "消费者权益保护部", count: 19 },
          { name: "数字化经营部", count: 11 },
          { name: "战略发展部", count: 5 },
          { name: "综合管理部", count: 2 },
          { name: "信息技术部", count: 1 },
          { name: "市场渠道部", count: 1 },
        ],
      },
      {
        name: "分公司",
        count: 208,
        children: [
          { name: "上海市分公司", count: 28 },
          { name: "浙江省分公司", count: 21 },
          { name: "山东省分公司", count: 32 },
          { name: "四川省分公司", count: 39 },
          { name: "广东省分公司", count: 18 },
          { name: "重庆市分公司", count: 21 },
        ],
      },
    ],
  },
  {
    name: "部门知识库",
    count: 48,
    icon: Building2,
    children: [
      { name: "通用资料", count: 18 },
      { name: "会议纪要", count: 12 },
      { name: "需求文档", count: 10 },
      { name: "合作项目", count: 8 },
    ],
  },
  {
    name: "个人知识库",
    count: 15,
    icon: User,
    children: [
      { name: "2026.05", count: 8 },
      { name: "2026.06", count: 7 },
    ],
  },
];

const tags = [
  { name: "养老保险", owner: "运营管理部" },
  { name: "信息安全", owner: "信息科技部" },
  { name: "客户服务", owner: "客户服务部" },
  { name: "绩效考核", owner: "人力资源部" },
  { name: "数据治理", owner: "信息科技部" },
  { name: "合规管理", owner: "合规部" },
  { name: "财务管理", owner: "财务管理部" },
  { name: "人力资源", owner: "人力资源部" },
  { name: "项目管理", owner: "战略发展部" },
];

const docs = [
  { title: "养老保险业务操作手册（2026版）", category: "制度规范", subCategory: "业务运营制度", tags: ["养老保险", "业务操作"], dept: "运营管理部", author: "张伟", updated: "2026-05-27", views: 3421, starred: true, version: "v3.2", history: 8, owner: "运营管理部", permission: "shared" as "shared" | "private" },
  { title: "信息安全管理制度", category: "制度规范", subCategory: "信息安全制度", tags: ["信息安全", "合规管理"], dept: "信息科技部", author: "李强", updated: "2026-05-25", views: 2156, starred: false, version: "v2.1", history: 5, owner: "信息科技部", permission: "private" as "shared" | "private" },
  { title: "客户服务标准化流程V3.0", category: "业务流程", subCategory: "客户服务流程", tags: ["客户服务", "流程"], dept: "客户服务部", author: "王芳", updated: "2026-05-24", views: 1890, starred: true, version: "v3.0", history: 6, owner: "客户服务部", permission: "shared" as "shared" | "private" },
  { title: "数据治理规范（试行）", category: "技术文档", subCategory: "数据规范", tags: ["数据治理", "技术"], dept: "信息科技部", author: "赵敏", updated: "2026-05-22", views: 1567, starred: false, version: "v1.0", history: 3, owner: "信息科技部", permission: "private" as "shared" | "private" },
  { title: "年度绩效考核方案", category: "制度规范", subCategory: "人力资源制度", tags: ["绩效考核", "人力资源"], dept: "人力资源部", author: "陈静", updated: "2026-05-20", views: 2103, starred: false, version: "v2.5", history: 7, owner: "人力资源部", permission: "shared" as "shared" | "private" },
  { title: "企业年金管理办法", category: "制度规范", subCategory: "业务运营制度", tags: ["养老保险", "企业年金"], dept: "产品部", author: "刘洋", updated: "2026-05-18", views: 1289, starred: true, version: "v1.8", history: 4, owner: "产品部", permission: "shared" as "shared" | "private" },
  { title: "监管政策汇编（2026Q2）", category: "外部法规", subCategory: "监管政策", tags: ["合规管理", "监管政策"], dept: "合规部", author: "周婷", updated: "2026-05-15", views: 987, starred: false, version: "v1.0", history: 2, owner: "合规部", permission: "private" as "shared" | "private" },
  { title: "新员工入职培训手册", category: "培训资料", subCategory: "新员工培训", tags: ["人力资源", "培训"], dept: "人力资源部", author: "吴磊", updated: "2026-05-10", views: 2456, starred: false, version: "v4.0", history: 10, owner: "人力资源部", permission: "shared" as "shared" | "private" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function KbSubNode({
  node,
  activeCategory,
  setActiveCategory,
  depth = 0,
}: {
  node: { name: string; count: number; children?: { name: string; count: number; children?: any[] }[] };
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => { setActiveCategory(node.name); if (hasChildren) setExpanded(!expanded); }}
        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
          activeCategory === node.name
            ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-700))] font-medium"
            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
        }`}
        style={{ paddingLeft: `${12 + depth * 12}px` }}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />
        ) : (
          <Folder className="w-3 h-3 shrink-0" />
        )}
        <span className="flex-1 text-left truncate">{node.name}</span>
        <span className="text-[10px] shrink-0">{node.count}</span>
      </button>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <KbSubNode
              key={child.name}
              node={child}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function KnowledgeSpace() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [appliedIds, setAppliedIds] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState("全部");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedKbs, setExpandedKbs] = useState<string[]>(["公共知识库"]);
  const [showPackages, setShowPackages] = useState(true);

  const toggleKbExpand = (name: string) => {
    setExpandedKbs((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredDocs = docs.filter((doc) => {
    const matchCategory = activeCategory === "全部" || doc.category === activeCategory || doc.subCategory === activeCategory || doc.dept === activeCategory;
    const matchTags = activeTags.length === 0 || activeTags.some((t) => doc.tags.includes(t));
    const matchSearch = !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchTags && matchSearch;
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">知识空间</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">统一管理公司知识资产，支持多维分类、标签检索与版本管理</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* 大家都在看 + 最新发布 */}
      {showPackages && (
        <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                大家都在看
              </h3>
            </div>
            <button onClick={() => setShowPackages(false)} className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">收起</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[...docs].sort((a, b) => b.views - a.views).slice(0, 4).map((doc, idx) => (
              <div
                key={`hot-${idx}`}
                onClick={() => navigate(`/document/${idx}`)}
                className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] hover:border-[hsl(var(--navy-200))] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 font-medium">{doc.category}</span>
                  {idx < 2 && <Flame className="w-3 h-3 text-orange-500" />}
                </div>
                <div className="text-sm font-bold text-[hsl(var(--foreground))] line-clamp-2 group-hover:text-[hsl(var(--navy-600))] transition-colors mb-2">
                  {doc.title}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[hsl(var(--muted-foreground))]">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {doc.views}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updated}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[hsl(var(--border))] pt-4">
            <h3 className="font-bold text-[hsl(var(--foreground))] flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-[hsl(var(--navy-600))]" />
              最新发布
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[...docs].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()).slice(0, 4).map((doc, idx) => (
                <div
                  key={`new-${idx}`}
                  onClick={() => navigate(`/document/${idx}`)}
                  className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] hover:border-[hsl(var(--navy-200))] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">{doc.category}</span>
                  </div>
                  <div className="text-sm font-bold text-[hsl(var(--foreground))] line-clamp-2 group-hover:text-[hsl(var(--navy-600))] transition-colors mb-2">
                    {doc.title}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {doc.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索知识标题、内容、标签..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all text-sm"
          />
        </div>
        <button className="px-5 py-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          高级筛选
        </button>
      </motion.div>

      {/* AI 助手引导 */}
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate("/ai-center")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[hsl(var(--navy-300))] bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] hover:bg-[hsl(var(--navy-100))] transition-colors group"
        >
          <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">没有找到？试试问 AI</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* 知识库层级 */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                知识库
              </h3>
              <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[hsl(var(--navy-600))] text-white text-xs font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
                <Plus className="w-3 h-3" />
                新建文件夹
              </button>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory("全部")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeCategory === "全部"
                    ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-700))] font-medium"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="flex-1 text-left">全部</span>
                <span className={`text-xs ${activeCategory === "全部" ? "text-[hsl(var(--navy-500))]" : "text-[hsl(var(--muted-foreground))]"}`}>96</span>
              </button>
              {knowledgeBaseTree.map((kb) => {
                const Icon = kb.icon;
                const expanded = expandedKbs.includes(kb.name);
                return (
                  <div key={kb.name}>
                    <button
                      onClick={() => { setActiveCategory(kb.name); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        activeCategory === kb.name
                          ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-700))] font-medium"
                          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{kb.name}</span>
                      <span className={`text-xs ${activeCategory === kb.name ? "text-[hsl(var(--navy-500))]" : "text-[hsl(var(--muted-foreground))]"}`}>{kb.count}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleKbExpand(kb.name); }}
                        className="p-0.5 rounded hover:bg-[hsl(var(--muted))]"
                      >
                        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </button>
                    {expanded && (
                      <div className="ml-6 mt-1 space-y-0.5">
                        {kb.children.map((child) => (
                          <KbSubNode
                            key={child.name}
                            node={child}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            depth={0}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tags with Owner */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[hsl(var(--gold-600))]" />
              标签体系
              <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-normal">Owner制</span>
            </h3>
            <div className="space-y-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => toggleTag(tag.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all border ${
                    activeTags.includes(tag.name)
                      ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-700))] border-[hsl(var(--navy-200))] font-medium"
                      : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy-200))]"
                  }`}
                >
                  <span>{tag.name}</span>
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> {tag.owner}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Document List */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                共 <span className="font-bold text-[hsl(var(--foreground))]">{filteredDocs.length}</span> 条结果
              </span>
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <span>排序：</span>
                <select className="bg-transparent focus:outline-none text-[hsl(var(--foreground))] font-medium">
                  <option>最近更新</option>
                  <option>访问量</option>
                  <option>点赞数</option>
                </select>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="divide-y divide-[hsl(var(--border))]">
                {filteredDocs.map((doc, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    onClick={() => navigate(`/document/${idx}`)}
                    className="px-6 py-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--navy-600))] transition-colors">
                            {doc.title}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium shrink-0">{doc.category}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] shrink-0">{doc.subCategory}</span>
                          {doc.permission === "private" ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium shrink-0 inline-flex items-center gap-1">
                              <Lock className="w-3 h-3" />私有
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium shrink-0 inline-flex items-center gap-1">
                              <Unlock className="w-3 h-3" />共享
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {doc.tags.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                          <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {doc.owner}</span>
                          <span>{doc.author}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.updated}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {doc.views}</span>
                          <span className="flex items-center gap-1 text-[hsl(var(--navy-600))]"><History className="w-3 h-3" /> {doc.version} · {doc.history}个历史版本</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {doc.permission === "private" && !appliedIds.has(idx) && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setAppliedIds((prev) => new Set(prev).add(idx)); }}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-medium hover:bg-amber-100 transition-colors border border-amber-200 shrink-0"
                          >
                            申请权限
                          </button>
                        )}
                        {doc.permission === "private" && appliedIds.has(idx) && (
                          <span className="px-2.5 py-1 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-[10px] font-medium shrink-0">
                            申请中
                          </span>
                        )}
                        <button onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg hover:bg-[hsl(var(--gold-50))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--gold-500))] transition-colors">
                          <Star className={`w-4 h-4 ${doc.starred ? "fill-[hsl(var(--gold-500))] text-[hsl(var(--gold-500))]" : ""}`} />
                        </button>
                        <button onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg hover:bg-[hsl(var(--navy-50))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-600))] transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 grid grid-cols-2 gap-4">
                {filteredDocs.map((doc, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    onClick={() => navigate(`/document/${idx}`)}
                    className="p-5 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--navy-200))] hover:shadow-[var(--shadow-card)] transition-all cursor-pointer bg-[hsl(var(--card))]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">{doc.category}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">{doc.subCategory}</span>
                        {doc.permission === "private" ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-medium inline-flex items-center gap-1">
                            <Lock className="w-3 h-3" />私有
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium inline-flex items-center gap-1">
                            <Unlock className="w-3 h-3" />共享
                          </span>
                        )}
                      </div>
                      <button onClick={(e) => e.stopPropagation()} className="p-1 rounded hover:bg-[hsl(var(--gold-50))]">
                        <Star className={`w-4 h-4 ${doc.starred ? "fill-[hsl(var(--gold-500))] text-[hsl(var(--gold-500))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-2 line-clamp-2">{doc.title}</h4>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {doc.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{doc.owner}</span>
                      <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]"><Eye className="w-3 h-3" /> {doc.views}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-[hsl(var(--navy-600))] flex items-center gap-1">
                        <History className="w-3 h-3" /> {doc.version} · {doc.history}个历史版本
                      </span>
                      {doc.permission === "private" && !appliedIds.has(idx) && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setAppliedIds((prev) => new Set(prev).add(idx)); }}
                          className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-medium hover:bg-amber-100 transition-colors border border-amber-200"
                        >
                          申请权限
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
