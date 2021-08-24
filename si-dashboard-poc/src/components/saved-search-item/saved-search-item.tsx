import { Component, h , Prop} from '@stencil/core';

@Component({
  tag: 'ol-wc-saved-search-item',
  styleUrl: 'saved-search-item.css',
  shadow: false,
})
export class SavedSearchItem {

  @Prop() ssItems: Array<SavedSearchEntity>;

  getResult(): any[]{
    let stringTest = [];
    for(let i=1;i<30;i++){
      stringTest.push(
        <div class="flex-row ssItem border-item " >
          <div class="flow-element col-6 regularText ellipsis"> Last Iteration</div>
          <div class=" col-6 rightAlign">
            {i+5*200} <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </div>

        </div>
      )
    }
    return stringTest;
  }

  render() {

    return (
      <host>{this.getResult()}
      </host>
    );
  }

}
