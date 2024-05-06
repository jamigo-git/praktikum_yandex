import AuthApi from "../api/auth";
import type { LoginRequestData, signUpRequest } from "../api/type";

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
    (window as any).store.set({isLoading: true});
    try {
        const login_result = await authApi.login(model);
        console.log(login_result)
        if (login_result.status !== 200) {
            throw new Error();
        } else {
            (window as any).router.go('/chats')
        }
        
    } catch (error) {
        (window as any).store.set({loginError: 'login error'});
    } finally {
        (window as any).store.set({isLoading: false});
    }
}

export const registration = async (model: signUpRequest) => {
    (window as any).store.set({isLoading: true});
    try {
        console.log('model', model)
        const reg_result = await authApi.create(model);
        console.log(reg_result)
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