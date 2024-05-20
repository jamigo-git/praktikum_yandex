import EventBus from "./EventBus";

const WSTransportEvents = {
    Connected: 'Connected',
    Open: 'Open',
    Close: 'Close',
    Error: 'Error',
    Message: 'Message'
}

export default class WSTransport<Message> extends EventBus {
    private socket?: WebSocket;
    private pingInterval?: ReturnType<typeof setInterval>;
    private readonly pingIntervalTime = 30000;
    private url: string;

    constructor(url: string) {
        super()
        this.url = url;
    }

    /**Подключение к WS */
    public async connect(messageHandler: Function): Promise<void> {
        if (this.socket) {
            throw new Error('Socket has already connected.')
        }

        this.on(WSTransportEvents.Message, messageHandler);
        
        this.socket = new WebSocket(this.url);
        this.subscribe(this.socket);
        this.setupPing();
        
        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.Error, reject)
            this.on(WSTransportEvents.Connected, () => {
                this.off(WSTransportEvents.Error, reject);
                resolve();
            });
        });
    }
    
    /**Отправка данных в WS */
    public send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Socket is not connected.')
        }
        this.socket.send(JSON.stringify(data));
    }

    /**Закрытие соединения */
    public close() {
        this.socket?.close();
        clearInterval(this.pingIntervalTime);
    }

    /**Установка интервала для keepAlive соединения */
    private setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({type: 'ping'});
        }, this.pingIntervalTime);
        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
        });
    }
    
    /**Подписка на все события WS */
    private subscribe(socket: WebSocket) {

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.emit(WSTransportEvents.Connected);
        });
        
        socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            this.emit(WSTransportEvents.Close);
        });

        socket.addEventListener('error', (event) => {
            console.error('ошибка', event)
            this.emit(WSTransportEvents.Error);
        });

        socket.addEventListener('message', (message: MessageEvent<any>) => {
            try {
                const data = JSON.parse(message.data);

                /**Игнорируем сервисные сообщения */
                if (['pong', 'user connected'].includes(data?.type)) {
                    return;
                }

                this.emit(WSTransportEvents.Message, data);
            }
            catch(e){
                console.error('Не удалось обработать полученное сообщение из WS', e);
            }
        });
    }
}
