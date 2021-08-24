interface CommonProperties {
    siteInfo: SiteInfo;
    userInfo: UserInfo;
    apiEndpoints?: any;
}

interface Organization {
    id?: number;
    name?: string;
    processingAuction?: boolean;
}

interface AuthInfo {
    ssotoken?: string;
    jstate?: string;
    roles?: Array<number>;
}

interface Profile {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    loginName?: string;
    phone?: string;
    email?: string;
}

interface UserInfo {
    userId?: number;
    authInfo?: AuthInfo;
    currentOrgInfo?: Organization;
    profile?: Profile;
    organizations?: Array<Organization>;
}
interface PrivateLabelInfo {
    id?: number;
    email?: string;
    name?: string;
    phone?: string;
}

interface ShowBanner {
    appStoreShowBanner?: boolean;
    playStoreShowBanner?: boolean;
}

interface SiteInfo {
    languageCode?: string;
    showBanner?: ShowBanner;
    siteConfiguration?: string;
    privateLabelInfo?: PrivateLabelInfo;
}

enum WebComponentType {
    STENCIL = 'stencil',
}

interface WidgetInstanceConfigedProperties {
    condition?: string;
    class?: string;
    style?: string;
    properties?: {
        [key: string]: any;
    };
}

enum Application {
    CLASSIC = 'classic',
    NW = 'nw',
}

export {
    Organization,
    AuthInfo,
    Profile,
    UserInfo,
    PrivateLabelInfo,
    SiteInfo,
    ShowBanner,
    WebComponentType,
    CommonProperties,
    WidgetInstanceConfigedProperties,
    Application,
};
