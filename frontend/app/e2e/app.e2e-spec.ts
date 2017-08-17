import { LiveAdminAngular2Page } from './app.po';

describe('live-admin-angular2 App', function() {
  let page: LiveAdminAngular2Page;

  beforeEach(() => {
    page = new LiveAdminAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
