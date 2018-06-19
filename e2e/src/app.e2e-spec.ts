import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
<<<<<<< HEAD
    expect(page.getParagraphText()).toEqual('Welcome to gear!');
=======
    expect(page.getParagraphText()).toEqual('Welcome to app!');
>>>>>>> b6ec603b2744e9eec2341ea6ae524c1bf58c29e6
  });
});
