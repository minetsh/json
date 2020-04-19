export default class JsonFormatter {
  private es: any[] = [];

  public br(): JsonFormatter {
    this.es.push('\n');
    return this;
  }

  public space(deepth: number): JsonFormatter {
    this.es.push(' '.repeat(deepth << 1));
    return this;
  }

  public key(key?: string): JsonFormatter {
    if (key != null) {
      this.es.push(`"${key}": `);
    }
    return this;
  }

  public string(value?: string): JsonFormatter {
    this.es.push(`"${value}"`);
    return this;
  }

  public number(value?: number): JsonFormatter {
    this.es.push(`${value}`);
    return this;
  }

  public boolean(value?: boolean): JsonFormatter {
    this.es.push(`${value}`);
    return this;
  }

  public null(value?: string): JsonFormatter {
    this.es.push(`${value}`);
    return this;
  }

  public elements(elements: any[]): JsonFormatter {
    this.es = this.es.concat(elements);
    return this;
  }

  public sub(sub: JsonFormatter): JsonFormatter {
    this.elements(sub.es);
    return this;
  }

  public append(v: string): JsonFormatter {
    this.es.push(v);
    return this;
  }

  public format(): string {
    return this.es.join('');
  }

  public static create(): JsonFormatter {
    return new JsonFormatter();
  }
}
