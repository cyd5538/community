import { create } from 'zustand';

interface postModalStore {
    isOpen : boolean;
    titleStore: string
    descriptionStore: string
    imageStore: string
    videoStore: string
    postIdStore: string
    onOpen : () => void;
    onClose : () => void;
}

const usePostModel = create<postModalStore>((set) => ({
    isOpen: false,
    titleStore: "",
    descriptionStore: "",
    imageStore: "",
    videoStore: "",
    postIdStore: "",
    onOpen : () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false})
}))

export default usePostModel;