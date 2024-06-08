import * as Pages from "./pages";
import Router from "./core/Router";
import { Store } from "./core/Store";
import { checkAuth } from "./services/auth";
import { ChatDTO, Message, UserDTO } from "./api/type";

interface WindowProperties {
    location: Location;
    history: History;
    document: Document;
    store: Store<StoreType>;
    router: Router;
    setTimeout: (callback: () => {}, ms: number) => number;
    clearTimeout: (handle: number) => void;
    setInterval: (callback: () => {}, ms: number) => number;
    clearInterval: (handle: number) => void;
  }
  
declare global {
    interface Window extends WindowProperties {}
}

export type SelectedChat = {
    chatId: null | number,
    users: number[],
    messages: Message[]
};

export type StoreType = {
    newChatName?: string,
    newAvatarFile?: FormData,
    newChatAvatarFile?: FormData,
    activeChatContent?: ChatDTO,
    showDeleteUserModal?: boolean,
    showChatAvatarChangeModal?: boolean,
    deleteUserError?: boolean,
    addUserError?: string,
    lastMessage?: string,
    deleteUserLogin?: string,
    isLoading: boolean,
    loginError?: null | string,
    registrationError: null | string,
    chats: ChatDTO[],
    user: null | UserDTO,
    users: UserDTO[],
    newChatTitle: string,
    selectedChatId?: number,
    showCreateChatModal: null | boolean,
    showDeleteChatModal: null | boolean,
    showChangeAvatarModal: null | boolean,
    showAddUserModal: null | boolean,
    addUserId: null | number,
    addUserLogin: null | string,
    selectedChat: SelectedChat,
    credentials: {
        login: null | string,
        password: null | string,
    };
}
  

const router = new Router('#app');
window.router = router;

window.store = new Store({
    isLoading: false,
    loginError: null,
    registrationError: null,
    chats: [],
    user: null,
    users: [],
    newChatTitle: 'noname',
    showCreateChatModal: null,
    showDeleteChatModal: null,
    showChangeAvatarModal: null,
    showAddUserModal: null,
    addUserId: null,
    addUserLogin: null,
    selectedChat: {
        chatId: null,
        users: [],
        messages: []
    },
    credentials: {
        login: null,
        password: null
    }
});

const checkAuthBind = checkAuth.bind(this);

router.use('/', Pages.LoginPage)
      .use('/login', Pages.LoginPage)
      .use('/settings', Pages.ProfilePage, checkAuthBind)
      .use('/settings_edit', Pages.ProfilePageEdit, checkAuthBind)
      .use('/500', Pages.Error500)
      .use('/pass_edit', Pages.PassEditPage, checkAuthBind)
      .use('/messenger', Pages.ChatPage, checkAuthBind)
      .use('/sign-up', Pages.RegistrationPage)
      .use('*', Pages.Error404)
      .start();


      