const pending = 'pending'
const fulfilled = 'fulfilled'
const rejected = 'rejected'

function MyPromise(exec) {
  this._state = pending;
  this._result = undefined;
  this._resolvedStack = [];
  this._rejectedStack = [];
  this._resolve = (res) => change(fulfilled, res);
  this._reject = (res) => change(rejected, res);

  const self = this
  try {
    exec(this._resolve, this._reject)
  } catch {
    this._reject
  }

  function change(state, result) {
    if (self._state !== pending) return
    self._state = state;
    self._result = result;
    const fn = self._state === fulfilled ? self._resolvedStack : self._rejectedStack
    while (fn.length) { fn.shift()() }
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  if (typeof onFulfilled !== 'function') {
    onFulfilled = function (res) {
      return res
    }
  }
  if (typeof onRejected !== 'function') {
    onRejected = function (res) {
      return res
    }
  }
  let p2 = new MyPromise(function (resolve, reject) {
    switch (self._state) {
      case pending:
        self._resolvedStack.push(function () {
          setTimeout(() => {
            let x = onFulfilled(self._result)
            if (x instanceof MyPromise) {
              x.then(reslove, reject)
              return
            }
            resolve(x)
          })
        })
        self._rejectedStack.push(function () {
          setTimeout(() => {
            let x = onRejected(self._result)
            if (x instanceof MyPromise) {
              x.then(reslove, reject)
              return
            }
            resolve(x)
          })
        })
        break;
      case fulfilled:
        setTimeout(() => {
          let x = onFulfilled(self._result)
          if (x instanceof MyPromise) {
            x.then(reslove, reject)
            return
          }
          resolve(x)
        })
        break;
      case rejected:
        setTimeout(() => {
          let x = onRejected(self._result)
          if (x instanceof MyPromise) {
            x.then(reslove, reject)
            return
          }
          resolve(x)
        })
        break;

    }
  })
  return p2;
}
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
MyPromise.prototype.finally = function (cb) {
  return this.then(() => cb(), () => cb())
}

// 跑得快
MyPromise.race = function (fns) {
  return new MyPromise(function (reslove, reject) {
    fns.forEach(function (fn) {
      fn.then(reslove, reject);
    })
  })
}
// 只有成功状态，全部跑完
MyPromise.allSettled = function (fns) {
  const res = []
  let count = 0
  return new MyPromise((resolve, reject) => {
    fns.forEach((fn, idx) => {
      fn.then((val) => {
        count ++
        res[idx] = val
        if (count >= fns.length){
          resolve(res)
        }
      }, (val) => {
        count ++
        res[idx] = val
        if (count >= fns.length) {
          resolve(res)
        }
      })
    })
  })
}
// 一个失败则失败，全部成功则成功
MyPromise.all = function (fns) {
  const res = []
  let count = 0
  return new MyPromise((resolve, reject) => {
    fns.forEach((fn, idx) => {
      fn.then((val) => {
        count++
        res[idx] = val
        if (count >= fns.length){
          resolve(res)
        }
      }, reject)
    })
  })
}
// 一个成功则成功，全部失败则失败
MyPromise.any = function (fns) {
  const res = []
  let count = 0
  return new MyPromise((reslove, reject) => {
    fns.forEach((fn, idx) => {
      fn.then(reslove, (err) => {
        count++
        res[idx] = err
        if (count >= fns.length){
          reject(res)
        }
      })
    })
  })
}
