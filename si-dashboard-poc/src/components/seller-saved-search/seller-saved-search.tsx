import { Component, h, Prop, State, Watch } from '@stencil/core';
import { SellerDashBoard } from '../../services/constant';
import savedsearchservice from '../../services/saved.search';

@Component({
  tag: 'ol-wc-seller-saved-search',
  styleUrl: 'seller-saved-search.css',
  shadow: false,
  scoped: true
})
export class SellerSavedSearch {

  @Prop() url : string;
  @Prop() sectionTitle: string;
  @State() nwAccessToken: string;
  @State() errors: any = null;


  @Watch('nwAccessToken')
  async monitorProps(): Promise<void> {
    this.nwAccessToken = SellerDashBoard.NW_ACCESS_TOKEN;
  }

  async connectedCallback(): Promise<void> {
    try {

      const savedSearches: Array<SavedSearchEntity> = await savedsearchservice.getSavedSearch();
      console.log("savedSearches ==> ", savedSearches)

    } catch (error) {
      this.errors = error;
    }
  }

  render() {


    const title = (
      <div class='col-12'><div class='col-12'>
      <div class="titleLabel">
        <ol-wc-message
          message={this.sectionTitle}
          languageCode='en'
        />
        <div class='border-bottom'></div>
      </div>
        </div>
        <ol-wc-saved-search-item></ol-wc-saved-search-item>
      </div>
    );


    return    <host>
      <div data-ol-trk-section="saved-search" class="widget-body">
        {title}
      </div>
    </host>


  }

}
