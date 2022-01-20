// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"images/icons/toxic.svg":[function(require,module,exports) {
module.exports = "/toxic.7f74c9f9.svg";
},{}],"images/icons/pet.svg":[function(require,module,exports) {
module.exports = "/pet.227efecc.svg";
},{}],"images/icons/high-sun.svg":[function(require,module,exports) {
module.exports = "/high-sun.24dcbddd.svg";
},{}],"images/icons/no-sun.svg":[function(require,module,exports) {
module.exports = "/no-sun.13a7574d.svg";
},{}],"images/icons/low-sun.svg":[function(require,module,exports) {
module.exports = "/low-sun.b84c5a4b.svg";
},{}],"images/icons/2-drops.svg":[function(require,module,exports) {
module.exports = "/2-drops.d9995d47.svg";
},{}],"images/icons/3-drops.svg":[function(require,module,exports) {
module.exports = "/3-drops.c412d65e.svg";
},{}],"images/icons/1-drop.svg":[function(require,module,exports) {
module.exports = "/1-drop.40dea4f5.svg";
},{}],"js/api.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function drawCard(plant) {
  var photoGrid = document.getElementById('photo-grid');
  var petsImg, sunImg, waterImg, html;
  if (plant.toxicity) petsImg = require("../images/icons/toxic.svg");else petsImg = require("../images/icons/pet.svg");
  if (plant.sun == 'high') sunImg = require("../images/icons/high-sun.svg");else if (plant.sun == 'no') sunImg = require("../images/icons/no-sun.svg");else sunImg = require("../images/icons/low-sun.svg");
  if (plant.water == 'regularly') waterImg = require("../images/icons/2-drops.svg");else if (plant.water == 'daily') waterImg = require("../images/icons/3-drops.svg");else waterImg = require("../images/icons/1-drop.svg");
  if (plant.staff_favorite) html = "<div class='photo-grid__card staff-favorite'>";else html = "<div class='photo-grid__card'>";
  html += '<img class="card-image" src="' + plant.url + '">';
  html += '<div class="card-info"><span class="card-info__plant-name">' + plant.name + '</span>';
  html += '<div class="card-info__price-option"><span class="card-info__price">$' + plant.price + '</span>';
  html += '<div class="card-info__options-images"><img src="' + petsImg + '">';
  html += '<img src="' + sunImg + '"><img src="' + waterImg + '"></div>';
  html += '</div></div></div>';
  photoGrid.innerHTML += html;
}

function getData() {
  var WATER = document.getElementById('water').value;
  var SUN = document.getElementById('sunlight').value;
  var PETS = document.getElementById('pets').value;

  if (WATER && SUN && PETS) {
    var URL_TO_FETCH = 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun=' + SUN + '&water=' + WATER + '&pets=' + PETS;
    fetch(URL_TO_FETCH).then(function (response) {
      response.json().then(function (data) {
        document.getElementById('photo-grid').innerHTML = '';

        if (data.length > 0) {
          data.forEach(function (plant) {
            drawCard(plant);
          });
          var contentNoResults = document.getElementById('content-no-results');
          var contentResults = document.getElementById('content-results');
          contentNoResults.style.display = 'none';
          contentResults.style.display = 'grid';
        } else {
          contentNoResults.style.display = 'grid';
          contentResults.style.display = 'none';
        }
      });
    }).catch(function (err) {
      console.error('Failed retrieving information', err);
    });
  }
} // const selectWater = document.querySelector('#water');
// const selectSun = document.querySelector('#sunlight');
// const selectPets = document.querySelector('#pets');
// selectSun.onchange = getData;
// selectWater.onchange = getData;
// selectPets.onchange = getData;


function requireComponents() {
  return _requireComponents.apply(this, arguments);
}

function _requireComponents() {
  _requireComponents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var header, options, noResults, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            header = require("/components/top-header.html");
            options = require("/components/options.html");
            noResults = require("/components/no-results.html");
            results = require("/components/results.html");
            document.getElementById("content-top").innerHTML = header;
            document.getElementById("content-options").innerHTML = options;
            document.getElementById("content-no-results").innerHTML = noResults;
            document.getElementById("content-results").innerHTML = results;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _requireComponents.apply(this, arguments);
}

function putEvents() {
  return _putEvents.apply(this, arguments);
}

function _putEvents() {
  _putEvents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var selectWater, selectSun, selectPets;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return requireComponents();

          case 2:
            test = _context2.sent;
            selectWater = document.querySelector('#water');
            selectSun = document.querySelector('#sunlight');
            selectPets = document.querySelector('#pets');
            selectSun.onchange = getData;
            selectWater.onchange = getData;
            selectPets.onchange = getData;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _putEvents.apply(this, arguments);
}

putEvents();
},{"../images/icons/toxic.svg":"images/icons/toxic.svg","../images/icons/pet.svg":"images/icons/pet.svg","../images/icons/high-sun.svg":"images/icons/high-sun.svg","../images/icons/no-sun.svg":"images/icons/no-sun.svg","../images/icons/low-sun.svg":"images/icons/low-sun.svg","../images/icons/2-drops.svg":"images/icons/2-drops.svg","../images/icons/3-drops.svg":"images/icons/3-drops.svg","../images/icons/1-drop.svg":"images/icons/1-drop.svg","/components/top-header.html":"components/top-header.html","/components/options.html":"components/options.html","/components/no-results.html":"components/no-results.html","/components/results.html":"components/results.html"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58853" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/parcel-bundler/src/builtins/loaders/browser/html-loader.js":[function(require,module,exports) {
module.exports = function loadHTMLBundle(bundle) {
  return fetch(bundle).then(function (res) {
    return res.text();
  });
};
},{}],0:[function(require,module,exports) {
var b=require("node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("html",require("node_modules/parcel-bundler/src/builtins/loaders/browser/html-loader.js"));b.load([["top-header.51c09c7d.html","components/top-header.html"],["options.6e105cdd.html","components/options.html"],["no-results.a8c972c2.html","components/no-results.html"],["results.e5a11603.html","components/results.html"]]).then(function(){require("js/api.js");});
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/api.0997d2ba.js.map