import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { queryClientInstance } from '@/lib/query-client';

import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Game from './pages/Game';
import Positions from './pages/Positions';
import SpinBottle from './pages/SpinBottle';
import TruthDare from './pages/TruthDare';
import Dice from './pages/Dice';
import Challenge from './pages/Challenge';
import FantasyGenerator from './pages/FantasyGenerator';
import SevenDays from './pages/SevenDays';
import Marathon from './pages/Marathon';
import NeverHaveI from './pages/NeverHaveI';

function AppRoutes() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/polohy" element={<Positions />} />
        <Route path="/positions" element={<Navigate to="/polohy" replace />} />
        <Route path="/spin-bottle" element={<SpinBottle />} />
        <Route path="/truth-dare" element={<TruthDare />} />
        <Route path="/dice" element={<Dice />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/fantasy" element={<FantasyGenerator />} />
        <Route path="/seven-days" element={<SevenDays />} />
        <Route path="/marathon" element={<Marathon />} />
        <Route path="/never-have-i" element={<NeverHaveI />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
const [notice,setNotice]=useState('');
useEffect(()=>{const receive=e=>setNotice(e.detail);window.addEventListener('adventure-notice',receive);return()=>window.removeEventListener('adventure-notice',receive);},[]);
  return (
    <>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
        <Toaster />{notice&&<div role="status" className="service-notice">{notice}<button onClick={()=>setNotice('')}>Zavrieť</button></div>}
      </QueryClientProvider>
    </>
  );
}

export default App;
