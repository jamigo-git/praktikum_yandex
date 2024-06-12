import AuthApi from "../api/auth";
import type { LoginRequestData, UserDTO, SignUpRequest } from "../api/type";

const authApi = new AuthApi();

/**Авторизация */
export const login = async (model: LoginRequestData) => {
    try {
        const login_result = await authApi.login(model);
        if (login_result.status !== 200) {
            /**Если пользователь уже зарегистрирован в системе нужно переходит в messenger */
            const err_reason = JSON.parse(login_result.responseText)?.reason
            if (err_reason === "User already in system") {
                window.router.go("/messenger");
            } else {
                const err_text = JSON.parse(login_result.responseText)?.reason;
                console.error(`Status: ${login_result.status}, Error: ${err_text}`);
                throw new Error(err_text);
            }
        } else {
            window.router.go('/messenger')
        }
    } catch (error) {
        window.store.set({ loginError: error });
    } 
}

/**Зарегистрировать пользователя */
export const registration = async (model: SignUpRequest) => {
    try {
        const reg_result = await authApi.create(model);
        if (reg_result.status !== 200) {
            console.error(`Status: ${reg_result.status}, Error: ${JSON.parse(reg_result.responseText)?.reason}`)
            throw new Error();
        } else {
            window.router.go('/messenger');
        }
        window.store.set({ registrationError: null });
        
    } catch (error) {
        window.store.set({ registrationError: 'registration error' });
    } 
}

/**Разлогиниться */
export const logout = async () => {
    window.store.set({isLoading: true});
    try {
        const logout = await authApi.logout();
        if (logout.status !== 200) {
            console.error(`Status: ${logout.status}, Error: ${JSON.parse(logout.responseText)?.reason}`)
            throw new Error();
        } else {
            window.router.go('/login')
        }
    } catch (error) {
        window.store.set({ logoutError: 'Logout error' });
    } finally {
        window.store.set({loginError: undefined, isLoading: false });
    }
}

/**Получение инфо о пользователе */
export const getUserInfo = async () => {
    try {
        let userInfo: UserDTO;
        const response = await authApi.me();
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            userInfo = JSON.parse(response.responseText);
            addUserInfoToArr(userInfo);
            window.store.set({ user: userInfo });
            window.router.go('/settings')
        }
        
    } catch (error) {
        window.store.set({ getUserInfoError: 'getUserInfo error' });
    } finally {
        // window.store.set({ isLoading: false });
    }
}

/**Добавление информации о пользователи в массив пользователей */
const addUserInfoToArr = (userInfo: UserDTO) => {
    const users_arr: UserDTO[] = Array.from(window.store.getState()?.users || []);
    let user_in_users = users_arr?.length ? users_arr.find(f => f.id === userInfo.id) : undefined;
    if (user_in_users) {
        user_in_users = userInfo;
    } else {
        users_arr.push(userInfo);
    }
    window.store.set({ users: users_arr });
}

/**Проверка авторизован ли пользователь */
export const checkAuth = async(): Promise<boolean> => {
    window.store.set({ isLoading: true });
    try {
        let userInfo: UserDTO;
        const response = await authApi.me();
        if (response.status !== 200) {
            const error = JSON.parse(response.responseText)?.reason;
            console.error(`Status: ${response.status}, Error: ${error}`);
            throw new Error(error);
        } else {
            userInfo = JSON.parse(response.responseText);
            addUserInfoToArr(userInfo);
            window.store.set({ user: userInfo, checkAuthError: undefined });
            return true;
        }
        
    } catch (error) {
        window.store.set({ checkAuthError: error });
    } finally {
        window.store.set({ isLoading: false });
    }
    return false;
}

