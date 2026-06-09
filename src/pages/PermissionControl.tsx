import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Settings,
  MessageSquare,
  BookOpen,
  FileText,
  Users,
  BarChart,
  Tag,
  Save,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

const knowledgeTypes = [
  { key: "制度", label: "制度规范", icon: Shield, color: "text-sky-600 bg-sky-50 border-sky-200" },
  { key: "流程", label: "业务流程", icon: BookOpen, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { key: "文档", label: "技术文档", icon: FileText, color: "text-violet-600 bg-violet-50 border-violet-200" },
  { key: "培训", label: "培训资料", icon: Users, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { key: "法规", label: "外部法规", icon: Tag, color: "text-rose-600 bg-rose-50 border-rose-200" },
  { key: "数据", label: "运营数据", icon: BarChart, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
];

const actions = [
  { key: "publish", label: "发布", desc: "新文档首次发布" },
  { key: "change", label: "变更", desc: "文档重大变更" },
  { key: "modify", label: "修改", desc: "文档小幅修改" },
  { key: "delete", label: "删除", desc: "文档废止删除" },
];

const defaultApprovalMatrix: Record<string, Record<string, { level: number; approvers: string[] }>> = {
  制度: { publish: { level: 3, approvers: ["部门负责人", "分管副总", "总经理"] }, change: { level: 3, approvers: ["部门负责人", "分管副总", "总经理"] }, modify: { level: 2, approvers: ["部门负责人", "分管副总"] }, delete: { level: 3, approvers: ["部门负责人", "分管副总", "总经理"] } },
  流程: { publish: { level: 3, approvers: ["部门负责人", "分管副总", "总经理"] }, change: { level: 3, approvers: ["部门负责人", "分管副总", "总经理"] }, modify: { level: 2, approvers: ["部门负责人", "分管副总"] }, delete: { level: 3, approvers: ["部门负责人", "分管副总", "总经理"] } },
  文档: { publish: { level: 2, approvers: ["部门负责人", "技术委员会"] }, change: { level: 2, approvers: ["部门负责人", "技术委员会"] }, modify: { level: 1, approvers: ["部门负责人"] }, delete: { level: 2, approvers: ["部门负责人", "技术委员会"] } },
  培训: { publish: { level: 2, approvers: ["部门负责人", "人力资源部"] }, change: { level: 2, approvers: ["部门负责人", "人力资源部"] }, modify: { level: 1, approvers: ["部门负责人"] }, delete: { level: 2, approvers: ["部门负责人", "人力资源部"] } },
  法规: { publish: { level: 2, approvers: ["合规部", "分管副总"] }, change: { level: 2, approvers: ["合规部", "分管副总"] }, modify: { level: 1, approvers: ["合规部"] }, delete: { level: 2, approvers: ["合规部", "分管副总"] } },
  数据: { publish: { level: 2, approvers: ["数据负责人", "分管副总"] }, change: { level: 2, approvers: ["数据负责人", "分管副总"] }, modify: { level: 1, approvers: ["数据负责人"] }, delete: { level: 2, approvers: ["数据负责人", "分管副总"] } },
};

const qaScopes = [
  {
    key: "dept",
    label: "部门级问答",
    desc: "本部门内部问答，影响范围限于部门内",
    steps: [
      { name: "部门负责人审批", required: true },
      { name: "知识管理员复核", required: false },
    ],
  },
  {
    key: "company",
    label: "公司级问答",
    desc: "跨部门问答，影响范围覆盖全公司",
    steps: [
      { name: "部门负责人审批", required: true },
      { name: "分管副总审批", required: true },
      { name: "知识管理委员会审批", required: true },
      { name: "总经理审批", required: false },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function PermissionControl() {
  const [activeTab, setActiveTab] = useState<"knowledge" | "qa">("knowledge");
  const [approvalMatrix, setApprovalMatrix] = useState(defaultApprovalMatrix);
  const [selectedType, setSelectedType] = useState("制度");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const updateApprovalLevel = (type: string, action: string, level: number) => {
    setApprovalMatrix((prev) => {
      const next = { ...prev };
      next[type] = { ...next[type] };
      next[type][action] = { ...next[type][action], level };
      return next;
    });
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const selectedTypeData = knowledgeTypes.find((t) => t.key === selectedType);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-5">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">权限管控</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">管理员后台 · 配置知识发布与问答的审批流程及层级</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors"
          >
            <Save className="w-4 h-4" />
            保存配置
          </button>
        </div>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg w-fit"
          >
            <CheckCircle2 className="w-4 h-4" />
            配置已保存
          </motion.div>
        )}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <div className="flex bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-1">
          {[
            { key: "knowledge", label: "知识审批配置", icon: Settings },
            { key: "qa", label: "问答审批配置", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "knowledge" | "qa")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-[hsl(var(--navy-600))] text-white shadow-sm"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {activeTab === "knowledge" ? (
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Left: Knowledge Type Selector */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-3">
            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
              <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                知识类型
              </h3>
              <div className="space-y-2">
                {knowledgeTypes.map((type) => {
                  const Icon = type.icon;
                  const active = selectedType === type.key;
                  return (
                    <button
                      key={type.key}
                      onClick={() => setSelectedType(type.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        active
                          ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-700))] font-medium"
                          : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                      <span className="flex-1 text-left">{type.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${active ? "rotate-90" : ""}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Approval Matrix */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5">
            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {selectedTypeData && (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedTypeData.color.split(" ")[1]}`}>
                      <selectedTypeData.icon className={`w-5 h-5 ${selectedTypeData.color.split(" ")[0]}`} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                      {selectedTypeData?.label}审批配置
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">配置该类型知识的发布、变更、修改、删除审批层级</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {actions.map((action) => {
                  const config = approvalMatrix[selectedType]?.[action.key] || { level: 1, approvers: [] };
                  return (
                    <div key={action.key} className="p-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--navy-200))] transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm font-bold text-[hsl(var(--foreground))]">{action.label}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{action.desc}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[hsl(var(--muted-foreground))]">审批层级：</span>
                          <div className="flex rounded-lg border border-[hsl(var(--border))] overflow-hidden">
                            {[1, 2, 3, 4].map((level) => (
                              <button
                                key={level}
                                onClick={() => updateApprovalLevel(selectedType, action.key, level)}
                                className={`px-3 py-1 text-sm font-medium transition-colors ${
                                  config.level === level
                                    ? "bg-[hsl(var(--navy-600))] text-white"
                                    : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                                }`}
                              >
                                {level}级
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">审批流程：</span>
                        <div className="flex items-center gap-1">
                          {config.approvers.slice(0, config.level).map((approver, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <span className="text-xs px-2 py-1 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">
                                {approver}
                              </span>
                              {idx < config.level - 1 && (
                                <ChevronRight className="w-3 h-3 text-[hsl(var(--muted-foreground))]" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Approval Level Legend */}
            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
              <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[hsl(var(--gold-600))]" />
                审批层级说明
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { level: 1, desc: "一级审批，仅部门负责人审批" },
                  { level: 2, desc: "二级审批，部门负责人 + 分管副总" },
                  { level: 3, desc: "三级审批，增加总经理审批环节" },
                  { level: 4, desc: "四级审批，增加董事会审批环节" },
                ].map((item) => (
                  <div key={item.level} className="p-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                    <div className="text-sm font-bold text-[hsl(var(--navy-600))] mb-1">{item.level}级审批</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-5">
          {qaScopes.map((scope) => (
            <motion.div
              key={scope.key}
              variants={itemVariants}
              className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--navy-50))] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[hsl(var(--navy-600))]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">{scope.label}</h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{scope.desc}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium">
                  {scope.steps.filter((s) => s.required).length}级必审
                </span>
              </div>

              <div className="space-y-3">
                {scope.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      <div className="w-7 h-7 rounded-full bg-[hsl(var(--navy-600))] text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[hsl(var(--foreground))]">{step.name}</div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))]">
                        {step.required ? "必审环节" : "可选环节"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded hover:bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
