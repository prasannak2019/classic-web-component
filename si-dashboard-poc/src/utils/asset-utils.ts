import { getAssetPath } from '@stencil/core';

class AssetUtils {
    public static getImage(assetPath: string): string {
        return getAssetPath(`../assets/image/${assetPath}`);
    }
}
export default AssetUtils;
