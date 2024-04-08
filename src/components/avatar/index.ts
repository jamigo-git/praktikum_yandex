import "./avatar.css";
import Handlebars from "handlebars";
import default_ava from "../../assets/z.jpg";

export { default as Avatar } from "./avatar.hbs?raw";

Handlebars.registerHelper("default_avatar", () => {
    return default_ava
});
