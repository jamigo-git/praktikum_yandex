import AuthApi from "../api/auth";
import type { LoginRequestData, signUpRequest } from "../api/type";

const authApi = new AuthApi();

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

export const registration = async (model: signUpRequest) => {
    (window as any).store.set({isLoading: true});
    try {
        const reg_result = await authApi.create(model);
        if (reg_result.status !== 200) {
            throw new Error();
        } else {
            (window as any).router.go('/login')
        }
        
    } catch (error) {
        (window as any).store.set({loginError: 'registration error'});
    } finally {
        (window as any).store.set({isLoading: false});
    }
}