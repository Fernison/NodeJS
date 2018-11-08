export class Sample {
    constructor(props) {
        this.typeDefs = props.typeDefs;
    }
}
let sample = new Sample({
    typeDefs: 'My typedefs!!!!!'
});
console.log(sample.typeDefs);
