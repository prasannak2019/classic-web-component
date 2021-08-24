import { attachShadow, h, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block}.margin-test{margin-top:20px}";

const MyComponent$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  render() {
    return h("div", null, "Hello, World! ", h("div", { class: "margin-test" }, "welcome"), " ", h("h1", null, this.getText()));
  }
  static get style() { return myComponentCss; }
};

const sampleComponentCss = "";

const SampleComponent$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.text = 'World';
  }
  render() {
    return (h("div", null, h("h1", null, "Sample Component"), h("h2", null, "Hello ", this.text)));
  }
  static get style() { return sampleComponentCss; }
};

const MyComponent = /*@__PURE__*/proxyCustomElement(MyComponent$1, [1,"my-component",{"first":[1],"middle":[1],"last":[1]}]);
const SampleComponent = /*@__PURE__*/proxyCustomElement(SampleComponent$1, [1,"sample-component",{"text":[1]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      MyComponent,
  SampleComponent
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { MyComponent, SampleComponent, defineCustomElements };
