var price = [
  {list: 10.25},
  {crp: undefined},
  {discounted: 6.99},
  {csp: 10.00},
  {wx: 10.25},
  {wa: undefined},
  {sale: 6.99},
  {clearance: 10.00}
];
function priceSorter(a, b){
  var p1, p2;
  console.log(a);
  for (let key in a){
    p1 = a[key];
  }
  for (let key in b){
    p2 = b[key];
  }
  if (p1 && p2){
    if (p1 > p2){
      return 1;
    }
    else if (p2 > p1){
      return -1;
    }
    else {
      return 0;
    }
  }
  else if(p1){
    return 1;
  }
  else if(p2){
    return -1;
  }
  else {
    return 0;
  }
}
price.sort(priceSorter);
console.log(price);