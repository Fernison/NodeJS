//import { Sample } from '../dist/sample-class'; // Solo compatible con ES6. Se necesita Babel
import { Sample } from '../dist/sample-class'; // Solo compatible con ES6. Se necesita Babel

const db = {
    var1: 'heinz',
    var2: 'muander'
}
const db2 = {
    var1: 'heinz2',
    var2: 'muander2'
}

const params = {par1: 'Size 10 Object', par: 10}

const sample = new Sample({
    typeDefs: 'My typedefs!!!!!',
    context(params = {
        par1: 'Size 10 Object', 
        par: 10
    }) {
        return {
            db,
            db2,
            var2: 'mi var2',    
            params
        }
    }
    // context: {
    //     db,
    //     db2
    // }
});

console.log(sample.typeDefs)
//console.log(sample.context)
// const obj=sample.context()
// console.log(obj.db)