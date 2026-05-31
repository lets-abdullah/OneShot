import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  Wallet,
  TrendingUp,
  Globe,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  MessageCircle,
  Zap,
  Users,
  Award,
  Download,
  FileText,
  Star
} from 'lucide-react';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  content: React.ReactNode;
}

const BINANCE_REFERRAL_CODE = "CPA_00SKT5XPM6";
const BINANCE_REFERRAL_LINK = `https://www.binance.com/activity/referral-entry/CPA?ref=${BINANCE_REFERRAL_CODE}`;

const Certificate = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      id="oneshot-certificate"
      style={{
        width: '1123px',
        height: '794px',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Target Image Background */}
      <img
        src="/certificate-bg.png"
        alt="Upload certificate-bg.png to public folder"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        onError={(e) => {
          // Fallback if image is missing
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Fallback pattern if image is missing */}
      <div className="absolute inset-0 z-[-1] opacity-10 flex items-center justify-center">
        <Zap size={400} />
      </div>

      {/* Certificate Content */}
    </div>
  );
});

Certificate.displayName = 'Certificate';

export function Dashboard() {
  const [activeStep, setActiveStep] = useState(1);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      const element = certificateRef.current;

// Wait for images to load just in case
      const images = element.getElementsByTagName('img') as HTMLCollectionOf<HTMLImageElement>;
      const loadPromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(loadPromises);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000',
        width: 1123,
        height: 794,
        logging: false,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('oneshot-certificate');
          if (el) {
            el.style.transform = 'none';
            el.style.margin = '0';
            el.style.display = 'flex';
          }

          // Style cleanup to prevent oklab parsing errors
          const styles = clonedDoc.getElementsByTagName('style');
          for (let i = styles.length - 1; i >= 0; i--) {
            styles[i].remove();
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1123, 794]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 1123, 794, undefined, 'FAST');
      pdf.save('ONESHOT-Certificate.pdf');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Make sure you have uploaded "certificate-bg.png" to the public folder.');
    } finally {
      setIsDownloading(false);
    }
  };

  const STEPS: Step[] = [
    {
      id: 1,
      title: "Setup Binance",
      description: "Your gateway to the financial markets. Follow this to secure your account and funds.",
      icon: ShieldCheck,
      color: "bg-blue-600",
      content: (
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/fmkXluu-wV8"
              title="Binance Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 italic">
            <p className="text-blue-700 text-sm font-bold flex items-center gap-2">
              <Zap size={16} /> Beginner Tip: Safety first. Use a separate email for your trading accounts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Step 1: Registration</h4>
              <p className="text-xs text-slate-500 mb-3">Sign up using our verified partner link to get 10% off trading fees.</p>
              <a href={BINANCE_REFERRAL_LINK} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-bold hover:underline">
                Link: {BINANCE_REFERRAL_LINK}
              </a>
            </div>
            <div className="p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Step 2: KYC Identity</h4>
              <p className="text-xs text-slate-500">Complete 'Verified' status. This allows you to withdraw up to 100 BTC daily.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Master the Basics",
      description: "Understanding the interface and key terms before risking a single dollar.",
      icon: Wallet,
      color: "bg-emerald-600",
      content: (
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/lEk4cSA7cqc?list=PLqJjKuP8g79xgdI8SvWfe7LndcqKE_yUC"
              title="Trading Basics"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { tag: "Spot", desc: "Buying assets to own them long term." },
              { tag: "Futures", desc: "Predicting price movement direction." },
              { tag: "Leverage", desc: "Controlling a larger position size." },
              { tag: "Spread", desc: "Difference between buy & sell price." },
              { tag: "Liquidity", desc: "How easy it is to enter/exit." }
            ].map(term => (
              <div key={term.tag} className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                <span className="block font-black text-slate-900 text-[10px] uppercase">{term.tag}</span>
                <p className="text-[9px] text-slate-500 leading-tight">{term.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "ONESHOT Strategy",
      description: "Our signature high-probability entry system for consistent gains.",
      icon: TrendingUp,
      color: "bg-amber-500",
      content: (
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/e-QmGJU1XYc"
              title="Trading Strategy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center shrink-0 font-black text-amber-700 text-sm">1</div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">Wait for the Wick</h5>
                <p className="text-xs text-slate-600 leading-relaxed">Only enter when price rejects a key support/resistance level with a long candle wick. This shows strong market reversal.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center shrink-0 font-black text-amber-700 text-sm">2</div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">The 1:2 Reward Ratio</h5>
                <p className="text-xs text-slate-600 leading-relaxed">Safety is built-in. If you risk $10, your target must be $20. This allows for a lower win rate while staying highly profitable.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Risk Management",
      description: "The secret of the top 1% traders. Learn to manage your downside.",
      icon: CheckCircle2,
      color: "bg-rose-500",
      content: (
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/7f2bpEwiJCY"
              title="Risk Management"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
            <h4 className="text-base font-black mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-rose-400" /> Professional Stop-Loss
            </h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Never enter a trade without an exit plan. A 'Stop-Loss' order is your insurance policy. If the trade goes against you, the system closes it automatically to prevent big losses.</p>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-center flex-1">
                <span className="block text-[8px] uppercase tracking-widest text-slate-500 mb-1">Max Risk</span>
                <span className="text-xl font-black text-rose-400">2%</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="text-center flex-1">
                <span className="block text-[8px] uppercase tracking-widest text-slate-500 mb-1">Per Trade</span>
                <span className="text-xs font-bold text-slate-300">Equity Protection</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Scaling to $12k",
      description: "How to reach five figures yearly through compounding and rebates.",
      icon: Globe,
      color: "bg-indigo-600",
      content: (
        <div className="space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/jxOOw26BrZ8"
              title="Compounding Strategy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-slate-600 text-sm font-medium">To hit $1k/month ($12k/year), we use a dual-engine system:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp size={20} />
              </div>
              <div>
                <h5 className="text-sm font-black text-slate-900">Compound Gains</h5>
                <p className="text-xs text-slate-500 leading-relaxed italic">"The 8th wonder of the world." Reinvesting 50% of monthly profits for exponential growth.</p>
              </div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h5 className="text-sm font-black text-slate-900">Rebate Income</h5>
                <p className="text-xs text-slate-500 leading-relaxed italic">Earn passive income while you sleep through the partner referral program.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Earn Certificate",
      description: "Get your official ONESHOT Certification of Completion and share your success.",
      icon: Award,
      color: "bg-amber-400",
      content: (
        <div className="space-y-8 py-4">
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl text-center">
            <Award size={48} className="mx-auto text-amber-500 mb-4" />
            <h4 className="text-xl font-black text-slate-900 mb-2">You Made It!</h4>
            <p className="text-sm text-slate-600 mb-6">You've completed the full roadmap. You are now officially ready to trade with the ONESHOT strategy.</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </span>
                ) : (
                  <>
                    <Download size={18} /> Download official PDF
                  </>
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl"
              >
                <Globe size={18} /> Share on LinkedIn
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[1123px] scale-[0.3] sm:scale-[0.5] lg:scale-[0.7] origin-top mx-auto">
              <Certificate ref={certificateRef} />
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Left Side: Navigation Stepper */}
        <div className="lg:w-1/3 space-y-4">
          <div className="mb-6 md:mb-8 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase border border-emerald-100">
                Guide Price: $0
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase">
                <ShieldCheck size={12} className="text-emerald-400" /> Verified Partner
              </div>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">Roadmap to $12,000 Yearly</span>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">Beginner Trading Guide</h1>
            <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed px-2 lg:px-0">
              Follow these 5 steps to reach your financial milestones. <br className="hidden lg:block" />
              <span className="font-bold text-slate-900 italic">"Lets grow with ONESHOT"</span>
            </p>
          </div>

          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-3 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            {STEPS.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                whileTap={{ scale: 0.95 }}
                className={`min-w-[140px] md:min-w-[180px] lg:min-w-0 text-left p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all flex items-center gap-3 md:gap-4 shrink-0 lg:shrink group ${activeStep === step.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200'
                    : 'bg-white border-slate-200 text-slate-900 hover:border-blue-300'
                  }`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 ${activeStep === step.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'
                  }`}>
                  <step.icon size={16} className={activeStep === step.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-tighter opacity-70 ${activeStep === step.id ? 'text-blue-100' : 'text-slate-400'
                      }`}>Step {step.id}</span>
                    {activeStep > step.id && (
                      <CheckCircle2 size={12} className={activeStep === step.id ? 'text-white' : 'text-emerald-500'} />
                    )}
                  </div>
                  <h3 className="font-bold truncate text-xs md:text-base leading-tight">{step.title}</h3>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 p-8 bg-slate-900 rounded-[2.5rem] border border-white/10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2 relative z-10">
              <MessageSquare size={20} className="text-emerald-400" />
              Grow with ONESHOT
            </h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed relative z-10">
              Join the private community of 5,000+ traders scaling their way to $12k/year. Get real-time signals and help.
            </p>
            <div className="space-y-3 relative z-10">
              <motion.a
                href="https://whatsapp.com/channel/0029VbCNTM4CHDyjXz2DUE2i"
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/40"
              >
                Join Community <MessageCircle size={20} />
              </motion.a>
              <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest pt-2">
                <ShieldCheck size={14} className="text-emerald-500" /> 100% Secure Access
              </div>
            </div>

            {/* Background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>
          </div>
        </div>

        {/* Right Side: Step Content */}
        <div className="lg:w-2/3">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 p-5 md:p-12 shadow-2xl shadow-slate-200/50 min-h-[400px] md:min-h-[500px] flex flex-col"
          >
            {STEPS.map((step) => step.id === activeStep && (
              <div key={step.id} className="flex-1 flex flex-col">
                <div className="mb-6 md:mb-10">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-3xl ${step.color} text-white flex items-center justify-center mb-6 md:mb-8 shadow-xl shadow-current/20`}>
                    <step.icon size={24} md:size={28} />
                  </div>
                  <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tighter leading-tight">{step.title}</h2>
                  <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">{step.description}</p>
                </div>

                <div className="flex-1 bg-slate-50/50 -mx-5 md:-mx-12 px-5 md:px-12 py-8 md:py-12 border-y border-slate-100 mb-6 font-medium">
                  {step.content}
                </div>

                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <span className="text-sm md:text-base font-black text-slate-300 uppercase tracking-[0.2em]">
                    Phase 0{step.id}
                  </span>
                  <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                    {activeStep > 1 && (
                      <motion.button
                        onClick={() => setActiveStep(activeStep - 1)}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors text-sm md:text-base"
                      >
                        Back
                      </motion.button>
                    )}
                    {activeStep < STEPS.length ? (
                      <motion.button
                        onClick={() => setActiveStep(activeStep + 1)}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 sm:flex-none px-6 md:px-8 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-sm md:text-base"
                      >
                        Continue <ArrowRight size={18} />
                      </motion.button>
                    ) : (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Link
                          to="/"
                          className="flex-1 sm:flex-none px-6 md:px-8 py-2.5 md:py-3 bg-emerald-600 text-white rounded-[1rem] font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 text-sm md:text-base h-full"
                        >
                          Complete Guide <CheckCircle2 size={18} />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
