import { onShowModal } from "../services/modal.ts";
import { logout } from "./auth.ts";
/**Переход назад к чатам */
export const onBackClick = (event: any) => {
    event.preventDefault();
    (window as any).router.go('/settings');
}


/**Переход назад к чатам */
export const onAvatarClick = (event: any) => {
    event.preventDefault();
    (window as any).store.set({ showChangeAvatarModal: true });
    setTimeout(onShowModal, 1000);
}


/**Переход на страницу редактирования профиля */
export const onEditDataClick = (event: any) => {
    event.preventDefault();
    (window as any).router.go('/settings_edit');
}


/**Переход на страницу редактирования пароля */
export const onPassEditClick = (event: any) => {
    event.preventDefault();
    (window as any).router.go('/pass_edit');
}



/**Переход на страницу редактирования пароля */
export const onLogoutClick = (event: any) => {
    event.preventDefault();
    logout();
}