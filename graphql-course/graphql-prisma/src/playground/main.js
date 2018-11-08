import { Sample } from './sample-class';

const sample = new Sample({
    typeDefs: 'My typedefs en main'
});
    
console.log(sample.typeDefs);