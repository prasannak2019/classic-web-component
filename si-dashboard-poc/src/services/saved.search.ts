import { SellerDashBoard } from './constant';
// @ts-ignore
import { HttpResponse } from '../utils/http-utils';
import httpService from './http.service';

class  SavedSearchService{

  public async getSavedSearch(): Promise<Array<SavedSearchEntity>> {
    let savedSearchEndPointUrl = SellerDashBoard.SAVED_SEARH_URL.valueOf();
    savedSearchEndPointUrl = savedSearchEndPointUrl.replace('{userId}', SellerDashBoard.CLASSIC_USER_ID);
    savedSearchEndPointUrl = savedSearchEndPointUrl.replace('{orgId}', SellerDashBoard.CLASSIC_ORG_ID);
    const res: HttpResponse<any> = await httpService.get(savedSearchEndPointUrl, "ssotoken");

    console.log("res ==> ", JSON.stringify(res));

    //const classicMySavedSearches: ClassicMySavedSearches = res.data;
    //return this.toMySavedSearches(classicMySavedSearches);

    return null;
  }

}

export default new SavedSearchService();
