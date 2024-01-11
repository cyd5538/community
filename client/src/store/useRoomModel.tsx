import { create } from 'zustand';

interface roomModalStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useRoomModel = create<roomModalStore>((set) => ({
    isOpen: false,
    onOpen : () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false})
}))

export default useRoomModel;