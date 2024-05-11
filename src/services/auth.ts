import AuthApi from "../api/auth";
import type { LoginRequestData, signUpRequest } from "../api/type";

const authApi = new AuthApi();

/**Авторизация */
export const login = async (model: LoginRequestData) => {
    (window as any).store.set({isLoading: true});
    try {
        const login_result = await authApi.login(model);
        if (login_result.status !== 200) {
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
export const registration = async () => {
    (window as any).store.set({isLoading: true});
    try {
        const reg_result = await authApi.logout();
        if (reg_result.status !== 200) {
            throw new Error();
        } else {
            (window as any).router.go('/login');
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
        debugger
        if (logout.status !== 200) {
            throw new Error();
        } else {
            const timeoutId = setTimeout(() => {}, 2000);
            (window as any).router.go('/login')
        }
    } catch (error) {
        (window as any).store.set({logoutError: 'Logout error'});
    } finally {
        (window as any).store.set({isLoading: false});
    }
}

export const getUserInfo = async () => {
    (window as any).store.set({isLoading: true});
    try {
        const reg_result = await authApi.me();
        if (reg_result.status !== 200) {
            throw new Error();
        } else {
            (window as any).router.go('/settings')
        }
        
    } catch (error) {
        (window as any).store.set({getUserInfoError: 'getUserInfo error'});
    } finally {
        (window as any).store.set({isLoading: false});
    }
}
