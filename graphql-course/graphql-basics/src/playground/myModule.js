/*
    The major difference between require and import, is that require will automatically scan node_modules 
    to find modules, but import, which comes from ES6, won't. But now most people would use babel to compile 
    import and export, which will make import act the same as require, but the future version of Node.js might 
    support import itself (actually, experimental version already did), and judging by Node.js' notes, 
    import won't support node_modules, it base on ES6, and must specify the path of the module.
*/
const message="Import GraphQL";
const name="Import name";
const location ='Madrid'

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export {message, name, location as default, getGreeting};