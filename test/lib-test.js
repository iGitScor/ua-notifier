const UANotifier = require('../build/notifier.js');
const expect = require('expect.js');

let uan;

describe('UA npm script notifier', () => {
  beforeEach(() => {
    process.env.UA_ID = 'UA-Test-1';
    uan = new UANotifier('install');
  });

  it('can be instantiated', () => {
    expect(typeof uan).to.equal('object');
  });

  it('can retrieve main package configuration', () => {
    expect(UANotifier.getMainConfiguration()).to.be.a('string');
  });

  it('can be launched', () => {
    expect(uan.trigger).to.not.throwException();
  });

  it('can notify', () => {
    expect(uan.notify(null, {})).to.be.an('object');
  });

  it('throw error when command is not implemented', () => {
    uan = new UANotifier('error');
    expect(uan.notify).to.throwException();
  });

  it('do nothing when an error occured during configuration load', () => {
    const loadingError = true;
    expect(uan.notify(loadingError, {})).to.be.an('object');
  });
});
