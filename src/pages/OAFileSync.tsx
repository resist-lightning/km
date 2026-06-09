import { useState } from "react";
import { motion } from "framer-motion";
import {
  Link,
  FolderOpen,
  FileText,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Settings,
  ArrowUpDown,
  Filter,
  Search,
  CloudUpload,
  Building2,
  Unlock,
} from "lucide-react";

const syncTasks = [
  { id: 1, name: "OA制度文档同步", source: "OA系统/制度管理", target: "知识库/制度规范", status: "synced", lastSync: "1小时前", count: 67 },
  { id: 2, name: "OA通知公告同步", source: "OA系统/通知公告", target: "知识库/通知公告", status: "syncing", lastSync: "进行中", count: 34 },
  { id: 3, name: "OA会议纪要同步", source: "OA系统/会议管理", target: "知识库/会议纪要", status: "synced", lastSync: "昨天", count: 128 },
  { id: 4, name: "OA审批流程同步", source: "OA系统/流程中心", target: "知识库/流程规范", status: "pending", lastSync: "未启动", count: 0 },
];

const syncHistory = [
  { file: "关于启用新考勤制度的通知", action: "同步", time: "30分钟前", source: "OA系统" },
  { file: "Q2经营分析会议纪要", action: "同步", time: "2小时前", source: "OA系统" },
  { file: "信息安全管理制度修订版", action: "更新", time: "昨天", source: "OA系统" },
  { file: "部门预算审批流程说明", action: "同步", time: "昨天", source: "OA系统" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function OAFileSync() {
  const [searchQuery, setSearchQuery] = useState("");

  const statusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">已同步</span>;
      case "syncing":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">同步中</span>;
      case "pending":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] font-medium">未启动</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">OA 文件同步</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">连接 OA 系统，自动同步制度、通知、会议纪要等文档至知识库</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
            <Settings className="w-4 h-4" />
            连接设置
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
            <Plus className="w-4 h-4" />
            新建同步任务
          </button>
        </div>
      </motion.div>

      {/* OA连接状态 */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Link className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-[hsl(var(--foreground))]">OA 系统连接状态</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">国民养老保险 OA 办公系统</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              连接正常
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(var(--muted))] text-xs text-[hsl(var(--foreground))] hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))] transition-colors border border-[hsl(var(--border))]">
              <Unlock className="w-3 h-3" />
              测试连接
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: "同步任务", value: "4", icon: FolderOpen, color: "text-[hsl(var(--navy-600))]" },
          { label: "已同步文件", value: "2,156", icon: FileText, color: "text-emerald-600" },
          { label: "今日更新", value: "41", icon: CloudUpload, color: "text-sky-600" },
          { label: "OA来源模块", value: "6", icon: Building2, color: "text-[hsl(var(--gold-600))]" },
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
                        <Link className="w-4 h-4 text-[hsl(var(--navy-600))]" />
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 右侧：同步历史 + 映射关系 */}
        <motion.div variants={itemVariants} className="space-y-5">
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
            <div className="px-5 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <h3 className="font-bold text-[hsl(var(--foreground))]">最近同步记录</h3>
              <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))]">查看全部</button>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {syncHistory.map((item, idx) => (
                <div key={idx} className="px-5 py-3">
                  <div className="text-sm text-[hsl(var(--foreground))] truncate">{item.file}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      item.action === "同步" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                    }`}>{item.action}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.source}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-3">OA 模块映射</h3>
            <div className="space-y-2">
              {[
                { oa: "制度管理", kb: "制度规范" },
                { oa: "通知公告", kb: "通知公告" },
                { oa: "会议管理", kb: "会议纪要" },
                { oa: "流程中心", kb: "流程规范" },
              ].map((map) => (
                <div key={map.oa} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[hsl(var(--muted))] text-xs border border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--foreground))]">{map.oa}</span>
                  <span className="text-[hsl(var(--muted-foreground))]">→</span>
                  <span className="text-[hsl(var(--navy-600))] font-medium">{map.kb}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
