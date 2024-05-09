import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";


import Router from "./core/Router";
import { Store } from "./core/Store";

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
  selectedChatId: null
});


router.use('/login', Pages.LoginPage)
      .use('/settings', Pages.ProfilePage)
      .use('/settings_edit', Pages.ProfilePageEdit)
      .use('/500', Pages.Error500)
      .use('/pass_edit', Pages.PassEditPage)
      .use('/messenger', Pages.ChatPage)
      .use('/sign-up', Pages.RegistrationPage)
      .use('*', Pages.Error404)
      .start();