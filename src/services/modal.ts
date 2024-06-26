/**Закрытие модалки при клике вне области */
export const onShowModal = () => {
    document.onclick = (event: any) => {
        const modal_windows = document.querySelectorAll('.modal-window-main');
        if (modal_windows?.length) {
            for (const modal of modal_windows) {
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
    window.store.set({
        showCreateChatModal: null,
        showDeleteChatModal: null,
        showChangeAvatarModal: null,
        showAddUserModal: null,
        showDeleteUserModal: null,
        modalWindowError: null,
        deleteUserError: null,
        getChatsError: null,
        deleteChatError: null,
        showChatAvatarChangeModal: null
    });
    document.onclick = null;
}
