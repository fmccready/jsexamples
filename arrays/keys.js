var arr = ['a', 'b', 'c'];
var iterator = arr.keys();
/*
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
arr.push('d');
console.log(iterator.next());
console.log(iterator.next());
*/

var arr2 = ['a', ,'c'];
var sparseKeys = Object.keys(arr2);
var denseKeys = [...arr2.keys()];
console.log(sparseKeys);
console.log(denseKeys);