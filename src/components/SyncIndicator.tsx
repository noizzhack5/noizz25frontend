import { RefreshCw, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SyncIndicatorProps {
  lastSyncedAt: Date | null;
  isSyncing: boolean;
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  // Start counting from 1 second instead of 0
  const displaySeconds = seconds + 1;
  
  if (displaySeconds < 60) return `${displaySeconds}s ago`;
  
  const minutes = Math.floor(displaySeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function SyncIndicator({ lastSyncedAt, isSyncing }: SyncIndicatorProps) {
  const [, setTick] = useState(0);

  // Update the "time ago" display every second to show real-time count
  // Only update when not syncing and we have a valid lastSyncedAt
  useEffect(() => {
    if (isSyncing || !lastSyncedAt) {
      return;
    }
    
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isSyncing, lastSyncedAt]);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      {isSyncing ? (
        <>
          <RefreshCw size={12} className="animate-spin" />
          <span>Syncing...</span>
        </>
      ) : lastSyncedAt ? (
        <>
          <Wifi size={12} className="text-green-500" />
          <span>
            Live · {formatTimeAgo(lastSyncedAt)}
          </span>
        </>
      ) : (
        <>
          <Wifi size={12} className="text-gray-400" />
          <span>Live</span>
        </>
      )}
    </div>
  );
}

