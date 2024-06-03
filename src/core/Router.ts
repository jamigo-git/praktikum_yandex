import Route from "./Route";

class Router {
    history: History | undefined;
    routes: Route[] | undefined;
    _currentRoute: Route | undefined;
    _rootQuery: string | undefined;
    static __instance: any;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = undefined;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    /** Добавление нового маршрута в маршрутизатор */
    use(pathname: string, block: any, checkAuth?: Function) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery}, checkAuth);
        if (this.routes) this.routes.push(route);
        return this;
    }

    /** Запускаем обработчик событий onpopstate который вызывается каждый раз
     * когда страница перезагружается или пользователь нажимает кнопка вперед или назад
     */
    start() {
        window.onpopstate = ((event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        
        this._onRoute(window.location.pathname);
    }

    async _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (route._checkAuth !== undefined && !(await route._checkAuth())) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;

        if(route !== null) route.render();
    }
    
    /** Переход по указанному пути с обновлением истории браузера */
    go(pathname: string) {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    /** Переход вперед по истории браузера */
    back() {
        this.history!.back();
    }

    /** Переход назад по истории браузера */
    forward() {
        this.history?.forward();
    }

    /**Метод возвращает текущий маршрут для данного пути или 
     * универсальный маршрут ессли ни один другой маршрут не подходит 
     * */
    getRoute(pathname: string) {
        const route = this.routes?.find(route => route.match(pathname));
        if(!route) return this.routes?.find(route => route.match('*'));
        return route;
    }
}

export default Router;
