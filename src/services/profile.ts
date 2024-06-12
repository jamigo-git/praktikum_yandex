import UserApi from "../api/user";
import type { ChangeUserProfile, UserDTO, ChangeUserPassword } from "../api/type";
import { onShowModal } from "../services/modal.ts";
import { logout } from "./auth.ts";

const userApi = new UserApi();

/**Изменить данные профиля пользователя */
export const changeProfile = async (model: ChangeUserProfile) => {
    try {
        let user_info: UserDTO;
        const response = await userApi.profileChange(model);
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            user_info = JSON.parse(response.responseText);
            window.store.set({ user: user_info });
            window.alert('Поздравляем, данные профиля успешно обновлены!');
        }
        
    } catch (error) {
        window.store.set({ changeProfileError: 'Change profile error' });
    } 
}

/**Изменить пароль пользователя */
export const changePassword = async (model: ChangeUserPassword) => {
    window.store.set({isLoading: true});
    try {
        const response = await userApi.passwordChange(model);
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            window.alert('Поздравляем, пароль успешно обновлен!');
        }
        
    } catch (error) {
        window.store.set({ passChangeError: 'Change password error' });
    } finally {
        window.store.set({isLoading: false});
    }
}

/**Переход назад к чатам */
export const onBackClick = (event: Event) => {
    event.preventDefault();
    window.router.go('/settings');
}

/**Переход назад к чатам */
export const onAvatarClick = (event: Event) => {
    event.preventDefault();
    /**Показываем модальное окно по смене аватара */
    window.store.set({ showChangeAvatarModal: true });
    /**Устанавливаем onclick document событие, чтобы отлавливать клик вне модалки и отключать ее */
    setTimeout(onShowModal, 1000);
}

/**Переход на страницу редактирования профиля */
export const onEditDataClick = (event: Event) => {
    event.preventDefault();
    window.router.go('/settings_edit');
}

/**Переход на страницу редактирования пароля */
export const onPassEditClick = (event: Event) => {
    event.preventDefault();
    window.router.go('/pass_edit');
}

/**Переход на страницу редактирования пароля */
export const onLogoutClick = (event: Event) => {
    event.preventDefault();
    logout();
}

/**Событие на изменение аватара */
export const onChangeAvatar = (event: any) => {
    event.preventDefault();
    const inputValue = event.target.files[0];
    if (!inputValue) return;
    const formData = new FormData();
    formData.append("avatar", inputValue, inputValue.name);
    window.store.set({ newAvatarFile: formData });
}

/**Событие на отправку аватара */
export const onSubmitAvatar = async () => {
    const file: FormData | undefined = window.store.getState()?.newAvatarFile;
    if (!file) return
    try {
        let user_info: UserDTO;
        const response = await userApi.avatarChange(file);
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            user_info = JSON.parse(response.responseText);
            window.alert('Поздравляем, аватар успешно обновлен!');
            window.store.set({ user: user_info, showChangeAvatarModal: false });
        }
        
    } catch (error) {
        window.store.set({ changeAvatarError: 'Change avatar error' });
    } 
}
