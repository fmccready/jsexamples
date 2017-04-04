function analytics(){
  var top = false;
  var bottom = false;
  var dataTop, dataBottom;
  return function(location, data){
    if (location === 'top'){
      top = true;
      dataTop = data;
    }
    else if(location === 'bottom'){
      bottom = true;
      dataBottom = data;
    } 
    if (top && bottom){
      console.log('BOTH ARE FINISHED');
      console.log(dataTop);
      console.log(dataBottom);
    }
  }
}
var test = analytics();
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
setTimeout(function(){
  console.log('TOP IS DONE');
  var data = {
    some: 'data from top',
    more: 123
  }
  test('top', data);
}, getRandomInt(1, 5000));


setTimeout(function(){
  console.log('BOTTOM IS DONE');
  var data = {
    some: 'data from bottom',
    more: 456
  }
  test('bottom', data);
}, getRandomInt(1, 5000));