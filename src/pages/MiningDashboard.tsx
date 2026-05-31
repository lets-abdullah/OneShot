import { motion, AnimatePresence } from 'motion/react';
import { useRewards } from '../hooks/useRewards';
import { 
  Zap, 
  TrendingUp, 
  Calendar, 
  BookOpen,
  CheckCircle2, 
  Trophy,
  Twitter,
  ExternalLink,
  Star,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Globe,
  BarChart3,
  Briefcase
} from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  link: string;
  icon: any;
}

const TASKS: Task[] = [
  {
    id: 'join_wa',
    title: 'Join WhatsApp Community',
    description: 'Get free Forex & Crypto trading signals daily.',
    reward: 100,
    link: 'https://whatsapp.com/channel/0029VbCNTM4CHDyjXz2DUE2i',
    icon: MessageSquare
  },
  {
    id: 'follow_x',
    title: 'Follow on X',
    description: 'Follow our official handle on X (formerly Twitter).',
    reward: 50,
    link: 'https://x.com/itx_mikezone',
    icon: Twitter
  }
];

export function MiningDashboard() {
  const { points, isMining, toggleMining, claimDaily, lastCheckIn, miningRate, completedTasks, completeTask } = useRewards();
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const handleDoTask = (task: Task) => {
    window.open(task.link, '_blank');
  };

  const handleClaimTask = (taskId: string, reward: number) => {
    setClaimingId(taskId);
    setTimeout(() => {
      completeTask(taskId, reward);
      setClaimingId(null);
    }, 1000);
  };

  const today = new Date().toDateString();
  const hasClaimedToday = lastCheckIn === today;

  return (
    <div className="px-4 space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black tracking-widest"
        >
          <Trophy size={14} fill="currentColor" />
          <span>REWARDS & QUEST CENTER</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900"
        >
          Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Influence</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-500 text-lg font-medium"
        >
          Complete daily quests, stay active, and grow your network to earn OneShot Credits (OSC).
        </motion.p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star size={120} />
          </div>
          <p className="text-indigo-400 font-bold uppercase tracking-widest text-[10px] relative z-10">Total Credits</p>
          <div className="flex items-end gap-2 mt-2 relative z-10">
            <span className="text-5xl font-black tabular-nums">{Math.floor(points)}</span>
            <span className="text-xl font-bold text-slate-500 mb-1">OSC</span>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-400 relative z-10">
            <TrendingUp size={14} className="text-emerald-400" />
            <span>{(miningRate * 3600).toFixed(1)} credits generated per hour</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isMining ? 'bg-emerald-50 text-emerald-600 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
              {isMining ? 'Active' : 'Inactive'}
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-bold text-slate-900">Energy Generator</h4>
            <p className="text-slate-500 text-sm">Earn credits passively while the generator is active.</p>
          </div>
          <button 
            onClick={toggleMining}
            className={`mt-6 w-full py-3 rounded-xl font-black text-sm transition-all ${
              isMining ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            }`}
          >
            {isMining ? 'PAUSE GENERATOR' : 'START GENERATOR'}
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <Calendar size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Bonus</span>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-bold text-slate-900">Daily Reward</h4>
            <p className="text-slate-500 text-sm">Return every 24 hours to claim your bonus credits.</p>
          </div>
          <button 
            disabled={hasClaimedToday}
            onClick={() => claimDaily()}
            className={`mt-6 w-full py-3 rounded-xl font-black text-sm transition-all ${
              hasClaimedToday ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200'
            }`}
          >
            {hasClaimedToday ? 'CLAIMED TODAY' : 'CLAIM 10 CREDITS'}
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              Available Quests
              <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md">
                {TASKS.length - completedTasks.length} New
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {TASKS.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <motion.div 
                  key={task.id}
                  whileHover={{ x: 5 }}
                  className={`p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row items-center gap-6 ${
                    isCompleted ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`p-4 rounded-2xl ${isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}>
                    <task.icon size={28} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className={`text-lg font-bold ${isCompleted ? 'text-slate-400' : 'text-slate-900'}`}>{task.title}</h4>
                    <p className={`text-sm ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>{task.description}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black">
                      <Zap size={12} fill="currentColor" />
                      +{task.reward}
                    </div>
                    {isCompleted ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm px-6">
                        <CheckCircle2 size={18} />
                        Completed
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleDoTask(task)}
                          className="px-6 py-2 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 flex items-center gap-2"
                        >
                          DO TASK <ExternalLink size={14} />
                        </button>
                        <button 
                          onClick={() => handleClaimTask(task.id, task.reward)}
                          disabled={claimingId === task.id}
                          className="px-6 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {claimingId === task.id ? 'CLAIMING...' : 'CLAIM'}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Signals Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
              <TrendingUp size={80} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Zap size={24} fill="currentColor" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-400/30 px-2 py-1 rounded-full">VIP Signals</span>
              </div>
              <div>
                <h4 className="text-2xl font-black leading-tight">Free Trading Signals</h4>
                <p className="text-emerald-50/80 text-sm mt-2 font-medium">Get accurate Forex and Crypto entry/exit points daily in our WhatsApp community.</p>
              </div>
              <button 
                onClick={() => window.open('https://whatsapp.com/channel/0029VbCNTM4CHDyjXz2DUE2i', '_blank')}
                className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all active:scale-95 shadow-lg shadow-emerald-900/10"
              >
                JOIN WHATSAPP <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Tips Card */}
          <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-4">Pro Tips</h4>
            <ul className="space-y-4">
              {[
                "Keep the Energy Generator running for passive OSC.",
                "Check daily for new one-time quests.",
                "Complete all quests to maximize your influence."
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
