import { create } from 'zustand';

interface sidebarStore {
    Open : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useSidebar = create<sidebarStore>((set) => ({
    Open: false,
    onOpen : () => set({ Open: true}),
    onClose : () => set({ Open: false})
}))

export default useSidebar;