import { useState } from "react";
import { motion } from "framer-motion";
import {
  GitCompare,
  Search,
  RotateCcw,
  Bell,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronDown,
  Filter,
} from "lucide-react";

const versions = [
  { doc: "sso单点技术文档", version: "V3.0", dir: "文档/技术文档", updatedAt: "2022-03-01 17:09", editor: "杨伊曼", status: "active" as const, effectiveAt: "2022-03-01 17:09" },
  { doc: "采购合同管理制度V3", version: "V3.0", dir: "文档/合同管理制度", updatedAt: "2022-03-01 17:13", editor: "杨伊曼", status: "active" as const, effectiveAt: "2022-03-01 17:13" },
  { doc: "档案管理制度V3", version: "V3.0", dir: "文档/档案管理制度", updatedAt: "2022-03-01 17:10", editor: "杨伊曼", status: "active" as const, effectiveAt: "2022-03-01 17:10" },
  { doc: "项目管理制度V3", version: "V3.0", dir: "文档/项目管理制度", updatedAt: "2022-03-01 17:07", editor: "杨伊曼", status: "active" as const, effectiveAt: "2022-03-01 17:07" },
  { doc: "采购合同管理制度V2", version: "V2.0", dir: "文档/合同管理制度", updatedAt: "2022-03-01 17:13", editor: "杨伊曼", status: "inactive" as const, effectiveAt: "2022-03-01 17:13" },
  { doc: "档案管理制度V2", version: "V2.0", dir: "文档/档案管理制度", updatedAt: "2022-03-01 17:10", editor: "杨伊曼", status: "inactive" as const, effectiveAt: "2022-03-01 17:10" },
  { doc: "人事管理制度V2", version: "V2.0", dir: "文档/人事管理制度", updatedAt: "2022-03-01 17:09", editor: "杨伊曼", status: "inactive" as const, effectiveAt: "2022-03-01 17:09" },
  { doc: "项目管理制度V2", version: "V2.0", dir: "文档/项目管理制度", updatedAt: "2022-03-01 17:07", editor: "杨伊曼", status: "inactive" as const, effectiveAt: "2022-03-01 17:07" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function VersionManagement() {
  const [docStatus, setDocStatus] = useState("全部");
  const [search, setSearch] = useState("");

  const filtered = versions.filter((v) => {
    if (docStatus !== "全部" && docStatus === "生效" && v.status !== "active") return false;
    if (docStatus !== "全部" && docStatus === "失效" && v.status !== "inactive") return false;
    if (search && !v.doc.includes(search) && !v.dir.includes(search)) return false;
    return true;
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-5">
      <motion.div variants={itemVariants} className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">版本管理</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">文档版本历史追踪、状态管理与版本回溯</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
            <Bell className="w-4 h-4 text-[hsl(var(--gold-600))]" />
            流程提醒
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
            <Search className="w-4 h-4 text-[hsl(var(--navy-600))]" />
            版本检索
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--navy-600))] text-white text-sm font-medium hover:bg-[hsl(var(--navy-700))] transition-colors">
            <RotateCcw className="w-4 h-4" />
            版本回溯
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          <span className="text-sm text-[hsl(var(--foreground))] font-medium">文档状态</span>
          <div className="relative">
            <select
              value={docStatus}
              onChange={(e) => setDocStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
            >
              <option>全部</option>
              <option>生效</option>
              <option>失效</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] pointer-events-none" />
          </div>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="搜索文档名称..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-64 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-[hsl(var(--muted-foreground))]">更新时间</span>
          <input
            type="date"
            className="px-3 py-1.5 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
          />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">至</span>
          <input
            type="date"
            className="px-3 py-1.5 text-sm rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--ring))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition-all"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">
                  <input type="checkbox" className="rounded border-[hsl(var(--border))]" />
                </th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">文档</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">版本号</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">目录</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">更新时间</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">修改人</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">文档状态</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">生效时间</th>
                <th className="px-5 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filtered.map((v, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  <td className="px-5 py-3">
                    <input type="checkbox" className="rounded border-[hsl(var(--border))]" />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                      <span className="font-medium text-[hsl(var(--foreground))]">{v.doc}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] text-xs font-medium border border-[hsl(var(--navy-200))]">
                      {v.version}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[hsl(var(--muted-foreground))]">{v.dir}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-[hsl(var(--muted-foreground))]">
                      <Clock className="w-3.5 h-3.5" />
                      {v.updatedAt}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[hsl(var(--foreground))]">{v.editor}</td>
                  <td className="px-5 py-3">
                    {v.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        生效
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        失效
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-[hsl(var(--muted-foreground))]">{v.effectiveAt}</td>
                  <td className="px-5 py-3">
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] hover:bg-[hsl(var(--navy-100))] transition-colors border border-[hsl(var(--navy-200))]">
                      <GitCompare className="w-3.5 h-3.5" />
                      版本对比
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-sm text-[hsl(var(--muted-foreground))]">未找到匹配的记录</div>
        )}
      </motion.div>
    </motion.div>
  );
}
