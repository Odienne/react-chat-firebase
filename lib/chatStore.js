import {create} from "zustand"
import {db} from "./firebase.js";
import {doc, getDoc} from "firebase/firestore";
import {useUserStore} from "./userStore.js";

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: async (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;
        //check is current user is blocked
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        //check is receiver user is blocked
        if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        return set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
        });
    },
    changeBlock: () => {
        set((state) => ({...state, isReceiverBlocked: !state.isReceiverBlocked}));
    }
}))
