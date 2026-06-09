import { motion } from "framer-motion";
import { Construction } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function MyFeedback() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">评论反馈</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">我收到的评论与反馈</p>
      </motion.div>
      <motion.div variants={itemVariants} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
        </div>
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">页面开发中</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md">评论反馈功能正在建设中，敬请期待。</p>
      </motion.div>
    </motion.div>
  );
}
