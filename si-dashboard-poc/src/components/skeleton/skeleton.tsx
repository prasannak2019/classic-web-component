import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'ol-wc-skeleton',
    styleUrl: 'skeleton.scss',
    shadow: false,
    scoped: true,
})
export class Skeleton {
    @Prop() animation: string;
    @Prop() count: number;
    @Prop() customStyles: string;
    @Prop() height: string;
    @Prop() showWarnings: boolean;
    @Prop() variant: string;
    @Prop() width: string;

    render() {
        return (
            <div>
                <nb-skeleton
                    animation={this.animation}
                    count={this.count}
                    customStyles={this.customStyles}
                    height={this.height}
                    showWarnings={this.showWarnings}
                    variant={this.variant}
                    width={this.width}
                ></nb-skeleton>
            </div>
        );
    }
}
