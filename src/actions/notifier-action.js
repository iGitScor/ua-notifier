'use strict';

const createAction = require('redux-actions').createAction;

const INSTALL = 'INSTALL';

const install = createAction(INSTALL, () => 'Package installed');

const EXECUTE = 'EXECUTE';

const execute = createAction(EXECUTE, () => 'Package executed');

const UNINSTALL = 'UNINSTALL';

const uninstall = createAction(UNINSTALL, () => 'Package uninstalled');

module.exports.actions = {
  install,
  execute,
  uninstall,
};

module.exports.INSTALL = INSTALL;
module.exports.EXECUTE = EXECUTE;
module.exports.UNINSTALL = UNINSTALL;
