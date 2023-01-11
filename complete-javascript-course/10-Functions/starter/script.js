'use strict';

// const bookings = [];

//From ES6 we can define the default values in the paramters itself
// const createBooking = function (flightNo, numOfPassengers, price)

//we can also define expression in the paramter list
// const createBooking = function (
//   flightNo,
//   numOfPassengers = 20,
//   price = 200 * 1.5
//)

// also can use the previous variable in the value of next parameter
// const createBooking = function (
//   flightNo,
//   numOfPassengers = 1,
//   price = 2000 * numOfPassengers
// ) {
//   //In ES5 we used to define the defualt value for function paramter as below
//   //   numOfPassengers = numOfPassengers || 10;
//   //   price = price || 100;

//   const bookingDetails = {
//     flightNo,
//     numOfPassengers,
//     price,
//   };
//   bookings.push(bookingDetails);
//   return bookings;
// };

// console.log(createBooking('A230', 10, 100));
//the 2 other paramter will be undefined
// console.log(createBooking('A230'));
// console.log(createBooking('A230', 2000)); //you can't skip argument in between like if you want to specify only price and not numOfPassenger then this will only take numOfPassenger
// console.log(createBooking('A230', undefined, 2000)); //the way we can skip a argument is by passing the undefined in argument list so that it will take the default value

///value vs reference
// const flightNum = 'AB1206';
// const abhi = {
//   name: 'abhishek',
//   passportNumber: 2345678901,
// };

// const checkIn = function (flightNo, passengerObj) {
//   flightNo = 'BC2233';
//   passengerObj.name = 'Mr.' + passengerObj.name;

//   if (passengerObj.passportNumber === 2345678901) {
//     alert('Checked In!');
//   } else {
//     alert('Wrong Passport Number!');
//   }
// };

// checkIn(flightNum, abhi);
// console.log(flightNum); //this variable value will remain same as its a primitive type string so its value get stored in the heap memory
// //it is same like doing
// // flighNo=flightNum; //copying the flightNum to flighNo an storing it as a seperate copied variable in heap memory as we saw in the execution context earlier

// //passengerObj = abhi // it like doing this but both the objects will have same memory address
// console.log(abhi); //this is pass by reference and object which non-primitive types will have
// //2 variable pointing to same address in heap memory therefore the value of name property will change inside the function

// const newPassport = function (person) {
//   person.passportNumber = Math.trunc(Math.random() * 1000000000000);
// };

// //In Js there is no Pass by Reference
// newPassport(abhi);
// checkIn(flightNum, abhi); //again we can see here the abhi object passport number will get manipulated once newPassport function is called so here it will go else part
// console.log(abhi);

////////////////First-Class Function vs Higher-Order Functions////////////////////

// const removeSpaces = function (str) {
//   return str.replaceAll(' ', '');
// };

// const upperCaseWord = function (str) {
//   //using Rest Pattern here to pack all other words
//   const [firstWord, ...others] = str.split(' ');
//   //here its spread operator as its unpacking the others array into single units then join() will concat all the array elements and return the string
//   return [firstWord.toUpperCase(), ...others].join(' ');
// };

//this is the higher-order function which accept an callback function as 2nd argument(fn in this case)
//higher order function are the function which accept another function in its argument list
//this kind of function allow us a level of abstraction as we can see transformer function is not worried about
//which way we have to transform the string , we can pass any function(callback functions) in 2nd parameter of transformer function
//higher order functions are mostly used everywhere in the JS code
// const transformer = function (str, fn) {
//   console.log(`Original String: ${str}`);
//   console.log(`Transformed String: ${fn(str)}`);

//   console.log(`Callback Function Name: ${fn.name}`);
// };

// transformer('Javascript is very Cool!', removeSpaces);
// transformer('Javascript is very Cool!', upperCaseWord);

// const high5 = function () {
//   console.log(`Hello 👋`);
// };

//this is also an higher order function as we are passing high5 function as a callback
// document.body.addEventListener('click', high5); //on click of body we'll see high5 function being called

