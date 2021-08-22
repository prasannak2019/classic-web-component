import { Component, h, Prop } from '@stencil/core';

@Component({
 tag: 'sample-component',
 styleUrl: 'sample-component.css',
 shadow: true
})
export class SampleComponent{
@Prop() text: string = 'World'
render() {
  return (
   <div>
   <h1>Sample Component</h1>
   <h2>Hello {this.text}</h2>
   </div>
  );
 }
}