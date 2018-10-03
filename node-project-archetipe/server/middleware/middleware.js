
var log;

// Es necesario para cargar el Logger en el middleware //
module.exports = (_log) => {
  log=_log;
}

module.exports.mw_function_1 = (req, res, next) => {
  log.debug('mw_function_1');
  next();
};

module.exports.mw_function_2 = (req, res, next) => {
  log.debug('mw_function_2');
  next();
};
