const core = require('@lumjs/core');
const {def,isComplex} = core.types;

const LumDebug = require('@lumjs/debug');
const UrlHashExtension = require('./url-hash');

/**
 * A sub-class of `@lumjs/debug` for Web-browser use
 * 
 * It's a super-simple extended class that just adds all of the 
 * web-specific extensions to the constructor options using the 
 * {@link module:@lumjs/web-debug.webOpts webOpts()} method.
 * 
 * @exports module:@lumjs/web-debug
 */
class WebDebug extends LumDebug
{
  constructor(opts={})
  {
    super(webOpts(opts));
  }

  /**
   * A static method returning a new instance
   * 
   * @param {object} [opts] Constructor options. 
   * @returns {module:@lumjs/web-debug} A new object instance
   */
  static new(opts={})
  {
    return new WebDebug(opts);
  }
}

module.exports = WebDebug;

/**
 * Add web extensions to `@lumjs/debug` constructor options
 * 
 * @param {object} opts - The options object we're modifying.
 * @returns {object} The `opts` once they've been modified.
 * @alias module:@lumjs/web-debug.webOpts
 */
function webOpts(opts)
{ // Web-specific extensions will be added here.
  const webExts = 
  [
    UrlHashExtension,
  ];

  if (Array.isArray(opts.extend))
  {
    webExts.push(...opts.extend);
  }
  else if (isComplex(opts.extend))
  {
    webExts.push(opts.extend);
  }

  opts.extend = webExts;

  return opts;
}

def(WebDebug, 'webOpts', webOpts);
