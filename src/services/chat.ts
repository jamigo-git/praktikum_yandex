import ChatApi from "../api/chat";
// import type { LoginRequestData, c } from "../api/type";

const authApi = new ChatApi();

export const getChats = async () => {
    (window as any).store.set({isLoading: true});
    try {
        const chats = await authApi.get();
        // if (result.status !== 200) {
        //     throw new Error();
        // } 
        (window as any).store.set({chats});
    } catch (error) {
        (window as any).store.set({loginError: 'login error'});
    } finally {
        (window as any).store.set({isLoading: false, getChatsError: undefined});
    }
}

export const setActiveChat = (chatId: string) => {
    (window as any).store.set({selectedChatId: chatId});
}

// export const registration = async (model: signUpRequest) => {
//     (window as any).store.set({isLoading: true});
//     try {
//         const reg_result = await authApi.create(model);
//         if (reg_result.status !== 200) {
//             throw new Error();
//         } else {
//             (window as any).router.go('/login')
//         }
        
//     } catch (error) {
//         (window as any).store.set({loginError: 'registration error'});
//     } finally {
//         (window as any).store.set({isLoading: false});
//     }
// }