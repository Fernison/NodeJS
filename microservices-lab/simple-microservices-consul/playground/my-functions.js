/***************** FUNCTIONS ****************/

// In Functional Programming, a function is a first-class citizen of the language. In other words, a function is just another value.
// Higher-order Functions either take functions as parameters, return functions or both.

// Función a la que se le pasa una función como uno de los parámetros //
validateValueWithFunc=(value, parseFunc, type) => {
    let msg;
    if (parseFunc(value)) {
        msg='Valid ' + type;
    } else {
        msg='Invalid ' + type;
    }
    console.log(msg);
    return msg;
}

var valor=validateValueWithFunc(5,(x) => {
  console.log('parseFunc '+x);
  if(false) {
    return true;
  }
  return false;
}, 'tipo');

console.log('Value: '+valor);

// Función que devuelve una función //
// Notice that the function adder has access to constantValue even after makeAddr returns. That’s because constantValue was in its scope when adder was created.
var funcion = makeAdder = (constantValue) => {
    return adder = (value) => {
        return constantValue + value;
    };
}

// Devuelve una función //
var add10 = makeAdder(10);
console.log(add10(20)); // prints 30
console.log(add10(30)); // prints 40
console.log(add10(40)); // prints 50

/***************** CLOSURES ****************/
// A closure is a function’s scope that’s kept alive by a reference to that function.
/*
In this example, child has access to its variables, the parent’s variables and the grandParent’s variables.
The parent has access to its variables and grandParent’s variables.
The grandParent only has access to its variables.
*/
grandParent = (g1, g2) => {
    var g3 = 3;
    return parent = (p1, p2) => {
        var p3 = 33;
        return child = (c1, c2) => {
            var c3 = 333;
            return g1 + g2 + g3 + p1 + p2 + p3 + c1 + c2 + c3;
        };
    };
}

/*
Here, parentFunc keeps the parent’s scope alive since grandParent returns parent.
Similarly, childFunc keeps the child’s scope alive since parentFunc, which is just parent, returns child.
When a function is created, all of the variables in its scope at the time of creation are accessible to it for the lifetime of the function.
  A function exists as long as there still a reference to it. For example, child’s scope exists as long as childFunc still references it.
*/
var parentFunction = grandParent(10,20);
var childFunction = parentFunction(10,20);
console.log(childFunction(10, 20)); // 459

/***************** CURRYING ****************/
// A Curried Function is a function that only takes a single parameter at a time

/*
This version of add is a function that takes one parameter now and then another one later.
In detail, the add function takes a single parameter, x, and returns a function that takes a single parameter, y,
which will ultimately return the result of adding x and y.
Now we can use this version of add to build a working version of mult5AfterAdd10:
*/
var add = x => y => x + y;
var x = add(5);
var y = x(7);
console.log(y); // 12
console.log(add(5)(7)); // 12. Otra forma de hacerlo

var f = a => b => c => d => a + b + c + d;
console.log(f(1)(2)(3)(4)); // prints 10

var complexFunction = f1 => x => f2 => y => {
  var r1 = f1(x);
  var r2 = f2(r1,y);
  return r2;
};

// No me funciona
/*
var f1 = complexFunction((x) => {
  return x*2;
});
var x = f1(10);
var f2 = ((x, y) => {
  return x*y;
});
var y = f2(x, 30);
console.log(`Y ${y}`); // 600
*/

var complex = complexFunction((x) => {
  return x*2;
})(10)((x, y) => {
  return x*y;
})(30);
console.log(`Complex ${complex}`); // 600

// Más reducido
complex2 = complexFunction(x => x*2)(10)((x, y) => x*y)(30);
console.log(`Complex2 ${complex2}`); // 600

/*
The compose function takes 2 parameters, f and g. Then it returns a function that takes 1 parameter, x, which when called will apply f after g to x.
So what did we do exactly? Well, we converted our plain old add function into a curried version.
This made add more flexible since the first parameter, 10, can be passed to it up front and the final parameter will be passed when mult5AfterAdd10 is called.
*/
var mult5 = x => x * 5;
var compose = (f, g) => x => f(g(x));
var mult5AfterAdd10 = compose(mult5, add(10));
console.log(mult5AfterAdd10(20)); // 150 (5 * (10 +20))
