// a function to print all the app routes in the console
const printAllRoutes = (app) => {
  const visitedRoutes = new Set();

  function print(path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(
        print.bind(null, path.concat(split(layer.route.path)))
      );
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(
        print.bind(null, path.concat(split(layer.regexp)))
      );
    } else if (layer.method) {
      const routeKey = `${layer.method.toUpperCase()} /${path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join('/')}`;
      if (!visitedRoutes.has(routeKey)) {
        console.log(routeKey);
        visitedRoutes.add(routeKey);
      }
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
          .replace(/\(\?:\(\[\^\\\/]\+\?\)\)/g, ':projectId')
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
