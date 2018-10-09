const Foo=require('./newObject')

const objeto = {
    par1: "heinz",
    par2: 34,
    fun1() {
        return "funcion"
    }
}

console.log(objeto.fun1());

var object=new Foo(1,2,3);

console.log(object.getValues());