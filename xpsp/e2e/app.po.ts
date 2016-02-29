export class XPspPage {
  navigateTo() { return browser.get('/'); }
  getParagraphText() { return element(by.css('XPsp-app p')).getText(); }
}
