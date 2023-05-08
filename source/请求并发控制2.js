// 字面面试
// 实现一个异步请求管理方法，有200个异步请求要发送出去，但是同时最多只能发送5个请求。如何能够最快请求完全部请求。
function genFetch(index) {
  // 无需实现
}
function fetchAll() {
}


function fetchAll(urlList) {
  const limit = 5;
  const temp = {};
  const result = [];
  urlList.forEach((url, i) => {
    temp[url] = i;
    result.push(null);
  });
  const fetchUrls = [];
  return new Promise((resolve) => {
    function _fetchSteps() {

      if (fetchUrls.length >= limit) {
        return false;
      }
      if (urlList.length === 0) {
        return true;
      }

      for (let i = fetchUrls.length; i < limit; i++) {
        const url = urlList.shift();
        fetchUrls.push(url);
        window.fetch(url).then((res) => {
          const index = temp[url];
          result[index] = res;
          fetchUrls.splice(fetchUrls.indexOf(url), 1);
          const status = _fetchSteps();
          if (fetchUrls.length === 0 && urlList.length === 0 && status === true) {
            resolve(result);
          }
        }).catch((err) => {
          const index = temp[url];
          result[index] = err;
          fetchUrls.splice(fetchUrls.indexOf(url), 1);
          const status = _fetchSteps();
          if (fetchUrls.length === 0 && urlList.length === 0 && status === true) {
            resolve(result);
          }
        })
      }
      console.log(fetchUrls);
      return false;
    }
    _fetchSteps();
  })
}

// 测试 200个请求
const urlList = [];
for (let i = 0; i < 200; i++) {
  urlList.push(`https://unpkg.com/vue/package.json?i=${i}`)
}

fetchAll(urlList).then(console.log).catch(console.log)
// 打开浏览器可以看到每次都是5个请求