//some usecase of callback functions
///////////WAP to return the cube root of given numbers in an array//////////

// let result = [];
// const calc = function (f, arr) {
//   for (const e of arr) {
//     result.push(f(e));
//   }
//   return result;
// };

// const calcCubeRoot = function (x) {
//   return x * x * x;
// };

// const nums = [2, 5, 6, 3, 8];
// console.log(calc(calcCubeRoot, nums));

///////////////////////////////Function returing a function///////////////////////////////////

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greetingHello = greet('Hello'); //this greet will return a function itself which we stored in a variable
// //as its a function we can call it as below
// greetingHello('Abhishek');
// greetingHello('Abhijit');

// //we can also call it in one go
// //since greet function will return a function itself we can directly call the returned fucntion again in same line
// //this way calling functions is done in functional programming
// greet('Hey')('Sachin');

// //same above fucntion written  using arrow function
// const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
// greetArrow('adiuos')('amigo');

///////////////////////////////////The call and Apply methods///////////////////////
const airIndia = {
  airline: 'Air India',
  arCode: 'ARI',
  bookings: [],
  //old way of creating a method in objects
  // book: function(flightNum,passengerName)

  //new way of ES6 to create a method in objects
  book(flightNum, passengerName) {
    console.log(
      `${flightNum} of ${this.airline} with code ${this.arCode} is booked by ${passengerName}`
    );
    this.bookings.push({ flight: flightNum, name: passengerName });
    console.log(this.bookings);
  },
  arrow: str => {
    console.log(str);
  },
};

// airIndia.book('12233', 'Abhishek');

//when we have different object using the same we take function outisde in sperate variable
const airAsia = {
  airline: 'Air Aisa',
  arCode: 'ASA',
  bookings: [],
};

const book = airIndia.book; //taking a seperate variable to store this function from airIndia since it can called by different objects

// book('2233', 'Abhijit'); //this will NOT work since we are calling the book function as normal function though the airline variable
//inside will be undefined as we are making use of this so this keyword will return undefined

//so there few method which will tell JS 'this' keyword should point to
//first parameter here will the object name where the this keyword will point at ,the rest all parameter will be according to the method/function called
//call method
// book.call(airAsia, '3344', 'Abhijit');
// book.call(airIndia, '2090', 'Sarang');

//similar we can create as many object and call the book() method using call() method by just specify where(on which object) the this keyword should point at
const britishAirline = {
  airline: 'British AirWays',
  arCode: 'BRIT',
  bookings: [],
};

/////////////////=>Apply method

//apply method is same a call metho only diference is it take an array as the second parameter to call the functions parmater
// const params = ['1110', 'Alisha'];
// book.apply(britishAirline, params);

//call method is mostly used to fullfill the above requirements with spread operator in modern javascript
//hence apply method is not used in many cases
// book.call(britishAirline, ...params);

//we can also do same on arrow functions
// const arrowF = airIndia.arrow; //copying the function

// arrowF.call(britishAirline, 'hellow');

// so even though we dont have a method inside the britishAirline & airAsia object
//called book & arrow we can still call the method using the this keyword on those objects

/////////////////=> bind method

//bind method dont call the function immediately instead it return a function and the returned function will have preset object
//which the 'this' keyword will point at everytime we call that fucntion

// const bookAI = book.bind(airIndia); //this will return a function with 'this'keyword pointing to airIndia object
// const bookAA = book.bind(airAsia);
// const bookBRIT = book.bind(britishAirline);
//now we can call bookAI function as a normal fucntion and its 'this' keyword will always point to airIndia
// bookAI('1212', 'Vikas'); //just pass the remaining parameter of the function
// bookAA('1010', 'Peter');
// bookBRIT('9900', 'Alex');

//we can also preset the parameters using bind method
// const bookAI1212 = book.bind(airIndia, '1212'); //so here flightNum 1212 of airIndia is set anyone using this function will get flightNum 1212
// bookAI1212('Adhis'); //just pass the passengerName parameter now

