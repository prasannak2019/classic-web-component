'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-87bc513f.js');

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block}.margin-test{margin-top:20px}";

const MyComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  render() {
    return index.h("div", null, "Hello, World! ", index.h("div", { class: "margin-test" }, "welcome"), " ", index.h("h1", null, this.getText()));
  }
};
MyComponent.style = myComponentCss;

const sampleComponentCss = "";

const SampleComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.text = 'World';
  }
  render() {
    return (index.h("div", null, index.h("h1", null, "Sample Component"), index.h("h2", null, "Hello ", this.text)));
  }
};
SampleComponent.style = sampleComponentCss;

exports.my_component = MyComponent;
exports.sample_component = SampleComponent;
