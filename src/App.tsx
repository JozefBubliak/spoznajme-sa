

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './app/(unauth)/landing/page'
import FreePage from './app/free/page'
import LoginPage from './app/login/page'
import AppPage from './app/app/page'
import AdminPage from './app/admin/page'
import AuthCallback from './app/auth/callback/page'
import UpgradePage from './app/upgrade/page'
import ThankYouPage from './app/thank-you/page'
import FavoritesPage from './app/favorites/page'
import HistoryPage from './app/history/page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/free" element={<FreePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/upgrade" element={<UpgradePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

