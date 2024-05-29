import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import Router from "./core/Router";
import { Store } from "./core/Store";
import { checkAuth } from "./services/auth";
// import type { UserDTO, Messages } from "./api/type";

export type { ChatItemData };

type ChatItemData = {[x: string]: string | number | boolean};


Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component as any);
});

const router = new Router('#app');
(window as any).router = router;

(window as any).store = new Store({
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

