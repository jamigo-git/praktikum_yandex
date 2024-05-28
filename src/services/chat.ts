import ChatApi from "../api/chat";
import UserApi from "../api/user";
import type { ChatDTO, CreateChatResponse, DeleteChatResponse, UserDTO, getMessages, Message, SelectedChat, AddUserToChat } from "../api/type";
import { logout } from "../services/auth";
import { onShowModal, closeModals } from "./modal";
import WSTransport from "../core/WSTransport";

const chatApi = new ChatApi();
const userApi = new UserApi();
let activeWS: WSTransport;

/**Получение списка чатов */
export const getChats = async () => {
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
    } 
}

/**Создание нового чата */
export const createChat = async () => {
    let name: string = (window as any).store.state.newChatName;
    if (!name) return;
    try {
        const response = await chatApi.create({title: name});
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`)
        } else {
            let newChatId: CreateChatResponse = JSON.parse(response.responseText);
            newChatId; //Для использования в будущем
        }
        closeModals();
        getChats();
    } catch (error) {
        (window as any).store.set({ modalWindowError: 'createChatError error' });
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
            let userIdeleteChatResult: DeleteChatResponse = JSON.parse(response.responseText);
            userIdeleteChatResult;
        }
        closeModals();
        getChats();
    } catch (error) {
        (window as any).store.set({ modalWindowError: 'deleteChatError error' });
    } 
}

/**Установка в стор активного чата при клике на нем */
export const setActiveChat = (chatId: string) => {
    (window as any).store.set({ selectedChatId: chatId });
}

/**Клик на пункте дропдауна "Создать чат" */
export const onCreateChatClick = (event: Event) => {
    event.preventDefault();
    (window as any).store.set({ showCreateChatModal: true });
    setTimeout(onShowModal, 1000);
}

/**Клик на пункте дропдауна "Удалить чат" */
export const onDeleteChatClick = (event: Event) => {
    const chatId = (window as any).store.state.selectedChatId;
    if (!chatId) return;
    event.preventDefault();
    (window as any).store.set({ showDeleteChatModal: true });
    setTimeout(onShowModal, 1000);
}

/**Клик на пункте дропдауна "Выйти" */
export const onLogoutClick = (event: Event) => {
    event.preventDefault();
    logout();
}

/**Клик на пункте дропдауна "Профиль" */
export const onProfileClick = (event: Event) => {
    event.preventDefault();
    (window as any).router.go('/settings');
}

/**Клик на чат в списке */
export const onChatClick = (event: Event) => {
    (window as any).store.set({ selectedChatId: event });
}

/**Отправка сообщения из чата (WS возвращает сообщение с айдишником которые запишется автоматически) */
export const onSubmitMessage = () => {
    const lastMessage = (window as any).store.state.lastMessage;
    if (activeWS && lastMessage) activeWS.send({content: lastMessage, type: "message"});
    let inputSendMessage = document.getElementById("inputSendMessage") as HTMLInputElement;
    if (inputSendMessage?.value) {
        inputSendMessage.value = '';
    } 
}

/**Вызов модального окна "Удалить пользователя" */
export const onDeleteUser = (event?: Event) => {
    event?.preventDefault();
    (window as any).store.set({ showDeleteUserModal: true });
    setTimeout(onShowModal, 1000);
}

/**Вызов модального окна "Изменить аватар чата" */
export const onAvatarClick = (event?: Event) => {
    event?.preventDefault();
    (window as any).store.set({ showChatAvatarChangeModal: true });
    setTimeout(onShowModal, 1000);
}

/**Функция вызывается при нажатии на клавишу Удалить (пользователя из чата) */
export const onSubmitDeleteUser = async () => {
    const deleteUserLogin: string = (window as any).store.state.deleteUserLogin;
    const userId = await getUserId(deleteUserLogin);
    if (!userId) {
        window.alert('Пользователь не найден в системе');
        return;
    }
    try {

        /**Пользователи которые уже были добавлены в чат */
        let currentChat = (window as any).store.state.selectedChat;
        let currentChatId: number = currentChat.chatId;
        let currentChatUsers: number[] = await getChatUsers();

        /**Если пользователя нет в чате кидаем ошибку */
        if (currentChatUsers.some(f => f === userId) === false) {
            window.alert('Пользователь отсутствует в чате');
            throw new Error(`Пользователь отсутствует в чате`);
        }

        const chatObj: AddUserToChat  = {
            users: currentChatUsers, 
            chatId: currentChatId,
            messages: currentChat.messages ? Array.from(currentChat.messages) : []
        };
        
        /**Запрос в БД на удаление пользователя */
        chatObj.users = [userId];
        const response = await chatApi.deleteUser(chatObj);
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`);
        }

        /**Удаляем пользователя из чата (массив id пользоватей) */
        currentChatUsers = currentChatUsers.filter(f => f !== userId);
        chatObj.users = currentChatUsers;

        /**Записываем в стор новый массив без пользователя */
        (window as any).store.set({ selectedChat: chatObj });

        window.alert('Пользователь был успешно удален из чата');

        closeModals();
    } catch (error) {
        (window as any).store.set({ deleteUserError: 'deleteUserError error' });
    } 
}

/**Вызов модального окна "Добавить пользователя" */
export const onAddUser = (event: Event) => {
    event.preventDefault();
    setTimeout(onShowModal, 300);
    (window as any).store.set({ showAddUserModal: true });
}

/**При изменении поля ввода логина пользователя пытаемся найти пользователя в store или в БД */
export const onChangeUserLogin = async (event: Event) => {
    // event.preventDefault();
    const inputLoginUser = (event.target as HTMLInputElement)?.value;
    (window as any).store.set({ addUserLogin: inputLoginUser });
}

