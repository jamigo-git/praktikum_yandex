export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'>  & {
    password: string
}

export type CreateChat = {
    title: string
}

export type CreateChatResponse = {
    id: number
}

export type DeleteChat = {
    chatId: string
}

export type DeleteChatResponse = {
    userId: number
    result: {
      id: number
      title: string
      avatar: string
      created_by: number
    }
}

export type LoginRequestData = {
    login: string,
    password: string
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
}

export type SignUpRequest = {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
}

export type ChangeUserProfile = {
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
}

export type ChangeUserPassword = {
    oldPassword: string
    newPassword: string
}

export type AddUserToChat = {
    users: number[]
    chatId: number
}

export type UserSearch = {
    login: string
}

export type OpenWS = {
    chatId: number
    userId: number
    token: string
}

// export enum WSMessageTypes {"message", "get old", "user"}

export type getMessages = {
    content: string
    type: string
}

export type Message = {
    content: string
    user_id: number
    chat_id: number
    time: string
    id: number
}

export type SelectedChat = {
    chatId: number | null
    users: number[]
    messages?: Message[]
}