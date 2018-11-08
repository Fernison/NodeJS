export interface Props {
    typeDefs?: string;   
    context?: Context | ContextCallback;
    //context?: ContextCallback;
}
export type Context = {
    [key: string]: any;
}
export interface ContextParameters {
    par1: string;
    par2: number;
}
export type ContextCallback = (params: ContextParameters) => Context;