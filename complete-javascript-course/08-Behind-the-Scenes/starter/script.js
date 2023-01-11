'use strict';

const firstName = 'abhishek';

// calcAge(1997);

function calcAge(birthyear) {
  let age = 2037 - birthyear;
  const greeting = `Hello ${firstName} ..what is your age?, ${age}`;
  console.log(greeting);
  extendGreeting(greeting);

  const fullname = () => {
    console.log(`${firstName} is very smart `);
  };

  function fullName() {
    console.log(`${firstName} is very smart `);
  }

  function extendGreeting(greeting) {
    const hobby = 'sports';
    //creating a new variable in this scope since a firstName variable is present in the global scope,so since we define firstName again in this scope
    //the execution context will not lookup in the scope chain for the firstName variable
    // const firstName = 'Mac'; //will print firtname below as Mac instead of abhishek

    //this will give the error since in this function scope we already have a greeting varibale in the parent function which can be accessed in this nested function
    //    Uncaught SyntaxError: Identifier 'greeting' has already been declared (at script.js:15:9)
    // let greeting = `Hello ${firstName} .. what is your hobby ? , ${hoby} `;

    //hence we can reassign the this variable like below
    greeting = `Hello ${firstName} .. what is your hobby ? , ${hobby} `;
    console.log('inside: ' + greeting);

    //this block will create its own scope
    if (birthyear >= 1990 && birthyear <= 2000) {
      //since let and const are not accessible outside the block scope
      let noAccsess = 30;
      //we can access the var varibales outside the block scope in the closet function
      var access = 50;
      const str = function () {
        return 'inside the block!';
      };

      console.log(str()); //can invoke str() only inside this block of if statement
    }
    // console.log(noAccsess); // Uncaught ReferenceError: noAccsess is not defined
    console.log(access); //access will print since it belong in the present function scope.
    //Uncaught ReferenceError: str is not defined
    //since we can not access the functions defined inside the block scope on outside
    // str();

    // fullname(); //arrow function can't be access before initialization as in the execution context the extendGreeting() function is executed first
    //so by that time the this line is executed the fullName function is not initialized yet.

    fullName(); //since we are using function declaration (they can be invoked before initialization )it can be accessed inside this extendGreeting() function scope since its parent
  }
  console.log('Outside: ' + greeting); //this will print the outer scope value
}

// ===================================================================================================================

//hosting

//variable

// console.log(a); //accessing var variable before declaring is allowed via hoisting though it will result in undefined because of some reason
// console.log(b); //ReferenceError: Cannot access 'b' before initialization ,it will be in temporal deadzone(TBZ) till execution reaches the variable declration on line 69
// console.log(c); //will get same error as above since const & let both dont support hoisting
// var a = 10;
// let b = 20;
// const c = 30;

//functions
// console.log(addDeclar(1, 2)); //only function declaration is allowed in hoisting (but its not a good practise to use it in applications , to keep the code clean)
// console.log(addExpress(1,2)); //ReferenceError: Cannot access 'addExpress' before initialization , snce function with const & let are not hoisted we can't access them before declaration
// console.log(addArrow(1,2)); //same error as above
// console.log(addExpressVar(1, 2)); //addExpressVar is not a function although  var is hoisted but its value is undefined which means what we r doing here is
//we are calling an undefined(1,2) which will result in above error

// function addDeclar(a, b) {
//   return a + b;
// }

// const addExpress = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// var addExpressVar = function (a, b) {
//   return a + b;
// };

// avoid using hoisting in practise and write function first and then only call them
//Example of common mistake that can lead to bugs coz of hoisting and using a var variable
//this condition will execute since productPric will return false as its value will be undefined since we are using a var variable before declaration
//therefore avoid using var variable and use const mostly and let only if you know you are going to reassign the variable
// if (!productPric) calcPrice();
// var productPric = 10;

// function calcPrice(productPric) {
//   console.log('product price is displayed');
// }

//another thing about var is var vraible are added as the property in global window object of JS in browser

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(window.x == x); //true
// console.log(window.y == y); //false
// console.log(window.z == z); //false

// ===================================================================================================================

//use of 'this' keyword
// console.log(this); //it will return the window object as thi keywor refers to window object in gloabl scope and when don't have any owner

// function pass() {
//   console.log(this); //function declaration gets its own this keyword when invoked will give undefined since it does not have any owner (called upon by any object)
// }
// // pass();

// const express = function (year) {
//   console.log(year);
//   console.log(this); //function declaration gets its own this keyword when invoked will give undefined since it does not have any owner (called upon by any object)
// };
// // express();

// const arrowF = () => {
//   console.log(this); //here it will return window object since arrow functions don't have their own this keyword and it take this keyword of its parent function/scope ,now since here its parent is global scope it will return the window object
// };
// // arrowF();

// const info = {
//   year: 2000,
//   calc: function () {
//     console.log(this);
//     console.log(this.year - 1050);
//   },
// };
// info.calc(); //since we are using the info obj to call the calc method the this keyword will take info object as its owner and this will return info object here and this.year will return 2000

// //its not coz that the calc method reside inside the info obejct the this keyword it taking the info as the owner ,
// // it coz on line 140 we are using the info object to call the this hence it is taking the info object as the owner

