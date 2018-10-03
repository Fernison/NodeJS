/*
console.log(`Typescript!!!`);

var heinz = (a:number,b:number) => {
    return a+b;
};
console.log('Operation ',heinz(3,5));

var a;

console.log(a);

if(a==null) {
    console.log('== null'); // Esta. El valor es nulo
} else {
    console.log('else == null');
}

if(a===null) {
    console.log('=== null');
} else {
    console.log('else === null'); // Esta. Es de tipo undefined
}

a=null;

console.log('--------------------------------------------------');

if(a==null) {
    console.log('== null'); // Esta. El valor es nulo
} else {
    console.log('else == null');
}

if(a===null) {
    console.log('=== null'); // Esta. Es de tipo null
} else {
    console.log('else === null');
}

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

var greeter = (person: Person) => {
    return "Hello, " + person.firstName + " " + person.lastName + " " + person.age;
}

let user = { firstName: "Jane", lastName: "User", age: 45 };

console.log(greeter(user));
*/
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
console.log(greeter.greet());
