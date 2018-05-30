/************ Immutability *************/
/*
The first thing to consider is immutability. In ES2015, or ES6 as it was called, there is a new keyword called const.
This means that once a variable is set, it cannot be reset:
*/
const a = 1;
a = 2; // this will throw a TypeError in Chrome, Firefox or Node
       // but not in Safari (circa 10/2016)
/*
Here a is defined to be a constant and therefore cannot be changed once set. This is why a = 2 throws an exception (except for Safari).
The problem with const in Javascript is that it doesn’t go far enough. The following example illustrates its limits:
*/
const a = {
    x: 1,
    y: 2
};
a.x = 2; // NO EXCEPTION!
a = {}; // this will throw a TypeError
/*
Notice how a.x = 2 does NOT throw an exception. The only thing that’s immutable with the const keyword is the variable a. Anything that a points to can be mutated.
This is terribly disappointing because it would have made Javascript so much better.
So how do we get immutability in Javascript?
Unfortunately, we can only do so via a library called "Immutable.js". This may give us better immutability but sadly,
it does so in a way that makes our code look more like Java than Javascript.
*/

/************ Currying and Composition *************/
/*
Earlier in this series, we learned how to write functions that are curried. Here’s a more complex example:
*/
const f = a => b => c => d => a + b + c + d
/*
Notice that we had to write the currying part by hand.
And to call f, we have to write:
*/
console.log(f(1)(2)(3)(4)); // prints 10
/*
But that’s enough parentheses to make a Lisp programmer cry.
There are many libraries which make this process easier. My favorite one is "Ramda".
Using Ramda we can now write:
*/
const f = R.curry((a, b, c, d) => a + b + c + d);
console.log(f(1, 2, 3, 4)); // prints 10
console.log(f(1, 2)(3, 4)); // also prints 10
console.log(f(1)(2)(3, 4)); // also prints 10
/*
The function definition isn’t much better but we’ve eliminated the need for all those parenthesis.
Notice that we can apply as many or as few parameters as we want each time we invoke f.
By using Ramda, we can rewrite the mult5AfterAdd10 function from Part 3 and Part 4:
*/
const add = R.curry((x, y) => x + y);
const mult5 = value => value * 5;
const mult5AfterAdd10 = R.compose(mult5, add(10));
/*
It turns out that Ramda has a lot of helper functions for doing these sorts of things, e.g. R.add and R.multiply, which means we can write less code:
*/
const mult5AfterAdd10 = R.compose(R.multiply(5), R.add(10));

/************ Map, Filter and Reduce *************/
/*
Ramda also has its own versions of map, filter and reduce.
Although these functions exist in Array.prototype in vanilla Javascript, Ramda’s versions are curried:
*/
const isOdd = R.flip(R.modulo)(2);
const onlyOdd = R.filter(isOdd);
const isEven = R.complement(isOdd);
const onlyEven = R.filter(isEven);
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(onlyEven(numbers)); // prints [2, 4, 6, 8]
console.log(onlyOdd(numbers)); // prints [1, 3, 5, 7]
/*
R.modulo takes 2 parameters. The first is the dividend (what’s being divided) and the second is the divisor (what we’re dividing by).
The isOdd function is just the remainder of dividing by 2. A remainder of 0 is falsy, not odd, and a remainder of 1 is truthy, odd.
We flipped the first and second parameters of modulo so that we could specify 2 as the divisor.
The isEven function is just the complement of isOdd.
The onlyOdd function is the filter function with the predicate (a function that returns a boolean) of isOdd.
It’s waiting for the list of numbers, its final parameter, before it executes.
The onlyEven function is a filter that uses isEven as its predicate.
When we pass numbers to onlyEven and onlyOdd, isEven and isOdd get their final parameters and can finally execute returning the numbers we’d expect.
*/
