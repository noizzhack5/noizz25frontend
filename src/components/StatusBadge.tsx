import { Circle } from 'lucide-react';
import type { Status } from '@/types';

interface StatusBadgeProps {
  status: string;
}

const statusConfig = {
  submitted: {
    label: 'Submitted',
    className: 'bg-blue-100 text-blue-700'
  },
  bot_interview: {
    label: 'Bot Interview',
    className: 'bg-yellow-100 text-yellow-700'
  },
  ready_for_bot_interview: {
    label: 'Ready for Bot Interview',
    className: 'bg-orange-100 text-orange-700'
  },
  ready_for_recruit: {
    label: 'Ready for Recruit',
    className: 'bg-green-100 text-green-700'
  }
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`inline-block px-3 py-1 text-sm rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}