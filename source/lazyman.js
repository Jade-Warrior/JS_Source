class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`hi, this is ${name}`);
      this.next();
    }
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    })
  }
  next() {
    if (this.tasks.length === 0) return;
    this.tasks.shift()();
  }

  sleepFirst(time) {
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log(`sleepFirst ${time}`)
        this.next();
      }, time * 100)
    });
    return this;
  }

  sleep(time) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`wake up after ${time}`)
        this.next();
      }, time * 100)
    });
    return this;
  }

  eat(food) {
    this.tasks.push(() => {
      console.log(`eat ${food}`)
      this.next();
    });
    return this;
  }
}
function LazyMan(name) {
  return new _LazyMan(name)
}

// LazyMan('Hank')
// Hi! This is Hank!

// LazyMan('Hank').sleep(10).eat('dinner')
// Hi! This is Hank!
//等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan('Hank').eat('dinner').eat('supper')
// Hi This is Hank!
// Eat dinner~
// Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')
// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
