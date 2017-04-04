function analytics(){
  // Scoped variables
  var top = false;
  var bottom = false;
  var dataTop, dataBottom;
  /* 
    Return function that tests if both the top and bottom have returned data or whatever else you want to test for.
    If it passes the test. Do something with the data each returned.
    You can also but a timeout here and do something based on the data you have received if any.
  */
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

// Function for random time intervals
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Timeout to simulate the first async request.
setTimeout(function(){
  console.log('TOP IS DONE');
  var data = {
    some: 'data from top',
    more: 123
  }
  test('top', data);
}, getRandomInt(1, 5000));

// Timeout to simulate the second async request.
setTimeout(function(){
  console.log('BOTTOM IS DONE');
  var data = {
    some: 'data from bottom',
    more: 456
  }
  test('bottom', data);
}, getRandomInt(1, 5000));