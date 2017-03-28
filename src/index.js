// @flow

const scriptParameters = require('minimist')(process.argv.slice(2));
const Notifier = require('./notifier');

function init(event: string) {
  const notificationCenter = new Notifier(event);
  notificationCenter.trigger();
};

init(scriptParameters.event);

module.exports = init;
