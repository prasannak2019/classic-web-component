import { newSpecPage } from '@stencil/core/testing';
import { Skeleton } from '../skeleton';

describe('Message.ts', () => {
    jest.mock('../../../services/localization.service', () => ({
        getLocalizedValue: () => 'message',
        getMessage: () => 'message',
    }));
    it('should render my component', async () => {
        const page = await newSpecPage({
            components: [Skeleton],
            html: `<ol-wc-skeleton></ol-wc-skeleton>`,
        });
        await page.waitForChanges();
        expect(page.root).toEqualHtml(`
        <ol-wc-skeleton>
          <div>
             <nb-skeleton></nb-skeleton>
           </div>
        </ol-wc-skeleton>
        `);
    });
});
