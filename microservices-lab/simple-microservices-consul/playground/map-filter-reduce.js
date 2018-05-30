// Por defecto, Map, Filter y Reduce están incluidos en Array.prototype //
var numbers = [4, 9, 16, 25];
vanillaJSMapFunction = () => {
    let numbersAux=numbers.map(x => x * 3);
    let numbersAux2=numbersAux.map(Math.sqrt);
    return numbersAux2;
}
console.log(vanillaJSMapFunction());

/************ MAP *************/
/*
Let’s take this code and put it in a function. We’re going to call our first
common function MAP since it maps each value in the old array to new values in the new array:
*/
var map = (f, array) => {
    var newArray = [];
    for (var i = 0; i < array.length; ++i) {
        newArray[i] = f(array[i]);
    }
    return newArray;
};
/*
Notice the function, f, is passed in so that our map function can do anything we want to each item of the array.
Now we can call rewrite our previous code to use map:
*/
var things = [1, 2, 3, 4];
var newThings = map(v => v * 10, things);
console.log(newThings);

/************ FILTER *************/
// Another common function to FILTER things from an array
var filter = (pred, array) => {
    var newArray = [];
for (var i = 0; i < array.length; ++i) {
        if (pred(array[i]))
            newArray[newArray.length] = array[i];
    }
    return newArray;
};
// Here’s how to use filter to filter odd numbers:
var isOdd = x => x % 2 !== 0;
var numbers = [1, 2, 3, 4, 5];
var oddNumbers = filter(isOdd, numbers);
console.log(oddNumbers); // [1, 3, 5]

/************ REDUCE *************/
/*
The final common function is called REDUCE (or FOLD). Typically, it’s used to take a
list and REDUCE it to a single value but it can actually do so much more. */
/*
The reduce function takes a reduction function, f, an initial start value and an array.
Notice that the reduction function, f, takes 2 parameters, the current item of the array, and the accumulator, acc.
It will use these parameters to produce a new accumulator each iteration. The accumulator from the final iteration is returned.
*/
var reduce = (f, start, array) => {
    var acc = start;
    for (var i = 0; i < array.length; ++i) {
        acc = f(array[i], acc); // f() takes 2 parameters
    }
    return acc;
};
/*
Notice that the add function takes 2 parameters and adds them. Our reduce function expects a function that takes 2 parameters so they work well together.
We start with a start value of zero and pass in our array, values, to be summed. Inside the reduce function,
the sum is accumulated as it iterates over values. The final accumulated value is returned as sumOfValues.
*/
var add = (x, y) => x * y;
var values = [1, 2, 3, 4, 5];
var sumOfValues = reduce(add, 1, values);
console.log(sumOfValues); // 120
