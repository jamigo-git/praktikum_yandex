import { StoreEvents } from "../core/Store";
import isEqual from './isEqual';
import type { Props } from "../core/Block";

export function connect(mapStateToProps: Function, dispatch?: {key: any, handler: () => {}}) {
    return function(Component: any) {
      return class extends Component{
        static onChangeStoreCallback: () => void;
        
        constructor(props: Props) {
          const store = (window as any).store;
          /**сохраняем начальное состояние*/
          let state = mapStateToProps(store?.getState() || {});
  
          super({...props, ...state});

          const dispatchHandler = Object.create({});
          Object.entries(dispatch || {}).forEach(([key, handler]) => {
            dispatchHandler[key] = (...args: any) => handler((window as any).store.set.bind((window as any).store), ...args);
          });

          this.setProps({...dispatchHandler});

          this.onChangeStoreCallback = () => {

            // при обновлении получаем новое состояние
            const newState = mapStateToProps(store.getState());

            // если что-то из используемых данных поменялось, обновляем компонент
            if (!isEqual(state, newState)) {
              this.setProps({...newState});
            }

            // не забываем сохранить новое состояние
            state = newState;
          }
  
          // подписываемся на событие
          store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        }


      componentWillUnmount() {
        super.componentWillUnmount();
        (window as any).store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    }
  }
}
