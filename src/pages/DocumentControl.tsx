import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FilePlus,
  FileEdit,
  FileX,
  BookOpen,
  Copy,
  Undo2,
  Globe,
  FileSearch,
  Stamp,
  Activity,
  Archive,
  Send,
  Upload,
  User,
  Building,
  Calendar,
  FolderOpen,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  FileText,
} from "lucide-react";

const flowTypes = [
  { key: "create", label: "文件新建", icon: FilePlus },
  { key: "change", label: "文件变更", icon: FileEdit },
  { key: "abolish", label: "文件废止", icon: FileX },
  { key: "train", label: "文件培训", icon: BookOpen },
  { key: "copy", label: "文件复制", icon: Copy },
  { key: "borrow", label: "文件借阅", icon: FileSearch },
  { key: "recycle", label: "文件回收", icon: Undo2 },
  { key: "external", label: "外来文件评审", icon: Globe },
  { key: "audit", label: "文件审计清单", icon: FileSearch },
  { key: "seal", label: "受控章管理", icon: Stamp },
  { key: "monitor", label: "文控流程监控", icon: Activity },
  { key: "archive", label: "文件归档", icon: Archive },
];

const tabs = ["流程表单", "流程图", "流程状态", "正文"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function DocumentControl() {
  const [activeFlow, setActiveFlow] = useState("create");
  const [activeTab, setActiveTab] = useState("流程表单");
  const [formData, setFormData] = useState({
    title: "",
    company: "国民养老保险",
    dept: "战略发展部",
    applicant: "刘雨馨",
    date: "2026-05-28",
    system: "",
    base: "",
    type: "",
    attr: "",
    fileClass: "",
    ruleClass: "",
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderForm = () => (
    <div className="space-y-5">
      {/* Basic Info */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
          <FilePlus className="w-4 h-4 text-[hsl(var(--navy-600))]" />
          基本信息
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3">
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="请输入流程标题"
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
            />
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
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">申请人</label>
            <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
              <User className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              <span>{formData.applicant}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">申请日期</label>
            <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
              <Calendar className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              <span>{formData.date}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              申请人所属体系 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.system}
              onChange={(e) => handleChange("system", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="质量">质量管理体系</option>
              <option value="信息安全">信息安全体系</option>
              <option value="内控">内部控制体系</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              申请人所属基地 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.base}
              onChange={(e) => handleChange("base", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="北京">北京总部</option>
              <option value="上海">上海分部</option>
              <option value="深圳">深圳分部</option>
            </select>
          </div>
        </div>
      </div>

      {/* File Info */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
          <FileEdit className="w-4 h-4 text-[hsl(var(--navy-600))]" />
          文件信息
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              申请类型 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="新建">新建</option>
              <option value="变更">变更</option>
              <option value="废止">废止</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              文件属性 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.attr}
              onChange={(e) => handleChange("attr", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="制度">制度</option>
              <option value="规范">规范</option>
              <option value="流程">流程</option>
              <option value="标准">标准</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              文件分类 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.fileClass}
              onChange={(e) => handleChange("fileClass", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="行政管理">行政管理</option>
              <option value="财务管理">财务管理</option>
              <option value="人力资源">人力资源</option>
              <option value="信息技术">信息技术</option>
            </select>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              制度/文件分类 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {["一级分类", "二级分类", "三级分类", "四级分类"].map((level) => (
                <select
                  key={level}
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
                >
                  <option value="">{level}</option>
                </select>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              所属部门 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.belongDept}
              onChange={(e) => handleChange("belongDept", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="战略发展部">战略发展部</option>
              <option value="信息技术部">信息技术部</option>
              <option value="人力资源部">人力资源部</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              部门分类 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.deptClass}
              onChange={(e) => handleChange("deptClass", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="职能">职能部门</option>
              <option value="业务">业务部门</option>
              <option value="支撑">支撑部门</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">文件状态</label>
            <select
              value={formData.fileStatus}
              onChange={(e) => handleChange("fileStatus", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
            >
              <option value="">请选择</option>
              <option value="草稿">草稿</option>
              <option value="评审中">评审中</option>
              <option value="已发布">已发布</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              评审人员 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={formData.reviewer}
                onChange={(e) => handleChange("reviewer", e.target.value)}
                placeholder="搜索评审人"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              审批人员 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={formData.approver}
                onChange={(e) => handleChange("approver", e.target.value)}
                placeholder="搜索审批人"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">文件存放目录</label>
            <div className="relative">
              <FolderOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <select
                value={formData.storageDir}
                onChange={(e) => handleChange("storageDir", e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all appearance-none"
              >
                <option value="">请选择存放目录</option>
                <option value="规章制度">规章制度</option>
                <option value="体系文件">体系文件</option>
                <option value="模板文件">模板文件</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Attachments */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-[hsl(var(--navy-600))]" />
          附件上传
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">新建制度/文件附件</label>
            <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-xl p-6 text-center hover:border-[hsl(var(--navy-200))] transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--muted-foreground))]" />
              <div className="text-sm text-[hsl(var(--foreground))] font-medium">点击上传附件</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">最大 5M/个</div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">相关流程/规范名称</label>
            <textarea
              rows={4}
              placeholder="请输入相关联的流程及其他规范文件"
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Notification */}
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-[hsl(var(--navy-600))]" />
          制度/文件通知单
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
              文件下发部门 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={formData.notifyDept}
                onChange={(e) => handleChange("notifyDept", e.target.value)}
                placeholder="搜索部门"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">通知范围</label>
            <input
              type="text"
              value={formData.notifyScope}
              onChange={(e) => handleChange("notifyScope", e.target.value)}
              placeholder="请输入通知范围"
              className="w-full px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">通知部门</label>
            <div className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
              <Building className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              <span>战略发展部</span>
            </div>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1.5">正文 PDF</label>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
              <FileText className="w-5 h-5 text-[hsl(var(--navy-600))]" />
              <div className="flex-1">
                <div className="text-sm text-[hsl(var(--foreground))]">制度文件正文.pdf</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">2.4 MB · 已上传</div>
              </div>
              <button className="px-3 py-1.5 text-xs rounded-lg bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] hover:bg-[hsl(var(--navy-100))] transition-colors border border-[hsl(var(--navy-200))]">
                查看
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFlowchart = () => (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-8">
      <div className="flex items-center justify-center gap-4">
        {["发起申请", "部门初审", "专家评审", "领导审批", "正式发布"].map((step, idx, arr) => (
          <div key={step} className="flex items-center gap-4">
            <div className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 ${
              idx <= 2 ? "border-[hsl(var(--navy-200))] bg-[hsl(var(--navy-50))]" : "border-[hsl(var(--border))] bg-[hsl(var(--muted))]"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                idx <= 2 ? "bg-[hsl(var(--navy-600))] text-white" : "bg-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
              }`}>
                {idx + 1}
              </div>
              <span className={`text-sm font-medium ${idx <= 2 ? "text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))]"}`}>{step}</span>
            </div>
            {idx < arr.length - 1 && (
              <ChevronRight className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          当前流程状态：专家评审中。预计将在 <span className="font-bold">2 小时</span> 内完成审批。
        </div>
      </div>
    </div>
  );

  const renderStatus = () => (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5 space-y-4">
      {[
        { step: "发起申请", time: "2026-05-28 09:00", user: "刘雨馨", status: "completed", remark: "申请新建《数据治理规范V2.0》" },
        { step: "部门初审", time: "2026-05-28 09:30", user: "周怡媛", status: "completed", remark: "初审通过，建议补充数据分类章节" },
        { step: "专家评审", time: "—", user: "张禹轩", status: "running", remark: "正在评审中" },
        { step: "领导审批", time: "—", user: "待分配", status: "pending", remark: "" },
        { step: "正式发布", time: "—", user: "—", status: "pending", remark: "" },
      ].map((item, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              item.status === "completed" ? "bg-emerald-100 text-emerald-600" :
              item.status === "running" ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] ring-2 ring-[hsl(var(--navy-200))]" :
              "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
            }`}>
              {item.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> :
               item.status === "running" ? <Activity className="w-4 h-4" /> :
               <span className="text-xs">{idx + 1}</span>}
            </div>
            {idx < 4 && <div className="w-0.5 h-8 bg-[hsl(var(--border))] my-1" />}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[hsl(var(--foreground))]">{item.step}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.time}</span>
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
              处理人：{item.user}
            </div>
            {item.remark && (
              <div className="mt-1.5 text-xs text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] px-3 py-1.5 rounded-lg inline-block">
                {item.remark}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">数据治理规范 V2.0</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">文件编号：KM-GZ-2026-005</p>
        </div>
        <div className="border-t border-[hsl(var(--border))] pt-6 space-y-4">
          <h3 className="text-base font-bold text-[hsl(var(--foreground))]">第一章 总则</h3>
          <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed">
            为加强公司数据资产管理，规范数据的采集、存储、使用、共享和销毁流程，确保数据安全与合规，特制定本规范。
          </p>
          <h3 className="text-base font-bold text-[hsl(var(--foreground))]">第二章 数据分类与分级</h3>
          <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed">
            公司数据按照敏感程度分为公开数据、内部数据、敏感数据和机密数据四个等级。不同等级的数据适用不同的访问控制策略和审批流程。
          </p>
          <h3 className="text-base font-bold text-[hsl(var(--foreground))]">第三章 数据质量管理</h3>
          <p className="text-sm text-[hsl(var(--foreground))] leading-relaxed">
            数据质量遵循准确性、完整性、一致性、时效性和可用性五项基本原则。各业务部门应建立数据质量检查机制，定期开展数据质量评估。
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-5">
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">文控管理</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">制度/文件的新建、变更、废止全生命周期审批流程</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
          <FilePlus className="w-4 h-4" />
          新建流程
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left: Flow Types */}
        <motion.div variants={itemVariants} className="lg:col-span-1 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden flex flex-col h-[720px]">
          <div className="px-4 py-3 border-b border-[hsl(var(--border))]">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">文控流程</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {flowTypes.map((flow) => {
              const Icon = flow.icon;
              const active = activeFlow === flow.key;
              return (
                <button
                  key={flow.key}
                  onClick={() => setActiveFlow(flow.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium"
                      : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[hsl(var(--navy-600))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                  <span className="truncate">{flow.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Form Area */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5">
          {/* Tabs */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-1 flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[hsl(var(--navy-600))] text-white"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "流程表单" && renderForm()}
              {activeTab === "流程图" && renderFlowchart()}
              {activeTab === "流程状态" && renderStatus()}
              {activeTab === "正文" && renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
