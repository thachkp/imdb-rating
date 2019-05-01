const localConfig = require('../configs/local-config');
const config = require('../configs/config');

const getConfig = () => {
  if (process.env.NODE_ENV !== 'production') {
    return localConfig;
  } else {
    return config;
  }
}

module.exports = getConfig;
