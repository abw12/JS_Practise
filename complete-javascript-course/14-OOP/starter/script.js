'use strict';

//constructor function is not a featur of JS but its way of creating a fucntion developed by developers
//It is similar to a normal function though it start with a cpaital letter and have new keyword in it (like Map,Set,etc)
//we can use function declaration & expression but not arrow function since arrow function don't have their own this keyword

// const Person = function (firstName, birthYear) {
//   console.log(this);
// };

// new Person('abhi', 1997);
//so when we call this function using the new keyword it does below 4 things

// 1) create a new empty object {}
// 2) function is called , and 'this' keyword will point at the newly created object
// 3) the newly created object will be linked to prototype
// 4)  functions will automatically return the {} (at this at object might have its own properties)

//w ecan assign the Person object properties

// const Person = function (firstName, birthYear) {
//   //Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   //never create a method like this in constructor functions as its not good practise instead use prototypal inheritance
//   //   this.calcAge = function () {
//   //     this.age = 2037 - this.birthYear;
//   //   };
// };

// //in this way we can create diff instance of the Person object
// //though we don't refer to as its an instance in JS ,instead they are thought as object using constructor functions
// const abhi = new Person('abhi', 1997);
// console.log(abhi.age);

// const sarang = new Person('sarang', 1998);
// console.log(sarang);

// const ved = new Person('vedant', 1997);
// console.log(ved);

// //there is also a keyword which tell as the object instance
// console.log(abhi instanceof Person);

// //Prototype
// // console.log(Person.prototype);

// //this is the way we can assign methods for object when objects created using constructor function
// //this will the function as property of  __proto__ object which is aviable to each instance of Person object
// //via the Person obejct protytpe property
// Person.prototype.calcAge = function () {
//   this.age = 2037 - this.birthYear;
// };

// console.log(abhi);
// console.log(abhi.__proto__); //this will show us all the property that are linked on prototype property of Person object
// console.log(abhi.__proto__ === Person.prototype); //will return true as every instance __proto__ object created from Person will be linked to Person prototype
// console.log(Person.__proto__ === Person.prototype); //will return false as it its not set on the __proto__(prototype) property of the Person obeject

// abhi.calcAge();
// console.log(abhi.age);
// ved.calcAge();
// console.log(ved.age);
// sarang.calcAge();
// console.log(sarang.age);

// //we can also set properties on the __proto__ object
// Person.prototype.species = 'Homo Sapiens';

// //this method calcAge is not abhi object own property instead its only available via Person object
// console.log(abhi.hasOwnProperty('age')); //true - its own property
// console.log(abhi.hasOwnProperty('species')); //false - its part of __proto__ property

// //prototypal chain

// console.log(abhi.__proto__); //this wil lreturn Person.prototype property
// console.log(abhi.__proto__.__proto__); //this will log Object.prototype property which is the top of prototype chain
// console.log(abhi.__proto__.__proto__.__proto__); //this will log null as Object.prototype point to null

//array are also objects in JS so they'll also have same prototype property in it and will follow the same prototype chain

// const pro = [2, 3, 44, 44, 5, 6, 6, 8, 2]; //this is same as createing array using the new Array() constructor function therefore it also have prototype property

// console.log(pro.__proto__); //this prototype have all Array methods like pop,push,map,filter,find,etc.
// console.log(pro.__proto__ === Array.prototype); //will return true as we can see both are same objects
// console.log(pro.__proto__.__proto__); //this is top of prototype chain(Object.prototype) just like we saw above for objects

// //we can also add new methods to this built-in objects prototype properties like Array
// //this function will return all unique values from the given array
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(pro.__proto__); //here you can see unique method being set in the pro (array) prototype property along side all other built-in Array methods

// console.log(pro.unique());

// NOTE: this is not considered a good practise to create our own methods on built-in objects like Array,Map,Set,etc

////////////////////////////assignment 1///////////////////////////

//1)
//creating a Car constructor Function
// const Car = function (make, speed) {
//   (this.make = make), (this.speed = speed);
// };

// //2)
// //creating new method on Car object and assigning it to prototype of Car ,so any object creating using Car constructor Function will have access to these methods
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// //3)
// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// //4)
// const bmw = new Car('BMW', 70);
// bmw.accelerate();

// const mercedes = new Car('Mercedes', 90);
// mercedes.break();

// bmw.break();
// mercedes.accelerate();

// console.log(bmw.__proto__);
// console.log(mercedes.__proto__);
// console.log(mercedes.hasOwnProperty('accelerate')); //will return false as accelerate() is not direct part of mercedes but its part of its protoype property

