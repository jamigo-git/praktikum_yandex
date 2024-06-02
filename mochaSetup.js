import {JSDOM} from 'jsdom'
import { Store } from "./src/core/Store";

const jsdom = new JSDOM('<body></body>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;

global.window.store = new Store({
    isLoading: false,
    loginError: null,
    registrationError: null,
    chats: [],
    user: null,
    users: [],
    newChatTitle: 'noname',
    selectedChatId: null,
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
  