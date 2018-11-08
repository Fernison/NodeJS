export interface Props {
    typeDefs?: string;
    context?: Context | ContextCallback;
}
export declare type Context = {
    [key: string]: any;
};
export interface ContextParameters {
    par1: string;
    par2: number;
}
export declare type ContextCallback = (params: ContextParameters) => Context;
