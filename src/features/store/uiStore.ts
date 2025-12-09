import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  actionBoardVisible: boolean;
  showAddCandidateModal: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleActionBoard: () => void;
  setActionBoardVisible: (visible: boolean) => void;
  setShowAddCandidateModal: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  actionBoardVisible: true,
  showAddCandidateModal: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleActionBoard: () =>
    set((state) => ({ actionBoardVisible: !state.actionBoardVisible })),
  setActionBoardVisible: (visible: boolean) =>
    set({ actionBoardVisible: visible }),
  setShowAddCandidateModal: (show: boolean) =>
    set({ showAddCandidateModal: show }),
}));

