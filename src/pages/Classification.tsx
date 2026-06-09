import { motion } from "framer-motion";
import { Layers, Shield, FileText, Lock, Globe, Eye } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const settingBlocks = [
  {
    title: "密级设置",
    icon: Shield,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    items: ["绝密", "机密", "秘密", "内部公开", "对外公开"],
  },
  {
    title: "分类体系",
    icon: Layers,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    items: ["制度规范", "业务流程", "培训教材", "法规政策", "数据报告", "项目管理", "产品文档"],
  },
  {
    title: "文档类型",
    icon: FileText,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    items: ["Word", "Excel", "PPT", "PDF", "图片", "视频", "音频", "压缩包", "其他"],
  },
  {
    title: "访问权限分级",
    icon: Lock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    items: ["仅自己", "部门可见", "跨部门共享", "全公司公开", "外部合作方"],
  },
  {
    title: "公开范围",
    icon: Globe,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
    items: ["全员可见", "指定部门", "指定人员", "角色权限", "动态权限"],
  },
  {
    title: "审计等级",
    icon: Eye,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
    items: ["高频审计", "常规审计", "低频审计", "免审计"],
  },
];

export default function Classification() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">分级分类</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">知识文档的密级、分类与权限分级管理</p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {settingBlocks.map((block) => {
          const Icon = block.icon;
          return (
            <div key={block.title} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg ${block.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${block.iconColor}`} />
                </div>
                <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">{block.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {block.items.map((item) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-lg text-sm text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--navy-50))] hover:text-[hsl(var(--navy-600))] hover:border-[hsl(var(--navy-200))] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="bg-[hsl(var(--muted))] rounded-xl p-5 text-sm text-[hsl(var(--muted-foreground))]">
        <div className="font-medium text-[hsl(var(--foreground))] mb-2">使用说明</div>
        <ol className="list-decimal list-inside space-y-1">
          <li>分级分类用于对知识文档进行多维度的安全等级和类别划分</li>
          <li>密级设置与访问权限分级联动，确保敏感信息受控传播</li>
          <li>修改分类体系将影响所有关联文档的检索和权限判定</li>
        </ol>
      </motion.div>
    </motion.div>
  );
}
