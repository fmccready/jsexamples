function f(x, y, z){
  return x + y + z;
}

let arr = [1,2,3];
let a = 1, b = 2, c = 3;
console.log(a, b, c);
console.log(...arr);
console.log(f(...arr));