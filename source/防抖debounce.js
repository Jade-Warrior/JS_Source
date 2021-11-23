function debounce (func, wait, immediate) {
    if (typeof func !== 'function') throw new TypeError('func must be function');
    if (wait === undefined) wait = 500;
    if (typeof wait === 'boolean') {
        immediate = wait;
        wait = 500;
    }
    if (typeof immediate !== 'boolean') immediate = false;
    let timer = null;
    return function proxy(...args) {
        let self = this;
        let now = immediate && !timer;
        clearTimeout(timer);
        // 等待500ms触发一次
        timer = setTimeout(() => {
            timer = null;
            !immediate && func.call(self, ...args);
        }, wait);
        now && func.call(self, ...args);
    }
}

function handle(ev) {
    // 具体在点击的时候要处理的业务
    console.log('OK', this, ev);
}
document.onclick = debounce(handle, true);