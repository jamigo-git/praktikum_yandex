import ChatApi from "../api/chat";
import UserApi from "../api/user";
import type { ChatDTO, CreateChat, CreateChatResponse, DeleteChatResponse, UserDTO, getMessages, Message, SelectedChat, AddUserToChat } from "../api/type";
import { logout } from "../services/auth";
import { onShowModal } from "./modal";
import WSTransport from "../core/WSTransport";


const chatApi = new ChatApi();
const userApi = new UserApi();
let activeWS: WSTransport;

/**Получение списка чатов */
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

        (window as any).store.set({chats, getChatsError: undefined});
    } catch (error) {
        (window as any).store.set({ getChatsError: 'getChatsError error'});
    } finally {
        (window as any).store.set({ isLoading: false });
    }
}

/**Создание нового чата */
export const createChat = async (model: CreateChat) => {
    try {
        const response = await chatApi.create(model);
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`)
        } else {
            let new_chat_id: CreateChatResponse = JSON.parse(response.responseText);
            new_chat_id; //Для использования в будущем
        }
        document.onclick = null;
       (window as any).store.set({ modalWindowError: undefined, showCreateChatModal: false});
        getChats();
    } catch (error) {
        (window as any).store.set({modalWindowError: 'createChatError error'});
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
            delete_chat_result;
        }
        document.onclick = null;
        (window as any).store.set({ modalWindowError: undefined, showDeleteChatModal: false });

        getChats();
    } catch (error) {
        (window as any).store.set({modalWindowError: 'deleteChatError error'});
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
    event;
}

/**Отправка сообщения из чата (WS возвращает сообщение с айдишником которые запишется автоматически) */
export const onSubmitMessage = (event: any) => {
    event.preventDefault();
    const lastMessage = (window as any).store.state.lastMessage;
    if (activeWS && lastMessage) activeWS.send({content: lastMessage, type: "message"});
    let input_send_message = document.getElementById('input_send_message') as HTMLInputElement;
    if (input_send_message?.value) {
        (window as any).store.set({ lastMessage: '' });
        input_send_message.value = '';
    } 
}

/**Вызов модального окна "Удалить пользователя" */
export const onDeleteUser = (event: any) => {
    event.preventDefault();
    (window as any).store.set({ showDeleteUserModal: true });
    setTimeout(onShowModal, 1000);
}

/**Функция вызывается при нажатии на клавишу Удалить (пользователя из чата) */
export const onSubmitDeleteUser = async () => {
    let user_id: number = (window as any).store.state.selectedUser;

    if (!user_id) {
        window.alert('Пользователь не найден в системе');
        return;
    }
    try {
        (window as any).store.set({isLoading: true});
        /**Пользователи которые уже были добавлены в чат */
        let current_chat_id: number = (window as any).store.state.selectedChatId;
        let current_chat_users: number[] = await getChatUsers();
        /**Если пользователя нет в чате кидаем ошибку */
        if (current_chat_users.some(f => f === user_id) === false) {
            window.alert('Пользователь отсутствует в чате');
            throw new Error(`Пользователь отсутствует в чате`);
        }

        /**Удаляем пользователя из чата (массив id пользоватей) */
        current_chat_users = current_chat_users.filter(f => f !== user_id);
        const chat_obj: AddUserToChat  = {
            users: current_chat_users, 
            chatId: current_chat_id
        };
        /**Записываем в стор новый массив без пользователя */
        (window as any).store.set({selectedChat: chat_obj  });
        /**Запрос в БД на удаление пользователя */
        chat_obj.users = [user_id];
        const response = await chatApi.deleteUser(chat_obj);
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`);
        }
        window.alert('Пользователь был успешно удален из чата');

        (window as any).store.set({ showDeleteUserModal: false ,isLoading: false, deleteUserError: undefined });
        document.onclick = null;

    } catch (error) {
        (window as any).store.set({ deleteUserError: 'deleteUserError error' });
    } 
}

/**Вызов модального окна "Добавить пользователя" */
export const onAddUser = (event: any) => {
    event.preventDefault();
    (window as any).store.set({ showAddUserModal: true });
    setTimeout(onShowModal, 1000);
}

