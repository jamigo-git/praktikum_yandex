import AuthApi from "../api/auth";
import type { LoginRequestData, UserDTO, SignUpRequest } from "../api/type";

const authApi = new AuthApi();

/**Авторизация */
export const login = async (model: LoginRequestData) => {
    // (window as any).store.set({isLoading: true});
    try {
        const login_result = await authApi.login(model);
        if (login_result.status !== 200) {
            /**Если пользователь уже зарегистрирован в системе нужно переходит в messenger */
            let err_reason = JSON.parse(login_result.responseText)?.reason
            if (err_reason === "User already in system") {
                (window as any).router.go("/messenger");
            } else {
                const err_text = JSON.parse(login_result.responseText)?.reason;
                console.error(`Status: ${login_result.status}, Error: ${err_text}`);
                throw new Error(err_text);
            }
        } else {
            (window as any).router.go('/messenger')
        }
    } catch (error) {
        (window as any).store.set({ loginError: error });
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
            (window as any).router.go('/messenger');
        }
        (window as any).store.set({ registrationError: null });
        
    } catch (error) {
        (window as any).store.set({ registrationError: 'registration error' });
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
            (window as any).router.go('/login')
        }
    } catch (error) {
        (window as any).store.set({ logoutError: 'Logout error' });
    } finally {
        (window as any).store.set({loginError: undefined, isLoading: false });
    }
}

/**Получение инфо о пользователе */
export const getUserInfo = async () => {
    try {
        let userInfo: UserDTO;
        let response = await authApi.me();
        if (response.status !== 200) {
            console.error(`Status: ${response.status}, Error: ${JSON.parse(response.responseText)?.reason}`)
            throw new Error();
        } else {
            userInfo = JSON.parse(response.responseText);
            addUserInfoToArr(userInfo);
            (window as any).store.set({ user: userInfo });
            (window as any).router.go('/settings')
        }
        
    } catch (error) {
        (window as any).store.set({ getUserInfoError: 'getUserInfo error' });
    } finally {
        // (window as any).store.set({ isLoading: false });
    }
}

/**Добавление информации о пользователи в массив пользователей */
const addUserInfoToArr = (userInfo: UserDTO) => {
    let users_arr: UserDTO[] = Array.from((window as any).store.state.users);
    let user_in_users = users_arr?.length ? users_arr.find(f => f.id === userInfo.id) : undefined;
    if (user_in_users) {
        user_in_users = userInfo;
    } else {
        users_arr.push(userInfo);
    }
    (window as any).store.set({ users: users_arr });
}

/**Проверка авторизован ли пользователь */
export const checkAuth = async(): Promise<boolean> => {
    (window as any).store.set({ isLoading: true });
    try {
        let userInfo: UserDTO;
        let response = await authApi.me();
        if (response.status !== 200) {
            let error = JSON.parse(response.responseText)?.reason;
            console.error(`Status: ${response.status}, Error: ${error}`);
            throw new Error(error);
        } else {
            userInfo = JSON.parse(response.responseText);
            addUserInfoToArr(userInfo);
            (window as any).store.set({ user: userInfo, checkAuthError: undefined });
            return true;
        }
        
    } catch (error) {
        (window as any).store.set({ checkAuthError: error });
    } finally {
        (window as any).store.set({ isLoading: false });
    }
    return false;
}