//the order of arguments matters in bind() method its start from left to right
// bookAI1212('1111', 'Adhis'); //since flightNum paramter is preset above so now the 1111 here will be considered as the name of passenger and the flightNum
//hence if we are presetting the parameter using bind method make sure to pass only non-preset parameters

///application so bind method

///with the Event listeners
// airIndia.planes = 200;
// airIndia.buyPlane = function () {
// //   console.log(this);

//   this.planes++;
// //   console.log(this.planes);
// };

//this is the higher order function
//as we know the 'this'keyword for EventListener function will always point to the html element class (eg: here its button)
//and not the callback function object on which it is called
// document.querySelector('.buy').addEventListener('click', airIndia.buyPlane);
//if we pass buyPlane function like this the 'this' keyword will not point at airIndia object

//in such case the bind method comes handy
// document
//   .querySelector('.buy')
//   .addEventListener('click', airIndia.buyPlane.bind(airIndia)); //as we know bind() will return the function

//Another use case is when using the Partial Application design pattern (presetting the values)
// const addTax = (rate, amount) => amount + amount * rate;

// console.log(addTax(0.8, 1000));

//Suppose there are few fixed rate of taxes which we have to use many times ,so for that will can use bind() with rate defined which will return a new function
// const addGST = addTax.bind(null, 0.1); //since we are not using the 'this' keyword anywhere in addTax method we can pass null as its first argument in bind() method

// console.log(addGST(5000)); //just pass the amount argument here as the rate is preset for addGST method

//above bind code can also be written using the function returing function like below
// const addGST10 = function (amount) {
//   return function (rate) {
//     return amount + amount * rate;
//   };
// };

// const calcGSTTax10 = addGST10(5000);
// console.log(calcGSTTax10(0.1));
//or call like below
// console.log(addGST10(5000)(0.1));

////////////////////////////////spin off :recursive functions//////////////////////

// A function can refer to and call itself. There are three ways for a function to refer to itself:

// 1-The function's name
// 2-arguments.callee
// 3-An in-scope variable that refers to the function

//below code shows how recursive functions stack works
// const foo = function bar(x) {
//   if (x >= 10) {
//     //base condition
//     return;
//   }
//   console.log(`Begin : ${x}`); //these Logs will show us how function stack is works in recursive function calls
//   //   foo(x + 1);  //calling a function within the recursion by using its own in-scope variable , this is how we actually do it normally for function expressions
//   //   arguments.callee(x + 1); //this is another way to call function but its not allowed if strict mode is ON
//   bar(x + 1); //this is the 1st way defined above (1-The function's name)
//   console.log(`End : ${x}`);
// };

// foo(0);

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. 
  //Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)

2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'.
 If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', 
 display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
// };

// //1)
// poll.registerNewAnswer = function () {
//   const answer = Number(
//     prompt(
//       `What is your favourite programming language?\n${this.options.join(
//         '\n'
//       )}\n (Write option number)`
//     )
//   );
//   if (typeof answer !== 'number' || answer < this.options.length) {
//     this.answers[answer]++;
//   } else {
//     alert(
//       "Wrong input make sure it's a number & its within the specified options!"
//     );
//   }

//   this.displayResults('array');
// };

// //2)
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// //3)
// poll.displayResults = function (type = 'array') {
//   if (type === 'string') {
//     console.log(`Poll Results are: ${this.answers.join(',')}`);
//   } else if (type === 'array') {
//     console.log(this.answers);
//   }
// };

// //Bonus
// const t1 = [5, 2, 3];
// const t2 = [1, 5, 3, 9, 6, 1];
// //since in call method we can define different type of objects using the same method
// //so now 'this'key word inside displayResults will point to these objects passed and not the poll.displayResults.answers array
// poll.displayResults.call({ answers: t1 }, 'string');
// poll.displayResults.call({ answers: t2 }, 'array');

//////////////////////////////IIFE Immediately invoked function expression//////////////////

