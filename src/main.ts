import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";


const pages = {
  "login": [ Pages.LoginPage ],
  "registration": [ Pages.RegistrationPage ],
  "error404": [ Pages.error404 ],
  "error500": [ Pages.error500 ],
  "profile": [ Pages.ProfilePage ],
  "profile_edit": [ Pages.ProfilePageEdit ],
  "pass_edit": [ Pages.PassEditPage ],
  "chat": [ Pages.ChatPage ],
  "nav": [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById("app")!;
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