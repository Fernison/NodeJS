import { Props, Context, ContextCallback, ContextParameters } from 'types';

export class Sample {
     typeDefs: string;
     context: any;
     constructor(props: Props) {
         this.typeDefs = props.typeDefs;
         this.context = props.context;
         console.log(typeof this.context);
         console.log(this.context().params);
         // console.log(this.context().params.response);
     } 
}


