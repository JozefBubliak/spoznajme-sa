import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Landing = lazy(() => import('@/pages/Landing'));
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const TopicCatalog = lazy(() => import('./pages/TopicCatalog'));
const TopicDetail = lazy(() => import('./pages/TopicDetail'));
const SimpleQuiz = lazy(() => import('./pages/SimpleQuiz'));
const AdvancedModule = lazy(() => import('./pages/AdvancedModule'));
const PairResults = lazy(() => import('./pages/PairResults'));
const DailyPulse = lazy(() => import('./pages/DailyPulse'));
const ConversationCards = lazy(() => import('./pages/ConversationCards'));
const BucketList = lazy(() => import('./pages/BucketList'));
const TajnyOdkaz = lazy(() => import('./pages/TajnyOdkaz'));
const NezabudniNaNU = lazy(() => import('./pages/NezabudniNaNU'));
const ZhodyBezOdmietnutia = lazy(() => import('./pages/ZhodyBezOdmietnutia'));
const TridsiestSestOtazok = lazy(() => import('./pages/TridsiestSestOtazok'));
const VztahKompas = lazy(() => import('./pages/VztahKompas'));
const ParovyDennik = lazy(() => import('./pages/ParovyDennik'));
const VzajomnyProfil = lazy(() => import('./pages/VzajomnyProfil'));
const RandePlanovat = lazy(() => import('./pages/RandePlanovat'));
const TazkeRozhovory = lazy(() => import('./pages/TazkeRozhovory'));
const ParovaHra = lazy(() => import('./pages/ParovaHra'));

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Landing />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<Layout />}>
          <Route path="/app" element={<Home />} />
          <Route path="/topics" element={<TopicCatalog />} />
          <Route path="/topic/:slug" element={<TopicDetail />} />
          <Route path="/quiz/simple/:slug" element={<SimpleQuiz />} />
          <Route path="/quiz/advanced/:slug" element={<AdvancedModule />} />
          <Route path="/results" element={<PairResults />} />
          <Route path="/pulse" element={<DailyPulse />} />
          <Route path="/karty" element={<ConversationCards />} />
          <Route path="/zoznam" element={<BucketList />} />
          <Route path="/tajny-odkaz" element={<TajnyOdkaz />} />
          <Route path="/nezabudni" element={<NezabudniNaNU />} />
          <Route path="/zhody" element={<ZhodyBezOdmietnutia />} />
          <Route path="/36-otazok" element={<TridsiestSestOtazok />} />
          <Route path="/kompas" element={<VztahKompas />} />
          <Route path="/dennik" element={<ParovyDennik />} />
          <Route path="/vzajomny-profil" element={<VzajomnyProfil />} />
          <Route path="/rande" element={<RandePlanovat />} />
          <Route path="/tazke-rozhovory" element={<TazkeRozhovory />} />
          <Route path="/hra" element={<ParovaHra />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>

          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
