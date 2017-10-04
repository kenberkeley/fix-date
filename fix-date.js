!function (_Date) {
  if (isNaN(_Date.parse('2000-01-01 00:00:00'))) {
    function standardizeArgs(args) {
      if (args.length === 1 && typeof args[0] === 'string' && isNaN(_Date.parse(args[0]))) {
        // '2000-01-01 00:00:00' => '2000/01/01 00:00:00'
        args[0] = args[0].replace(/-/g, '/')
      }
      return Array.prototype.slice.call(args)
    }

    function $Date() {
      if (this instanceof $Date) {
        // hijack constructor
        return new (
          Function.prototype.bind.apply(_Date, [null].concat(standardizeArgs(arguments)))
        )()
      }
      return _Date()
    }
    $Date.prototype = _Date.prototype
    
    $Date.now = _Date.now
    $Date.UTC = _Date.UTC
    $Date.parse = function () {
      return _Date.parse.apply(_Date, standardizeArgs(arguments))
    }

    Date = $Date
  }
}(Date);
