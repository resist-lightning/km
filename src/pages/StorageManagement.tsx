import { motion } from "framer-motion";
import { Settings, FolderLock, FileLock, CreditCard, Wrench } from "lucide-react";

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
    title: "基础设置",
    icon: Settings,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    items: ["基本信息", "基础功能", "互动设置", "共享设置", "附件设置", "提醒设置", "打印设置", "文档新建设置", "Office文档设置"],
  },
  {
    title: "文件夹权限设置",
    icon: FolderLock,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    items: ["管理员", "维护权限"],
  },
  {
    title: "文档权限设置",
    icon: FileLock,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    items: ["默认共享人", "默认参与人", "新建权限", "下载权限", "删除权限", "复制权限", "移动权限"],
  },
  {
    title: "卡片设置",
    icon: CreditCard,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    items: ["事项关联设置", "属性显示设置"],
  },
  {
    title: "高级功能设置",
    icon: Wrench,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
    items: ["文档编号", "模板设置", "版本管理", "文档日志"],
  },
];

export default function StorageManagement() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">储存管理</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">知识库储存空间与基础配置管理</p>
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
        <div className="font-medium text-[hsl(var(--foreground))] mb-2">小提示</div>
        <ol className="list-decimal list-inside space-y-1">
          <li>通过此功能可实现批量维护多个文件夹的设置</li>
          <li>点击需要批量维护的项目后，先选择文件夹，再勾选需要维护的设置项</li>
        </ol>
      </motion.div>
    </motion.div>
  );
}
