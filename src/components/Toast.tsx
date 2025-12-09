import { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={18} className="text-black" />,
    error: <XCircle size={18} className="text-red-600" />,
    info: <Info size={18} className="text-black" />
  };

  const backgrounds = {
    success: 'bg-[#F3CB06]',
    error: 'bg-red-50 border-red-200',
    info: 'bg-[#F3CB06]'
  };

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 shadow-lg rounded-full ${backgrounds[type]} animate-slide-up`}
      style={{ bottom: '20px' }}
    >
      {icons[type]}
      <p className="text-sm text-black">{message}</p>
    </div>
  );
}