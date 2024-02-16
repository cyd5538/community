import { create } from 'zustand';

interface teamModalStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
    id: number | null;
}

const useTeamModel = create<teamModalStore>((set) => ({
    isOpen: false,
    onOpen : () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false}),
    id: null
}))

export default useTeamModel;