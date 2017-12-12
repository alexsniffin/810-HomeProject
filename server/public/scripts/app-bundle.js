define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var authConfig = {
    baseUrl: "http://127.0.0.1:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/home'
  };

  exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  Promise.config({ warnings: { wForgottenReturn: false } });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.users = users;
      this.message = 'Home';
      this.auth = auth;
      this.loginError = '';
      this.showLogin = true;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };

      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/galleries', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _galleries, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.List = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _galleries.Galleries), _dec(_class = function () {
    function List(router, auth, galleries) {
      _classCallCheck(this, List);

      this.galleries = galleries;
      this.currentGallery = undefined;

      this.router = router;
      this.apiUrl = "http://127.0.0.1:5000/api";
      this.message = 'MyPics Gallery Viewer';
      this.auth = auth;

      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showList = true;
      this.showCompleted = false;

      this.files = [];

      this.priorities = ['Low', 'Medium', 'High', 'Critical'];
    }

    List.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    List.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.galleries.getUserGalleries(this.user._id);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    List.prototype.toggleShowCompleted = function toggleShowCompleted() {
      this.showCompleted = !this.showCompleted;
    };

    List.prototype.createGallery = function createGallery() {
      this.galleryObj = {
        user: this.user._id,
        name: "",
        dateCreated: new Date()
      };
      this.showList = false;
    };

    List.prototype.back = function back() {
      this.showList = true;
    };

    List.prototype.editGallery = function editGallery(gallery) {
      this.galleryObj = gallery;
      this.showList = false;
    };

    List.prototype.deleteGallery = function deleteGallery(gallery) {
      this.galleries.deleteGallery(gallery._id);
    };

    List.prototype.completeGallery = function completeGallery(gallery) {
      gallery.completed = !gallery.completed;
      this.galleryObj = gallery;
      this.saveGallery();
    };

    List.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();

      for (var _iterator = this.files, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var picture = _ref2;

        this.filesToUpload.push(picture);
      }
    };

    List.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    List.prototype.showGallery = function showGallery(gallery) {
      this.currentGallery = gallery.file;
    };

    List.prototype.saveGallery = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var response, galleryId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.galleryObj) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 3;
                return this.galleries.save(this.galleryObj);

              case 3:
                response = _context2.sent;

                if (!response.error) {
                  _context2.next = 8;
                  break;
                }

                alert("There was an error creating the Gallery");
                _context2.next = 13;
                break;

              case 8:
                galleryId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 12;
                return this.galleries.uploadFile(this.filesToUpload, this.user._id, galleryId);

              case 12:
                this.filesToUpload = [];

              case 13:
                this.showList = true;

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveGallery() {
        return _ref3.apply(this, arguments);
      }

      return saveGallery;
    }();

    return List;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['resources/value-converters/completed']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataServices = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DataServices(http) {
      var _this = this;

      _classCallCheck(this, DataServices);

      this.httpClient = http;
      this.BASE_URL = "http://127.0.0.1:5000/api/";

      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            console.log('Requesting ' + _request.method + ' ' + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log('Received ' + _response.status + ' ' + _response.url);
            return _response;
          }
        });
      });
    }

    DataServices.prototype.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: files
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
});
define('resources/data/galleries',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Galleries = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Galleries(data) {
      _classCallCheck(this, Galleries);

      this.data = data;
      this.GALLERIES_SERVICE = 'galleries';

      this.galleriesArray = [];
    }

    Galleries.prototype.getUserGalleries = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.data.get(this.GALLERIES_SERVICE + "/user/" + id);

              case 2:
                response = _context.sent;

                if (!response.error && !response.message) {
                  this.galleriesArray = response;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserGalleries(_x) {
        return _ref.apply(this, arguments);
      }

      return getUserGalleries;
    }();

    Galleries.prototype.save = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(gallery) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!gallery) {
                  _context2.next = 14;
                  break;
                }

                if (gallery._id) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 4;
                return this.data.post(gallery, this.GALLERIES_SERVICE);

              case 4:
                response = _context2.sent;

                if (!response.error) {
                  this.galleriesArray.push(response);
                }
                return _context2.abrupt('return', response);

              case 9:
                _context2.next = 11;
                return this.data.put(gallery, this.GALLERIES_SERVICE + "/" + gallery._id);

              case 11:
                _response = _context2.sent;

                if (!_response.error) {}
                return _context2.abrupt('return', _response);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x2) {
        return _ref2.apply(this, arguments);
      }

      return save;
    }();

    Galleries.prototype.deleteGallery = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.delete(this.GALLERIES_SERVICE + "/" + id);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  for (i = 0; i < this.galleriesArray.length; i++) {
                    if (this.galleriesArray[i]._id === id) {
                      this.galleriesArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteGallery(_x3) {
        return _ref3.apply(this, arguments);
      }

      return deleteGallery;
    }();

    Galleries.prototype.uploadFile = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(files, userId, galleryId) {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                formData = new FormData();


                files.forEach(function (item, index) {
                  formData.append("file" + index, item);
                });

                _context4.next = 4;
                return this.data.uploadFiles(formData, this.GALLERIES_SERVICE + "/upload/" + userId + "/" + galleryId);

              case 4:
                response = _context4.sent;
                return _context4.abrupt('return', response);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function uploadFile(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return uploadFile;
    }();

    return Galleries;
  }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Users(data) {
      _classCallCheck(this, Users);

      this.data = data;
      this.USER_SERVICE = 'users';
    }

    Users.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!gallery) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.data.post(user, this.GALLERIES_SERVICE);

              case 3:
                serverResponse = _context.sent;
                return _context.abrupt('return', serverResponse);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Users.prototype.save = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!user) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return this.data.post(user, this.USER_SERVICE);

              case 3:
                serverResponse = _context2.sent;
                return _context2.abrupt('return', serverResponse);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function save(_x2) {
        return _ref2.apply(this, arguments);
      }

      return save;
    }();

    return Users;
  }()) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><div id=\"content-wrapper\"><h1>${message}</h1><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></div></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = "#content-wrapper {\n  margin: 0px 10%;\n}\n\n.rightMargin {\n  margin-right: 10px;\n}\n\n.gallery-list {\n  padding-left: 0;\n  margin-top: 5px;\n}\n\n.picture-card {\n  width: 240px;\n}\n"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><div id=\"content-wrapper\"><div class=\"row mt-2\"><div class=\"col-md-12 mb-2\"><span class=\"pull-left\"><h1>${message}</h1></span><div class=\"pt-3 pr-3 mr-5\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i> </span><span class=\"rightMargin pull-right\"><i click.trigger=\"createGallery()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></div></div></div><div class=\"row\"><div class=\"col-md-12\"><compose show.bind=\"showList\" view=\"./components/myPicList.html\"></compose><compose show.bind=\"!showList\" view=\"./components/myPicForm.html\"></compose></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div class=\"card-body\"><div class=\"row\"><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div></div><div class=\"row col-md-12\"><label for=\"email\">Email</label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></div><div class=\"row col-md-12 mt-3\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div><div class=\"row mt-3\"><div class=\"col-md-4\"><button click.trigger=\"login()\">Login</button> </div><div class=\"col-md-4\"><span class=\"registerLink\" click.trigger=\"showRegister()\">Register</span></div></div></div></div></template>"; });
