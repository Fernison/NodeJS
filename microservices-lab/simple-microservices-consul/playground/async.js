// const promiseFunction1=(value) => {
//   return new Promise((resolve, reject) => {
//     resolve('value 1 ' + value);
//   });
// };
//
// const promiseFunction2=(value) => {
//   return new Promise((resolve, reject) => {
//     resolve('value 2 ' + value);
//   });
// };

// Devuelve una promesa //
// const executeAsPromises=(value) => {
//     return promiseFunction1(value)
//       .then(result => {
//         return result + '. First Promise Function';
//       });
// };

// Igual que lo anterior //
// const executeAsPromises=(value) => {
//     var p1=promiseFunction1(value)
//       .then(result => {
//         return result + '. First Promise Function';
//       });
//     return p1;
// };

// Ejecuta dos promesas //
// const executeAsPromises=(value) => {
//     return promiseFunction1(value)
//       .then(result => {
//         return promiseFunction2(value+ ' Other promise');
//       })
//       .then(result => {
//         return result + '. Second Promise Function';
//       });
// };

const promiseFunction1=(value) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promiseFunction1');
        resolve('value 1 ' + value);
      },10000);
    });
};

const promiseFunction2=(value) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promiseFunction2');
        resolve('value 2 ' + value);
      },5000);
    });
};

// Ejecuta dos promesas //
// const executeAsPromises=(value) => {
//     return promiseFunction1(value)
//       .then(result => {
//         return promiseFunction2(value+ ' Other promise');
//       })
//       .then(result => {
//         return result + '. Second Promise Function';
//       });
// };

// Async-Await //
// // Ejecuta 1 y luego otra //
// const executeAsPromises=async(value) => {
//     var p1=await promiseFunction1(value);
//     var p2=await promiseFunction2(p1);
//     return p2
// };

// Ejecuta las 2 en paralelo y espera a que terminen ambas //
const executeAsPromises=async(value) => {
    var p1=promiseFunction1(value);
    var p2=promiseFunction2(value);
    return await Promise.all([p1, p2]);
};

executeAsPromises('valor').then(value => {
    console.log(value);
});
