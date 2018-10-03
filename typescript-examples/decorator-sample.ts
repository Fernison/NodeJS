// Decorator factory. Devuelve la función que se ejecuta cuando se aplica el Decorator //
// Function Decorator //
function f() {
    console.log("f(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`f(): called. target: ${target}. propertyKey: ${propertyKey}. descriptor: ${descriptor}`);
    }
}
// Function Decorator //
function g() {
    console.log("g(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}
// Function Decorator //
// Modifica el valor que se pasa por parámetro //
function cambioValor() {
    console.log("cambioValor(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("cambioValor(): called "+descriptor.value);
        descriptor.value = function() {
            var args=[];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            //console.log(args);           
            return args;
        }
        return descriptor;
    }
}
class C {
    @f()
    @g()
    @cambioValor()
    method(value1:string, value2:number) {
        return value1+value2;
    }
}
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
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        property = "property2";
//        hello = "override";
        hello = this.hello+" override";
    }
}
@classDecorator
class Greeter3 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
    greet() {
        return `${this.property}:::${this.hello}`;
    }
}
let ggg=new Greeter3("world");
//console.log(ggg.greet());
//console.log(ggg.newProperty); // No compila pero se ejecuta bien
///////////////////////////////////////////
// Method Decorator //
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`enumerable(): called. target: ${target}. propertyKey: ${propertyKey}. descriptor: ${descriptor}`);
        console.log(descriptor.enumerable);        
        console.log(value);        
        descriptor.enumerable = value;
    };
}
function miDecor(value: string) {
     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
/*         console.log(`miDecor(): called. target: ${target}. propertyKey: ${propertyKey}. descriptor: ${descriptor}`);
        console.log(value);      
        console.log(descriptor.value);  
 */ 
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        if(descriptor === undefined) {
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
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    //@enumerable(false)
    @miDecor('heinz')
    greet(valor: string) {
        return "Hello, " + this.greeting;
    }
}
let gggg=new Greeter4("world");
console.log(gggg.greet("muander"));