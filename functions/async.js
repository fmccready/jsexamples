function analytics(){
  // Scoped variables
  var top = false;
  var bottom = false;
  var dataTop, dataBottom;
  var revoke = false; // Naive way of revoking the function.
  /*
    Return function that tests if both the top and bottom have returned data or whatever else you want to test for.
    If it passes the test. Do something with the data each returned.
    You can also but a timeout here and do something based on the data you have received if any.
  */
  var timeout = setTimeout(function(){
    // This is taking to long. Do something with what we have or throw or w/e.
      revoke = true;
      console.error('This is taking to long.');
      console.log({
        dataTop: dataTop,
        dataBottom: dataBottom
      });
  }, 4000);
  return function(location, data){
    if (revoke){
      console.log('Request timed out.');
      return false; // Return false to fail the request. The naive way of revoking the function.
    }
    if (location === 'top'){
      top = true;
      dataTop = data;
    }
    else if(location === 'bottom'){
      bottom = true;
      dataBottom = data;
    } 
    if (top && bottom){
      clearTimeout(timeout);
      revoke = true;
      console.log('BOTH ARE FINISHED');
      console.log(dataTop);
      console.log(dataBottom);
    }
  };
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
}, getRandomInt(1, 6000));

// Timeout to simulate the second async request.
setTimeout(function(){
  console.log('BOTTOM IS DONE');
  var data = {
    some: 'data from bottom',
    more: 456
  }
  test('bottom', data);
}, getRandomInt(1, 5000));