// const date = {
//   year: 1500,
// };

// date.calc = info.calc; //copying the calc method from info object into the date object its known as method borrowing
// date.calc(); //here it will take date as the owner and the will do calculation as 1500 -1050

// const f = info.calc;
// Cannot read properties of undefined (reading 'year') =>for below invocation
// f(); //since here there is no calling object the this keyword will fail aboce in the calc method coz there is no owner

// ===================================================================================================================

//arrow functions vs function expression with regard to this keyword

//arrow function dont have their own this keyword and
//in case if there is same variable/field name in global scope or in surrounding function/scope of the arrow function then it will take that value as shown below
//since name is var keyword than it will reside in window object therefore the arrow function below have access to it while doing this.name
// var name = 'maxwell';
// const abhi = {
//   name: 'abhishek',
//   year: 1997,
//   age: function () {
//     console.log(2022 - this.year);
//   },
//   greeting: () => {
//     console.log(`Hey ${this.name}`);
//   },
// };

// abhi.greeting();
// abhi.age();

// const abhi = {
//   name: 'abhishek',
//   year: 1997,
//   age: function () {
//     console.log(2022 - this.year);
//   },
//   greeting: function () {
//     console.log(`Hey ${this.name}`);
//   },
// };

// abhi.greeting(); //now it will print the hey abhishek as in regural function(function expression/declaration it has its own this keyword)
// abhi.age();

const abhi = {
  name: 'abhishek',
  year: 1997,
  age: function () {
    console.log(2022 - this.year);

    //give the error
    // const isMillenials = function () {
    //   console.log(this.year >= 1981 && this.year <= 2000);
    // // };
    // isMillenials();

    //solution 1
    //use an extra variable usually called as self
    // const self = this;
    //     const isMillenials = function () {
    //       console.log(self.year >= 1981 && self.year <= 2000);
    //     };
    //     isMillenials();
    //   },

    //solution2
    //it will take its parent scope this keyword
    const isMillenials = () => {
      console.log(this.year >= 1981 && this.year <= 2000);
    };
    isMillenials();
  },
  greeting: function () {
    console.log(`Hey ${this.name}`);
  },
};

abhi.age();
//since the nested function inside the age method is function expression it will have its own this keyword there
//it will lose access to the abhi object on which the function age was invoked earlier and therefore throw an error as this.name is not available
//in such situation there are two solution one is using an extra self variable which was being used in older code beforfe ES6
//or using the arrow function since arrow function dont have their own this keyword
//it will take surrounding function/scope this keyword which is the age function in above example

// ===================================================================================================================
//use of argument keyword in arrow  vs function expression
//argument keyword is not mostly used in modern day JS
//argument keyword allow us the pass extra argument than whatever parameter defined in the function
// const add = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// add(1, 2, 3, 4);

// //though arrow function dont have access to argument keyword
// const subs = (a, b) => {
//   console.log(arguments); //Uncaught ReferenceError: arguments is not defined
//   return a - b;
// };
// subs(4, 3, 2, 1);

// ===================================================================================================================
// Primitive vs Reference types

//primitive types value changes asprimitive variables points to new address in call stack9executuon context) when its value changes
// let num1 = 10;
// const num2 = num1;
// num1 = 50;
// console.log(num1);
// console.log(num2);

// //reference type
// const me = {
//   name: 'abhishek',
//   age: 25,
//   friends: ['sarang', 'vedant'],
// };

// const friend = me; //does not create a new object in heap instead we are copying the reference here so both object will point to same memory address
// in the call stack and also both object valuein call stack will point to same reference address in the heap memory
// friend.age = 27;

//ERROR: Assignment to constant variable.
// friend = {}; //this will throw an error since its a constant variable we can;t reassign the object to new empty object as this thing will try to change the value of the address stroed in the call stack which is not allowed for const vraible

//so to make the property changes in the top level of object (on the object and not inside the nested objects) we can use object.assign method
// const meCopy = Object.assign({},friend);
//this will create a new entry in the heap memory and create new object itself for meCopy so both me
//and meCopy address values in the call stack  will point to diff address  reference in heap memory

//the above assign method do only shallow copy which means it does not work if there are nested objects
//there below the changes done inn meCopy array will reflect in me object as well
// me.friends.push('vicky');
// me.friends.push('raki');
// const meCopy = Object.assign({}, me);
// //to do a resolve such issue we have to do deep copy of the entire objects which can be achieved by suing thrid party libraries like lodash
// console.log('me ', me);
// console.log('friend: ', meCopy);

///Practise questions

//fibonnacci series

// 0 1 1 2 3 5 8 13 21 34 55

const input = 100;
let fiboNums = [0, 1]; //here it found the fiboNums variable in the gloabl scope this is how the scope chain works in the
// console.log(typeof fiboNums);

function fibo(input) {
  // let fiboNums = [0, 1];  //here again Engine will look for variable fiboNums in the function scope if not found it'll do variable lookup on scope chain
}

for (let i = 2; i < 20; i++) {
  fiboNums.push(fiboNums[i - 2] + fiboNums[i - 1]); //here Engine look for variable fiboNums in the block scope if not found it'll do variable lookup on scope chain
}

console.log(`First 20 Fibonacci Numbers: ${fiboNums}`);

fibo(input);
