import { Component, h, Prop } from '@stencil/core';
export class SampleComponent {
  constructor() {
    this.text = 'World';
  }
  render() {
    return (h("div", null,
      h("h1", null, "Sample Component"),
      h("h2", null,
        "Hello ",
        this.text)));
  }
  static get is() { return "sample-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["sample-component.css"]
  }; }
  static get styleUrls() { return {
    "$": ["sample-component.css"]
  }; }
  static get properties() { return {
    "text": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "text",
      "reflect": false,
      "defaultValue": "'World'"
    }
  }; }
}