// /////////////////////Modern way of writing classes(ES6 Classes )///////////////////

// ///After ES6 in JS also we can write classes more in traditional way like java but still under the hood these classes works similar to constructor function
// //and have same implementation of prototypal inheritance ,its introduced just to make it look like traditional way writing classes

// //class expression
// // const WorldCup = class{

// // }

// //class decalration (just like function declaration)
// class WorldCup {
//   //this constructor is similer to creating a constrcutor function which we saw earlier
//   //it has to be named as constructor only
//   constructor(year, winner) {
//     (this.year = year), (this.winner = winner);
//   }
//   //we can add method outside of constructor
//   //this is same as doing WorldCup.prototype.goldenBoot
//   goldenBoot() {
//     console.log('Mbappe');
//   }

//   goldenBall() {
//     console.log('Messi');
//   }
// }

// const current = new WorldCup(2022, 'Argentina');
// console.log(current.year, current.winner);

// const lastYear = new WorldCup(2018, 'France');
// console.log(lastYear.year, lastYear.winner);

// current.goldenBall();
// lastYear.goldenBall();

//////////getters and setters ////////////////////

//we can create setters and getters to get & set the properties on Objects

//in object literals
// const Avatar = {
//   movieName: 'Avatar',
//   relaseDate: 2009,
//   //Instance level methods
//   //these kind of methods will be added to .prototype property
//   director() {
//     console.log('James Camron');
//   },
//   get title() {
//     return this.movieName;
//   },

//   // setter method on the new property in object
//   set actor(actorName) {
//     this.actorName = actorName;
//   },
// };

// Avatar.hey = function () {
//   console.log('Hello Avater');
//   console.log(this); //this keyword will point to Avater itself as since this keyword always point to the calling object
// };

// //event though set and get are mthods above we can access them as normal property since they evaluate a value
// console.log(Avatar.title);
// //setting the property using the setter method just like we normally set the value to a property
// Avatar.actor = 'Jake Sully';
// console.log(Avatar);
// Avatar.director();
// Avatar.hey(); //this is how we call static method by using directly the class name and not its instance variable name

// ///we can also use it on the ES6 classes

// class Account {
//   //this constructor function is called when we create object using the new keyword and also at that time below get & set method is called
//   constructor(fullName, movements) {
//     this.fullName = fullName;
//     this.movements = movements;
//   }
//   get fullName() {
//     return this._fullName;
//   }

//   //when we setting property on the already existing property(fullName here) we have to create a new property on object just to avoid the conflict
//   //use case of using getter/setters in term of validating the input
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     //creating name property _fullName ,using _ is the convention while setting a value on already existing property
//     else alert(`${name} is not a full name!`);
//   }

//   get getMov() {
//     return this.movements.slice(-1).pop();
//   }
//   set addMov(mov) {
//     this.movements.push(mov);
//   }

//   //this is how we create static methods in classes
//   static hey() {
//     console.log(`Hello ${this}`);
//     console.log(this); //this will point at Account itself
//   }
// }

// const jessica = new Account('Jessica Jonas', [300, 200, 100, 400]);
// console.log(jessica);
// console.log(jessica.getMov);
// console.log(jessica.fullName);
// //accessing setter as a property only and assignin git a new value
// jessica.addMov = 60;
// console.log(jessica.getMov);
// jessica.fullName = 'abhishek wasave'; //now this change the property _fullName as "abhishek wasave" and the getter fullname will return the same
// console.log(jessica.fullName);
// Account.hey();

/////////static methods ////////////////////

//static methods are not aviable on instance instead they are only avaiable on constructor function
// (like any obj created from Account class/constructor function will not have access to these static methods)

///example is above implemented hello() method in object literals & ES6 class (Acoount)

// ///////////////////object.create() /////////////////

// //this is the 3rd way in which we can implement prototypal inheritance in js , and this way is least used in practise
// //here we don't have any constructor function/method to create a class instance/object therefore there is no new keyword being used
// //we can manual attach the .__proto__ property to any object instance

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.age);
//   },
//   //this init method can be named anything,we can use this to set few predefined properties in the object just like constructor function/methods
//   inti(firstName, age) {
//     this.firstName = firstName;
//     this.age = age;
//   },
// };

// //basically here we are creating a messi object and linking the .__proto__ property  the PersonProto.prototype
// const messi = Object.create(PersonProto);
// messi.inti('Leonial Messi', 35);
// messi.calcAge();
// console.log(messi.__proto__); //this will have the calcAge method

///////////////////////assignment 2 recreate the 1st assignment using the ES6 classes /////////

