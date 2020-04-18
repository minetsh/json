import JsonRender from './json-render';
import { JsonType, JsonTypes, jsonType } from './json';

export interface JsonElementProps<T extends JsonType = JsonType> {
  key?: string;
  value: T;
  type?: JsonTypes;
  deepth?: number;
}

export default class JsonElement<T extends JsonType = JsonType> {
  public key?: string;

  public value?: T;

  public deepth: number;

  public type: JsonTypes;

  public children: Array<JsonElement<JsonType>> = [];

  constructor(props: JsonElementProps<T>) {
    this.key = props.key;
    this.value = props.value;
    this.type = props.type || jsonType(this.value);
    this.deepth = props.deepth || 0;
  }

  get size(): number {
    return this.children.length;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }

  get isArray(): boolean {
    return this.type === JsonTypes.array;
  }

  get isObject(): boolean {
    return this.type === JsonTypes.object;
  }

  public render(): JsonRender {
    const render = JsonRender.create().space(this.deepth).key(this.key);
    switch (this.type) {
      case JsonTypes.string:
        render.string(this.value as any);
        break;
      case JsonTypes.number:
        render.number(this.value as any);
        break;
      case JsonTypes.boolean:
        render.boolean(this.value as any);
        break;
      case JsonTypes.null:
        render.null(this.value as any);
        break;
    }
    return render;
  }
}
