import "./avatar.css"
export { default as Avatar } from "./avatar.hbs?raw";
import Handlebars from "handlebars";
import default_ava from "../../assets/z.jpg";

Handlebars.registerHelper("default_avatar", () => {
    return default_ava
});