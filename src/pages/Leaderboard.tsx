import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Medal, Crown, Trophy } from "lucide-react";

// ─── 动画 ───
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// ─── 排行类型 Tab ───
type Scope = "个人" | "部门" | "小组";
const scopes: Scope[] = ["个人", "部门", "小组"];

// ─── 贡献排行数据 ───
const contributionData: Record<Scope, { name: string; dept: string; score: number; avatar?: string }[]> = {
  个人: [
    { name: "王建国", dept: "文档数：20", score: 20 },
    { name: "李智慧", dept: "文档数：10", score: 10 },
    { name: "陈思颖", dept: "文档数：8", score: 8 },
    { name: "李娟", dept: "文档数：6", score: 6 },
  ],
  部门: [
    { name: "信息技术部", dept: "文档数：486", score: 486 },
    { name: "运营管理部", dept: "文档数：392", score: 392 },
    { name: "客户服务部", dept: "文档数：354", score: 354 },
    { name: "风险管理部", dept: "文档数：298", score: 298 },
  ],
  小组: [
    { name: "前端开发组", dept: "文档数：120", score: 120 },
    { name: "后端开发组", dept: "文档数：98", score: 98 },
    { name: "测试组", dept: "文档数：76", score: 76 },
    { name: "产品组", dept: "文档数：65", score: 65 },
  ],
};

// ─── 学习排行数据 ───
const studyData: Record<Scope, { name: string; dept: string; score: number }[]> = {
  个人: [
    { name: "王建国", dept: "阅读数：245", score: 245 },
    { name: "李智慧", dept: "阅读数：210", score: 210 },
    { name: "陈思颖", dept: "阅读数：186", score: 186 },
    { name: "李娟", dept: "阅读数：150", score: 150 },
    { name: "刘子豪", dept: "阅读数：142", score: 142 },
  ],
  部门: [
    { name: "运营管理部", dept: "阅读数：3,240", score: 3240 },
    { name: "客户服务部", dept: "阅读数：2,890", score: 2890 },
    { name: "信息技术部", dept: "阅读数：2,650", score: 2650 },
    { name: "战略发展部", dept: "阅读数：1,980", score: 1980 },
    { name: "法律合规部", dept: "阅读数：1,760", score: 1760 },
  ],
  小组: [
    { name: "客服一组", dept: "阅读数：890", score: 890 },
    { name: "客服二组", dept: "阅读数：760", score: 760 },
    { name: "运营一组", dept: "阅读数：650", score: 650 },
    { name: "运营二组", dept: "阅读数：580", score: 580 },
    { name: "合规组", dept: "阅读数：520", score: 520 },
  ],
};

// ─── 积分排行数据 ───
const pointsData: Record<Scope, { name: string; dept: string; score: number }[]> = {
  个人: [
    { name: "王建国", dept: "积分：1711", score: 1711 },
    { name: "刘子豪", dept: "积分：1340", score: 1340 },
    { name: "李智慧", dept: "积分：975", score: 975 },
    { name: "陈思颖", dept: "积分：480", score: 480 },
    { name: "薛莹", dept: "积分：367", score: 367 },
  ],
  部门: [
    { name: "信息技术部", dept: "积分：12,450", score: 12450 },
    { name: "运营管理部", dept: "积分：10,890", score: 10890 },
    { name: "客户服务部", dept: "积分：9,760", score: 9760 },
    { name: "战略发展部", dept: "积分：8,230", score: 8230 },
    { name: "风险管理部", dept: "积分：7,150", score: 7150 },
  ],
  小组: [
    { name: "前端开发组", dept: "积分：4,560", score: 4560 },
    { name: "后端开发组", dept: "积分：3,890", score: 3890 },
    { name: "测试组", dept: "积分：3,240", score: 3240 },
    { name: "产品组", dept: "积分：2,980", score: 2980 },
    { name: "设计组", dept: "积分：2,650", score: 2650 },
  ],
};

// ─── 查阅排行 ───
const viewRankData = [
  { name: "文书档案管理制度", count: 29 },
  { name: "测试新增文件0513", count: 15 },
  { name: "照片档案管理办法", count: 14 },
  { name: "Snipaste_2026-05-18_10-09-28", count: 10 },
  { name: "【测试】制度文件协同编制", count: 9 },
];

// ─── 下载排行 ───
const downloadRankData = [
  { name: "(备份)XXXX操作指导书&作业指导书&SOP-模板V1【技术文件】", count: 128 },
  { name: "042票通8数字业财大会录屏", count: 86 },
  { name: "养老保险业务操作手册（2026版）", count: 72 },
  { name: "客户服务标准化流程V3.0", count: 65 },
  { name: "数据治理规范（试行）", count: 54 },
];

// ─── 活跃用户排行数据 ───
const activeUserData: Record<Scope, { name: string; dept: string; score: number }[]> = {
  个人: [
    { name: "王建国", dept: "活跃度：98", score: 98 },
    { name: "李智慧", dept: "活跃度：95", score: 95 },
    { name: "陈思颖", dept: "活跃度：92", score: 92 },
    { name: "李娟", dept: "活跃度：88", score: 88 },
    { name: "刘子豪", dept: "活跃度：85", score: 85 },
  ],
  部门: [
    { name: "信息技术部", dept: "活跃度：96", score: 96 },
    { name: "运营管理部", dept: "活跃度：92", score: 92 },
    { name: "客户服务部", dept: "活跃度：88", score: 88 },
    { name: "战略发展部", dept: "活跃度：82", score: 82 },
    { name: "法律合规部", dept: "活跃度：78", score: 78 },
  ],
  小组: [
    { name: "前端开发组", dept: "活跃度：98", score: 98 },
    { name: "后端开发组", dept: "活跃度：94", score: 94 },
    { name: "客服一组", dept: "活跃度：90", score: 90 },
    { name: "运营一组", dept: "活跃度：86", score: 86 },
    { name: "产品组", dept: "活跃度：82", score: 82 },
  ],
};