define('text!modules/components/myPicForm.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group\"><label for=\"galleryInput\">Gallery Name *</label><input value.bind=\"galleryObj.name\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter gallery name\" value=\"galleryObj.name\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">A gallery name.</small></div><div class=\"row\"><div class=\"col-md-10 mt-3\"><label class=\"btn btn-secondary\">Browse for pictures <input type=\"file\" style=\"display:none\" files.bind=\"files\" change.delegate=\"changeFiles()\" multiple=\"multiple\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload images that you'd like to be part of the gallery.</small></div><div class=\"col-md-2 pull-right mt-3\"><button click.trigger=\"saveGallery()\" class=\"btn btn-primary topMargin\">Save</button></div></div><div class=\"row\"><div class=\"col-8\"><ul class=\"gallery-list\"><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div></form></template>"; });
define('text!modules/components/myPicList.html', ['module'], function(module) { module.exports = "<template><div class=\"row\"><div class=\"col-md-2 card mr-3 mb-3\"><div class=\"card-body\"><div show.bind=\"galleries.galleriesArray.length\"><h4>Your galleries:</h4><hr><div repeat.for=\"gallery of galleries.galleriesArray\"><span click.trigger=\"showGallery(gallery)\"> ${gallery.name} </span><div class=\"pull-right\"><i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></div><hr></div></div><div show.bind=\"!galleries.galleriesArray.length\">No galleries to show. Create a new gallery for it to show here.</div></div></div><div class=\"col-md-9 card\"><div class=\"card-body\"><div show.bind=\"currentGallery.length\"><div repeat.for=\"picture of currentGallery\" style=\"display:inline-block\"><div class=\"card card-body picture-card ml-1 mr-1 mb-1\"> ${picture.originalName} <a href=\"${apiUrl}/galleries/user/${user._id}/${picture.filename}\" width=\"200\"><img src=\"${apiUrl}/galleries/user/${user._id}/${picture.thumbFile}\" width=\"200\"></a></div></div></div><div show.bind=\"currentGallery == undefined\">Click on a gallery to view it's images.</div><div show.bind=\"currentGallery != undefined && !currentGallery.length\">No images in this gallery, <b click.trigger=\"editGallery(gallery)\">click here</b> to upload some!</div></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div class=\"card-body\"><div class=\"row col-md-12\"><label for=\"firstName\">First Name</label><input value.bind=\"user.firstName\" type=\"text\" autofocus class=\"form-control\" id=\"firstName\" placeholder=\"first name\"></div><div class=\"row col-md-12 mt-3\"><label for=\"lastName\">Last Name</label><input value.bind=\"user.lastName\" type=\"text\" autofocus class=\"form-control\" id=\"lastName\" placeholder=\"last name\"></div><div class=\"row col-md-12 mt-3\"><label for=\"email\">Email</label><input value.bind=\"user.email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"email\"></div><div class=\"row col-md-12 mt-3\"><label for=\"password\">Password</label><input value.bind=\"user.password\" type=\"text\" autofocus class=\"form-control\" id=\"password\" placeholder=\"password\"></div><div class=\"row mt-3\"><div class=\"col-md-4\"><button click.trigger=\"save()\">Save</button></div></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map