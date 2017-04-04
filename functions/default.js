// Specify an optional default by setting it in the parameter.

function f(x, y=12){
  return x + y;
}

console.log(f(3) == 15);
