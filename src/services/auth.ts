import AuthApi from "../api/auth";
import type { LoginRequestData, UserDTO, SignUpRequest } from "../api/type";

const authApi = new AuthApi();

/**Авторизация */
export const login = async (model: LoginRequestData) => {
    (window as any).store.set({isLoading: true});
    try {
        const login_result = await authApi.login(model);
        if (login_result.status !== 200) {
            console.error(`Status: ${login_result.status}, Error: ${JSON.parse(login_result.responseText)?.reason}`)
            throw new Error();
        } else {
            (window as any).router.go('/messenger')
        }
        
    } catch (error) {
        (window as any).store.set({loginError: 'login error'});
    } finally {
        (window as any).store.set({isLoading: false, loginError: undefined});
    }
}

/**Зарегистрировать пользователя */
export const registration = async (model: SignUpRequest) => {
    (window as any).store.set({isLoading: true});
    try {
        const reg_result = await authApi.create(model);
        if (reg_result.status !== 200) {
            console.error(`Status: ${reg_result.status}, Error: ${JSON.parse(reg_result.responseText)?.reason}`)
            throw new Error();
        } else {
            (window as any).router.go('/messenger');
        }
        
    } catch (error) {
        (window as any).store.set({loginError: 'registration error'});
    } finally {
        (window as any).store.set({isLoading: false});
    }
}

/**Разлогиниться */
export const logout = async () => {
    (window as any).store.set({isLoading: true});
    try {
        const logout = await authApi.logout();
        if (logout.status !== 200) {
            console.error(`Status: ${logout.status}, Error: ${JSON.parse(logout.responseText)?.reason}`)
            throw new Error();
        } else {
            setTimeout(() => {}, 2000);
            (window as any).router.go('/login')
        }
    } catch (error) {
        (window as any).store.set({ logoutError: 'Logout error' });
    } finally {
        (window as any).store.set({ isLoading: false });
    }
}

/**Получение инфо о пользователе */
export const getUserInfo = async () => {
    (window as any).store.set({ isLoading: true });
    try {
        let user_info: UserDTO;
        let response = await authApi.me();
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            user_info = JSON.parse(response.responseText);
            (window as any).store.set({ user: user_info });
            (window as any).router.go('/settings')
        }
        
    } catch (error) {
        (window as any).store.set({ getUserInfoError: 'getUserInfo error' });
    } finally {
        (window as any).store.set({ isLoading: false });
    }
}

/**Проверка авторизован ли пользователь */
export const checkAuth = async(): Promise<boolean> => {
    (window as any).store.set({ isLoading: true });
    try {
        let user_info: UserDTO;
        let response = await authApi.me();
        if (response.status !== 200) {
            let error = JSON.parse(response.responseText)?.reason;
            console.error(`Status: ${response.status}, Error: ${error}`);
            throw new Error(error);
        } else {
            user_info = JSON.parse(response.responseText);
            (window as any).store.set({ user: user_info, checkAuthError: undefined });
            return true;
        }
        
    } catch (error) {
        (window as any).store.set({ checkAuthError: error });
    } finally {
        (window as any).store.set({ isLoading: false });
    }
    return false;
}
