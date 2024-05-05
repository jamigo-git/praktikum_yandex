import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import ava from "./assets/z.jpg";
import fly from "./assets/fly.jpeg";
import robot from "./assets/images.jpeg";
import chatimg from "./assets/chatimg.png";
import Router from "./core/Router";

export type { ChatItemData };

type ChatItemData = {[x: string]: string | number | boolean};

const chat_items: ChatItemData[] = [
  {
    label: 'Петрович', 
    avatar: ava, 
    text: 'random text 123...', 
    datetime: '14:43', 
    counter: 2
  },
  {
    label: 'Василий Иванович',
    avatar: fly, 
    active: true, 
    text: 'random text 123...', 
    datetime: '10:15', 
    counter: 44
  },
  {
    label: 'Ларгукус', 
    avatar: robot, 
    text: 'random text 123...', 
    datetime: '15 января'
  }
];

const messages = [
  {
    text: `"С ДНЕМ БЕЗДОМНЫХ ТЕБЯ
            …Это мог бы быть текст всратой открытки с котиками в вотсапе, но нет. 
            30 марта - официальный день бездомных 
            Только сейчас об этом узнал, и по совпадению, я как раз снимаю ролик про бездомных) 
            Почему на такую необычную тему? 
            В США бездомные вообще не подходят под стереотипы. Это не те бомжи, что ловят голубей на обед и бормочут 
            “молодой человек, бутылочку не выбрасывайте”`, 
    image: chatimg, 
    datetime: "18:36"
  },
  {
    text: "Жги", 
    class: "message_current_user", 
    datetime: "19:00"
  },
];

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component as any);
});



const router = new Router('#app');
(window as any).router = router;

// window.store = new Store({
//   isLoading: false,
//   loginError: null,
//   cats: [],
//   user: null,
//   selectedCard: null
// });


router.use('/login', Pages.LoginPage)
      .use('/settings', Pages.ProfilePage)
      .use('/settings_edit', Pages.ProfilePageEdit)
      .use('/500', Pages.Error500)
      .use('/pass_edit', Pages.PassEditPage)
      .use('/messenger', Pages.ChatPage)
      .use('/sign-up', Pages.RegistrationPage)
      .use('*', Pages.Error404)
      .start();