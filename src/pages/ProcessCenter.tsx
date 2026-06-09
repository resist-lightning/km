import { motion } from "framer-motion";
import {
  FilePlus,
  FileEdit,
  FileX,
  FileCheck,
  Archive,
  BookOpen,
  Send,
  Stamp,
} from "lucide-react";

const lifecycleFlows = [
  { title: "文件预审流程", desc: "文件正式定稿前可提交预审流程评估编制的必要性，审批通过后提前占号", icon: FileCheck, color: "text-[hsl(var(--navy-600))] bg-[hsl(var(--navy-50))]" },
  { title: "文件新增流程", desc: "评估文件的合规性、编写质量、使用范围、生效时间等内容，通过后进入受控", icon: FilePlus, color: "text-emerald-600 bg-emerald-50" },
  { title: "文件复审流程", desc: "文件到期前30天自动触发，评估文件是否继续在用/更新/作废", icon: FileEdit, color: "text-sky-600 bg-sky-50" },
  { title: "文件更新流程", desc: "文件修订需提交变更流程，审批通过后按版本本规则进行升级", icon: FileEdit, color: "text-violet-600 bg-violet-50" },
  { title: "文件作废流程", desc: "文件作废需提交作废流程，文件作废后将加盖作废受控章，后续仅供参考", icon: FileX, color: "text-rose-600 bg-rose-50" },
  { title: "文件归档流程", desc: "流程作废后对文件进行归档后流程发起归档", icon: Archive, color: "text-amber-600 bg-amber-50" },
  { title: "文件新增流程（在线编辑）", desc: "评估文件的合规性、编写质量、使用范围、生效时间等内容，通过后进入受控", icon: FilePlus, color: "text-teal-600 bg-teal-50" },
  { title: "文件更新流程（在线编辑）", desc: "文件修订需提交变更流程，审批通过后按版本本规则进行升级", icon: FileEdit, color: "text-indigo-600 bg-indigo-50" },
];

const usageFlows = [
  { title: "文件补发流程", desc: "当文件使用范围需要扩大时，可提交文件补发流程扩大使用范围", icon: Send, color: "text-[hsl(var(--navy-600))] bg-[hsl(var(--navy-50))]" },
  { title: "文件借阅流程", desc: "工作中如需获取受控文件的使用权限，可提交文件借阅流程", icon: BookOpen, color: "text-emerald-600 bg-emerald-50" },
  { title: "文件外发流程", desc: "工作中如需将受控文件外发给外部人员时，可提交文件外发流程", icon: Send, color: "text-sky-600 bg-sky-50" },
  { title: "纸质文件流程", desc: "工作中如需获取纸质文件，可提交纸质文件申请流程", icon: FileCheck, color: "text-violet-600 bg-violet-50" },
  { title: "文件签收流程", desc: "电子文件下发后，记录文件签收人以及签收信息", icon: Stamp, color: "text-amber-600 bg-amber-50" },
  { title: "文件培训流程", desc: "文件生成后，对需要培训的文件发起文件培训流程，由培训讲师选择自己所需", icon: BookOpen, color: "text-teal-600 bg-teal-50" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function ProcessCenter() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
          <div>
            <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">文件全生命周期管理</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">覆盖文件从预审、新增、复审、更新到作废归档的完整流程</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lifecycleFlows.map((flow, idx) => {
              const Icon = flow.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5 hover:border-[hsl(var(--navy-200))] hover:shadow-[var(--shadow-card)] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${flow.color.split(" ")[1]} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${flow.color.split(" ")[0]}`} />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-1.5">{flow.title}</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-4 line-clamp-2">{flow.desc}</p>
                  <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] font-medium transition-colors opacity-0 group-hover:opacity-100">
                    快捷发起 →
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="pt-4">
            <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">文件使用过程管理</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">覆盖文件补发、借阅、外发、签收、培训等使用环节流程</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {usageFlows.map((flow, idx) => {
              const Icon = flow.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-5 hover:border-[hsl(var(--navy-200))] hover:shadow-[var(--shadow-card)] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${flow.color.split(" ")[1]} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${flow.color.split(" ")[0]}`} />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[hsl(var(--foreground))] mb-1.5">{flow.title}</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-4 line-clamp-2">{flow.desc}</p>
                  <button className="text-xs text-[hsl(var(--navy-600))] hover:text-[hsl(var(--navy-700))] font-medium transition-colors opacity-0 group-hover:opacity-100">
                    快捷发起 →
                  </button>
                </motion.div>
              );
            })}
          </div>
    </motion.div>
  );
}
