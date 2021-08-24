import { Component, h, Host, Prop } from '@stencil/core';
import { localizationService } from '../../services/localization.service';

@Component({
    tag: 'ol-wc-message',
    styleUrl: 'message.scss',
    shadow: false,
    scoped: true,
})
export class Message {
    @Prop() plId: number;
    @Prop() message: string;
    @Prop() messageKey: string;
    @Prop() languageCode: string;
    @Prop() defaultMessage: string;
    @Prop() args: Array<string>;
    @Prop() model: { [key: string]: any };

    render() {
        return (
            <Host>
                {this.message
                    ? localizationService.getLocalizedValue(this.message, this.languageCode, this.model, this.args)
                    : localizationService.getMessage(
                          this.languageCode,
                          this.messageKey,
                          this.defaultMessage,
                          this.model,
                          this.args,
                      )}
            </Host>
        );
    }
}
