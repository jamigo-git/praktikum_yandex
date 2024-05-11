import ChatApi from "../api/chat";
import type { ChatDTO, CreateChat, CreateChatResponse, DeleteChat, DeleteChatResponse } from "../api/type";
import { logout } from "../services/auth";
import { onShowModal } from "./modal";


const chatApi = new ChatApi();

export const getChats = async () => {
    (window as any).store.set({isLoading: true});
    try {
        const response = await chatApi.get();
        let chats: ChatDTO[] = new Array();
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`)
        } else {
            chats = JSON.parse(response.responseText);
        }

        (window as any).store.set({chats});
    } catch (error) {
        (window as any).store.set({getChatsError: 'getChatsError error'});
    } finally {
        (window as any).store.set({isLoading: false, getChatsError: undefined});
    }
}

export const createChat = async (model: CreateChat) => {
    (window as any).store.set({isLoading: true});
    try {
        const response = await chatApi.create(model);
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`)
        } else {
            let new_chat_id: CreateChatResponse = JSON.parse(response.responseText);
        }
        getChats();
    } catch (error) {
        (window as any).store.set({createChatError: 'createChatError error'});
    } finally {
        (window as any).store.set({isLoading: false, createChatError: undefined, showCreateChatModal: false});
    }
}

/**Удаление выбранного чата */
export const deleteChat = async () => {
    const chatId = (window as any).store.state.selectedChatId;
    if (!chatId) return;
    (window as any).store.set({isLoading: true});
    try {
        const response = await chatApi.delete({ chatId: chatId });
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`)
        } else {
            let delete_chat_result: DeleteChatResponse = JSON.parse(response.responseText);
        }
        getChats();
    } catch (error) {
        (window as any).store.set({deleteChatError: 'deleteChatError error'});
    } finally {
        (window as any).store.set({isLoading: false, deleteChatError: undefined, showDeleteChatModal: false});
    }
}

export const setActiveChat = (chatId: string) => {
    (window as any).store.set({ selectedChatId: chatId });
}

export const onCreateChatClick = (event: any) => {
    event.preventDefault();
    (window as any).store.set({ showCreateChatModal: true });
    setTimeout(onShowModal, 1000);
}

export const onDeleteChatClick = (event: any) => {
    const chatId = (window as any).store.state.selectedChatId;
    if (!chatId) return;
    event.preventDefault();
    (window as any).store.set({ showDeleteChatModal: true });
    setTimeout(onShowModal, 1000);
}

export const onLogoutClick = (event: any) => {
    event.preventDefault();
    logout();
}

export const onProfileClick = (event: any) => {
    event.preventDefault();
    (window as any).router.go('/settings');
        
}

export const onChatClick = (event: any) => {

}