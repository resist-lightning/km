import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  Heart,
  Bookmark,
  MessageSquare,
  Award,
  FileText,
  Star,
  Zap,
  ChevronRight,
  ShoppingBag,
  Gift,
  Coins,
  LogIn,
  CheckCircle,
  Quote,
  HelpCircle,
  Flame,
  Crown,
  Gem,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const levelTiers = [
  { levelRange: "Lv.1-4", title: "知识原住民", points: "0-500", condition: "注册即得", color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200", active: false },
  { levelRange: "Lv.5-9", title: "知识拓荒者", points: "500-2,000", condition: "发布 5 篇知识，点赞超过 5 次", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", active: false },
  { levelRange: "Lv.10-14", title: "知识探险家", points: "2,000-5,000", condition: "发布 15 篇知识，获赞>50 次，搜索>50 次", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200", active: true },
  { levelRange: "Lv.15-19", title: "知识领主", points: "5,000-10,000", condition: "发布 30 篇知识，获赞>200 次，全站排名前 100", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", active: false },
  { levelRange: "Lv.20+", title: "知识星球守护", points: "10,000+", condition: "发布 50 篇知识，获赞>500 次，全站排名前 20", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", active: false },
];

const pointRules = [
  { label: "首次登录", points: "+10", icon: LogIn, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "发布知识审核通过", points: "+50", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "被点赞", points: "+5", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "被收藏", points: "+10", icon: Bookmark, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "被引用", points: "+25", icon: Quote, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "解答求助", points: "+20", icon: HelpCircle, color: "text-sky-600", bg: "bg-sky-50" },
  { label: "连续5天登录", points: "+50", icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
];

const pointHistory = [
  { action: "发布知识审核通过《养老保险业务操作手册》", points: "+50", time: "今天 14:32", type: "earn" },
  { action: "被用户 王建国 点赞", points: "+5", time: "今天 11:20", type: "earn" },
  { action: "被用户 李智慧 收藏", points: "+10", time: "昨天 16:45", type: "earn" },
  { action: "解答求助：跨部门知识权限如何申请？", points: "+20", time: "昨天 10:08", type: "earn" },
  { action: "连续5天登录奖励", points: "+50", time: "3天前 09:00", type: "earn" },
  { action: "兑换 国小宝/国小贝钥匙链", points: "-300", time: "5天前 15:20", type: "spend" },
];

const mallItems = [
  { name: "国小宝/国小贝钥匙链", points: 300, icon: Gift, tag: "热销" },
  { name: "知识达人专属笔记本", points: 500, icon: FileText, tag: "限量" },
  { name: "星巴克咖啡券", points: 800, icon: Gift, tag: "新品" },
  { name: "京东E卡 50元", points: 1500, icon: ShoppingBag, tag: "超值" },
  { name: "盲盒手办", points: 2000, icon: Gift, tag: "限量" },
  { name: "AirPods Pro", points: 15000, icon: Gift, tag: "尊享" },
];

export default function PersonalAnalytics() {
  const [timeRange] = useState("近7天");

  const influenceStats = [
    { label: "阅读总量", value: "386", change: "+12%", icon: Eye, color: "text-[hsl(var(--navy-600))]" },
    { label: "获赞数量", value: "152", change: "+8%", icon: Heart, color: "text-rose-500" },
    { label: "收藏人数", value: "78", change: "+5%", icon: Bookmark, color: "text-amber-600" },
    { label: "评论数量", value: "42", change: "+15%", icon: MessageSquare, color: "text-emerald-600" },
  ];

  const coreStats = [
    { label: "知识积分", value: "3,500", icon: Award, color: "text-[hsl(var(--gold-600))]" },
    { label: "全站排名", value: "42", icon: TrendingUp, color: "text-[hsl(var(--navy-600))]" },
    { label: "我的文档", value: "24", icon: FileText, color: "text-emerald-600" },
    { label: "通过率", value: "91.7%", icon: Star, color: "text-sky-600" },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-5">
      {/* 用户档案卡 */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--navy-600))] to-[hsl(var(--navy-800))] text-white p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--gold-400))] to-[hsl(var(--gold-600))] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              刘
            </div>
            <div>
              <h1 className="text-2xl font-bold">刘雨馨</h1>
              <p className="text-white/60 text-sm mt-0.5">战略发展部 · 知识经纪人</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-xs font-medium">Lv.10</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[hsl(var(--gold-500))]/20 text-[hsl(var(--gold-300))] text-xs font-medium">知识探险家</span>
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">3,500</div>
              <div className="text-xs text-white/50 mt-1">知识积分</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold">42</div>
              <div className="text-xs text-white/50 mt-1">全站排名</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold">128</div>
              <div className="text-xs text-white/50 mt-1">贡献天数</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 核心数据 */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {coreStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{stat.value}</div>
            </div>
          );
        })}
      </motion.div>

      {/* 我的知识影响力 */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[hsl(var(--gold-600))]" />
            我的知识影响力
          </h3>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{timeRange}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {influenceStats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.label}</span>
                </div>
                <div className="text-xl font-bold text-[hsl(var(--foreground))]">{item.value}</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">{item.change}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 等级体系 */}
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Crown className="w-4 h-4 text-[hsl(var(--gold-600))]" />
            等级体系
          </h3>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">当前：Lv.10 知识探险家</span>
        </div>
        <div className="space-y-3">
          {levelTiers.map((tier) => (
            <div
              key={tier.levelRange}
              className={`flex items-center gap-4 p-3 rounded-xl border ${tier.active ? tier.border : "border-[hsl(var(--border))]"} ${tier.active ? tier.bg : "bg-[hsl(var(--card))]"} transition-colors`}
            >
              <div className={`w-10 h-10 rounded-lg ${tier.bg} flex items-center justify-center shrink-0`}>
                <span className={`text-xs font-bold ${tier.color}`}>{tier.levelRange}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--foreground))]">{tier.title}</span>
                  {tier.active && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[hsl(var(--gold-500))]/10 text-[hsl(var(--gold-600))]">当前等级</span>
                  )}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{tier.condition}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`text-sm font-bold ${tier.color}`}>{tier.points}</div>
                <div className="text-[10px] text-[hsl(var(--muted-foreground))]">积分要求</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 积分体系 + 积分商城 */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* 积分获取规则 */}
        <motion.div variants={itemVariants} className="lg:col-span-3 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
              <Coins className="w-4 h-4 text-[hsl(var(--gold-600))]" />
              积分体系
            </h3>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">做了就有反馈</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
            {pointRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <div key={rule.label} className={`p-3 rounded-xl ${rule.bg} border border-[hsl(var(--border))] text-center`}>
                  <Icon className={`w-5 h-5 ${rule.color} mx-auto mb-1.5`} />
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">{rule.label}</div>
                  <div className={`text-sm font-bold ${rule.color} mt-0.5`}>{rule.points}</div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[hsl(var(--border))] pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[hsl(var(--foreground))]">积分明细</h4>
              <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] flex items-center gap-0.5 transition-colors">
                查看全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {pointHistory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.type === "earn" ? "bg-emerald-50" : "bg-rose-50"}`}>
                      {item.type === "earn" ? <Coins className="w-3 h-3 text-emerald-600" /> : <ShoppingBag className="w-3 h-3 text-rose-500" />}
                    </div>
                    <span className="text-xs text-[hsl(var(--foreground))] truncate">{item.action}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className={`text-xs font-bold ${item.type === "earn" ? "text-emerald-600" : "text-rose-500"}`}>{item.points}</span>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] w-20 text-right">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 国小豆积分商城 */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[hsl(var(--navy-600))]" />
              国小豆积分商城
            </h3>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">当前积分 3,500</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[hsl(var(--gold-50))] to-[hsl(var(--navy-50))] border border-[hsl(var(--gold-200))] mb-4">
            <Gem className="w-8 h-8 text-[hsl(var(--gold-600))]" />
            <div>
              <div className="text-sm font-bold text-[hsl(var(--foreground))]">积分当钱花</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">知识贡献越多，兑换福利越多</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] ml-auto" />
          </div>

          <div className="space-y-2">
            {mallItems.map((item, idx) => {
              const Icon = item.icon;
              const canAfford = 3500 >= item.points;
              return (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors border border-transparent hover:border-[hsl(var(--border))]">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[hsl(var(--navy-600))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[hsl(var(--foreground))]">{item.name}</span>
                      <span className="px-1 py-0.5 rounded text-[9px] font-medium bg-[hsl(var(--gold-50))] text-[hsl(var(--gold-700))]">{item.tag}</span>
                    </div>
                    <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{item.points.toLocaleString()} 积分</div>
                  </div>
                  <button
                    className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${
                      canAfford
                        ? "bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))]"
                        : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed"
                    }`}
                    disabled={!canAfford}
                  >
                    {canAfford ? "兑换" : "积分不足"}
                  </button>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-3 py-2 rounded-lg text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] hover:bg-[hsl(var(--navy-50))] transition-colors border border-dashed border-[hsl(var(--border))]">
            进入国小豆积分商城查看更多商品
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