// ─── 问答排行数据 ───
const qaRankData: Record<Scope, { name: string; dept: string; score: number }[]> = {
  个人: [
    { name: "王建国", dept: "回答：86", score: 86 },
    { name: "李智慧", dept: "回答：72", score: 72 },
    { name: "陈思颖", dept: "回答：65", score: 65 },
    { name: "刘子豪", dept: "回答：58", score: 58 },
    { name: "李娟", dept: "回答：42", score: 42 },
  ],
  部门: [
    { name: "信息技术部", dept: "回答：320", score: 320 },
    { name: "运营管理部", dept: "回答：286", score: 286 },
    { name: "客户服务部", dept: "回答：245", score: 245 },
    { name: "战略发展部", dept: "回答：198", score: 198 },
    { name: "法律合规部", dept: "回答：165", score: 165 },
  ],
  小组: [
    { name: "前端开发组", dept: "回答：120", score: 120 },
    { name: "后端开发组", dept: "回答：98", score: 98 },
    { name: "客服一组", dept: "回答：86", score: 86 },
    { name: "运营一组", dept: "回答：72", score: 72 },
    { name: "产品组", dept: "回答：65", score: 65 },
  ],
};

// ─── 排名图标 ───
function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-4 h-4 text-amber-500" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-slate-400" />;
  if (rank === 3) return <Trophy className="w-4 h-4 text-orange-400" />;
  return <span className="w-4 h-4 flex items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">{rank}</span>;
}

// ─── 排行行背景色 ───
function rankBg(rank: number) {
  if (rank === 1) return "bg-amber-50/60";
  if (rank === 2) return "bg-sky-50/60";
  if (rank === 3) return "bg-orange-50/60";
  return "";
}

// ─── 排行进度条颜色 ───
function rankBarColor(rank: number) {
  if (rank === 1) return "bg-amber-100";
  if (rank === 2) return "bg-sky-100";
  if (rank === 3) return "bg-orange-100";
  return "bg-slate-100";
}

// ─── 用户排行卡片 ───
function UserRankCard({
  title,
  dataMap,
}: {
  title: string;
  dataMap: Record<Scope, { name: string; dept: string; score: number }[]>;
}) {
  const [scope, setScope] = useState<Scope>("个人");
  const data = dataMap[scope];

  return (
    <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">{title}</h3>
        <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]">
          <span>本月</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>
      {/* Tab */}
      <div className="flex items-center gap-2 mb-3">
        {scopes.map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
              scope === s
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {/* List */}
      <div className="space-y-1">
        {data.map((item, idx) => {
          const rank = idx + 1;
          const maxScore = Math.max(...data.map((d) => d.score), 1);
          const pct = (item.score / maxScore) * 100;
          return (
            <div
              key={idx}
              className={`relative flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${rankBg(rank)} hover:bg-[hsl(var(--muted))] overflow-hidden`}
            >
              {/* 进度条背景 */}
              <div
                className={`absolute left-0 top-0 bottom-0 ${rankBarColor(rank)} transition-all duration-500`}
                style={{ width: `${pct}%`, opacity: 0.5 }}
              />
              <div className="relative z-10 w-5 flex justify-center shrink-0"><RankIcon rank={rank} /></div>
              <div className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                {item.name.charAt(0)}
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{item.name}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">{item.dept}</div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── 文档排行卡片 ───
function DocRankCard({ title, data }: { title: string; data: { name: string; count: number }[] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  return (
    <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">{title}</h3>
        <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]">
          <span>本月</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, idx) => {
          const rank = idx + 1;
          const pct = (item.count / maxCount) * 100;
          return (
            <div
              key={idx}
              className={`relative flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${rankBg(rank)} hover:bg-[hsl(var(--muted))] overflow-hidden`}
            >
              {/* 进度条背景 */}
              <div
                className={`absolute left-0 top-0 bottom-0 ${rankBarColor(rank)} transition-all duration-500`}
                style={{ width: `${pct}%`, opacity: 0.5 }}
              />
              <div className="relative z-10 w-5 flex justify-center shrink-0"><RankIcon rank={rank} /></div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-sm text-[hsl(var(--foreground))] truncate">{item.name}</div>
              </div>
              <div className="relative z-10 text-sm font-bold text-[hsl(var(--foreground))] shrink-0">{item.count}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1440px] mx-auto space-y-5">
      {/* ── 三列用户排行 ── */}
      <div className="grid lg:grid-cols-3 gap-4">
        <UserRankCard title="贡献排行" dataMap={contributionData} />
        <UserRankCard title="学习排行" dataMap={studyData} />
        <UserRankCard title="积分排行" dataMap={pointsData} />
      </div>

      {/* ── 两列文档排行 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <DocRankCard title="查阅排行" data={viewRankData} />
        <DocRankCard title="下载排行" data={downloadRankData} />
      </div>

      {/* ── 活跃用户 + 问答排行 ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <UserRankCard title="活跃用户排行" dataMap={activeUserData} />
        <UserRankCard title="问答贡献排行" dataMap={qaRankData} />
      </div>
    </motion.div>
  );
}
