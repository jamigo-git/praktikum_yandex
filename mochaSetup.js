import { JSDOM } from "jsdom";
import { Store } from "./src/core/Store";
import sinon from "sinon";

// const virtualConsole = new JSDOM.VirtualConsole();
// virtualConsole.sendTo(console, { omitJSDOMErrors: true });

global.window = new JSDOM("<!DOCTYPE html><div id='app'>Hello world</p>", { 
    url: "http://google.com",
    referrer: "http://google.com",
    includeNodeLocations: true
}).window;

global.document = global.window.document;
global.history = global.window.history;
global.location = global.window.location;
global.Node = global.window.Node;
global.MouseEvent = global.window.MouseEvent;
global.FormData = global.window.FormData;

global.window.store = new Store({
    isLoading: false,
    loginError: null,
    registrationError: null,
    chats: [],
    user: null,
    users: [],
    newChatTitle: "noname",
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

