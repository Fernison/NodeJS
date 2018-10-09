var d=5;

function Foo(a, b, c) {
    this.a=a;
    this.b=b;
    this.c=c;
    this.getValues = () => {
        return {
            a,
            b,
            c,
            d
        }
    }    
}

class User {

    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return this.name;
    }
}
  
/*
Es equivalente a:

function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

*/

let user = new User("John");
console.log(user.sayHi());

module.exports=Foo;