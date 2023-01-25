const {S,isObj} = require('@lumjs/core/types');
const LumHash = require('@lumjs/web-url-hash');
const LumDebug = require('@lumjs/debug');

/**
 * An extension for `@lumjs/debug` adding URL hash support.
 *
 *  #debug               Turns on ALL debugging ('*' tag.)
 *  #debug=tag          Turn on a single tag.
 *  #debug=tag1=tag2   Turn on multiple tags.
 * 
 * @exports @lumjs/web-debug/url-hash
 */
const DbgUrlHash =
{
  defaultOpts: {shortOpt: true},

  registerDebug(dbg, opts={})
  {
    if (!(dbg instanceof LumDebug))
    {
      if (this instanceof LumDebug)
      { // The function was passed instead of the object.
        if (isObj(dbg) && Object.keys(dbg).length > 0)
        { // Opts were passed. Save them.
          opts = dbg;
        }
        dbg  = this;
      }
    }

    dbg.$urlHashExtension = DbgUrlHash;

    if (isObj(opts.hash))
    { // Might be options to build a Hash instance, or a Hash instance.
      if (opts.hash instanceof LumHash)
      { // It's an existing instance.
        dbg.$urlHash = opts.hash;
      }
      else
      { // Assume it's options for creating an instance.
        dbg.$urlHash = new LumHash(opts.hash);
      }
    }
    else
    { // Create a default Hash instance with the default options.
      dbg.$urlHash = new LumHash(DbgUrlHash.defaultOpts);
    }

    // Set a handler for postUpdate event.
    dbg.on('postUpdate', DbgUrlHash.onUpdate);

  }, // onConstruct

  onUpdate(tags, reset)
  {
    if (this.$initialized && isObj(tags) && Object.keys(tags).length > 0)
    { // After initialization, we should update the Hash if there's tags.
      if (reset)
      {
        this.$urlHash.replace(tags);
      }
      else
      {
        this.$urlHash.update(tags);
      }

      // We're done now.
      return;
    }

    const debugTags = this.$urlHash.getOpt('debug');

    if (debugTags === undefined)
    { // Nothing found, we don't do anything.
      return; 
    }

    if (debugTags === null)
    { // The null value means #debug was passed, which is an alias for '*'
      console.debug("Enabling global debugging.");
      this.toggle('*', true);
      return;
    }

    if (typeof debugTags === S)
    { // A single tag was passed.
      this.toggle(debugTags, true);
      return;
    }

    if (Array.isArray(debugTags))
    { // Output was an array of debug tags.
      for (var k in debugTags)
      {
        var keyword = debugTags[k];
        console.debug("Enabling debugging on", keyword);
        this.toggle(keyword, true);
      }
      return;
    }

    if (isObj(debugTags))
    { // Advanced use, probably not super useful.
      for (const key in debugTags)
      {
        var val = debugTags[key];
        console.debug("Settings debug tag", key, val);
        this.toggle(key, val);
      }
      return;
    }
  }, // onUpdate()

} // DbgUrlHash

module.exports = DbgUrlHash;
