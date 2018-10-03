const add = (x, y) => {
    return x+y
}
const sub = (x, y) => {
    return x-y
}

// Sólo se pueden exportar si es const o var. Si es let, no.
export {add as default, sub}