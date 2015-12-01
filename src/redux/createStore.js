if (process.env.NODE_ENV === 'production') {
  module.exports = require('./createStore.prod.js');
} else {
  module.exports = require('./createStore.dev.js');
}
