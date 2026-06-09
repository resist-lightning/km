import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Lock,
  Unlock,
  FileText,
  FolderOpen,
  Tag,
  Eye,
  Clock,
  User,
  Download,
  Share2,
  Bookmark,
  AlertCircle,
  Shield,
  Send,
  X,
  CheckCircle2,
} from "lucide-react";

const docTree = [
  {
    name: "知识文档",
    children: [
      { name: "养老保险业务操作手册", children: [] },
      { name: "数据治理规范", children: [] },
      { name: "客户服务标准化流程", children: [] },
    ],
  },
  {
    name: "制度文件",
    children: [
      { name: "信息安全管理制度", children: [] },
      { name: "绩效考核方案", children: [] },
      { name: "企业年金管理办法", children: [] },
    ],
  },
  {
    name: "培训资料",
    children: [
      { name: "新员工入职培训", children: [] },
      { name: "产品知识培训", children: [] },
    ],
  },
];

const docContent = {
  title: "养老保险业务操作手册（2026版）",
  author: "周怡媛",
  dept: "运营管理部",
  updatedAt: "2026-05-27",
  views: 3421,
  tags: ["养老保险", "业务操作", "制度规范"],
  permission: "shared" as "private" | "shared",
  abstract: "本手册详细规定了养老保险业务的操作流程、服务标准、风险控制要点及常见问题处理方案，适用于所有一线业务人员。",
  sections: [
    { id: "s1", title: "第一章 总则", content: "为规范养老保险业务操作，提升服务质量，防范操作风险，特制定本操作手册。本手册适用于公司所有从事养老保险业务的一线操作人员及相关管理人员。" },
    { id: "s2", title: "第二章 参保登记流程", content: "2.1 客户信息采集\n操作人员需通过统一身份认证系统核验客户身份，采集姓名、身份证号、联系方式等基本信息。\n\n2.2 参保资格审核\n根据客户年龄、职业类别、健康状况等信息进行参保资格审核，审核通过后生成参保编号。\n\n2.3 缴费方案制定\n根据客户收入水平、保障需求，推荐合适的缴费档次和保障方案。" },
    { id: "s3", title: "第三章 保费缴纳操作", content: "3.1 缴费方式\n支持银行代扣、线上支付、柜台缴费等多种方式。银行代扣需客户签署授权协议。\n\n3.2 缴费记录查询\n客户可通过APP、官网、客服热线等渠道查询缴费记录和账户余额。\n\n3.3 逾期处理\n逾期30天内可补缴，超过30天需重新评估参保资格。" },
    { id: "s4", title: "第四章 待遇领取流程", content: "4.1 领取条件审核\n客户达到法定退休年龄且累计缴费满15年，可申请领取养老保险待遇。\n\n4.2 待遇计算\n根据客户历年缴费记录、平均工资水平、个人账户余额等因素综合计算月领取金额。\n\n4.3 发放方式\n支持按月发放至指定银行账户，客户可选择一次性领取或分期领取。" },
    { id: "s5", title: "第五章 风险控制", content: "5.1 操作风险\n严格执行双人复核制度，关键操作需经主管审批。\n\n5.2 信息安全\n客户敏感信息需加密存储，未经授权不得对外提供。\n\n5.3 合规检查\n定期开展业务合规检查，发现问题及时整改并上报。" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

export default function DocumentDetail() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ "知识文档": true, "制度文件": true });
  const [hasAccess, setHasAccess] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("s1");

  const toggleNode = (name: string) => {
    setExpandedNodes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-4">
      {/* Breadcrumb & Actions */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <span>知识空间</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>制度规范</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[hsl(var(--foreground))] font-medium">{docContent.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {docContent.permission === "shared" ? (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Unlock className="w-3 h-3" />
              共享
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              <Lock className="w-3 h-3" />
              私有
            </span>
          )}
          <button className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Left: Doc Tree */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden h-fit">
          <div className="px-4 py-3 border-b border-[hsl(var(--border))] flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-[hsl(var(--navy-600))]" />
            <span className="text-sm font-bold text-[hsl(var(--foreground))]">分类目录</span>
          </div>
          <div className="p-2">
            {docTree.map((node) => {
              const isExpanded = expandedNodes[node.name];
              return (
                <div key={node.name}>
                  <button
                    onClick={() => toggleNode(node.name)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[hsl(var(--muted-foreground))]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[hsl(var(--muted-foreground))]" />
                    )}
                    <FolderOpen className="w-4 h-4 shrink-0 text-[hsl(var(--muted-foreground))]" />
                    <span className="truncate">{node.name}</span>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 pl-2 border-l border-[hsl(var(--border))] space-y-0.5">
                          {node.children.map((child) => (
                            <button
                              key={child.name}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                child.name === docContent.title
                                  ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium"
                                  : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                              }`}
                            >
                              <FileText className={`w-3.5 h-3.5 shrink-0 ${child.name === docContent.title ? "text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                              <span className="truncate">{child.name}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Center: Content */}
        <motion.div variants={itemVariants} className="lg:col-span-7 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden relative">
          {!hasAccess && (
            <div className="absolute inset-0 z-10 bg-[hsl(var(--card))]/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <Lock className="w-12 h-12 text-[hsl(var(--muted-foreground))] mb-3" />
              <div className="text-base font-bold text-[hsl(var(--foreground))] mb-1">暂无查看权限</div>
              <div className="text-sm text-[hsl(var(--muted-foreground))] mb-4">该文档为私有文档，您当前无权查看</div>
              <button
                onClick={() => setApplyOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
              >
                <Shield className="w-4 h-4" />
                申请查看权限
              </button>
            </div>
          )}

          <div className="px-6 py-5 border-b border-[hsl(var(--border))]">
            <h1 className="text-lg font-bold text-[hsl(var(--foreground))] mb-3">{docContent.title}</h1>
            <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {docContent.author}</span>
              <span className="flex items-center gap-1"><FolderOpen className="w-3.5 h-3.5" /> {docContent.dept}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {docContent.updatedAt}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {docContent.views} 次浏览</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              {docContent.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] border border-[hsl(var(--navy-200))]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Section Nav */}
          <div className="px-6 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] flex items-center gap-2 overflow-x-auto">
            {docContent.sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeSection === sec.id
                    ? "bg-[hsl(var(--navy-600))] text-white"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))]"
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Content Body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {docContent.sections
                .filter((sec) => !activeSection || sec.id === activeSection)
                .map((sec) => (
                  <motion.div
                    key={sec.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full bg-[hsl(var(--navy-600))]" />
                      {sec.title}
                    </h3>
                    <div className="text-sm text-[hsl(var(--foreground))] leading-relaxed whitespace-pre-line pl-3">
                      {sec.content}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right: Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[hsl(var(--navy-600))]" />
              文档摘要
            </h3>
            <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">{docContent.abstract}</p>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[hsl(var(--navy-600))]" />
              文档标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {docContent.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] border border-[hsl(var(--navy-200))]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">权限信息</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[hsl(var(--muted-foreground))]">访问权限</span>
                <span className={`font-medium ${docContent.permission === "shared" ? "text-emerald-600" : "text-amber-600"}`}>
                  {docContent.permission === "shared" ? "共享" : "私有"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[hsl(var(--muted-foreground))]">下载权限</span>
                <span className="font-medium text-emerald-600">允许</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[hsl(var(--muted-foreground))]">分享权限</span>
                <span className="font-medium text-emerald-600">允许</span>
              </div>
            </div>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3">相关文档</h3>
            <div className="space-y-2">
              {["企业年金管理办法", "客户服务标准化流程", "数据治理规范"].map((name) => (
                <div key={name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-xs text-[hsl(var(--foreground))] truncate">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Apply Permission Modal */}
      <AnimatePresence>
        {applyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setApplyOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[480px] max-w-[90vw] bg-[hsl(var(--card))] rounded-2xl shadow-[var(--shadow-elevated)] border border-[hsl(var(--border))] overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[hsl(var(--border))] flex items-center justify-between">
                <h3 className="text-base font-bold text-[hsl(var(--foreground))]">申请查看权限</h3>
                <button onClick={() => setApplyOpen(false)} className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors">
                  <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>

              {applySubmitted ? (
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-[hsl(var(--foreground))] mb-1">申请已提交</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">文档负责人将收到您的申请，审批通过后您即可查看</div>
                </div>
              ) : (
                <>
                  <div className="p-6 space-y-4">
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-800">
                        您正在申请查看 <span className="font-bold">{docContent.title}</span>，该文档当前为私有权限。
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">申请理由</label>
                      <textarea
                        rows={3}
                        placeholder="请说明您需要查看该文档的原因..."
                        className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">使用范围</label>
                      <select className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none">
                        <option>个人学习参考</option>
                        <option>业务工作开展</option>
                        <option>培训材料准备</option>
                      </select>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex justify-end gap-3">
                    <button
                      onClick={() => setApplyOpen(false)}
                      className="px-5 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        setApplySubmitted(true);
                        setHasAccess(true);
                      }}
                      className="px-5 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
                    >
                      <Send className="w-4 h-4 inline mr-1" />
                      提交申请
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
