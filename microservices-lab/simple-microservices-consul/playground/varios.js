functionSample = (x,y) => {
  let xx=x+' heinz';
  let yy=y+' muander';
  return {xx, yy};
}

var res=functionSample('hola', 'adios');
console.log(res);
console.log(res.xx);
console.log(res.yy);

// Closure
/* 
  The variable add is assigned the return value of a self-invoking function.
  The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.
  This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.
  This is called a JavaScript CLOSURE. It makes it possible for a function to have "private" variables.
  The counter is protected by the scope of the anonymous function, and can only be changed using the add function. 
*/
var add = (() => {
  var counter = 0;
  console.log("Primer add");
  return () => {counter += 1; return counter}
})();

console.log(add());
console.log(add());
console.log(add());
