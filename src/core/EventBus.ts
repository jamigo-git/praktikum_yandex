type ListenersType = {
    [key: string]: Function[]
}
export default class EventBus {
    listeners: ListenersType;
    
    constructor() {
        this.listeners = {};
    }

    /**Подписка на события */
    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**Отписка от события */
    off(event: string, callback: Function) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
    
    /**Выполнение действия по событию */
    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