// class Car {
//   constructor(maker, speed) {
//     this.maker = maker;
//     this.speed = speed;
//   }

//   accelerate = function () {
//     this.speed += 10;
//     console.log(`${this.carMaker} going at ${this.speed} km/h`);
//   };

//   break = function () {
//     this.speed -= 5;
//     console.log(`${this.carMaker} going at ${this.speed} km/h`);
//   };

//   get carMaker() {
//     return this.maker;
//   }

//   set carMaker(maker) {
//     this.maker = maker;
//   }

//   //so these getter & setter will give us speed in mi/hr
//   get speed() {
//     return this._speed / 1.6;
//   }

//   set speed(speed) {
//     this._speed = speed * 1.6;
//   }
// }

// const ford = new Car('Ford', 100);
// // console.log(ford);
// ford.accelerate();
// ford.accelerate();
// ford.break();
// // ford.speed = 50;
// console.log(ford.speed);
// console.log(ford);
// console.log(`${ford.carMaker} going at ${ford.speed} mi/h`);

//////////////inheritance between classes ////////////////////////

//creating two constructor functions Person and Student ,Student will inherit the Person class
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   return 2022 - this.birthYear;
// };

// const Student = function (firstName, birthYear, course) {
//   //since these two property are same as person we can inherit them from Person class
//   //   this.firstName = firstName;
//   //   this.birthYear = birthYear;
//   //using the call method so that we can have access to the this keyword
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// //to do the class inheritance (linking the prototype of student to the person class we can use Object.create() method)

// //in this way we can access the methods defined inside .__proto__ property of Person class
// //this is how we can achieve the inheritance between classes (and extend the prototypal chain of the object manually)
// //we have to do this at top before any other Student.prototype method is set, coz if its done after the methods then the Object.create will reset it
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   return `My name is ${this.firstName} studying ${this.course}`;
// };

// const max = new Student('Mike', 1997, 'Computer Science');
// console.log(max.introduce());
// console.log(max.calcAge());
// console.dir(max);

//////creating Inheritance between classes using the constrcutor functions
/////////assignment 3 ////////////////

// const Car = function (make, speed) {
//   (this.make = make), (this.speed = speed);
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// /////create a construction fucntion call EV child class to Car class

// const EV = function (make, speed, charge) {
//   this.charge = charge;
//   Car.call(this, make, speed);
// };

// //1) inheriting the Car class into EV class
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   return (this.charge = chargeTo);
// };

// EV.prototype.accelerate = function () {
//   this.charge--;
//   this.speed += 20;
//   return `${this.make} is going at ${this.speed}, with charge of ${this.charge}%`;
// };

// const tesla = new EV('Tesla', 120, 45);
// // tesla.chargeBattery(100);
// console.log(tesla.accelerate());
// console.log(tesla.accelerate());
// tesla.break();
// console.log(tesla.chargeBattery(50));
// console.log(tesla.accelerate());
// tesla.break();
// console.log(tesla);

///Inheritance between classes using the ES5 class syntax//////////

// class Person {
//   constructor(fullName, brithYear) {
//     this.fullName = fullName;
//     this.brithYear = brithYear;
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   introduce() {
//     return `My name is ${this._fullName} and I'm ${2022 - this.brithYear}`;
//   }

//   calcAge() {
//     this.age = 2022 - this.brithYear;
//   }
// }

// // const micky = new Person('Micky Mouse', 1997);
// // console.log(micky.introduce());
// // console.log(micky);

// //so in ES6 classes inheritence between classes is achieved in more like Java using the extends keyword
// //extends keyword will link the .prototype property of the classes
// class Student extends Person {
//   constructor(fullName, brithYear, course) {
//     //super will call the parent constructor and must be excited first
//     //similar to using call() method in above example
//     //Car.call(this, make, speed);
//     super(fullName, brithYear);
//     this.course = course;
//   }

//   //overriding the parent class method
//   introduce() {
//     return `My name is ${this._fullName} and I'm ${this.age} years old Studying ${this.course}`;
//   }
// }

// const raj = new Student('Raj Malhotra', 1999, 'Data Science');
// raj.calcAge();
// console.log(raj.introduce());
// console.log(raj);

///////////inheritance between classes using the Object.create() method//////////

//when we use Object.create() technically we don't create any classes but it link the .proto (protottype property of the objects together )

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.age);
//   },
//   //this init method can be named anything,we can use this to set few predefined properties in the object just like constructor function/methods
//   init(firstName, age) {
//     this.firstName = firstName;
//     this.age = age;
//   },
// };

