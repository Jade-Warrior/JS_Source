// 「节流」在某一次高频触发下，我们不是只识别一次，按照我们设定的间隔时间（自己规定的频率），没到达这个频率都会触发一次；
// 典型应用：抢券时疯狂点击，既要限制次数，又要保证先点先发出请求;窗口调整;页面滚动
// 达到间隔立即出发，三次间没有达到间隔，取第二次点击，触发时间正好在间隔点上
function throttle(func, wait) {
    if (typeof func !== 'function') throw new TypeError('func must be function');
    if (wait === undefined) wait = 500;
    let previous = 0,
        timer = null;
    return function proxy (...args) {
        let now = new Date(),
            self = this,
            remain = now - previous;
        if (remain >= wait) {
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


function handle(ev) {
    console.log('OK', this, ev);
}
document.onclick = throttle(handle, 500);