import { create } from 'zustand';

interface postModalStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const usePostModel = create<postModalStore>((set) => ({
    isOpen: false,
    onOpen : () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false})
}))

export default usePostModel;