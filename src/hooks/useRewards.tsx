import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface RewardsState {
  points: number;
  isMining: boolean;
  lastMiningTime: number;
  lastCheckIn: string | null;
  miningRate: number;
  completedTasks: string[]; // List of task IDs
}

interface RewardsContextType extends RewardsState {
  toggleMining: () => void;
  claimDaily: () => boolean;
  addPoints: (amount: number) => void;
  completeTask: (taskId: string, reward: number) => void;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

const STORAGE_KEY = 'oneshot_rewards_state';
const INITIAL_STATE: RewardsState = {
  points: 0,
  isMining: false,
  lastMiningTime: Date.now(),
  lastCheckIn: null,
  miningRate: 0.001,
  completedTasks: [],
};

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RewardsState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isMining) {
          const now = Date.now();
          const elapsedSeconds = Math.floor((now - parsed.lastMiningTime) / 1000);
          const offlineEarnings = elapsedSeconds * (parsed.miningRate || 0.001);
          parsed.points += offlineEarnings;
          parsed.lastMiningTime = now;
        }
        // Ensure completedTasks exists
        if (!parsed.completedTasks) parsed.completedTasks = [];
        return parsed;
      } catch (e) {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state.isMining) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          points: prev.points + prev.miningRate,
          lastMiningTime: Date.now(),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isMining, state.miningRate]);

  const toggleMining = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMining: !prev.isMining,
      lastMiningTime: Date.now(),
    }));
  }, []);

  const claimDaily = useCallback(() => {
    const today = new Date().toDateString();
    if (state.lastCheckIn === today) return false;

    setState(prev => ({
      ...prev,
      points: prev.points + 10,
      lastCheckIn: today,
    }));
    return true;
  }, [state.lastCheckIn]);

  const addPoints = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      points: prev.points + amount,
    }));
  }, []);

  const completeTask = useCallback((taskId: string, reward: number) => {
    setState(prev => {
      if (prev.completedTasks.includes(taskId)) return prev;
      return {
        ...prev,
        points: prev.points + reward,
        completedTasks: [...prev.completedTasks, taskId],
      };
    });
  }, []);

  return (
    <RewardsContext.Provider value={{ ...state, toggleMining, claimDaily, addPoints, completeTask }}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
}