// //this is how we can attach one proto of one object to another proto
// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (firstName, age, course) {
//   PersonProto.init.call(this, firstName, age);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   return `My name is ${this.firstName} and I'm ${this.age} years old Studying ${this.course}`;
// };
// //now any object created from StudentProto will have access to PersonProto as its Parent class in its prototype chain
// const abhi = Object.create(StudentProto);

// console.log(abhi);
// abhi.init('Jay', 25, 'Maths');
// console.log(abhi.introduce());
// console.log(abhi);

////////Another class example///////
/////////Encapsulation

// class Account {
//   constructor(ownerName, currency, pin) {
//     this.ownerName = ownerName;
//     this.currency = currency;
//     this.locale = navigator.language;
//     //Protected Fields start with '_' as this is the convention follwed by JS devs as JS don't truly support Private fields as of Now but will be avaiable in future
//     //we can still access these fields as public form this class although just to let devs known that it should be accessed as private field we follow such convention
//     this._pin = pin;
//     this._movements = [];
//   }
//   //better way to access the protected fields by using the methods
//   getMovements() {
//     return this._movements;
//   }

//   deposits(val) {
//     this._movements.push(val);
//   }
//   withdrawal(val) {
//     this.deposits(-val);
//   }

//   //this method should only be accesible from within the Account class
//   //we can also specify methods as private
//   _approvedLoan() {
//     return true;
//   }

//   requestLoan(val) {
//     if (this._approvedLoan()) this.deposits(val);
//     console.log(`Your Loan is Approved!`);
//   }
// }
// const acc1 = new Account('Abhi', 'Rupee', 1111);
// acc1.deposits(100);
// acc1.deposits(400);
// acc1.withdrawal(100);
// acc1.requestLoan(5000);
// console.log(acc1.getMovements());
// console.log(acc1);

//////////////////////Encapsulation using the new feature of static fields which is in progress and not released yet/////////////////////////////

// class Account {
//   //public fields (this is how we can define public fields on Instance level it is similar like decalring them in constructor)
//   locale = navigator.language;

//   //private fields (we use # to define a field as private ,it is a Instance level field)
//   #movements = [];
//   //we can also deined empty field here as private and then assign value in constructor(it is undefined at first)
//   #pin;

//   constructor(ownerName, currency, pin) {
//     this.ownerName = ownerName;
//     this.currency = currency;
//     //   this.locale = navigator.language;
//     this.#pin = pin;
//     //   this._movements = [];
//   }
//   //better way to access the protected fields by using the methods
//   getMovements() {
//     return this.#movements;
//   }

//   deposits(val) {
//     this.#movements.push(val);
//     return this; //since this method is setting some value we can return the class instance by returing this keyword ,which can be useful in chaining methods
//   }
//   withdrawal(val) {
//     this.deposits(-val);
//     return this;
//   }

//   //private methods are still fully supported as the browser treat them as a Private field only
//   //may work in future
//   #approvedLoan() {
//     return true;
//   }

//   requestLoan(val) {
//     if (this.#approvedLoan()) this.deposits(val);
//     console.log(`Your Loan is Approved!`);
//     return this;
//   }
// }

// const acc1 = new Account('Abhi', 'Rupee', 1111);
// acc1.deposits(100);
// acc1.deposits(400);
// acc1.withdrawal(100);
// acc1.requestLoan(5000);
// // acc1.#movements; //will give an error : Property '#movements' is not accessible outside class 'Account' because it has a private identifier.
// //so best way to use a normal/getter method
// console.log(acc1.getMovements());
// console.log(acc1);

// ///////////// chaining the methods//////////////
// acc1
//   .deposits(450)
//   .deposits(770)
//   .withdrawal(330)
//   .requestLoan(10000)
//   .withdrawal(900);
// console.log(acc1.getMovements());

