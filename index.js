if (isNaN(Date.parse('2000-1-1'))) {
  const _Date = Date

  const standardizeArgs = args => {
    if (args.length === 1 && typeof args[0] === 'string') {
      args[0] = args[0].replace(/-/g, '/')
    }
    return args
  }

  function $Date() {
    if (this instanceof $Date) {
      return new _Date(...standardizeArgs(arguments))
    }
    return _Date()
  }
  $Date.prototype = _Date.prototype
  
  $Date.now = _Date.now
  $Date.UTC = _Date.UTC
  $Date.parse = function () {
    return _Date.parse(...standardizeArgs(arguments))
  }

  Date = $Date
}