/**Функция вызывается при нажатии на клавишу Добавить (пользователя в чат) */
export const addUserToChat = async () => {
    const inputLoginUser = (window as any).store.state.addUserLogin;
    let userId = await getUserId(inputLoginUser);
    if (!userId) {
        window.alert('Пользователь не найден в системе');
        return;
    }

    /**Пользователи которые уже были добавлены в чат */
    let selectedChat = (window as any).store.state.selectedChat;
    let currentChatId: number = selectedChat.chatId;
    let currentChatUsers: number[] = selectedChat.users ? Array.from(selectedChat.users) : [];
    /**Если пользователь уже есть в чате просто выходим */
    if (currentChatUsers.some(f => f === userId)) {
        window.alert('Пользователь уже был добавлен в чат ранее');
        throw new Error(`Пользователь уже был добавлен в чат ранее`);
    }
    
    /**Добавляем пользователя в инфо чата в store */
    currentChatUsers.push(userId);
    const chatObj: AddUserToChat  = {
        users: currentChatUsers, 
        chatId: currentChatId,
        messages: selectedChat.messages ? Array.from(selectedChat.messages) : []
    };
    
    try {
        (window as any).store.set({ selectedChat: chatObj });
        /**Запрос в БД на добавление пользователя */
        const response = await chatApi.addUser(chatObj);
        if (response.status !== 200) {
            throw new Error(`Error status ${response.status}`);
        }
    } catch (error) {
        (window as any).store.set({ modalWindowError: 'getChatsError error' });
    }

    window.alert('Пользователь был успешно добавлен в чат');
    closeModals();
}

/**Поиск id пользователя пол логину */
async function getUserId(userLogin: string): Promise<number | undefined> {
    try {
        if (!userLogin) return;
        const usersFromStore: UserDTO[] = (window as any).store.state.users;
        const userFromStore = usersFromStore?.find(f => f.login === userLogin);
        let userId = userFromStore?.id;
        if (!userFromStore) {
            /**Если пользователя нет в store нужно искать в БД */
            const userFromDb = await searchUser(userLogin);
            if (!userFromDb) throw new Error('Не удалось получить пользователя из ответа');
            usersFromStore.push(userFromDb);
            userId = userFromDb?.id;
            /**Сохраняем пользователя в массив в store для будущих запросов по этому пользователю, 
             * мы используем только id, поэтому изменение его инфо для нас не важно */
            (window as any).store.set({users: usersFromStore});
        }
        return userId;
    } catch (error) {
        (window as any).store.set({ modalWindowError: error });
        return undefined;
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
    let currentChatId: number = (window as any).store.state.selectedChatId;

    const response = await chatApi.getUsers(currentChatId);
    if (response.status !== 200) {
        console.error(response.status, response.responseText);
        throw new Error(`${response.responseText}`);
    } else {
        const users: UserDTO[] = JSON.parse(response.responseText);
        for (let user of users) {
            addUserInfoToArr(user);
        }
        return users.map(user => user.id);
    }
}


/**Добавление информации о пользователи в массив пользователей */
const addUserInfoToArr = (userInfo: UserDTO) => {
    let users_arr: UserDTO[] = Array.from((window as any).store.state.users);
    let userInUsers = users_arr?.length ? users_arr.find(f => f.id === userInfo.id) : undefined;
    if (userInUsers) {
        userInUsers = userInfo;
    } else {
        users_arr.push(userInfo);
    }
    (window as any).store.set({ users: users_arr });
}

/**Загрузка данных по чату */
export const loadAllData = async() => {
    /**При открытии нового вебсокета закрываем старый */
    if (activeWS) activeWS.close();
    /**Инициализируем объект для стора */
    const currentChatId: number = (window as any).store.state.selectedChatId;
    let selectedChat: SelectedChat = {
        chatId: currentChatId,
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

    const currentChatId: number = (window as any).store.state.selectedChatId;
    const curren_userId: number = (window as any).store.state?.user?.id;
    try {
        const response = await chatApi.getToken(currentChatId);
        if (response.status !== 200) {
            console.error(response.status, response.responseText);
            throw new Error(`${response.responseText}`);
        } else {
            const token_obj: {token: string} = JSON.parse(response.responseText);
            (window as any).store.set({ WSToken: token_obj });
            activeWS = await chatApi.createWS({chatId: currentChatId, userId: curren_userId, token: token_obj.token});
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


/**Событие на изменение аватара */
export const onChangeChatAvatar = (event: any) => {
    event.preventDefault();
    const inputValue = event.target.files[0];
    if (!inputValue) return;
    let formData = new FormData();
    formData.append("avatar", inputValue, inputValue.name);
    (window as any).store.set({ newChatAvatarFile: formData });
}

/**Событие на отправку аватара */
export const onSubmitChatAvatar = async () => {
    let file: FormData = (window as any).store.state.newChatAvatarFile;
    let selectedChat = Object.assign({}, (window as any).store.state.selectedChat);
    let chatId: number = selectedChat?.chatId;
    file.append('chatId', String(chatId));
    if (!file) return
    try {
        let chat_info: ChatDTO;
        const response = await chatApi.avatarChange(file);
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            chat_info = JSON.parse(response.responseText);
            let chats = Array.from((window as any).store.state.chats as ChatDTO[]);
            let chat_index = chats.findIndex(f => f.id === chatId);
            chats[chat_index] = chat_info;
            selectedChat.avatar = chat_info.avatar;
            (window as any).store.set({ chats: chats, showChatAvatarChangeModal: false, selectedChat: selectedChat });


            window.alert('Поздравляем, аватар чата успешно обновлен!');
            
        }
        
    } catch (error) {
        (window as any).store.set({ changeChatAvatarError: 'Change avatar error' });
    } 
}
