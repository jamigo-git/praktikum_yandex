/**Закрытие модалки при клике вне области */
export const onShowModal = () => {
    document.onclick = (event: any) => {
        let modal_windows = document.querySelectorAll('.modal_window_main');
        if (modal_windows?.length) {
            for (let modal of modal_windows) {
                if (!modal.contains(event.target)) {
                    closeModals();
                    document.onclick = null;
                }
            }
        }
    }
}

/**Закрыть все модальные окна */
export const closeModals = () => {
    (window as any).store.set({
        showCreateChatModal: null,
        showDeleteChatModal: null,
        showChangeAvatarModal: null,
        showAddUserModal: null,
        showDeleteUserModal: null,
        modalWindowError: null,
        deleteUserError: null,
        getChatsError: null,
        deleteChatError: null,
    });
    document.onclick = null;
}
