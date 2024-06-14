// a function to print all the app routes in the console
const printAllRoutes = (app) => {
  function print(path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    } else if (layer.method) {
      console.log(
        '%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/')
      );
    }
  }

  function split(thing) {
    if (typeof thing === 'string') {
      return thing.split('/');
    } else if (thing.fast_slash) {
      return '';
    } else {
      let match = thing
        .toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .replace(/\(\?!\^\\\/\)\?\//g, '')
        .replace(/\/i\$/, '')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);

      if (match) {
        return match[1].replace(/\\(.)/g, '$1').split('/');
      } else {
        return thing
          .toString()
          .replace(/(^\/\^|\$\|i$)/g, '')
          .replace(/\(\?:\(\[\^\\\/]\+\?\)\)/g, ':param')
          .replace(/\(\[\^\\\/]\+\?\)/g, ':param')
          .replace(/\\(.)/g, '$1')
          .replace(/\?\(\?=\/|\$\)\//g, '')
          .replace(/\|i$/g, '')
          .split('/');
      }
    }
  }

  app._router.stack.forEach(print.bind(null, []));
};

module.exports = { printAllRoutes };
