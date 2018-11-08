mifunction = (x, y, f) => {
    const z=x+y
    const h=6
    return f(z,h)
}

const micall=mifunction(1, 2, (z, h) => {
    return z+10+20+h
})

console.log(micall)

const myvar = {
    myfunction(x, y) {
        return x+y
    }
}

console.log(myvar.myfunction(5,6))