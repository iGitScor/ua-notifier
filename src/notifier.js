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
    if (typeof process.env.UA_ID !== 'undefined') {
      analyticsUserIdentifier = process.env.UA_ID;
    }

    this.action = action;
    this.visitor = ua(analyticsUserIdentifier);
    this.dispatcher = createStore(
      combineReducers({
        trigger: triggerReducer,
      }),
    );
  }

  static getMainConfiguration(): string {
    return path.join(path.resolve(__dirname).split('node_modules')[0], 'package.json');
  }

  trigger(): any {
    readJson(Notifier.getMainConfiguration(), null, false, (error, data) => {
      let state;
      try {
        state = this.dispatcher.dispatch(actions[this.action](), 'test');
      } catch (executionError) {
        throw new Error(executionError);
      }

      if (
        error != null &&
        Object.prototype.hasOwnProperty.call(state, 'payload') &&
        __dirname.indexOf('node_modules') >= 0
      ) {
        const rawData = JSON.parse(JSON.stringify(data));

        // Delete big entries (readme)
        delete rawData.readme;

        this.visitor.event('node', state.type, JSON.stringify(rawData), 0).send();
      }

      return state;
    });
  }
}

module.exports = Notifier;
