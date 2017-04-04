function timeout(duration = 0){
  return new Promise((resolve, reject) => {
    console.log('1')
    setTimeout(resolve, duration);
  });
}
var p = timeout(1000).then(() => {
  console.log('2');
  return timeout(2000);
}).then(() => {
  console.log('3');
}).catch(err => {
  console.log(err);
  return Promise.all([timeout(100), timeout(200)]);
});