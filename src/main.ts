import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import ava from "./assets/z.jpg";
import fly from "./assets/fly.jpeg";
import robot from "./assets/images.jpeg";
import chatimg from "./assets/chatimg.png";

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

const pages = {
  "login": [ Pages.LoginPage ],
  "registration": [ Pages.RegistrationPage ],
  "error404": [ Pages.Error404 ],
  "error500": [ Pages.Error500 ],
  "profile": [ Pages.ProfilePage ],
  "profile_edit": [ Pages.ProfilePageEdit ],
  "pass_edit": [ Pages.PassEditPage ],
  "chat": [ Pages.ChatPage, {chat_items, messages}],
  "nav": [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component as any);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById("app")!;
  if (source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    return;
  }
  container.innerHTML = Handlebars.compile(source)(context);
}


document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", e => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
