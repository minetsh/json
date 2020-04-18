import React from 'react';

export default class JsonRender {
  private static uid = 0;
  private es: any[] = [];

  public br(): JsonRender {
    this.es.push(
      React.createElement('br', {
        key: JsonRender.uid++,
      }),
    );
    return this;
  }

  public space(deepth: number): JsonRender {
    this.es.push(' '.repeat(deepth << 1));
    return this;
  }

  public key(key?: string): JsonRender {
    if (key != null) {
      this.es.push(
        React.createElement(
          'span',
          { key: JsonRender.uid++, style: { color: '#92278f' } },
          `"${key}"`,
        ),
        ': ',
      );
    }
    return this;
  }

  public string(value?: string): JsonRender {
    this.es.push(
      React.createElement(
        'span',
        {
          key: JsonRender.uid++,
          style: { color: '#3ab54a', whiteSpace: 'pre-wrap' },
        },
        `"${value}"`,
      ),
    );
    return this;
  }

  public number(value?: number): JsonRender {
    this.es.push(
      React.createElement(
        'span',
        { key: JsonRender.uid++, style: { color: '#25aae2' } },
        `${value}`,
      ),
    );
    return this;
  }

  public boolean(value?: boolean): JsonRender {
    this.es.push(
      React.createElement(
        'span',
        { key: JsonRender.uid++, style: { color: '#f98280' } },
        `${value}`,
      ),
    );
    return this;
  }

  public null(value?: string): JsonRender {
    this.es.push(
      React.createElement(
        'span',
        { key: JsonRender.uid++, style: { color: '#f1592a' } },
        `${value}`,
      ),
    );
    return this;
  }

  public elements(elements: any[]): JsonRender {
    this.es = this.es.concat(elements);
    return this;
  }

  public sub(sub: JsonRender): JsonRender {
    this.elements(sub.es);
    return this;
  }

  public append(v: string): JsonRender {
    this.es.push(v);
    return this;
  }

  public render(): React.DOMElement<any, any> {
    return React.createElement('span', { key: JsonRender.uid++ }, this.es);
  }

  public static create(): JsonRender {
    return new JsonRender();
  }
}