/**Функция вызывается при нажатии на клавишу Добавить (пользователя в чат) */
export const onSubmitAddUser = async () => {
    let user_id: number = (window as any).store.state.selectedUser;
    if (!user_id) {
        window.alert('Пользователь не найден в системе');
        return;
    }
    try {
        (window as any).store.set({isLoading: true});
        /**Пользователи которые уже были добавлены в чат */
        let current_chat_id: number = (window as any).store.state.selectedChatId;
        let current_chat_users: number[] = (window as any).store.state.selectedChat.users;
        /**Если пользователь уже есть в чате просто выходим */
        if (current_chat_users.some(f => f === user_id)) {
            window.alert('Пользователь уже был добавлен в чат ранее');
            throw new Error(`Пользователь уже был добавлен в чат ранее`);
        }

        /**Добавляем пользователя в инфо чата в store */
        current_chat_users.push(user_id);
        const chat_obj: AddUserToChat  = {
            users: current_chat_users, 
            chatId: current_chat_id
        };

        (window as any).store.set({ selectedChat: chat_obj });
        /**Запрос в БД на добавление пользователя */
        const response = await chatApi.addUser(chat_obj);
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`);
        }
        window.alert('Пользователь был успешно добавлен в чат');
        document.onclick = null;
        (window as any).store.set({ showAddUserModal: false ,isLoading: false, getChatsError: undefined });

    } catch (error) {
        (window as any).store.set({ modalWindowError: 'getChatsError error' });
    }
}

/**При изменении поля ввода логина пользователя пытаемся найти пользователя в store или в БД */
export const onChangeUserName = async (event: any) => {
    event.preventDefault();
    // (window as any).store.set({isLoading: true, selectedUser: null});
    const input_login_user = event.target.value;
    try {
        if (!input_login_user) return;
        const users_from_store: UserDTO[] = (window as any).store.state.users;
        const user_from_store = users_from_store?.find(f => f.login === input_login_user);
        let user_id = user_from_store?.id;
        if (!user_from_store) {
            /**Если пользователя нет в store нужно искать в БД */
            const user_from_db = await searchUser(input_login_user);
            if (!user_from_db) throw new Error('Не удалось получить пользователя из ответа');
            users_from_store.push(user_from_db);
            user_id = user_from_db?.id;
            /**Сохраняем пользователя в массив в store для будущих запросов по этому пользователю, 
             * мы используем только id, поэтому изменение его инфо для нас не важно */
            (window as any).store.set({users: users_from_store});
        }
        (window as any).store.set({ selectedUser: user_id, modalWindowError: undefined });
    } catch (error) {
        (window as any).store.set({ modalWindowError: error });
    } 
}

/**Поиск пользователя в БД по логину */
const searchUser = async(login: string): Promise<UserDTO> => {
    const response = await userApi.userSearch({login: login});
    if (response.status !== 200) {
        console.error(response.status, response.responseText)
        throw new Error(`${response.responseText}`);
    } else {
        const user: UserDTO[] = JSON.parse(response.responseText);
        return user[0];
    }
}

/**Получить пользователей чата */
const getChatUsers = async(): Promise<number[]> => {
    let current_chat_id: number = (window as any).store.state.selectedChatId;

    const response = await chatApi.getUsers(current_chat_id);
    if (response.status !== 200) {
        console.error(response.status, response.responseText);
        throw new Error(`${response.responseText}`);
    } else {
        const users: UserDTO[] = JSON.parse(response.responseText);
        return users.map(user => user.id);
    }
}

/**TODO Реализация в будущем */
// export const onChatInfo = (event: any) => {
//     let current_chat_id: number = (window as any).store.state.selectedChatId;
// }

/**Загрузка данных по чату */
export const loadAllData = async() => {
    /**При открытии нового вебсокета закрываем старый */
    if (activeWS) activeWS.close();
    /**Инициализируем объект для стора */
    const current_chat_id: number = (window as any).store.state.selectedChatId;
    let selectedChat: SelectedChat = {
        chatId: current_chat_id,
        users: await getChatUsers(),
        messages: []
    }

    /**Подключаем вебсокет */
    await connectWS();
    (window as any).store.set({ selectedChat: selectedChat });
    /**Загружаем старые сообщения */
    await getOldMessages({type: 'get old', content: '0'});
}

/**Получить токен для открытия WS соединения, открыть соединение */
export const connectWS = async () => {

    const current_chat_id: number = (window as any).store.state.selectedChatId;
    const curren_user_id: number = (window as any).store.state?.user?.id;
    try {
        const response = await chatApi.getToken(current_chat_id);
        if (response.status !== 200) {
            console.error(response.status, response.responseText);
            throw new Error(`${response.responseText}`);
        } else {
            const token_obj: {token: string} = JSON.parse(response.responseText);
            (window as any).store.set({ WSToken: token_obj });
            activeWS = await chatApi.createWS({chatId: current_chat_id, userId: curren_user_id, token: token_obj.token});
            await activeWS.connect(getNewMessages);
        }
    }
    catch(error) {
        (window as any).store.set({ connectWSError: error });
    }
}

/**Получить старые сообщения и записать их в стор */
export const getOldMessages = async (data: getMessages): Promise<void | Message[]> => {
    if (!activeWS) return;
    try {
        activeWS.send(data);
    }
    catch(error) {
        (window as any).store.set({ getTokenError: error });
    }
}

/**Обработчик полученных сообщений */
export const getNewMessages = (data: any) => {
    let selectedChat = Object.assign((window as any).store.state.selectedChat);
    let messages: Message[] | undefined = selectedChat.messages ? Array.from(selectedChat.messages) : [];
    if (Array.isArray(data)) {
        if (messages.length) {
            /**Отфильтруем те сообщения которые уже есть в сторе */
            let data_filtered: Message[] = (data as Message[]).filter(message => messages!.every(old_message => old_message !== message));
            messages = data_filtered;
        } else {
            messages = data;
        }
    } 
    else {
        if (messages && messages.every(message => message.id !== data.id)) {
            messages.push(data);
        } else {
            messages = [data];
        }
    }
    selectedChat.messages = messages;
    (window as any).store.set({ selectedChat: selectedChat });
}
