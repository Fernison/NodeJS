// Default export. Has no name. You can only have one. Es "myLocation". El nombre no tiene por que coincidir con el nombre con el cual se exporta
import myLocation, {message, name, getGreeting} from "./myModule" // Es un Named export. Has a name. Has as many as needed
//const {message}=require('./myModule'); // Es equivalente a lo anterior pero en una versión anterior de ES

console.log(message);
console.log(name);
console.log(myLocation); // Default
console.log(getGreeting("Heinz")); // Function

import add, {sub} from "./math" // Es un Named export. Has a name. Has as many as needed
console.log(add(1,4));
console.log(sub(4,1));

