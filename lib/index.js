!function (_Date) {
  if (isNaN(Date.parse('2000-1-1'))) {
    function standardizeArgs(args) {
      if (args.length === 1 && typeof args[0] === 'string') {
        args[0] = args[0].replace(/-/g, '/') // '2000-1-1' => '2000/1/1'
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
