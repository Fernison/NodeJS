import { Sample } from './sample-class'; // Solo compatible con ES6. Se necesita Babel
//const {Sample}=require('./sample-class')

const sample = new Sample({
    typeDefs: 'My typedefs en main'
});
    
console.log(sample.typeDefs)