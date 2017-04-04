var handler = {
  get: function(target, name){
    if (name === 'age'){
      return name in target ?
        target[name] :
        18;
    }
    return name in target ? 
      target[name] : 
      'unknown';
  },
  set: function(obj, prop, value){
    if (prop === 'age'){
      if(!Number.isInteger(value)){
        obj[prop] = 'Invalid age';
      } else if (value > 200){
        obj[prop] = 7;
      }
      else {
        obj[prop] = value;
      }
    }
    else {
      obj[prop] = value;
    }
  }
};

/*
var p = new Proxy({}, handler);

console.log(p.name);
console.log(p.position);
console.log(p.age);
p.name = 'Frank';

p.age = 31;
console.log(p.name);
console.log(p.position);
console.log(p.age);
*/
function extend (sup, base){
  // Get the constuctor of the function passed in as an argument.
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, 'constructor'
  );
  // Setup the handler object for Proxy
  var handler = {
    construct: function(target, args){
      // Trap for the new keyword.
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args){
      // Trap for a function call.
      sup.apply(that, args);
      base.apply(that, args);
    }
  };
  // Create the new version base that was extended using the proxy handler.
  var proxy = new Proxy(base, handler);
  // Descriptor of the base constructor.
  descriptor.value = proxy;
  // Modify the constructor of base setting it to the proxy so Proxy will handle constructor.
  Object.defineProperty(base.prototype, 'constructor', descriptor);
  return proxy;
}

var Person = function(name){
  this.name = name;
};
var Employee = extend(Person, function(name, position){
  this.position = position;
});
Employee.prototype.insured = 'Yes';
var frank = new Employee('Frank', 'FED');

/*
console.log('____________________');
console.log(Object.keys(frank));
console.log(frank.insured);
*/

// Manipulate Dom Elements
let view = new Proxy({
  selected: null
},
{
  set: function(obj, prop, newval){
    let oldval = obj.prop;
    
    if (prop === 'selected'){
      if(oldval){
        oldval.setAttribute('aria-selected', false);
      }
      if(newval){
        newval.setAttribute('aria-selected', true);
      }
    }
    
    // The default behavior to store the value
    obj[prop] = newval;
    
    // Indicate success
    return true;
  }
});

// Value correction and an extra property
let products = new Proxy({
  browsers: ['Internet Explorer', 'Netscape']
},
{
  get: function(obj, prop){
    // An extra property
    if(prop === 'latestBrowser'){
      return obj.browsers[obj.browsers.length - 1];
    }
    
    // Default behavior
    return obj[prop];
  },
  set: function(obj, prop, value){
    if(prop === 'latestBrowser'){
      obj.browsers.push(value);
      return true;
    }
    // Convert the value if it is not an array
    if(typeof value === 'string'){
      value = [value];
    }
    
    // The default behavior to store the value
    obj[prop] = value;
    return true;
  }
});

/*
console.log(products.browsers);
products.browsers = 'Firefox'; // Pass a string by mistake
console.log(products.browsers);
products.latestBrowser = 'Chrome';
console.log(products.browsers);
console.log(products.latestBrowser);
*/

// Finding an array item object by its property

let productsArray = new Proxy([
  {name: 'Firefox', type: 'browser'},
  {name: 'SeaMonkey', type: 'browser'},
  {name: 'Thunderbird', type: 'mailer'}
],
{
  get: function(obj, prop){
    // The default behavior to return the value
    if(prop in obj){
      return obj[prop];
    }
    
    if(prop === 'number'){
      return obj.length;
    }
    
    let result, types = {};
    
    for (let product of obj){
      if(product.name === prop){
        result = product;
      }
      if (types[product.type]){
        types[product.type].push(product);
      }
      else {
        types[product.type] = [product];
      }
    }
    
    // Get a product by name
    if(result) {
      return result;
    }
    
    // Get products by type
    if(prop in types){
      return types[prop];
    }
    
    // Get product types
    if(prop === 'types'){
      return Object.keys(types);
    }
    
    return undefined;
  }
});

/*
console.log(productsArray[0]);
console.log(productsArray['Firefox']);
console.log(products['Chrome']);
console.log(productsArray.browser);
console.log(productsArray.types);
console.log(productsArray.number);
*/