/////////assignment 4  (re-create assignment 3 but using the ES6 syntax////////////////

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} going at ${this.speed} km/h`);
//   }

//   break() {
//     this.speed -= 5;
//     console.log(`${this.make} going at ${this.speed} km/h`);
//     return this;
//   }
// }

// // const car1 = new Car('BMW', 122);
// // console.log(car1);

// /////create a construction fucntion call EV child class to Car class

// class EV extends Car {
//   //private field
//   #charge;

//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }
//   chargeBattery(chargeTo) {
//     this.#charge = chargeTo;
//     return this;
//   }

//   accelerate() {
//     this.charge--;
//     this.speed += 20;
//     console.log(
//       `${this.make} is going at ${this.speed}, with charge of ${this.#charge}%`
//     );
//     return this;
//   }
// }

// const tesla = new EV('Tesla', 120, 45);
// tesla
//   .accelerate()
//   .accelerate()
//   .chargeBattery(30)
//   .accelerate()
//   .break()
//   .accelerate();
// console.log(tesla);

//////////////////////property flags features on Objects//////////////////

// Property flags
// Object properties, besides a value, have three special attributes (so-called “flags”):

// writable – if true, the value can be changed, otherwise it’s read-only.
// enumerable – if true, then listed in loops, otherwise not listed.
// configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.

let user = {
  name: 'abhishek',
  age: '25',
};

// let descriptor = Object.getOwnPropertyDescriptor(user, 'age');

// console.log(JSON.stringify(descriptor)); {"value":"25","writable":true,"enumerable":ture,"configurable":ture}
///the descriptor object will return us the object with the given property and its value and also 3 type of flags

// To change the flags, we can use Object.defineProperty.

// The syntax is:

// Object.defineProperty(obj, propertyName, descriptor)
//where:
// obj, propertyName -The object and its property to apply the descriptor.
// descriptor - Property descriptor object to apply.

// let user = {};

//to create a property in object if it not exist , here we are creating without defining the flags so by default it will be false if not defined in creation
// Object.defineProperty(user, 'name', {
//   value: 'Abhishek',
// });

// let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
// console.log(JSON.stringify(descriptor)); //o/p: {"value":"Abhishek","writable":false,"enumerable":false,"configurable":false}

//lets make a property non-writable

Object.defineProperty(user, 'name', {
  writable: false,
});

// user.name = 'abhijit'; //Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
// Errors appear only in strict mode
// In non-strict mode, no errors occur when writing to non-writable properties and such.
//  But the operation still won’t succeed. Flag-violating actions are just silently ignored in non-strict.

//if enumerable flag is set to flase that property is not lsited while looping over obejcts property list
//normally we can see all properies of objects like methods as well
user.toString = function () {
  return `name: ${this.name} age: ${this.age} `;
};
// for (let prop in user) {
//   console.log(prop); //it will list all properties of the user obejct : name,age toString
// }

Object.defineProperty(user, 'toString', {
  enumerable: false,
});

for (let key in user) {
  console.log(key); //now we cna only see name & age and since enumerable is flase for toString property we can see it while looping over the user properties
}

// Non-enumerable properties are also excluded from Object.keys:

// alert(Object.keys(user)); // name,age

////Configurable flag
///A non-configurable property can’t be deleted, its attributes can’t be modified. (if set to false at first we can't change it to true )
//although if the property writable flag is true then we can still overwrite that proeprty
//if all flags are false then we can't perform any action on that  object property
//for example the Math.PI property since all ttis flag are false (like example , we can't overrite the value )
//We also can’t change Math.PI to be writable again: setting wwritbale flag to true

// let user1 = {
//   name: 'John',
// };

// Object.defineProperty(user1, 'name', {
//   configurable: false,
// });

// user1.name = 'Pete'; // works fine (since its writable flag is true)
// delete user1.name; // Error Cannot delete property 'name' of #<Object>

//And here we make user.name a “forever sealed” constant, just like the built-in Math.PI:
// let user1 = {
//   name: 'John',
// };

// Object.defineProperty(user1, 'name', {
//   writable: false,
//   configurable: false,
// });

// // won't be able to change user1.name or its flags
// // all this won't work:
// user1.name = 'Pete';
// delete user1.name;
// Object.defineProperty(user1, 'name', { value: 'Pete' });

////there is also one method which allow us to define multiple properties

// Object.defineProperties(obj, {
//   prop1: descriptor1,
//   prop2: descriptor2
//   // ...
// });

// example
Object.defineProperties(user, {
  name: { value: 'John', writable: false },
  surname: { value: 'Smith', writable: false },
  age: { value: '25', writable: true },
});

//getOwnPropertyDescriptors method

// Object.getOwnPropertyDescriptors
// To get all property descriptors at once, we can use the method Object.getOwnPropertyDescriptors(obj).

// Together with Object.defineProperties it can be used as a “flags-aware” way of cloning an object:

// let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
// Normally when we clone an object, we use an assignment to copy properties, like this:

// for (let key in user) {
//   clone[key] = user[key]
// }
// …But that does not copy flags. So if we want a “better” clone then Object.defineProperties is preferred.

// Another difference is that for..in ignores symbolic and non-enumerable properties,
// but Object.getOwnPropertyDescriptors returns all property descriptors including symbolic and non-enumerable ones.
