import Handlebars from 'handlebars';
import './profile.css';
import default_ava from '../../assets/avatar_default.png';

export { default as ProfilePage } from './profile.hbs?raw';


Handlebars.registerHelper('default_avatar', () => {
    return { avatar: default_ava }
});
