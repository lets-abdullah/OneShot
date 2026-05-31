import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  Globe, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Zap,
  Users,
  Copy,
  Share2,
  MessageCircle,
  Link as LinkIcon,
  Heart,
  Coffee,
  Coins
} from 'lucide-react';
import React, { useState } from 'react';

export function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const referralLink = "https://oneshot.app/join?ref=EARN12K";
  const binanceReferralCode = "CPA_00SKT5XPM6";
  const binanceReferralLink = `https://www.binance.com/activity/referral-entry/CPA?ref=${binanceReferralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join ONESHOT - $12k Yearly Earning Program',
          text: 'Start your journey to financial freedom with the ONESHOT Trading Guide and Affiliate System.',
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const proceedToGuide = () => {
    setShowPopup(false);
    navigate('/guide');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="text-center py-24 md:py-32 px-4 relative overflow-hidden bg-slate-950 text-white rounded-[3rem] mt-4 mx-4">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] md:text-sm font-black uppercase tracking-[0.3em] mb-8">
            The Gold Standard for Digital Wealth
          </span>
          <h1 
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] lg:max-w-5xl mx-auto mb-6 md:mb-10 px-2"
          >
            EARN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">$12,000+</span> <br />
            EVERY YEAR.
          </h1>
          <p 
            className="mt-4 md:mt-8 text-base md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-10 md:mb-12 px-4"
          >
            Join the elite <span className="text-white font-bold italic">ONESHOT Ecosystem</span>. We provide the strategy, the brokers, and the support. You provide the discipline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              onClick={handleClaim}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3"
            >
              Get the Trading Guide <ArrowRight size={22} />
            </motion.button>
            <motion.button 
              onClick={handleShare}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              Invite Friends <Share2 size={22} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Trust & Community Section - SHIFTED TO TOP */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest"
            >
              <Heart size={14} fill="currentColor" />
              <span>COMMUNITY FIRST PHILOSOPHY</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight text-left">
              A Community That <span className="text-blue-600">Earns Together.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed text-left">
              We are doing great effort for you guys. Our mission is to build a transparent ecosystem where everyone has the tools to succeed. 
              There are <span className="text-slate-900 font-black italic">no hidden plans, no monthly subscriptions</span>, and no premium gates. 
              Everything we build—from the trading guide to the signals community—is free for all of you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 text-left">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <span className="font-bold text-slate-700">100% Free Tools</span>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <span className="font-bold text-slate-700">Open Community</span>
              </div>
            </div>
          </div>

          {/* Support Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 text-left"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Coffee size={120} />
            </div>
            <div className="relative z-10 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-2xl text-blue-400">
                  <Zap size={24} fill="currentColor" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-widest">Support Our Team</h4>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed text-left">
                If you find our efforts valuable and want to encourage the team, you can send a small contribution of <span className="text-white font-bold">$10 USDT</span>. 
                This is purely voluntary to keep our servers running and our team motivated. 
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck size={20} className="text-blue-400 shrink-0" />
                <p className="text-xs text-slate-300 font-medium italic text-left">
                  "Don't worry if you aren't willing or able to pay—you will still have full access to all our tools and WhatsApp community."
                </p>
              </div>

              <div className="space-y-3 pt-4 text-left">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">USDT DEPOSIT ADDRESS (TRC20)</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-blue-300 truncate">
                    TDfcpuGByZGSqv8GviHvzrrTGDuRCVdHkf
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText("TDfcpuGByZGSqv8GviHvzrrTGDuRCVdHkf");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                  >
                    <Copy size={16} /> {copied ? "COPIED" : "COPY ADDRESS"}
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                  <Coins size={12} className="text-amber-500" /> TRON NETWORK (TRC20) ONLY
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Verified Brokers", desc: "We only partner with top-tier, licensed brokers like Binance for maximum security.", color: "text-blue-500" },
          { icon: TrendingUp, title: "Proven Strategy", desc: "Our ONESHOT trading methodology is designed for consistent, low-risk capital growth.", color: "text-emerald-500" },
          { icon: Globe, title: "Global Access", desc: "Reach your financial goals from anywhere in the world with instant USDT payouts.", color: "text-purple-500" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-blue-200 transition-all group">
            <item.icon size={48} className={`${item.color} mb-8 group-hover:scale-110 transition-transform`} />
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Partner: Binance */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-10 md:gap-12 relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-[10px] md:text-xs font-black uppercase mb-6 md:mb-8">
              <CheckCircle2 size={14} /> Official Ecosystem Partner
            </div>
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-tight">Trade on Binance <br className="hidden md:block" /> with ONESHOT.</h2>
            <p className="text-base md:text-xl opacity-90 mb-8 md:mb-10 max-w-xl mx-auto md:mx-0 font-medium leading-relaxed">
              We've integrated with the world's largest exchange to ensure your assets are protected and your trades execute at lightning speed.
            </p>
            <motion.a 
              href={binanceReferralLink} 
              whileTap={{ scale: 0.95 }}
              target="_blank" 
              rel="noreferrer" 
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-orange-900/20"
            >
              Create Binance Account <ArrowRight size={22} />
            </motion.a>
          </div>
          <div className="relative z-10 w-full md:w-1/3 flex justify-center">
             <div className="w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-inner">
                <span className="text-5xl md:text-8xl font-black text-white">B</span>
             </div>
          </div>
          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>



      {/* WhatsApp Community Feature - Integrated */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-emerald-600 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-10 md:gap-12 relative overflow-hidden">
          <div className="relative z-10 flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">Grow With <br className="hidden md:block" /> The Community.</h2>
            <p className="text-base md:text-xl opacity-90 mb-10 max-w-xl mx-auto md:mx-0 font-medium leading-relaxed">
              Don't trade alone. Join our private WhatsApp group for daily signals, setup breakdowns, and 24/7 support from senior members.
            </p>
            <motion.a 
              href="https://whatsapp.com/channel/0029VbCNTM4CHDyjXz2DUE2i" 
              whileTap={{ scale: 0.95 }}
              target="_blank" 
              rel="noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-emerald-600 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-emerald-900/20"
            >
              Join WhatsApp Now <MessageCircle size={24} />
            </motion.a>
          </div>
          <div className="relative z-10 flex justify-center w-full md:w-1/4">
            <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl">
               <MessageCircle size={80} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section - Fee $0 */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] md:text-xs font-black uppercase mb-6 border border-emerald-500/20">
              Limited Time Access
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-4 tracking-tighter leading-tight">
              Get the ONESHOT <br className="md:hidden" /> Trading Guide
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-slate-500 line-through text-xl md:text-2xl font-bold">$199.00</span>
              <span className="text-white text-4xl md:text-5xl font-black">Fees $0</span>
            </div>
            <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium">
              Join 500+ successful traders who started with zero experience. <br /> 
              <span className="text-blue-400 font-black italic mt-2 block">"Let's grow with ONESHOT"</span>
            </p>
            <motion.button 
              onClick={handleClaim}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-blue-500/30"
            >
              Get Guide for $0 <ExternalLink size={20} />
            </motion.button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 tracking-tighter leading-tight">Your Journey <br className="hidden md:block" /> to $12k Starts Now.</h2>
          <p className="text-lg md:text-xl text-slate-500 mb-10 md:mb-12 font-medium">No experience required. Just follow the beginner-friendly roadmap.</p>
          <motion.button 
            onClick={handleClaim}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200"
          >
            Access Full Guide <ArrowRight size={24} />
          </motion.button>
        </div>
      </section>

      {/* Congratulation Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 max-w-xl w-full text-center relative overflow-y-auto max-h-[90vh] shadow-[0_0_100px_rgba(59,130,246,0.3)]"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-white"
                >
                  <Zap className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
                </motion.div>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 tracking-tighter">Congratulations!</h2>
              <p className="text-base md:text-lg text-slate-500 mb-6 md:mb-8 font-medium leading-relaxed">
                Your $0 access to the <span className="text-blue-600 font-bold">ONESHOT Trading Guide</span> has been verified. You've just saved $199.00 today.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Status</span>
                  <span className="text-emerald-600 font-black">ACTIVE</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Price</span>
                  <span className="text-slate-900 font-black">$0 (Free)</span>
                </div>
              </div>

              <motion.button 
                onClick={proceedToGuide}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200"
              >
                Start Learning Now <ArrowRight size={22} />
              </motion.button>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" /> Secure Protocol Verified
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
