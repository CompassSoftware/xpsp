import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {XPspApp} from '../app/x-psp';

beforeEachProviders(() => [XPspApp]);

describe('App: XPsp', () => {
  it('should have the `defaultMeaning` as 42', inject([XPspApp], (app: XPspApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([XPspApp], (app: XPspApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

