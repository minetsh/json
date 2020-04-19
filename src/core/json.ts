import JsonElement from './json-element';
import JsonObject from './json-object';
import JsonArray from './json-array';
import JsonRender from './json-render';

export type JsonType =
  | boolean
  | string
  | number
  | object
  | Array<JsonType>
  | null;

export enum JsonTypes {
  null = 'null',
  boolean = 'boolean',
  number = 'number',
  string = 'string',
  array = 'array',
  object = 'object',
}

export const jsonType = (value: JsonType): JsonTypes => {
  const type = typeof value;
  if (type === JsonTypes.string) {
    return JsonTypes.string;
  }
  if (type === JsonTypes.number) {
    return JsonTypes.number;
  }
  if (type === JsonTypes.boolean) {
    return JsonTypes.boolean;
  }
  if (Array.isArray(value)) {
    return JsonTypes.array;
  }
  if (type === JsonTypes.object) {
    if (value === null) {
      return JsonTypes.null;
    }
    return JsonTypes.object;
  }
  throw new Error(`未知类型错误：${value}`);
};

export function toJsonElement(
  value: JsonType,
  key?: string,
  deepth: number = 0,
) {
  const type = jsonType(value);
  switch (type) {
    case JsonTypes.string:
    case JsonTypes.number:
    case JsonTypes.boolean:
    case JsonTypes.null:
      return new JsonElement({ key, value, type, deepth });
    case JsonTypes.object:
      return new JsonObject({ key, value, type, deepth } as any);
    case JsonTypes.array:
      return new JsonArray({ key, value, type, deepth } as any);
  }
}

export function renderJsonElement(
  value: JsonType,
  key?: string,
  deepth: number = 0,
) {
  return toJsonElement(value, key, deepth).render();
}

export function renderJson(json?: string): JsonRender | undefined {
  try {
    if (json || json === null) {
      return renderJsonElement(JSON.parse(json));
    }
  } catch (e) {
    return renderJsonElement(`${e}`);
  }
}

export function formatJson(json?: string): string | undefined {
  if (json || json === null) {
    const element = toJsonElement(JSON.parse(json));
    const formatter = element.format();
    return formatter.format();
  }
}
