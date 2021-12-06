/**
 * 观察者模式:观察者模式（Observer mode）指的是函数自动观察数据对象,一旦对象有变化，函数就会自动执行。
 * 而js中最常见的观察者模式就是事件触发机制。
*/
class Observer {
    constructor() {
        // 定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象
        this.handler = {}
    }
    // 事件订阅
    add (type, fn) {
        if(this.handler[type]){
            this.handler[type].push(fn);
        } else {
            this.handler[type] = [fn];
        }
        console.log('add', this.handler);
    }
    // 取消订阅
    remove (type, fn) {
        try{
            const index = this.handler[type].indexOf(fn);
            if (index === -1) throw error;
            this.handler[type].splice(index, 1);
            console.log('remove', index,this.handler);
        } catch(e) {
            console.error("删除的东西不存在")
        }
    }
    // 事件发布-这个主题对象的状态发生改变时就会通知所有观察着对象
    fire (type, fn) {
        try{
            //不传fn则全部触发
            if(!fn) {
                this.handler[type].forEach(fn => fn());
            } else {
                const index = this.handler[type].indexOf(fn);
                if (index === -1) throw error;
                fn();
            }
            return true;
        } catch(e) {
            console.error("触发的函数不存在");
            return false;
        }
    }
    once (type, fn) {
        this.fire(type ,fn) ? this.remove(type, fn) : null;
    }
}

const ob = new Observer();

function a() {console.log('a')}
function b() {console.log('b')}
function c() {console.log('c')}
function d() {console.log('d')}
ob.add('say', a);
ob.add('say', b);
ob.add('say', c);
ob.add('say', d);
// 删除
ob.remove('say', function() {
    console.log('a');
})
ob.remove('say', a);
// 触发
ob.fire('say');
ob.fire('say',a);
// once
ob.once('say', b);
