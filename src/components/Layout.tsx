import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Building2,
  MessageCircleQuestion,
  GitBranch,
  FileText,
  Sparkles,
  BarChart3,
  Library,
  Menu,
  X,
  Bell,
  Search,
  Bot,
  Send,
  Shield,
  User,
  ChevronDown,
  ChevronRight,
  Heart,
  Share2,
  Users,
  MessageSquare,
  Award,
  Trophy,
  Settings,
  Database,
  Layers,
  Tag,
  Monitor,
  Zap,
  Upload,
  Globe,
  Download,
  HardDrive,
  Link,
} from "lucide-react";

interface NavItem {
  path?: string;
  label: string;
  icon: React.ElementType;
  children?: { path: string; label: string; icon: React.ElementType }[];
}

const navItems: NavItem[] = [
  { path: "/", label: "工作台", icon: LayoutDashboard },
  {
    label: "个人中心",
    icon: User,
    children: [
      { path: "/my-department", label: "我的部门", icon: Building2 },
      { path: "/my-knowledge", label: "我的知识", icon: Library },
      { path: "/my-following", label: "我的关注", icon: Heart },
      { path: "/shared-to-me", label: "共享给我", icon: Share2 },
      { path: "/my-shares", label: "我的分享", icon: Share2 },
      { path: "/subordinate-knowledge", label: "下属知识", icon: Users },
      { path: "/my-feedback", label: "评论反馈", icon: MessageSquare },
      { path: "/my-points", label: "我的积分", icon: Award },
    ],
  },
  { path: "/knowledge-space", label: "知识空间", icon: BookOpen },
  { path: "/ai-center", label: "AI助手", icon: Sparkles },
  { path: "/ask-expert", label: "知识提问", icon: MessageCircleQuestion },
  {
    label: "知识采集",
    icon: Download,
    children: [
      { path: "/local-file-sync", label: "本地文件同步", icon: HardDrive },
      { path: "/oa-file-sync", label: "OA文件同步", icon: Link },
      { path: "/website-sync", label: "官网信息同步", icon: Globe },
    ],
  },
  { path: "/knowledge-approval", label: "知识审批", icon: ClipboardCheck },
  {
    label: "知识运营",
    icon: BarChart3,
    children: [
      { path: "/analytics", label: "运营看板", icon: BarChart3 },
      { path: "/leaderboard", label: "排行榜", icon: Trophy },
    ],
  },
  { path: "/process-center", label: "流程中心", icon: GitBranch },
  { path: "/doc-logs", label: "文档日志", icon: FileText },
  {
    label: "管控策略",
    icon: Settings,
    children: [
      { path: "/permission-control", label: "权限管控", icon: Shield },
      { path: "/storage-management", label: "储存管理", icon: Database },
      { path: "/classification", label: "分级分类", icon: Layers },
      { path: "/tag-management", label: "标签管理", icon: Tag },
      { path: "/knowledge-monitor", label: "知识监控", icon: Monitor },
    ],
  },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedNav, setExpandedNav] = useState<string | null>("个人中心");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "您好，我是知识管理平台AI助手。我可以帮您搜索知识、解答问题、辅助撰写文档。请问有什么可以帮您的？" },
  ]);

  const handleAiSend = () => {
    if (!aiInput.trim()) return;
    const userMsg = { role: "user", content: aiInput };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "我已收到您的问题，正在为您检索相关知识库...\n\n根据检索结果，建议您查看《养老保险业务操作手册》第三章，或向信息科技部的专家发起咨询。",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen z-40 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[hsl(var(--sidebar-border))]">
          <div className="w-9 h-9 rounded-lg shrink-0 overflow-hidden bg-white/10">
            <img src="./logo.png" alt="国民养老保险" className="w-full h-full object-contain" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-3 overflow-hidden whitespace-nowrap"
              >
                <div className="text-sm font-bold text-[hsl(var(--sidebar-fg))]">知识管理平台</div>
                <div className="text-[10px] text-[hsl(var(--sidebar-fg))]/60">国民养老保险</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const hasChildren = !!item.children;
            const isExpanded = expandedNav === item.label;
            const isChildActive = item.children?.some((c) => location.pathname === c.path);
            const active = location.pathname === item.path || isChildActive;
            const Icon = item.icon;

            if (hasChildren) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (!sidebarOpen) setSidebarOpen(true);
                      setExpandedNav(isExpanded ? null : item.label);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      active
                        ? "bg-[hsl(var(--navy-600))] text-white"
                        : "text-[hsl(var(--sidebar-fg))]/70 hover:bg-white/10 hover:text-[hsl(var(--sidebar-fg))]"
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${active ? "text-white" : ""}`} />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="whitespace-nowrap flex-1 text-left"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {sidebarOpen && (
                      <AnimatePresence>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        )}
                      </AnimatePresence>
                    )}
                  </button>
                  <AnimatePresence>
                    {isExpanded && sidebarOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-2 mt-1 space-y-0.5 border-l border-white/10 pl-2">
                          {item.children!.map((child) => {
                            const childActive = location.pathname === child.path;
                            const ChildIcon = child.icon;
                            return (
                              <button
                                key={child.path}
                                onClick={() => navigate(child.path)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  childActive
                                    ? "bg-[hsl(var(--navy-600))]/60 text-white"
                                    : "text-[hsl(var(--sidebar-fg))]/60 hover:bg-white/5 hover:text-[hsl(var(--sidebar-fg))]"
                                }`}
                              >
                                <ChildIcon className={`w-4 h-4 shrink-0 ${childActive ? "text-white" : ""}`} />
                                <span className="whitespace-nowrap">{child.label}</span>
                                {childActive && (
                                  <div className="ml-auto w-1 h-4 rounded-full bg-white/70" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path!)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-[hsl(var(--navy-600))] text-white"
                    : "text-[hsl(var(--sidebar-fg))]/70 hover:bg-white/10 hover:text-[hsl(var(--sidebar-fg))]"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? "text-white" : ""}`} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && sidebarOpen && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-1 h-5 rounded-full bg-white"
                  />
                )}
              </button>
            );
          })}
        </nav>

      </motion.aside>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-250"
        style={{ marginLeft: sidebarOpen ? 240 : 72 }}
      >
        {/* Top Header */}
        <header className="h-16 bg-[hsl(var(--navy-700))] flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="搜索知识、文档、专家..."
                className="pl-9 pr-4 py-2 w-80 text-sm rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[hsl(var(--gold-400))]" />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-white/20">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                刘
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-white">刘雨馨</div>
                <div className="text-xs text-white/60">战略发展部</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setAiChatOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[960px] max-w-[95vw] h-[720px] bg-[hsl(var(--card))] rounded-2xl shadow-[var(--shadow-elevated)] flex overflow-hidden border border-[hsl(var(--border))]"
            >
              {/* 左侧导航 */}
              <div className="w-56 border-r border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 flex flex-col">
                <div className="p-4 border-b border-[hsl(var(--border))]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full gradient-navy flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[hsl(var(--foreground))]">KM 智能助手</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                  {[
                    { label: "智能办公", active: true },
                    { label: "智能搜索", active: false },
                    { label: "数字分身", active: false },
                    { label: "个人知识库", active: false },
                    { label: "智能体", active: false },
                    { label: "业务知识库", active: false },
                    { label: "DeepSeek等场景", active: false },
                    { label: "OA知识库", active: false },
                    { label: "XiaoAI后台管理", active: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        item.active
                          ? "bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] font-medium border-r-2 border-[hsl(var(--navy-600))]"
                          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 右侧对话 */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="h-14 px-5 flex items-center justify-between border-b border-[hsl(var(--border))]">
                  <div className="text-sm font-bold text-[hsl(var(--foreground))]">智能办公</div>
                  <button
                    onClick={() => setAiChatOpen(false)}
                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {aiMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full gradient-navy flex items-center justify-center mr-2 shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[hsl(var(--navy-600))] text-white rounded-br-md"
                            : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] rounded-bl-md border border-[hsl(var(--border))]"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[hsl(var(--border))]">
                  <div className="rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus-within:border-[hsl(var(--ring))] focus-within:ring-1 focus-within:ring-[hsl(var(--ring))] transition-all overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
                        placeholder="输入您的问题..."
                        className="flex-1 text-sm bg-transparent outline-none"
                      />
                      <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]">
                        <Search className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleAiSend}
                        className="p-1.5 rounded-lg bg-[hsl(var(--navy-600))] text-white hover:bg-[hsl(var(--navy-700))] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 border-t border-[hsl(var(--border))] flex-wrap">
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
                        <FileText className="w-3 h-3" /> 文件选择
                      </button>
                      <button className="flex items-center gap-0.5 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors">
                        <Sparkles className="w-3 h-3" /> DeepSeek <ChevronRight className="w-3 h-3" />
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] bg-blue-50 text-blue-600 border border-blue-200">
                        <Zap className="w-3 h-3" /> 思考
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
                        <Upload className="w-3 h-3" /> 办公意图
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] bg-blue-50 text-blue-600 border border-blue-200">
                        <BarChart3 className="w-3 h-3" /> 内部资料
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] transition-colors border border-[hsl(var(--border))]">
                        <Globe className="w-3 h-3" /> 联网
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {["养老保险政策", "OA操作流程", "文档模板", "专家咨询"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setAiInput(tag)}
                        className="px-2.5 py-1 text-xs rounded-full bg-[hsl(var(--navy-50))] text-[hsl(var(--navy-600))] hover:bg-[hsl(var(--navy-100))] transition-colors border border-[hsl(var(--navy-200))]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
