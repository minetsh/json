import JsonRender from './json-render';
import JsonElement, { JsonElementProps } from './json-element';
import { JsonType, toJsonElement } from './json';
import JsonFormatter from './json-formatter';

export interface JsonArrayProps extends JsonElementProps<Array<JsonType>> {}

export default class JsonArray extends JsonElement<Array<JsonType>> {
  constructor(props: JsonArrayProps) {
    super(props);
    if (this.value) {
      this.children = this.value.map((value) =>
        toJsonElement(value, undefined, this.deepth + 1),
      );
    }
  }

  public render(): JsonRender {
    const render = JsonRender.create()
      .space(this.deepth)
      .key(this.key)
      .append('[')
      .br();
    if (!this.isEmpty) {
      this.children.forEach((child, index) => {
        if (index > 0) {
          render.append(',').br();
        }
        render.sub(child.render());
      });
    }
    return render.br().space(this.deepth).append(']');
  }

  public format(): JsonFormatter {
    const formatter = JsonFormatter.create()
      .space(this.deepth)
      .key(this.key)
      .append('[')
      .br();
    if (!this.isEmpty) {
      this.children.forEach((child, index) => {
        if (index > 0) {
          formatter.append(',').br();
        }
        formatter.sub(child.format());
      });
    }
    return formatter.br().space(this.deepth).append(']');
  }
}
