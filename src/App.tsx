import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KnowledgeSpace from "./pages/KnowledgeSpace";
import KnowledgeApproval from "./pages/KnowledgeApproval";
import MyDepartment from "./pages/MyDepartment";
import AskExpert from "./pages/AskExpert";
import ProcessCenter from "./pages/ProcessCenter";
import DocLogs from "./pages/DocLogs";
import AICenter from "./pages/AICenter";
import Analytics from "./pages/Analytics";
import MyKnowledge from "./pages/MyKnowledge";
import PermissionControl from "./pages/PermissionControl";
import VersionManagement from "./pages/VersionManagement";
import DocumentControl from "./pages/DocumentControl";
import DocumentDetail from "./pages/DocumentDetail";
import PersonalAnalytics from "./pages/PersonalAnalytics";
import MyFollowing from "./pages/MyFollowing";
import SharedToMe from "./pages/SharedToMe";
import MyShares from "./pages/MyShares";
import SubordinateKnowledge from "./pages/SubordinateKnowledge";
import MyFeedback from "./pages/MyFeedback";
import MyPoints from "./pages/MyPoints";
import Leaderboard from "./pages/Leaderboard";
import StorageManagement from "./pages/StorageManagement";
import Classification from "./pages/Classification";
import TagManagement from "./pages/TagManagement";
import KnowledgeMonitor from "./pages/KnowledgeMonitor";
import LocalFileSync from "./pages/LocalFileSync";
import OAFileSync from "./pages/OAFileSync";
import WebsiteSync from "./pages/WebsiteSync";
import KnowledgeFlow from "./pages/KnowledgeFlow";
import QuestionTracking from "./pages/QuestionTracking";
import KnowledgeLoop from "./pages/KnowledgeLoop";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="knowledge-space" element={<KnowledgeSpace />} />
          <Route path="knowledge-approval" element={<KnowledgeApproval />} />
          <Route path="my-department" element={<MyDepartment />} />
          <Route path="ask-expert" element={<AskExpert />} />
          <Route path="process-center" element={<ProcessCenter />} />
          <Route path="doc-logs" element={<DocLogs />} />
          <Route path="ai-center" element={<AICenter />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="personal-analytics" element={<PersonalAnalytics />} />
          <Route path="my-knowledge" element={<MyKnowledge />} />
          <Route path="my-following" element={<MyFollowing />} />
          <Route path="shared-to-me" element={<SharedToMe />} />
          <Route path="my-shares" element={<MyShares />} />
          <Route path="subordinate-knowledge" element={<SubordinateKnowledge />} />
          <Route path="my-feedback" element={<MyFeedback />} />
          <Route path="my-points" element={<MyPoints />} />
          <Route path="permission-control" element={<PermissionControl />} />
          <Route path="storage-management" element={<StorageManagement />} />
          <Route path="classification" element={<Classification />} />
          <Route path="tag-management" element={<TagManagement />} />
          <Route path="knowledge-monitor" element={<KnowledgeMonitor />} />
          <Route path="version-management" element={<VersionManagement />} />
          <Route path="document-control" element={<DocumentControl />} />
          <Route path="document/:id" element={<DocumentDetail />} />
          <Route path="local-file-sync" element={<LocalFileSync />} />
          <Route path="oa-file-sync" element={<OAFileSync />} />
          <Route path="website-sync" element={<WebsiteSync />} />
          <Route path="knowledge-flow" element={<KnowledgeFlow />} />
          <Route path="question-tracking" element={<QuestionTracking />} />
          <Route path="knowledge-loop" element={<KnowledgeLoop />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
