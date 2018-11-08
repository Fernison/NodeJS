"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sample {
    constructor(props) {
        this.typeDefs = props.typeDefs;
        this.context = props.context;
        console.log(typeof this.context);
        console.log(this.context().params);
        // console.log(this.context().params.response);
    }
}
exports.Sample = Sample;
//# sourceMappingURL=sample-class.js.map