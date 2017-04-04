function f(x, ...y){
  console.log(y);
  console.log(Array.isArray(y));
  return x * y.length;
}
console.log(f(3, 'hello', true));