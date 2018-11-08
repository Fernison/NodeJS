import { MiProps } from './mipojo';

export class Sample {
    typeDefs: string;
    constructor(props: MiProps) {
        this.typeDefs = props.typeDefs;
    } 
}

let sample = new Sample({
    typeDefs: 'My typedefs!!!!!'
});

console.log(sample.typeDefs);
