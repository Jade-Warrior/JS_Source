function throttle(func, wait) {
    if (typeof func !== 'function') throw new TypeError('func must be function');
    if (wait === undefined) wait = 500;
    let previous = 0,
        timer = null;
    return function proxy (...args) {
        let now = new Date(),
            self = this,
            remain = now - previous;
        if (remain >= wait) {// 立即执行
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...args);
        } else if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...args);
            }, wait - remain);
        }
    }
}


function handle() {
    console.log('OK');
}
window.onscroll = throttle(handle, 500);
