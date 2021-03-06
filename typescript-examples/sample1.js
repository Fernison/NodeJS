class miClass {
    constructor() {
        this.h = 10;
        this.miMethod = (a, b, c) => {
            //return `heinz ${a}:${b}:${c}`;
            return 3 + 6 + this.h;
        };
    }
}
var miClassObject = new miClass();
console.log(miClassObject.miMethod(1, 'string param'));
function miFuncion(x) {
    return `mi cadena ${x}`;
}
;
console.log('String->' + miFuncion('aaaa'));
console.log('Number->' + miFuncion(1));
// Rest parameters //
function addNumbers(...nums) {
    var i;
    var sum = 0;
    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("sum of the numbers", sum);
}
addNumbers(1, 2, 3);
addNumbers(10, 10, 10, 10, 10);
// Number //
var miNumber = new Number(1234);
console.log(miNumber);
var miNumber2 = 9876; // Esto también crea un objeto de tipo Number //
// String //
var miString = new String('cadena string');
console.log(miString);
var miString2 = 'cadena 2'; // Esto también crea un objeto de tipo String //
// Arrays //
var arr_names = new Array(4);
for (var i = 0; i < arr_names.length; i++) {
    arr_names[i] = i * 2;
    console.log(arr_names[i]);
}
var arr_names2 = [1, 2, 3, 4, 5, 6]; // Mismas propiedades que un objeto Array //
console.log(arr_names2.length);
var j;
for (j in arr_names2) {
    console.log(arr_names2[j]);
}
// Tuples //
var mytuple = [10, "Hello", "World", "typeScript"];
console.log("Items before push " + mytuple.length); // returns the tuple size 
mytuple.push(12); // append value to the tuple 
console.log("Items after push " + mytuple.length);
console.log("Items before pop " + mytuple.length);
console.log(mytuple.pop() + " popped from the tuple"); // removes and returns the last item  
console.log("Items after pop " + mytuple.length);
var miInterfaceInstance = {
    firstname: "first",
    lastname: "last",
    sayHi: () => {
        return 'Hi miInterfaceInstance!!!!';
    }
};
console.log("miInterfaceInstance");
console.log(miInterfaceInstance.firstname);
console.log(miInterfaceInstance.lastname);
console.log(miInterfaceInstance.sayHi());
var miInterfaceInstance2 = {
    // Heredados de IMiInterface //
    firstname: "first miInterfaceInstance2",
    lastname: "last miInterfaceInstance2",
    sayHi: () => {
        return 'Hi miInterfaceInstance2!!!!';
    },
    // Heredados de IMiInterface2 //
    anotherParam1: "anotherParam1 miInterfaceInstance2",
    // Heredados de IMiOtherInterface //
    otherParam: "otherParam miInterfaceInstance2",
    // Heredados de IMiInterface3 //
    anotherParam2: "anotherParam2 miInterfaceInstance2",
    toString: () => {
        return `
            ${this.firstname},
            ${this.lastname},
            this.sayHi(),
            ${this.anotherParam1},
            ${this.otherParam},
            ${this.anotherParam2}        
        `;
    }
};
console.log("miInterfaceInstance2");
console.log(miInterfaceInstance2.firstname);
console.log(miInterfaceInstance2.lastname);
console.log(miInterfaceInstance2.sayHi());
console.log(miInterfaceInstance2.anotherParam1);
console.log(miInterfaceInstance2.otherParam);
console.log(miInterfaceInstance2.anotherParam2);
var metodoInterface = (param1, param2) => {
    console.log(param1.anotherParam1);
    console.log(param2.firstname);
};
var miInterfaceInstance3 = {
    // Heredados de IMiInterface //
    firstname: "first miInterfaceInstance3",
    lastname: "last miInterfaceInstance3",
    sayHi: () => {
        return 'Hi miInterfaceInstance3!!!!';
    },
    // Heredados de IMiInterface2 //
    anotherParam1: "anotherParam1 miInterfaceInstance3",
    // Heredados de IMiOtherInterface //
    otherParam: "otherParam miInterfaceInstance3",
    // Heredados de IMiInterface3 //
    anotherParam2: "anotherParam2 miInterfaceInstance3",
    toString: () => {
        return `
            ${this.firstname},
            ${this.lastname},
            this.sayHi(),
            ${this.anotherParam1},
            ${this.otherParam},
            ${this.anotherParam2}        
        `;
    }
};
var miInterfaceInstance22 = {
    firstname: "first 2",
    lastname: "last 2",
    sayHi: () => {
        return 'Hi miInterfaceInstance22!!!!';
    }
};
metodoInterface(miInterfaceInstance2, miInterfaceInstance);
metodoInterface(miInterfaceInstance3, miInterfaceInstance22);
