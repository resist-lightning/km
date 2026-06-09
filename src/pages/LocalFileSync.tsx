import { useState } from "react";
import { motion } from "framer-motion";
import {
  HardDrive,
  FolderOpen,
  FileText,
  RefreshCw,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Settings,
  ArrowUpDown,
  Filter,
  Search,
  CloudUpload,
} from "lucide-react";

const syncTasks = [
  { id: 1, name: "制度文档同步", source: "D:\\制度文件\\", target: "知识库/制度规范", status: "synced", lastSync: "2小时前", count: 45 },
  { id: 2, name: "培训资料同步", source: "D:\\培训资料\\", target: "知识库/培训资料", status: "syncing", lastSync: "进行中", count: 128 },
  { id: 3, name: "合规文件同步", source: "D:\\合规文件\\", target: "知识库/合规管理", status: "error", lastSync: "昨天", count: 0 },
  { id: 4, name: "年度报告同步", source: "D:\\年度报告\\", target: "知识库/年度报告", status: "synced", lastSync: "3天前", count: 12 },
];

const syncHistory = [
  { file: "养老保险业务操作手册V2.0.pdf", action: "上传", time: "10分钟前", size: "2.4MB" },
  { file: "数据治理规范.docx", action: "更新", time: "1小时前", size: "1.8MB" },
  { file: "客户服务标准流程.pptx", action: "上传", time: "3小时前", size: "5.2MB" },
  { file: "年度绩效考核方案.pdf", action: "更新", time: "昨天", size: "3.1MB" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function LocalFileSync() {
  const [searchQuery, setSearchQuery] = useState("");

  const statusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">已同步</span>;
      case "syncing":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">同步中</span>;
      case "error":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">同步失败</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">本地文件同步</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">将本地文件夹内容自动同步至知识库，支持增量更新与版本管理</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
            <Settings className="w-4 h-4" />
            同步设置
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
            <Plus className="w-4 h-4" />
            新建同步任务
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: "同步任务", value: "4", icon: FolderOpen, color: "text-[hsl(var(--navy-600))]" },
          { label: "已同步文件", value: "1,247", icon: FileText, color: "text-emerald-600" },
          { label: "今日更新", value: "23", icon: CloudUpload, color: "text-sky-600" },
          { label: "同步成功率", value: "98.5%", icon: CheckCircle2, color: "text-[hsl(var(--gold-600))]" },
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
        {/* 同步任务列表 */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <h3 className="font-bold text-[hsl(var(--foreground))]">同步任务</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索任务..."
                    className="pl-9 pr-4 py-1.5 text-xs rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none w-48"
                  />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {syncTasks.map((task) => (
                <div key={task.id} className="px-5 py-4 hover:bg-[hsl(var(--muted))] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[hsl(var(--navy-50))] flex items-center justify-center">
                        <HardDrive className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[hsl(var(--foreground))]">{task.name}</div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))]">{task.source} → {task.target}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusBadge(task.status)}
                      <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-12">
                    <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.lastSync}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{task.count} 个文件</span>
                    {task.status === "error" && (
                      <span className="text-xs text-red-600">连接超时，请检查路径</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 右侧：同步历史 */}
        <motion.div variants={itemVariants} className="space-y-5">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <h3 className="font-bold text-[hsl(var(--foreground))]">最近同步记录</h3>
              <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))]">查看全部</button>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {syncHistory.map((item, idx) => (
                <div key={idx} className="px-5 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-sm text-[hsl(var(--foreground))] truncate">{item.file}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        item.action === "上传" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                      }`}>{item.action}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.size}</span>
                    </div>
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0 ml-2">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-3">快速操作</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(var(--muted))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))] transition-colors border border-[hsl(var(--border))]">
                <RefreshCw className="w-4 h-4" />
                全部重新同步
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(var(--muted))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))] transition-colors border border-[hsl(var(--border))]">
                <FolderOpen className="w-4 h-4" />
                浏览本地文件夹
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
