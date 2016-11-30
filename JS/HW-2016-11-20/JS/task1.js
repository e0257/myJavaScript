let obj = {
  num: 1.242,
  str: 'not very long string',
  f() {
    return this.str.split(' ')
  },
  arr: ['some', 'array', {someProp: 'value'}],
  prop: { key: 1 },
  empty: null,
  last: 0
};


function func(obj) {
  let objKeys = Object.keys(obj);
  let cntOfKeys = objKeys.length;
  let propTypes = [], 
      propNames = [];

  for(let prop in obj) {
    propTypes.push(typeof(obj[prop]));
    propNames.push(prop);
    if (typeof(obj[prop]) === 'number'){
       obj[prop] = obj[prop].toFixed(2);
    }
    else if (typeof(obj[prop]) === 'string'){
       obj[prop] = obj[prop].toUpperCase();
    }
}
  Object.preventExtensions(obj);
    
  return  {
    "count of keys" : cntOfKeys,
    propTypes : propTypes,
    propNames : propNames
  }

}

let newObj = func(obj)
console.log (newObj);
obj.addProp = "some string"
console.log (obj);

/**/