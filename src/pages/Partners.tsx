import { motion } from 'motion/react';
import { useRewards } from '../hooks/useRewards';
import { 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Globe,
  BarChart3,
  Trophy,
  Zap
} from 'lucide-react';
import { useState } from 'react';

interface Partner {
  id: string;
  title: string;
  description: string;
  reward: number;
  link: string;
  icon: any;
  rewardable: boolean;
}

const PARTNERS: Partner[] = [
  {
    id: 'tradingview',
    title: 'TradingView',
    description: 'The world’s most advanced charting platform for traders and investors.',
    reward: 0,
    link: 'https://www.tradingview.com/pricing/?share_your_love=Earn_Money-Just',
    icon: BarChart3,
    rewardable: false
  },
  {
    id: 'hostinger',
    title: 'Hostinger',
    description: 'High-performance web hosting designed for speed and reliability.',
    reward: 0,
    link: 'https://hostinger.com',
    icon: Globe,
    rewardable: false
  },
  {
    id: 'binance_partner',
    title: 'Binance Exchange',
    description: 'The world’s leading cryptocurrency exchange by trading volume.',
    reward: 300,
    link: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00SKT5XPM6',
    icon: ShieldCheck,
    rewardable: true
  },
  {
    id: 'goat_funded_trader',
    title: 'Goat Funded Trader',
    description: 'Get funded as a trader. Trade with real capital and earn from your profits.',
    reward: 400,
    link: 'https://checkout.goatfundedtrader.com/aff/miketrader/',
    icon: Trophy,
    rewardable: true
  }
];

const rewardPartners = PARTNERS.filter((partner) => partner.rewardable);
const otherPartners = PARTNERS.filter((partner) => !partner.rewardable);

export function Partners() {
  const { completedTasks, completeTask } = useRewards();
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const handleDoPartner = (link: string) => {
    window.open(link, '_blank');
  };

  const handleClaimPartner = (id: string, reward: number) => {
    setClaimingId(id);
    setTimeout(() => {
      completeTask(id, reward);
      setClaimingId(null);
    }, 1000);
  };

  return (
    <div className="px-4 space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-black tracking-widest"
        >
          <Trophy size={14} fill="currentColor" />
          <span>EARN WITH PARTNERS</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900"
        >
          Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Rewards</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-500 text-lg font-medium"
        >
          Join our verified partner programs to earn massive OSC credits and unlock exclusive community benefits.
        </motion.p>
      </div>

      {/* Reward Partner Program */}
      <div className="space-y-10 pt-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Reward Partner Program</h2>
              <p className="text-slate-500 mt-2 max-w-2xl">Join our reward partners to earn OSC credits and claim bonuses as you sign up.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rewardPartners.map((partner, index) => {
              const isCompleted = completedTasks.includes(partner.id);
              return (
                <motion.div 
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative p-8 rounded-[2.5rem] border transition-all ${
                    isCompleted 
                      ? 'bg-slate-50 border-slate-100 opacity-80' 
                      : 'bg-white border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-emerald-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl ${isCompleted ? 'bg-slate-200 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>
                      <partner.icon size={32} />
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black">
                      <Zap size={14} fill="currentColor" />
                      +{partner.reward} OSC
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className={`text-2xl font-black ${isCompleted ? 'text-slate-400' : 'text-slate-900'}`}>{partner.title}</h4>
                    <p className={`text-sm leading-relaxed ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                      {partner.description}
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-50">
                    {isCompleted ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-600 font-black text-sm py-3 bg-emerald-50 rounded-xl">
                        <CheckCircle2 size={18} />
                        PARTNER JOINED
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => handleDoPartner(partner.link)}
                          className="w-full py-4 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2"
                        >
                          JOIN PARTNER <ExternalLink size={14} />
                        </button>
                        <button 
                          onClick={() => handleClaimPartner(partner.id, partner.reward)}
                          disabled={claimingId === partner.id}
                          className="w-full py-3 bg-emerald-50 text-emerald-600 text-xs font-black rounded-xl hover:bg-emerald-100 disabled:opacity-50"
                        >
                          {claimingId === partner.id ? 'VERIFYING...' : 'CLAIM REWARD'}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Other Partners</h2>
              <p className="text-slate-500 mt-2 max-w-2xl">Explore trusted resources and partner offers without reward claim requirements.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPartners.map((partner, index) => (
              <motion.div 
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-[2.5rem] border bg-white border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-emerald-100"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-2xl bg-slate-100 text-slate-700">
                    <partner.icon size={32} />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl font-black text-slate-900">{partner.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-500">{partner.description}</p>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => handleDoPartner(partner.link)}
                    className="w-full py-4 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    JOIN PARTNER <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden mt-12"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ShieldCheck size={200} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h3 className="text-3xl font-black mb-4">Why join our partners?</h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            We only partner with the most trusted brands in the trading and technology space. 
            By joining through our links, you not only earn OSC credits but also get access to 
            exclusive discounts, premium trading tools, and VIP support from our partners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {[
              "Verified Trusted Partners",
              "Exclusive OSC Bonuses",
              "Premium Trading Tools",
              "Community VIP Status"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
                <span className="font-bold text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
