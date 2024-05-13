import UserApi from "../api/user";
import type { ChangeUserProfile, UserDTO, ChangeUserPassword } from "../api/type";
import { onShowModal } from "../services/modal.ts";
import { logout } from "./auth.ts";

const userApi = new UserApi();

/**Изменить данные профиля пользователя */
export const changeProfile = async (model: ChangeUserProfile) => {
    (window as any).store.set({isLoading: true});
    try {
        let user_info: UserDTO;
        const response = await userApi.profileChange(model);
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            user_info = JSON.parse(response.responseText);
            (window as any).store.set({ user: user_info });
            window.alert('Поздравляем, данные профиля успешно обновлены!');
        }
        
    } catch (error) {
        (window as any).store.set({ changeProfileError: 'Change profile error' });
    } finally {
        (window as any).store.set({isLoading: false});
    }
}

/**Изменить пароль пользователя */
export const changePassword = async (model: ChangeUserPassword) => {
    (window as any).store.set({isLoading: true});
    try {
        const response = await userApi.passwordChange(model);
        debugger
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            window.alert('Поздравляем, пароль успешно обновлен!');
        }
        
    } catch (error) {
        (window as any).store.set({ passChangeError: 'Change password error' });
    } finally {
        (window as any).store.set({isLoading: false});
    }
}

/**Переход назад к чатам */
export const onBackClick = (event: any) => {
    debugger
    event.preventDefault();
    (window as any).router.go('/settings');
}


/**Переход назад к чатам */
export const onAvatarClick = (event: any) => {
    event.preventDefault();
    /**Показываем модальное окно по смене аватара */
    (window as any).store.set({ showChangeAvatarModal: true });
    /**Устанавливаем onclick document событие, чтобы отлавливать клик вне модалки и отключать ее */
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

/**Событие на изменение аватара */
export const onChangeAvatar = (event: any) => {
    event.preventDefault();
    const inputValue = event.target.files[0];
    if (!inputValue) return;
    let formData = new FormData();
    formData.append("avatar", inputValue, inputValue.name);
    (window as any).store.set({ newAvatarFile: formData });

}

/**Событие на отправку аватара */
export const onSubmitAvatar = async () => {
    let file: FormData = (window as any).store.state.newAvatarFile;
    if (!file) return
    (window as any).store.set({isLoading: true});
    try {
        let user_info: UserDTO;
        const response = await userApi.avatarChange(file);
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            user_info = JSON.parse(response.responseText);
            (window as any).store.set({ user: user_info });
            window.alert('Поздравляем, аватар успешно обновлен!');
        }
        
    } catch (error) {
        (window as any).store.set({ changeAvatarError: 'Change avatar error' });
    } finally {
        (window as any).store.set({showChangeAvatarModal: false, isLoading: false});
    }
}
