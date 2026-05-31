import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Coins, Pickaxe, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRewards } from '../../hooks/useRewards';

const BINANCE_REFERRAL_CODE = "CPA_00SKT5XPM6";
const BINANCE_REFERRAL_LINK = `https://www.binance.com/activity/referral-entry/CPA?ref=${BINANCE_REFERRAL_CODE}`;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { points } = useRewards();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200"
            >
              <Zap size={22} fill="currentColor" className="group-hover:scale-110 transition-transform" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">ONESHOT</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mt-0.5">Ecosystem</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/mining" 
              className={`text-sm font-bold transition-colors px-4 py-2 rounded-xl flex items-center gap-2 ${
                location.pathname === '/mining' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Pickaxe size={16} />
              Mining
            </Link>
            <Link 
              to="/guide" 
              className={`text-sm font-bold transition-colors px-4 py-2 rounded-xl ${
                location.pathname === '/guide' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Trading Guide
            </Link>
            <Link 
              to="/partners" 
              className={`text-sm font-bold transition-colors px-4 py-2 rounded-xl flex items-center gap-2 ${
                location.pathname === '/partners' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Briefcase size={16} />
              Partners
            </Link>
            
            <div className="h-8 w-px bg-slate-100 mx-2" />

            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <Coins size={16} className="text-yellow-500" />
              <span className="text-sm font-black text-slate-900 tabular-nums">{points.toFixed(0)} Credits</span>
            </div>

            <motion.a 
              href={BINANCE_REFERRAL_LINK} 
              whileTap={{ scale: 0.95 }}
              target="_blank" 
              rel="noreferrer" 
              className="text-sm font-medium px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Join Binance
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link 
                to="/mining" 
                className={`block px-4 py-3 text-base font-bold rounded-xl ${
                  location.pathname === '/mining' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Mining Center
              </Link>
              <Link 
                to="/guide" 
                className={`block px-4 py-3 text-base font-bold rounded-xl ${
                  location.pathname === '/guide' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Trading Guide
              </Link>
              <Link 
                to="/partners" 
                className={`block px-4 py-3 text-base font-bold rounded-xl ${
                  location.pathname === '/partners' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Partners
              </Link>
              <div className="flex items-center justify-between px-4 py-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Coins size={20} className="text-yellow-500" />
                  <span className="font-black text-slate-900">Your Balance</span>
                </div>
                <span className="font-black text-blue-600">{points.toFixed(0)} Credits</span>
              </div>
              <motion.a 
                href={BINANCE_REFERRAL_LINK} 
                whileTap={{ scale: 0.98 }}
                target="_blank" 
                rel="noreferrer"
                className="block px-4 py-4 text-center bg-slate-900 text-white font-bold rounded-xl active:bg-slate-800"
              >
                Join Binance
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
