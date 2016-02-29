/// <reference path="../typings/main.d.ts" />

import { XPspPage } from './app.po';

describe('x-psp App', function() {
  let page: XPspPage;

  beforeEach(() => {
    page = new XPspPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('x-psp Works!');
  });
});
