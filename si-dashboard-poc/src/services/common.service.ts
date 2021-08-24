import { LanguageCode } from '../entities/localization';
import {
    AuthInfo,
    CommonProperties,
    Organization,
    PrivateLabelInfo,
    Profile,
    ShowBanner,
    SiteInfo,
    UserInfo,
} from '../entities/common.properties';
import cacheService from './cache.service';

class CommonService {
    private readonly ENTITIES_CACHE_NAME: string = 'entities|si-dashboard|wc';
    private apiStorage: Storage = window.localStorage;
    private static siteInfoStorageName: string = 'siteInfo';
    private static userInfoStorageName: string = 'userInfo';

    private async composeCommonProperties(props0: any): Promise<CommonProperties> {
        const props: any = props0 || {};
        const commonProperties: CommonProperties = (props || {}).commonProperties || {};

        const siteInfo: SiteInfo = props.siteInfo || commonProperties.siteInfo || {};
        const privateLabelInfo: PrivateLabelInfo = props.privateLabelInfo || siteInfo.privateLabelInfo || {};
        privateLabelInfo.id = props.plId || privateLabelInfo.id;
        siteInfo.privateLabelInfo = privateLabelInfo;
        siteInfo.languageCode = props.languageCode || siteInfo.languageCode || LanguageCode.ENGLISH;
        siteInfo.showBanner = props.showBanner || siteInfo.showBanner || true;
        siteInfo.siteConfiguration = siteInfo.siteConfiguration || props.siteConfiguration;

        const userInfo: UserInfo = commonProperties.userInfo || {};
        const authInfo: AuthInfo = props.authInfo || userInfo.authInfo || {};
        const currentOrgInfo: Organization = props.currentOrgInfo || userInfo.currentOrgInfo || {};
        const organizations: Array<Organization> = props.organizations || userInfo.organizations || [];
        const profile: Profile = props.profile || userInfo.profile || {};

        authInfo.jstate = props.jstate || authInfo.jstate;
        authInfo.ssotoken = props.ssotoken || authInfo.ssotoken;

        currentOrgInfo.id = props.orgId || currentOrgInfo.id;

        userInfo.userId = props.userId || userInfo.userId;
        userInfo.profile = profile;
        userInfo.authInfo = authInfo;
        userInfo.currentOrgInfo = currentOrgInfo;
        userInfo.organizations = organizations;

        commonProperties.siteInfo = siteInfo;
        commonProperties.userInfo = userInfo;
        return commonProperties;
    }

    public async init(props: any): Promise<void> {
        const commonProperties: CommonProperties = await this.composeCommonProperties(props);
        const plId: number = commonProperties.siteInfo.privateLabelInfo.id;
        await cacheService.setItem<CommonProperties>(
            this.ENTITIES_CACHE_NAME,
            `commonProperties_${plId}`,
            commonProperties,
        );
    }

    public async getPrivateLabelId(): Promise<number> {
        return 1;
    }

    public async getStorageItems(): Promise<CommonProperties> {
        const commonProperties: CommonProperties = { siteInfo: {}, userInfo: {} };
        let siteInfoStr: string = this.apiStorage.getItem(CommonService.siteInfoStorageName) || '';
        if (siteInfoStr && siteInfoStr !== '') {
            siteInfoStr = siteInfoStr.trim();
            commonProperties.siteInfo = JSON.parse(siteInfoStr) || {};
        }
        const userInfoStr: string = this.apiStorage.getItem(CommonService.userInfoStorageName) || '';
        if (userInfoStr && userInfoStr !== '') {
            commonProperties.userInfo = JSON.parse(userInfoStr);
        }
        return commonProperties;
    }

    public async saveStorageItems(commonProperties: CommonProperties): Promise<void> {
        const userInfo: UserInfo = commonProperties.userInfo;
        const siteInfo: SiteInfo = commonProperties.siteInfo;
        if (siteInfo) {
            await this.apiStorage.setItem(CommonService.siteInfoStorageName, JSON.stringify(siteInfo));
        }
        if (userInfo) {
            await this.apiStorage.setItem(CommonService.userInfoStorageName, JSON.stringify(userInfo));
        }
    }

    public async getSiteInfo(): Promise<SiteInfo> {
        const storageItems: CommonProperties = await this.getStorageItems();
        return storageItems.siteInfo;
    }

    public async getShowBanner(): Promise<ShowBanner> {
        const siteInfo: SiteInfo = await this.getSiteInfo();
        return siteInfo.showBanner;
    }

    public async setShowBanner(showBanner: ShowBanner): Promise<void> {
        const siteInfo: SiteInfo = await this.getSiteInfo();
        siteInfo.showBanner = showBanner;
        await this.apiStorage.setItem(CommonService.siteInfoStorageName, JSON.stringify(siteInfo));
    }
}

// Export a singleton instance in the global namespace
export const commonService = new CommonService();
