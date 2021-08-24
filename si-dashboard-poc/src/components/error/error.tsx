import { Component, h, Prop } from '@stencil/core';
import AssetUtils from '../../utils/asset-utils';

@Component({
    tag: 'ol-wc-error',
    styleUrl: 'error.scss',
    assetsDirs: ['../assets'],
    shadow: false,
    scoped: true,
})
export class Error {
    @Prop() errorMsg: string;

    render() {
        const errorMsg = this.errorMsg || <slot />;
        return (
            <span>
                <div class="textCenterDiv">
                    <div class="errors">
                        <div class="errorIcon">
                            <img src={AssetUtils.getImage('error.svg')} />
                        </div>
                        <div class="errorMsg">{errorMsg}</div>
                        <br />
                    </div>
                </div>
            </span>
        );
    }
}
