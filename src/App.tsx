/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { MiningDashboard } from './pages/MiningDashboard';
import { Partners } from './pages/Partners';
import { Navbar } from './components/layout/Navbar';

import { RewardsProvider } from './hooks/useRewards';

export default function App() {
  return (
    <RewardsProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
          <Navbar />
          <main className="max-w-7xl mx-auto py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guide" element={<Dashboard />} />
              <Route path="/mining" element={<MiningDashboard />} />
              <Route path="/partners" element={<Partners />} />
            </Routes>
          </main>
          
          <footer className="py-12 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-slate-400 font-medium tracking-tight">
                &copy; {new Date().getFullYear()} One Shot. Built for privacy and speed.
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </RewardsProvider>
  );
}
