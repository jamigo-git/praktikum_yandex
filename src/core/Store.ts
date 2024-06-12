import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated'
}

export class Store<T extends Object> extends EventBus {
  private state: T | undefined;
  static __instance: Store<any>;

  constructor(defaultState: T) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: any) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