//we dont assign these kind of function to any variable or declare the function with any name
//these are used to be run only once hence call Immediately Invoked functions
//example:

//the below function will give an error since either we have to give (declare) the function anme or assign it to some variable
// function(){
//     console.log("Run only once!");
// }

//so IIFE is just to wrap above function inside of parenthesis and then just immediately invoke it
//this trick allow us to run function only once as this function dont ahve any name
(function () {
  console.log('Run only once!');
})();

//can be done with arrow functions
(() => console.log('Run only Once!'))();
//paramterized functions
((a, b) => console.log(a / b))(10, 3);

/////////////////////////////////////Closure /////////////////////////////
// passengerCount declared in Global Scope
let passengerCount = 10;

const secureBooking = function () {
  let passengerCount = 0; //passengerCount declared in local scope of the function which is stored
  //in the variable environment(VE) of the execution context of this function in call stack

  return function () {
    console.log(`${passengerCount++} passenger`);
  };
};

const booked = secureBooking(); //once this line is executed we remove the execution context from the call stack for secureBooking() function
booked();
booked();

console.dir(booked); //can check closure in the console inside the [[scopes]]

//though still we have access to passengerCount variable  when we execute the booked() function ,its bcoz of the closure
//a function have access to its VE of the execution context in which it was created
//sp since the inner function was create in execution context of secureBooking() function the inner function will have access to VE of secureBooking
//even after the secureBooking() execution is completed and it is being removed from the call stack ,it access (remember varaibles) via the closure
//closure: VE(variable environment) attached to the function ,exactly as it was at the time and place the function(eg where the inner function) was created
//due to this we can access passengerCount inside the inner function without closure it was impossible to have access to that variable
//also if same varibale are available in both scope chain and closure ,the higher priority is given to closure
//therefore above the global scope passengerCount is ignored since passengerCount was found in the closure

// NOTE:we can not create or access the closure manually its a JS feature that happens automatically.
//More example on Closures

let a;
let y = 0;

const b = function () {
  y = 10;

  a = () => {
    console.log(y);
  };
};

b();
a();

//re-assigning the variable a with different function below also with different value for 'y' and observe that the output is different i.e 20 now
//so we can asy that the closure take varaible from VE depends on how & when the variable is defined in the scope
//above the VE was having 10 value stored when a() wasa called then below when c() is invoked the value change to 20 in the closure for function a()
const c = function () {
  y = 20;
  a = function () {
    console.log(y);
  };
};

c();
a();

//////closure example with timeout method////////

// const perGroup = 800;

// const boardinPassengers = function (n, wait) {
//   const perGroup = n / 5; //this variable will have higher priority then the global variable above as it will stored in closures ,and closure have higher priority than scope chain
//   //1st param is function & 2nd is timeout in millisec,after millisec is completed the fucntion will be invoked
//   setTimeout(() => {
//     //after 2 sec timer these 2 logger will be logged and this inner function (callback function) of setTimeout will have access to the VE
//     //of the boardinPassengers() function in the closures
//     console.log(`There are total ${n} passengers to be on-boarded`);
//     console.log(
//       `Passengers are being on-boarded in group of ${perGroup} people`
//     );
//   }, wait * 1000);

//   console.log(`boaring will start in ${wait} Seconds`); //first this will be logged as the boardinPassengers() function will complete its execution
// };

// boardinPassengers(240, 2);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   document.querySelector('body').addEventListener('click', () => {
//     header.style.color = header.style.color === 'red' ? 'blue' : 'red'; //here bcoz of closure we'll have access to the header variable
//     console.log(header.style.color === 'red');
//   });
// })();

// const quiz = new Map([
//   ['question', 'Who is the best footballer in the world?'],
//   [1, 'Messi'],
//   [2, 'Mbappe'],
//   [3, 'Ronaldo'],
//   ['correct', 3],
//   [true, 'you guessed it right 🎉'],
//   [false, 'wrong answer😒'],
// ]);

// quiz.forEach((val, key, map) => {
//   console.log(val, key);
// });
