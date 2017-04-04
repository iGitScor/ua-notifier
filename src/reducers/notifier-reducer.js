// @flow

'use strict';

const Immutable = require('immutable');
const INSTALL = require('../actions/notifier-action').INSTALL;
const EXECUTE = require('../actions/notifier-action').EXECUTE;
const UNINSTALL = require('../actions/notifier-action').UNINSTALL;

const initialState = Immutable.fromJS({
  message: 'No action',
});

const triggerReducer = (
  state: Immutable.fromJS,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case INSTALL:
    case UNINSTALL:
    case EXECUTE:
      return state.set('message', action.payload);
    default:
      return initialState;
  }
};

module.exports.initialState = initialState;
module.exports.reducer = triggerReducer;
