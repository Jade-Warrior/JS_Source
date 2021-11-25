// 防抖:在频繁的触发下，只有触发停止了多少ms后才会执行一次
// 典型应用:远程搜索,拖拽
// immediate为true是立即执行，500ms之后才能被立即执行第二次
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
// document.onclick = debounce(handle, false);