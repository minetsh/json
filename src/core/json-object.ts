import JsonRender from './json-render';
import JsonElement, { JsonElementProps } from './json-element';
import { JsonType, toJsonElement } from './json';

export interface JsonObjectProps<T extends object>
  extends JsonElementProps<T> {}

export default class JsonObject<T extends object> extends JsonElement<T> {
  public children: Array<JsonElement<JsonType>> = [];

  constructor(props: JsonObjectProps<T>) {
    super(props);
    if (this.value) {
      const entries = Object.entries(this.value);
      this.children = entries.map(([key, value]) =>
        toJsonElement(value, key, this.deepth + 1),
      );
    }
  }

  public render(): JsonRender {
    const render = JsonRender.create()
      .space(this.deepth)
      .key(this.key)
      .append('{')
      .br();
    if (!this.isEmpty) {
      this.children.forEach((child, index) => {
        if (index > 0) {
          render.append(',').br();
        }
        render.sub(child.render());
      });
    }
    return render.br().space(this.deepth).append('}');
  }
}
