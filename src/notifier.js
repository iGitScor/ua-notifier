// @flow

const createStore = require('redux').createStore;
const combineReducers = require('redux-immutable').combineReducers;
const triggerReducer = require('./reducers/notifier-reducer');
const actions = require('./actions/notifier-action').actions;

const path = require('path');
const readJson = require('read-package-json');
const ua = require('universal-analytics');

class Notifier {
  action: string;
  dispatcher: any;
  visitor: any;

  constructor(action: string = 'execute') {
    let analyticsUserIdentifier = 'UA-43265839-1';
    if (
      process.env.NODE_ENV === 'production' &&
      typeof process.env.UA_ID !== 'undefined'
    ) {
      analyticsUserIdentifier = process.env.UA_ID;
    }

    this.action = action;
    this.visitor = ua(analyticsUserIdentifier);
    this.dispatcher = createStore(combineReducers({
      trigger: triggerReducer,
    }));
  }

  trigger(): any {
    readJson(path.resolve('package.json'), null, false, (error, data) => {
      let state;
      try {
        state = this.dispatcher.dispatch(actions[this.action](), 'test');
      } catch (e) {
        throw new Error(e);
      }

      if (
        !error &&
        Object.prototype.hasOwnProperty.call(state, 'payload') &&
        process.env.NODE_ENV === 'production'
      ) {
        this.visitor.event('node', state.type, JSON.stringify(data), 0).send();
      }

      return state;
    });
  }
}

module.exports = Notifier;
