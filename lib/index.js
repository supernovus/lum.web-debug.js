const core = require('@lumjs/core');
const {lazy,isComplex} = core.types;
const E = lazy.def.e;

lazy(exports, 'Elements', () => require('./elements'), E);
lazy(exports, 'LumDebug', () => require('@lumjs/debug'), E);
lazy(exports, 'UrlHashExtension', () => require('./url-hash'), E);

/**
 * Get a `@lumjs/debug` instance with Web extensions added
 * 
 * @param {object} [opts] - Options for the constructor. 
 * @returns {object} The debug instance.
 */
exports.new = function(opts={})
{
  const LumDebug = exports.LumDebug;
  const DbgUrlHash = exports.UrlHashExtension;

  // Web-specific extensions will be added here.
  const webExts = [DbgUrlHash];

  if (Array.isArray(opts.extend))
  {
    webExts.push(...opts.extend);
  }
  else if (isComplex(opts.extend))
  {
    webExts.push(opts.extend);
  }

  opts.extend = webExts;

  return new LumDebug(opts);
}
