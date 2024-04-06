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

//TEST CODE
// let container = document.getElementById("app");
// console.log(container);
// const template = `<h1>{{name}}</h1>`;
// const templating = Handlebars.compile(template);
// container!.innerHTML = templating({name: "Yamaleev"});

//

//VITE CODE

// import "./style.css"
// import typescriptLogo from "./typescript.svg"
// import viteLogo from "/vite.svg"
// import { setupCounter } from "./counter.ts"

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!)
