import { create } from "zustand";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

interface UIState {
  sidebarOpen: boolean;
  actionBoardVisible: boolean;
  showAddCandidateModal: boolean;
  toast: ToastState | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleActionBoard: () => void;
  setActionBoardVisible: (visible: boolean) => void;
  setShowAddCandidateModal: (show: boolean) => void;
  setToast: (toast: ToastState | null) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  actionBoardVisible: true,
  showAddCandidateModal: false,
  toast: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleActionBoard: () =>
    set((state) => ({ actionBoardVisible: !state.actionBoardVisible })),
  setActionBoardVisible: (visible: boolean) =>
    set({ actionBoardVisible: visible }),
  setShowAddCandidateModal: (show: boolean) =>
    set({ showAddCandidateModal: show }),
  setToast: (toast: ToastState | null) => set({ toast }),
  showToast: (message: string, type: "success" | "error" | "info" = "info") =>
    set({ toast: { message, type } }),
}));

