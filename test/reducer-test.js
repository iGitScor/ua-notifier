'use strict';

const UANReducer = require('../build/reducers/notifier-reducer.js').reducer;
const InitialState = require('../build/reducers/notifier-reducer.js').initialState;
const expect = require('expect.js');

const actions = require('../build/actions/notifier-action').actions;

describe('Library reducer', () => {
  it('can handle default reducer', () => {
    const defaultReducer = UANReducer(InitialState, {
      type: 'test',
      payload: 'test',
    });

    expect(defaultReducer.message).to.equal(InitialState.message);
  });

  it('can handle install/uninstall/execute reducers', () => {
    const installReducer = actions.install;
    expect(UANReducer(InitialState, installReducer()).get('message'))
      .to.equal('Package installed');

    const uninstallReducer = actions.uninstall;
    expect(UANReducer(InitialState, uninstallReducer()).get('message'))
      .to.equal('Package uninstalled');

    const executeReducer = actions.execute;
    expect(UANReducer(InitialState, executeReducer()).get('message'))
      .to.equal('Package executed');
  });
});
