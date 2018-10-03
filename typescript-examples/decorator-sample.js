var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decorator factory. Devuelve la función que se ejecuta cuando se aplica el Decorator //
// Function Decorator //
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log(`f(): called. target: ${target}. propertyKey: ${propertyKey}. descriptor: ${descriptor}`);
    };
}
// Function Decorator //
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
// Function Decorator //
// Modifica el valor que se pasa por parámetro //
function cambioValor() {
    console.log("cambioValor(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("cambioValor(): called " + descriptor.value);
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            //console.log(args);           
            return args;
        };
        return descriptor;
    };
}
class C {
    method(value1, value2) {
        return value1 + value2;
    }
}
__decorate([
    f(),
    g(),
    cambioValor()
], C.prototype, "method", null);
let myC = new C();
console.log(myC.method("mi valor1", 6));
///////////////////////////////////////////
/* // Class Decorator //
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
@sealed
class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let gg=new Greeter2('const');
console.log(gg.greet()); */
///////////////////////////////////////////
// Class Decorator. Overwrite constructor //
function classDecorator(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.newProperty = "new property";
            this.property = "property2";
            //        hello = "override";
            this.hello = this.hello + " override";
        }
    };
}
let Greeter3 = class Greeter3 {
    constructor(m) {
        this.property = "property";
        this.hello = m;
    }
    greet() {
        return `${this.property}:::${this.hello}`;
    }
};
Greeter3 = __decorate([
    classDecorator
], Greeter3);
let ggg = new Greeter3("world");
//console.log(ggg.greet());
//console.log(ggg.newProperty); // No compila pero se ejecuta bien
///////////////////////////////////////////
// Method Decorator //
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        console.log(`enumerable(): called. target: ${target}. propertyKey: ${propertyKey}. descriptor: ${descriptor}`);
        console.log(descriptor.enumerable);
        console.log(value);
        descriptor.enumerable = value;
    };
}
function miDecor(value) {
    return function (target, propertyKey, descriptor) {
        /*         console.log(`miDecor(): called. target: ${target}. propertyKey: ${propertyKey}. descriptor: ${descriptor}`);
                console.log(value);
                console.log(descriptor.value);
         */
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        var originalMethod = descriptor.value;
        //editing the descriptor/value parameter
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // a es el valor que se le pasa al método //
            var a = args.map(function (a) { return JSON.stringify(a); }).join();
            // note usage of originalMethod here
            var result = originalMethod.apply(this, args);
            var r = JSON.stringify(result);
            console.log("Call: " + propertyKey + "(" + a + ") => " + r);
            return result;
        };
        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    };
}
class Greeter4 {
    constructor(message) {
        this.greeting = message;
    }
    //@enumerable(false)
    greet(valor) {
        return "Hello, " + this.greeting;
    }
}
__decorate([
    miDecor('heinz')
], Greeter4.prototype, "greet", null);
let gggg = new Greeter4("world");
console.log(gggg.greet("muander"));
