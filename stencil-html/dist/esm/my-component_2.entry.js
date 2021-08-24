import { r as registerInstance, h } from './index-27b3cc8a.js';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block}.margin-test{margin-top:20px}";

const MyComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  render() {
    return h("div", null, "Hello, World! ", h("div", { class: "margin-test" }, "welcome"), " ", h("h1", null, this.getText()));
  }
};
MyComponent.style = myComponentCss;

const sampleComponentCss = "";

const SampleComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.text = 'World';
  }
  render() {
    return (h("div", null, h("h1", null, "Sample Component"), h("h2", null, "Hello ", this.text)));
  }
};
SampleComponent.style = sampleComponentCss;

export { MyComponent as my_component, SampleComponent as sample_component };
