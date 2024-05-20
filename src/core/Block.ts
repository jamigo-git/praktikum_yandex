import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";

type Props = Record<string, any>;
type Children = Record<string, Block>;

export type {Props, Children};

export default class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render",
      FLOW_CDUNMT: "flow:component-did-unmount"
    };
  
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props?: Props } | null = null;
  public props: Props;
  public children: Children;
  private eventBus: () => EventBus;

  _id = nanoid(6);
  
  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */


  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
  
    this.eventBus = () => eventBus;
  
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }
  
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDUNMT, this._componentDidUnmount.bind(this));
  }
  
  _createResources(): void {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
  }
  
  _init(): void {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init(): void {

  }
  
  _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
    });
  }

  _componentDidUnmount(): void {
    this.componentDidUnmount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidUnmount();
  });
  }

  /**Удаление компонента из DOM */
  componentDidUnmount(): void {

  }
  
  componentDidMount(oldProps?: Props): void {
    oldProps;
  }

  dispatchComponentDidUnmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDUNMT);
  }
  
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  
  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }
  
  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    oldProps;
    newProps;
    return true;
  }

  _getChildrenAndProps(propsAndChildren: Props): { children: Children, props: Props} {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
    if (value instanceof Block) {
            children[key] = value;
    } else {
            props[key] = value;
        }
    });

    return { children, props };
  }
 
  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
  
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }
  
  _render() {
    this._removeEvents();

    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const childrenProps: any = [];
    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if(Array.isArray(value)) {
        propsAndStubs[key] = value.map((item) => {
          if(item instanceof Block) {
            childrenProps.push(item)
            return `<div data-id="${item._id}"></div>`
          }
          return item;
        }).join('')
      }
  });
    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = (fragment as any).content.firstElementChild;

    [...Object.values(this.children), ...childrenProps].forEach(child => {
        const stub = (fragment as any).content.querySelector(`[data-id="${child._id}"]`);
        
        stub?.replaceWith(child.getContent());
    });


    if (this._element) {
      newElement.style.display = this._element.style.display
      this._element.replaceWith(newElement);
    }
  
      this._element = newElement;

    this._addEvents();
  }
  
  render(): void {}
  
  getContent(): HTMLElement | null{
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this.element;
  }

  _makePropsProxy(props: Props): Props {
    const self = this;
  
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = {...target}
        target[prop] = value;
  
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
  
  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }
  
  show(): void {
    const content = this.getContent();
    if (content) content.style.display = "block";
  }
  
  hide(): void {
    const content = this.getContent();
    if (content) content.style.display = "none";
  }
}

