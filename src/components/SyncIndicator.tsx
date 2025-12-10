import { RefreshCw, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SyncIndicatorProps {
  lastSyncedAt: Date | null;
  isSyncing: boolean;
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 5) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function SyncIndicator({ lastSyncedAt, isSyncing }: SyncIndicatorProps) {
  const [, setTick] = useState(0);

  // Update the "time ago" display every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      {isSyncing ? (
        <>
          <RefreshCw size={12} className="animate-spin" />
          <span>Syncing...</span>
        </>
      ) : (
        <>
          <Wifi size={12} className="text-green-500" />
          <span>
            Live{lastSyncedAt && ` · ${formatTimeAgo(lastSyncedAt)}`}
          </span>
        </>
      )}
    </div>
  );
}

