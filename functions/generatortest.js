function add(x){
  var acc = acc + x || x;
  return function(t){
    return acc + t;
  };
}
var test = {
  [Symbol.iterator]: function*(){
    var t1 = 0, t2 = 1;
    for(;;){
      console.log(`t1:${t1} t2:${t2}`);
      t1 = add(t2)(t1);
      t2 = t1 * t2;
      yield t2;
    }
  }
}

for (var t of test){
  if(t > 1000000){
    break;
  }
  console.log(t);
}