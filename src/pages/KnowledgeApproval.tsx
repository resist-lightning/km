import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  ChevronRight,
  Filter,
  User,
  Calendar,
  FileText,
  AlertTriangle,
} from "lucide-react";

const tabs = [
  { key: "pending", label: "待审批", count: 12, icon: Clock },
  { key: "approved", label: "已通过", count: 86, icon: CheckCircle2 },
  { key: "rejected", label: "已驳回", count: 5, icon: XCircle },
  { key: "all", label: "全部", count: 103, icon: ClipboardCheck },
];

const approvals = [
  { id: "AP-2026-0512", title: "养老保险业务操作手册更新申请", applicant: "张伟", dept: "运营管理部", type: "知识更新", status: "pending", submitTime: "2026-05-27 09:30", urgency: "high", version: "V2.0 → V2.1" },
  { id: "AP-2026-0511", title: "新增《客户服务话术规范》", applicant: "王芳", dept: "客户服务部", type: "知识入库", status: "pending", submitTime: "2026-05-27 08:15", urgency: "normal", version: "新建" },
  { id: "AP-2026-0510", title: "信息安全管理制度修订", applicant: "李强", dept: "信息科技部", type: "知识更新", status: "pending", submitTime: "2026-05-26 16:45", urgency: "high", version: "V1.5 → V2.0" },
  { id: "AP-2026-0509", title: "数据分类分级标准", applicant: "赵敏", dept: "信息科技部", type: "知识入库", status: "pending", submitTime: "2026-05-26 14:20", urgency: "normal", version: "新建" },
  { id: "AP-2026-0508", title: "企业年金产品说明文档", applicant: "刘洋", dept: "产品部", type: "知识入库", status: "approved", submitTime: "2026-05-25 10:00", urgency: "normal", version: "新建", approver: "陈总", approveTime: "2026-05-25 15:30" },
  { id: "AP-2026-0507", title: "监管政策解读（2026Q2）", applicant: "周婷", dept: "合规部", type: "知识更新", status: "approved", submitTime: "2026-05-24 09:00", urgency: "high", version: "V1.0 → V1.1", approver: "陈总", approveTime: "2026-05-24 14:00" },
  { id: "AP-2026-0506", title: "第三方系统对接规范", applicant: "吴磊", dept: "信息科技部", type: "知识入库", status: "rejected", submitTime: "2026-05-23 11:00", urgency: "normal", version: "新建", approver: "陈总", approveTime: "2026-05-23 16:00", reason: "缺少安全评审意见" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function KnowledgeApproval() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filtered = approvals.filter((a) => activeTab === "all" || a.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-700))] font-medium border border-[hsl(var(--gold-200))] flex items-center gap-1"><Clock className="w-3 h-3" />待审批</span>;
      case "approved":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />已通过</span>;
      case "rejected":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium border border-red-200 flex items-center gap-1"><XCircle className="w-3 h-3" />已驳回</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">知识审批</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">管理知识入库与更新的审批流程，确保知识质量与合规性</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`p-5 rounded-xl border text-left transition-all ${
                activeTab === tab.key
                  ? "bg-[hsl(var(--navy-50))] border-[hsl(var(--navy-200))] shadow-[var(--shadow-card)]"
                  : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--navy-200))]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${activeTab === tab.key ? "text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                <span className={`text-lg font-bold ${activeTab === tab.key ? "text-[hsl(var(--navy-700))]" : "text-[hsl(var(--foreground))]"}`}>{tab.count}</span>
              </div>
              <div className={`text-sm font-medium ${activeTab === tab.key ? "text-[hsl(var(--navy-700))]" : "text-[hsl(var(--muted-foreground))]"}`}>{tab.label}</div>
            </button>
          );
        })}
      </motion.div>

      {/* Approval List */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            共 <span className="font-bold text-[hsl(var(--foreground))]">{filtered.length}</span> 条记录
          </span>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--muted))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--navy-50))] transition-colors">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>

        <div className="divide-y divide-[hsl(var(--border))]">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`px-6 py-5 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer ${selectedItem === item.id ? "bg-[hsl(var(--navy-50))]" : ""}`}
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">{item.id}</span>
                    {getStatusBadge(item.status)}
                    {item.urgency === "high" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium border border-red-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> 紧急
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-1">{item.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.applicant} · {item.dept}</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {item.type}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.submitTime}</span>
                    <span className="text-[hsl(var(--navy-600))] font-medium">{item.version}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.status === "pending" && (
                    <>
                      <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors">
                        通过
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-xs font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                        驳回
                      </button>
                    </>
                  )}
                  <button className="p-2 rounded-lg hover:bg-[hsl(var(--navy-50))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-600))] transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <ChevronRight className={`w-4 h-4 text-[hsl(var(--muted-foreground))] transition-transform ${selectedItem === item.id ? "rotate-90" : ""}`} />
                </div>
              </div>

              {/* Expanded Detail */}
              {selectedItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-[hsl(var(--border))]"
                >
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">申请理由</div>
                      <div className="text-[hsl(var(--foreground))]">根据最新监管要求，需更新业务操作手册中的合规条款，确保总分机构执行标准统一。</div>
                    </div>
                    <div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">变更内容摘要</div>
                      <div className="text-[hsl(var(--foreground))]">新增第3.2节关于客户身份核验流程；修订第5章风险防控措施。</div>
                    </div>
                    <div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">审批记录</div>
                      {item.status === "approved" ? (
                        <div className="text-[hsl(var(--foreground))]">
                          <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-3 h-3" /> {item.approver} 审批通过</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{item.approveTime}</div>
                        </div>
                      ) : item.status === "rejected" ? (
                        <div className="text-[hsl(var(--foreground))]">
                          <div className="flex items-center gap-1 text-red-600"><XCircle className="w-3 h-3" /> {item.approver} 已驳回</div>
                          <div className="text-xs text-red-500 mt-1">原因：{item.reason}</div>
                        </div>
                      ) : (
                        <div className="text-[hsl(var(--muted-foreground))]">等待审批中...</div>
                      )}
                    </div>
                  </div>
                  {item.status === "pending" && (
                    <div className="mt-4 flex gap-2">
                      <div className="flex-1 relative">
                        <MessageSquare className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                        <input
                          type="text"
                          placeholder="输入审批意见..."
                          className="w-full pl-9 pr-4 py-2 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
