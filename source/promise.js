(function() {
  var PENDING = 'pending';
  var REJECT = 'rejected';
  var RESOLVE = 'fulfilled';

  // Promise 构造函数
  function Promise(exec) {
    var self = this;
    if (typeof exec !== 'function') throw new TypeError('exec not a function');
    if (!(self instanceof Promise)) throw new TypeError('this is not a promise');
    self.state = PENDING;
    self.result = undefined;
    self.resolvedCallbacks = [];
    self.rejectedCallbacks = [];

    try {
      exec(function resolve(value) {
        change(RESOLVE, value);
      }, function reject(value) {
        change(REJECT, value);
      });
    } catch(err) {
      change(REJECT, err);
    }

    function change (state, value) {
      if (self.state !== PENDING) return;
      self.state = state;
      self.result = value;
      var cb = self.state === RESOLVE ? self.resolvedCallbacks : self.rejectedCallbacks;
      while(cb.length) cb.shift()();
    }
  }

  function handle(cb, val, promise2, resolve, reject) {
    try {
      var x = cb(val);
      resolvePromise(x, promise2, resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  function resolvePromise(x, promise2, resolve, reject) {
    if(x === promise2) throw new TypeError('Chaining cycle detected for promise #<Promise>');
    if (x !== null && /^(object|function)$/i.test(typeof x)) {
      var then;
      try {
        then = x.then;
      } catch (e) {
        reject(e);
      }
      if (typeof then === 'function') {
        var called = false;
        try {
          then.call(x, function onfulfilled(y) {
            if (called) return;
            called = true;
            resolvePromise(y, promise2, resolve, reject);
          }, function onrejected(r) {
            if (called) return;
            called = true;
            reject(r);
          });
        } catch(err) {
          if (called) return;
          called = true;
          reject(err);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  // 原型方法
  Promise.prototype.then = function then(onFulfilled, onRejected) {
    var self = this;
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value;
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason;
      }
    }
    var promise2 = new Promise(function(resolve, reject) {
      switch(self.state) {
        case RESOLVE:
          setTimeout(function() {
            handle(onFulfilled, self.result, promise2, resolve, reject);
          }, 0);
          break;
        case REJECT:
          setTimeout(function() {
            handle(onRejected, self.result, promise2, resolve, reject);
          }, 0)
          break;
        case PENDING:
          self.resolvedCallbacks.push(function() {
            setTimeout(function() {
              handle(onFulfilled, self.result, promise2, resolve, reject);
            }, 0)
          });
          self.rejectedCallbacks.push(function() {
            setTimeout(function() {
              handle(onRejected, self.result, promise2, resolve, reject);
            }, 0)
          });
        break;
      }
    });
    return promise2;
  }
  Promise.prototype.catch = function(onrejected) {
    return this.then(null, onrejected);
  }
  Promise.prototype.finally = function (callback) {
    return this.then(function(value) {
      return Promise.resolve(callback()).then(function() {return value});
    }, function(reason) {
      return Promise.resolve(callback()).then(function() {throw reason});
    })
  }

  function isPromise(promise) {
    return promise !== null && /^(object|function)$/.test(typeof promise) &&
     typeof promise.then === 'function'
  }

  // 静态方法
  Promise.all = function (promises) {
    if (!Array.isArray(promises)) throw new TypeError('promise must be array');
    var count = 0;
    var reslut = [];
    return new Promise(function(reslove, reject) {
      promises.forEach(function(promise, index) {
        if (!isPromise(promise)) promise = Promise.resolve(promise);
        promise.then(function(value) {
          count ++;
          reslut[index] = value;
          if (count >= promises.length) reslove(reslut);
        }).catch(function(reason) {
          reject(reason);
        })
      })
    });
  }
  Promise.any = function (promises) {
    if (!Array.isArray(promises)) throw new TypeError('promise must be array');
    var count = 0;
    var reslut = [];
    return new Promise(function(reslove, reject) {
      promises.forEach(function(promise, index) {
        if (!isPromise(promise)) promise = Promise.resolve(promise);
        promise.then(function(value) {
          reslove(value);
        }).catch(function(reason) {
          count ++;
          reslut[index] = promise;
          if (count >= promises.length) reject(reslut);
        })
      })
    });
  }
  Promise.allSettled = function (promises) {
    if (!Array.isArray(promises)) throw new TypeError('promise must be array');
    var count = promises.length;
    var reslut = [];
    return new Promise(resolve => {
      promises.forEach(function(promise, index) {
        if (!isPromise(promise)) promise = Promise.resolve(promise);
        promise.then(function(val) {
          reslut[index] = { status: RESOLVE, result: val }
        }, function(res) {
          reslut[index] = { status: REJECT, result: res }
        }).finally(function() {
          count--;
          if (count <= 0) {
            resolve(reslut)
          }
        })
      })
    })
  }
  Promise.race = function(promises) {
    if (!Array.isArray(promises)) throw new TypeError('promise must be array');
    return new Promise(function(reslove, reject) {
      promises.forEach(function(promise, index) {
        if(!isPromise(promise)) promise = Promise.resolve(promise);
        promise.then(reslove, reject)
      })
    });
  }
  Promise.resolve = function (value) {
    return new Promise(function(resolve, reject) {
      resolve(value);
    });
  }
  Promise.reject = function (reason) {
    return new Promise(function(resolve, reject) {
      reject(reason);
    });
  }

  // 测试规范性:promises-aplus-tests
  Promise.deferred = function () {
    var result = {};
    result.promise = new Promise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });
    return result;
  }

  // 属性
  if (typeof Symbol !== undefined) Promise.prototype[Symbol.toStringTag] = 'Promise';

  // 暴露API
  if(typeof window !== 'undefined') window.Promise = Promise;
  if(typeof module === 'object' && typeof module.exports === 'object') module.exports = Promise;

})();

let p1 = new Promise((resolve, reject) => {
    reject(100)
  })
  p1.then(null, null).then((res) => {
    console.log(res)
  }, (res) => {
    console.log(res)
  })
