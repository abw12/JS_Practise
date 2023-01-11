'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

//ES6 Object Literal Enhancements
//1)
//before ES6 we have to if we want to add this object into the restaurents object then have to do somethin glike openingHours:hours;
//but now we can directly give hours variable name only and JS will take the same property name for  restaurents object
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  //this is also possible in object literals since es6 to use tmeplate string and evaluate the property name
  // [`day-${7 - 2}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// 2)
// the methods  inside the object now can be created without using the function keyword
// like shown makeBiryani function is created in restaurant object

//3) we can now compute the property name value as well in the objects by using any expressions

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  orders: function (starterIndex, mainCourseIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainCourseIndex]];
  },

  orderDelivery: function ({ starterIndex, mainCourseIndex, time, address }) {
    console.log(
      `Order Delivered!, Details: ${this.starterMenu[starterIndex]} & ${this.mainMenu[mainCourseIndex]} is delivered to ${address} at ${time}`
    );
  },

  makeBiryani(ing1, ing2, ing3) {
    console.log(`Here is your Biryani with ${ing1} , ${ing2} ,${ing3}`);
  },

  orderPizza: function (curst, ...toppings) {
    console.log(
      `Here is your Pizza with ${curst} base and toopings of ${toppings}`
    );
  },
  openingHours,
};

//destructuring objects

//here we have to specify the exact property name of the object  else we'll get the undefined
//the order of variable does not matter in object destructuring
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

//if we want to use some other name than the exact property of the object for variables
//left side is the exact property and after : is the variable name that we want to specify
// const {
//   name: restroName,
//   openingHours: hours,
//   starterMenu: starters,
// } = restaurant;
// console.log(restroName, hours, starters);

// //we can also define default values just like we defined in arrays
// //since menu property is not present in the object it will return undefined ,so we can give the defualt value for such unknown variables ,here we giving the empty array
// const { menu = [], openingHours: acitveHours = [] } = restaurant;
// console.log(menu, acitveHours);

//Mutating Variables
//we are trying to achieve the overwrting of below two variables a  & b with the values of a & b property define in the below obj
// let a = 100;
// let b = 200;
// const obj = { a: 20, b: 30, c: 40 };

// const {a,b,c} = obj; //we cannot redecalre the variables here in const since its already declared above ,also we can't use let keywrod since that will create a new variable itself and not overwrite the variables

// {a,b} = obj; //we can't also do this since it means we assigning th value to a block statement nothing just mentioned as within {} are consider as block statement

// ({ a, b, c } = obj); //so by wrapping everything in () brackets it allow us to overwrite
// // the a=100 & b=200 declared above to a=20 & b =30 and this is called mutating variables
// //c will give an error since its not declared above
// console.log(a, b);

//nested objects
// layer of nesting, restaurant -> openinHours -> fri -> open & close value  , these open &  close can also be given default value and some other variable name as well just like above we did
// const {
//   openingHours: {
//     fri: { open:o = 0, close: c = 0 },
//   },
// } = restaurant;
// console.log(o, c);

//some use case of destructuring in real scenario
//supoose we assume above restaurant object only
//sometimes function have too many parameters so passing a obj with its properties as the parameter list is more useful
const params = {
  time: '10:10pm',
  address: 'Agarwal Paramount',
  starterIndex: 3,
  mainCourseIndex: 1,
};
// restaurant.orderDelivery(params); //oderDelivery mehtod is using destructuring above

//basic of array destructuring
// const arr = [1, 2, 3, 4];

// const [a, b, c] = arr;
// console.log(a, b, c);

//if we want first and third value from the array
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary); //will print index 0 = Italian & 2 =Vegetarian since index 1 is kept empty in destructuring

//if i want to swap values between two variables

//normal swapping
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

//swapping using destructuring
// [main, secondary] = [secondary, main]; //jsut change the position of variables in the right side while destructuring
// console.log(main, secondary);

//nested arrays
// const nested = [1, 3, [5, 6]];
// let [x, y, [z, q]] = nested;
// console.log(x, y, z, q);

//function returing an array

// const [starter, mainCourse] = restaurant.orders(2, 0);
// console.log(`starter: ${starter} & main Course: ${mainCourse}`);

//suppose we are not aware of the returing array then can give default values

// const [e = 1, f = 1, g = 1] = [8]; //this will set 1 as default if there is no index  present in the array at given psoitions
// console.log(e, f, g); //if default is not present then it will give undefined

//spread operator

const arr = [1, 23, 4, 5];
const uArr = [...arr, 10, 32]; //... is the spread operator which will unpack all elements from arr array as individual elements
// console.log(uArr);

const newMenu = [...restaurant.mainMenu, 'biryani', 'butter chicken'];
// console.log(newMenu);

//copy array (create a shallow copy)
// const copy = [...newMenu];
// console.log(copy);

//join two array
// const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(fullMenu);

//strings are also iterables in JS so we can use iterables on them it will return a character array/list
const str = 'abhi';
const letters = [...str, ' ', 'W.'];
// console.log(letters); //['a', 'b', 'h', 'i', ' ', 'W.']
// console.log(`Hi ${...str}`); //Unexpected token '...' does not supported in template literals

//some use cases of spread operator
//while passing the array as a parameter list to some function

const ingredients = [
  // prompt("lets's make biryani, Ingredient 1 "),
  // prompt('ingredient 2'),
  // prompt('ingredient 3'),
];
// console.log(ingredients);
//old way
// restaurant.makeBiryani(ingredients[0], ingredients[1], ingredients[2]);
// //with spread operator
// restaurant.makeBiryani(...ingredients); //since we suing array here in the arguments its using spread operator and not Rest pattern

//since ES 2018 we can use the spread operator on objects as well

// const newRestro = { foundedin: 1990, ...restaurant, founder: 'abhishek' }; //i can copy the restaurant property and add thes two new properties
// console.log(newRestro);

// //just like arrays we can create a shallow copy of the objects
// //so its better now to use the new spread operator to copy the objects instead of using the Onbjects.assign method
// const copyOfRestro = { ...restaurant };
// console.log(copyOfRestro);

//since it create a copy if we change any property it won't changed on original object
// copyOfRestro.name = 'Post Offcie';
// console.log(restaurant.name);
// console.log(copyOfRestro.name);

/////////////conditional based adding a property into an object using spread operator//////////////////

// const isSale = true;

// const obj = {
//   name: 'abhishek',
//   ...(isSale && { discount: '15%' }),
//   ...(isSale || { discount: '30%' }),
// };
// console.log(obj);

////////////////////////////////////////////////////////////////////////////
//Rest pattern
//it is opposite of spread operator ,here we pack the elements into the variable

//spead operator is used on right side of =
const [a, b, c, d] = [...restaurant.categories]; //array destructuring with spread operator
// console.log(a, b, c, d);

//Rest pattern is used on the left side of =
// const [x, y, ...others] = [1, 2, 3, 4, 5, 6, 7];
// console.log(x, y, others); //Rest can only be used once on left hand side of '=' and it must be used as the last index of destructuring
//if used before it will throw an error
// const [x, y, ...others,z] = [1, 2, 3, 4, 5, 6, 7]; //ERROR: A rest element must be last in a destructuring pattern.

//using both the spread & rest operator on both side of '=' at same time
//so from mainmenu array we are taking pizza & Risotto variable from index 0 & index 2 and skipping the index 1
//rest all values are stored in otherMenu
const [pizza, , Risotto, ...otherMenu] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

// console.log(pizza, Risotto, otherMenu); //o/p => Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//some use cases of Rest pattern in Objects
// const {
//   openingHours: { sat: weekend, ...weekdays },
// } = restaurant;
// console.log(weekend, weekdays);

//OR can be done as below

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// 2) use case with functions
//suppose we have a function who accept arbitary number of arguments (N number of arguments).

//since here we are passing the arguments as single element and notas a list/array the '...'
// here implies that we are using Rest pattern and not spread operator since we pack these elements into an array
function add(...numberArr) {
  let sum = 0;
  numberArr.forEach(num => {
    sum += num;
  });
  console.log(sum);
}

// add(1, 2, 3);
// add(15, 13, 17, 19);
// add(15, 13, 17, 19, 33, 44, 50);

//we can also pass the spread operator array into the argument list of the function like below
const j = [22, 33, 55];
// add(...j); //here we are unpacking the j array into single elements and then calling the function add()
// where again it will pack all these elements into an array called numberArr

// //it is useful when we have a function where only few fields are required and others are optional
// //so we can call function with as many parameters as we want
// restaurant.orderPizza('doubleburst', 'chciken', 'salami', 'onion', 'olives'); //using the Rest pattern in function above to pack all these values into a array
// restaurant.orderPizza('doubleburst');

//////////////////////////////////////////Short circuiting//////////////////////////////////////////////////////

// OR(||) operator

// console.log('' || 'abhis');
// console.log(undefined || 'abhi');
// console.log(10 || null); //10 is also evaluated as boolean value which we return true or false
// console.log(0 || 'abhi'); //since 0 is considred as falsy value
// console.log(0 || null || undefined); //all are false so it will return last falsy value

// const isNumber = restaurant.isNumber || 10; //it can be used in place of ternary operator ,where we are looking for the first truthy value else return default value
//so if we found restaurant.isNumber property than will return that value or return the default(10) value
// console.log(isNumber);

// restaurant.guest = 0;
// const guest = restaurant.guest || 10; //since 0 is falsy value it will go in second part though in some cases we might need 0 to be considered
//as guest can be zero and we want it to be displyed 0 and not take the default value (10)
//in such cases we use Nullish Coelesing operator(??) introduced in ES2020
// console.log(guest);

//AND (&&) operator
// /&& operator is opposite of the OR operator here we looking for first falsy value and return that as sson as we foun the first false value in the expression
// console.log(0 && 'abhi'); //it will return the 0
// console.log(25 && 'abhi' && null); //it will return the null
// console.log(100 && '' && 102); //it will return the empty string since its the first falsy value
// console.log('abhi' && 100 && 'h');  //this will return h as all values are tru so it return last value

//it can be used in situation where we use the if else statement to check in if condition if there is any some property which exist or not
// //this can also be done using short cirtuiting  && operator
// restaurant.orderPizza &&
//   restaurant.orderPizza('thin crust', 'chicken', 'spinach');

// //Nullish coalesion operator (??)
// //it works similar to  OR operator though here we consider Nullish values and not the falsy values on JS
// // Nullish values : (null & undefined) are false rest all like empty string & 0 is considered as true

// restaurant.guestList = 0;
// console.log(restaurant.guestList ?? 20); //this will print 0 as 0 is not considered as flasy by nullish operator

/////////////////////////////// Logical operator////////////////

const restro1 = {
  name: 'Sport bar',
  // numGuest: 20,
  numGuest: 0,
};
const restro2 = {
  name: 'Blu bar',
  owner: 'Raj',
};

//check if numGuest is empty or not if not add in the respective objects
// restro1.numGuest = restro1.numGuest || 10;
// restro2.numGuest = restro2.numGuest || 20;
//above statement can be better written using the Logical OR assignment operator
//this also does not work with 0 value as it consider 0 as falsy so that that we have Nullish assignment operator
// restro1.numGuest ||= 30;
// restro2.numGuest ||= 40;
// console.log(restro1);
// console.log(restro2);

//Logical Nullish coalesing assignment opearator
// restro1.numGuest ??= 10; // 0 is considered as true in Nullish operator
// restro2.numGuest ??= 50;
// console.log(restro1);
// console.log(restro2);

// restro1.owner = restro1.owner && '<Anonymous>'; //will become false and return undefined
// restro2.owner = restro2.owner && '<Anonymous>';
//Logical AND assignment operator
// restro1.owner &&= '<Anonymous>';
// restro2.owner &&= '<Anonymous>'; //o/p Anonymous ,since it return the last value if all values are true
// console.log(restro1);
// console.log(restro2);

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// 1) fetching both team players list using array destructuring
// const [players1] = [game.players[0]];
// const [players2] = [game.players[1]];
//better way to do it directly in destructing the array
// const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);

// 2) getting first element as GK and rest as fieldPlayers for Team 1 using rest pattern & destructuring
// const [gk, ...fieldPlayerT1] = players1;
// console.log(gk, fieldPlayerT1);

//3)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

//4)
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; //copyin ghte OG team 1 playerList
// console.log(players1Final);

//5)
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

//6)
// function printGoals(...players) {
//   let goalScored = 0;
//   for (const player of players) {
//     console.log(player);
//     if (game.scored.includes(player)) goalScored++;
//   }
//   // for (let i = 0; i < players.length; i++) {
//   //   console.log(players[i]);
//   //   if (game.scored.includes(players[i])) {
//   //     goalScored++;
//   //   }
//   // }
//   console.log(`Total Goal ${goalScored}`);
// }

// printGoals('Perisic', 'Gnarby', 'Lewandowski');
// printGoals(...game.scored);

//7)since && operator return on frist falsy value so if can use it below
// team1 < team2 && console.log('Team1 is more likely to Win!');
// team2 < team1 && console.log('Team 2 is more likely to Win!');

//For-of loops

// for (const item of otherMenu) {
//   console.log(item);
// }

//if want to get the index of each element using for-of loop then we can use the entries() method
//of it which will return array of array where 0th index is the index number of original array and 1st index is the vlaue of original array
// for (const item of otherMenu.entries()) {
//   // console.log(item);
//   // console.log(`${item[0] + 1} : ${item[1]}`);
// }

//better way wrtiting above loop using destructuring,when we want to print the index and values of an array using for-of
// for (const [i, el] of otherMenu.entries()) {
//   console.log(`${i + 1} : ${el}`); //where i is index and the el is the elements of original array
// }

////////////////////////Optional Chaining Operator/////////////////////////////////////////
//it is useful when we dont know if a certain property exist in objects or not
//so instead of throwing error on unknown property we can use optional operator to handle the unknown property better
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

//we want to print only those days when restro in open from the opening hours object in restaurent object
//the OR and If condition take value 0 as a falsy value there if the open hour is zero then it will be considered as false
//hence use Nullish coalesion operator ,also Nullish coalesion operator goes well with (?) optional operator many times
//so when some property is not present then the (?) optional Operator will return 'undefined'
// for (const day of days) {
//   // if (restaurant.openingHours[day]?.open)
//   // console.log(day);
//   //below will also return false if open:0
//   // restaurant.openingHours[day]?.open &&
//   //   console.log(`Restaurent is Open on ${day}`);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(
//     `Restaurent is ${
//       open !== 'closed' ? 'Opened' : 'Closed'
//     } on ${day} at ${open}`
//   );
// }

//calling method using optional operator
// console.log(restaurant.orders?.(0, 2) ?? 'Method Does Not Exist!'); //this will return a method since it exist
// console.log(restaurant.cars?.(0, 2) ?? 'Method Does Not Exist!');

//use on arrays
// const info = [{ name: 'Abhishek', email: 'wasaveabhishek@do.com' }];
// const empty = [];
// console.log(info[0]?.name ?? 'Array is Empty!'); //chekcing if array contain some value at Index 0 or not
// console.log(empty[0]?.name ?? 'Array is Empty!');

/////////////////////Objects methods key:values///////////////////
//retrieve Keys
// for (const keys of Object.keys(openingHours)) {
//   console.log(keys);
// }

//retrieve values
// for (const value of Object.values(openingHours)) {
//   console.log(value);
// }

//retrieve entries key:value pair
//this entries method differe from array.entries method as this one expect an object as an argument
// for (const entry of Object.entries(openingHours)) {
//   console.log(entry);
// }

//real use case using destructuring
//since here the entries will return an array of [key,value] ,since here value is an object we can again destructure like below
// for (const [day, { open, close }] of Object.entries(openingHours)) {
//   console.log(`We are Open from ${open} and are closed at ${close} on ${day}`);
// }

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

//1)
// for (const [i, scorer] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${scorer} `);
// }

// 2)
// let sum = 0;
// const odds = Object.values(game.odds);
// for (const value of odds) {
//   sum += value;
// }
// console.log(sum / odds.length);
// game.odds.avgOdd = sum / odds.length;
// console.log(game.odds);

//3
// for (const [key, value] of Object.entries(game.odds)) {
//   key == 'x'
//     ? console.log(`Odd of draw : ${value}`)
//     : console.log(`Odd of Victory ${game[key]} : ${value} `);
// }

//Bonus
// let scorer = {};
// for (const name of game.scored) {
//   scorer[name] = scorer[name] ? scorer[name] + 1 : 1;
// }
// game.scorer = scorer;
// console.log(scorer, game);

//solution by udemy tutor
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
// console.log(scorers);

////////////////////////////////////////////////SET in JS//////////////////////////////////
const orderSet = new Set([
  'pizza',
  'pasta',
  'pizza',
  'pizza',
  'pasta',
  'maggi',
  'maggi',
]);

//few method of Set
orderSet.add('bread');
//has method return true or false if value exist or not
// console.log(orderSet.has('pasta'));
// console.log(orderSet.has('biryani'));
// // console.log(orderSet);
// console.log(orderSet.delete('bread'));
// console.log(orderSet);
//Set are not a good use case where we want to reteive  a particular value from it in that case use array as we can get value based on index in arrays

//Set are iterable so we can loop over them and also use spread operator
//example
const staff = ['Manager', 'Waiter', 'Waiter', 'Accountant', 'Chef', 'Chef'];
// const uniqueStaff = new Set(staff);
// for (const s of uniqueStaff) {
//   console.log(s);
// }
//Or can use spread operator to directly create a set
// const uniqueStaff = [...new Set(staff)]; //here uniqueStaff is an array of unique values so we passed an array to Set which removed duplicate
// and again by using the spread operator we unpack all set values into an array
// console.log(uniqueStaff);

// const playersScored = new Set(game.scored);
// console.log(playersScored);

/////////////////////////////////////////////////Maps in JS//////////////////////////////////

//difference between the Map nad the JS Object is that the object can  only have String as keys but Maps can have keys with any data types(boolean,Number,String oreven a map itself)
const rest = new Map();
//Map does not allow duplicate keys
//set method is used to add key:valeu pairs by comma seperated into map
rest.set('name', 'abhishek');
rest.set(5, 'sarnag');
//set method will return the updated map
// console.log(rest.set(9, 'vikcy'));

//since set method will return the updated map ,we can do map chainning using set method
rest
  .set('lastname', 'wasave')
  .set(true, 'we are open!')
  .set(false, 'We are Closed!')
  // .set(true, 'Ronaldo')
  .set('categories', orderSet)
  .set('open', 11)
  .set('close', 23);

//get methods

// console.log(rest.get(true));
// console.log(rest.get(false));
// console.log(rest.get('lastname'));

//some use case of using the keys as the true value in the map
const time = 7; //according to the time passed will get if restro is open or closed
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

//delete method (it return boolean value true if deleted & false if key not found)
// console.log(rest.delete('apple')); //will return false as apple in not present as key

//arrays as keys in Map

//correct way to add array as key in Map
const ar = [1, 2];
rest.set(ar, 'Two Numbers in Array');
// console.log(rest);
// console.log(rest.get(ar)); //use this way to whenever try to retrieve any  array key from a Map

//Incorrect way to add array as keys in Map
// rest.set([1, 2], 'Two Numbers in Array'); //it will set the key as [1,2] but when we try to get that key it will give us undefined ,
//both way of defining the key i.e by passing the 'ar' variable as key shown above and directly declaring array as key on above line  will have different address in memory
// console.log(rest);
// console.log(rest.get([1, 2])); //this will return undefined seen when we try to get [1,2] since the way Objects are stored in Heap memory vs the way primitives (ex: ar above) is stored in memory

//we can store arrays as key and value both
rest.set(ar, [1, 2, 3, 4.5]); //this will overwrite the "ar:Two Numbers in Array " with the currently given array here
// console.log(rest);
// console.log(rest.get(ar));

////objects as keys in map
//some real use case is in DOM objects
//this is very powerful useful way in which we can store DOM in the Map
rest.set(document.querySelector('h1'), 'heading of page!');
// console.log(rest.get(document.querySelector('h1')));

const bio = { name: 'Ronaldo', Exp: '20 years' };
rest.set(bio, 'Bio of Best Player in World');
// console.log(rest.get(bio)); //to get an object when passed with primitive variable

// console.log(rest); //one thing to observe here is i set the  hello obj below before I console.log
//the rest obj still the output will have the below object key in the map,this happens because of JIT compilation where it scan the script in advance
// rest.set({ hello: 'namaskar', origin: 'india' }, 'How to Say Hello in India');

///Another way to Create a Map
//Instead os using the set method we can also make use of the below approach where we declare map using the array of array in the constructor
//here in main array we can defined sub-array whose 0th index is the key and the 1st index is the value of the Map
//Quiz App
const quiz = new Map([
  ['question', 'Who is the best footballer in the world?'],
  [1, 'Messi'],
  [2, 'Mbappe'],
  [3, 'Ronaldo'],
  ['correct', 3],
  [true, 'you guessed it right 🎉'],
  [false, 'wrong answer😒'],
]);

// console.log(quiz);
//the above structure is similar to the Objects.entries() method output were we get the array of array in the output
//therefore to convert an object into map is very easy
// const openOn = new Map(Object.entries(openingHours));
// console.log(openOn);

//Map are also iterable of we can loop over them using like for loop
// console.log(quiz.get('question'));
// for (const [key, value] of quiz) {
//   if (typeof key === 'number') {
//     // console.log(`Options ${key}: ${value} `);
//   }
// }

// const answer = Number(prompt('Answer:'));
// console.log(answer);

// console.log(quiz.get(quiz.get('correct') === answer));

//Convert Map to Array
//can do this easily using the ...spread operator though the output will look similar to what we have as the quiz map array of array but it will be of type array and a Map
// console.log(...quiz); //this will return as the sub-array elements (key:value)
// //we can also use array keys/values method and the use of ...spread operator will give as an array in output (also can use array.entires() method though it will be same as above statement)
// console.log(...quiz.keys()); //unpack all elements(here its keys) from array
// console.log(...quiz.values()); //unpack all elements(here its values) from array

//conditional based adding a property into an object using spread operator

// console.log(...{ name: 'maxwell' });

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves,
 and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1)1st way is wrong since we output in array and it return it in sets & second approach is correct
// const uniqueEvents1 = new Set([...gameEvents.values()]);
// const uniqueEvents2 = [...new Set(gameEvents.values())];
// console.log(uniqueEvents1);
// console.log(uniqueEvents2);

//2)
// gameEvents.delete(64);
// console.log(gameEvents);

//3)since last event occured at 92 min total time we'll consider here as 92
// const avgEvent = 90 / gameEvents.size;
// console.log(`An event happened, on average, every ${avgEvent} minutes`);

// //pop out the last event min(key) from map
// const last = [...gameEvents.keys()].pop();
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

//4)
// for (const [min, event] of gameEvents) {
//   min <= 45
//     ? console.log(`[FIRST HAlf] ${min}: ${event}`)
//     : console.log(`[SECOND HAlf] ${min}: ${event}`);
// }

////////////////Working with Strings ////////////////////////

// const sent = `Fifa world cup 2022`;

// console.log(typeof sent[2], sent[5], 'Hello'[0]); //we get character from strings by using index hence strings are also iterables in JS,this return type as string only
// //indexof method
// console.log(sent.indexOf('2')); //return index of first appearence of 2 in the given string
// console.log('2033'.indexOf('3'));

// //lastIndexof method
// console.log(sent.lastIndexOf('2')); //return index of last appearence of 2 in the given string
// console.log('abhishek'.lastIndexOf('H')); //it is case sensitive so here it will return -1

//slice method
//it works similar to the subString method in Java ,it have two parameter 1st is begining index (inclusive) and 2nd is endIndex(exclusive)
//the lenght of the substring is end index - beign index
//therefore for negative values only if begin index is greater than end index then it wil work
// console.log(sent.slice(2, 15));
// console.log(sent.slice(4));
// console.log(sent.slice(sent.indexOf('w'), sent.lastIndexOf('2')));
// console.log(sent.slice(-2)); //negative values will start from the right end side of the strings
// console.log(sent.slice(-6, -3)); // it return substring from -6 to -3 from right side(it still work left to right only)

//some real world use case

// const checkMiddleSeat = function (seat) {
//   //if seat End with B & E then its a middleSeat
//   const s = seat.slice(-1); //this will give us last letter from given String
//   if (s === 'B' || s == 'E') console.log('You got Middle Seat 🤣');
//   else console.log("You're Lucky!👍");
// };

// checkMiddleSeat('12C');
// checkMiddleSeat('23B');
// checkMiddleSeat('3E');

//string which is a primitive data type how can we use functions/methods like indexOf ,slice n all on it?
//the JS in background is doin auto-boxing of the primitive type string to its wrapper String object
// console.log(new String('abhishek'));
// console.log(typeof new String('abhishek')); //basically it does this

//so it box it into String Object class and then again the methods return the string primitive type
// console.log(new String('abhishek').slice(0, 4));
// console.log(typeof new String('abhishek').slice(0, 4));

//all string methods are case sensitive

//toLowerCase toUpperCase method
const firstName = 'aBhIsHeK';
const normalizedName = firstName[0].toUpperCase() + firstName.slice(1);
// console.log(normalizedName);

//trim() removes all whitespaces from the string
const mail = '  abhi@GMAIL.com \n';
const normalizedMail = mail.toLowerCase().trim();
// console.log(normalizedMail);

//replace method replace the first appearence of a letter with the given letter and return the string
//replace method is case sensitive
const eRupee = '233,450#';
const normalizedErupee = eRupee.replace('#', '$').replace(',', '.');
// console.log(normalizedErupee);

//In Future replaceAll method will come which can replcae all the appearence of given string
const msg = 'Hello today is Fifa wc 2023 final';
// console.log(msg.replace('2023', '2022').replace('final', 'semi-final'));

//we can also pass regular expression
const doorMsg = 'who is ringing the door.please go check the door';
// console.log(doorMsg.replace(/door/g, 'bell'));

//booleans(includes and startWith method)
// console.log(mail.includes('@'));
// console.log(mail.trim().startsWith('abhi'));
// console.log(mail.trim().endsWith('.com'));

// function baggage(bag) {
//   const bagContents = bag.toLowerCase(); //its better to lowercase user input to keep a single casing standard
//   if (bagContents.includes('knife') || bagContents.includes('gun')) {
//     console.log('You are NOT allowed board');
//   } else {
//     console.log('Welcome Aboard!');
//   }
// }

// baggage('I have Food , Shoes and a pocket Knife');
// baggage('got some snacks and laptop ');
// baggage('i got a water bottle and a gun for protection!');

///split and join method
//split method takes a delimiter and return an array
// const names = 'abhishek sarang vedant vicky'.split(' ');
// console.log(names);

//good use of destructuring with split()
// const [fName, lName] = 'abhishek wasave'.split(' '); //split will split the string after spcae and store in in array then destructuring will assign it to variables fName & lName
// console.log(fName, lName);

//join() method is opposite of split()

// const newFName = fName[0].toUpperCase() + fName.slice(1);
// const title = ['Mr.', newFName, lName].join(' ');
// console.log(title);

// const capitalization = function (input) {
//   const names = input.trim().split(' ');
//   const capital = [];
//   for (const n of names) {
//     // capital.push(n[0].toUpperCase() + n.slice(1));
//     //another way to do it
//     capital.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(capital.join(' '));
// };

// capitalization('john smith henry messi ronaldo '); //the space at the end will give an error if trim() is not used above since the last value will be undefined
// capitalization('abhishek wasave');

//padding
const message = 'hello abhishek!';
//padStart make sure here that length of string will be 20 ,if not it will add * from the left side(beginning) of the string
// console.log(message.padStart(20, '*'));
//padEnd make sure here that length of string will be 20 ,if not it will add * from the right side(end) of the string
// console.log(message.padEnd(20, '*'));
// console.log(message.padStart(30, '*').padEnd(32, '#'));

//some real use case is to hide credit card number and display only last 4 digits

// const hideCreditCardNumber = function (cNumber) {
//   //convert the cNumber to string
//   const num = typeof cNumber !== 'string' ? String(cNumber) : cNumber;
//   // const lastFourDigit = num.slice(-4);
//   // console.log(lastFourDigit.padStart(num.length, 'x'));
//   //same thing done below in 1 line
//   console.log(num.slice(-4).padStart(num.length, 'x'));
// };
// hideCreditCardNumber(78541203698200);
// hideCreditCardNumber('111447852369013');

//The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first
console.log('reverseing'.split('').reverse());

//Repeat ,it take one paramter which tells us how many times  astring must be repeated
// const planesInLine = function (nPlanes) {
//   console.log(
//     `there are ${nPlanes} planes in line on runway to take-off ${'✈️'.repeat(
//       nPlanes
//     )}`
//   );
// };
// planesInLine(4);
// planesInLine(2);
// planesInLine(10);

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const input = document.querySelector('textarea').value;
//   const singleLine = input.split('\n');

//   for (const [index, word] of singleLine.entries()) {
//     const [firstPart, secondPart] = word.toLowerCase().trim().split('_');
//     // const normalizedFirstPart = firstPart.toLowerCase();
//     // const normalizedSecondPart =
//     //   secondPart[0].toUpperCase() + secondPart.slice(1).toLowerCase();

//     const finalString = `${firstPart}${secondPart.replace(
//       secondPart[0],
//       secondPart[0].toUpperCase()
//     )}`;
//     console.log(`${finalString.padEnd(20, ' ')}${'✅'.repeat(index + 1)}`);
//   }
// });

///////////////////////////////////////
// String Methods Practice

const flightsInfo =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = code => code.slice(0, 3).toUpperCase();

for (const flight of flightsInfo.split('+')) {
  const [status, source, destination, time] = flight.split(';');
  // console.log(status, source, destination, time);
  //replaceAll works from ES2021
  const output = `${
    status.trim().startsWith('_Delayed') ? '⛔' : ''
  }${status.replaceAll('_', '')} from ${getCode(source)} to ${getCode(
    destination
  )} (${time.replace(':', 'h')})`.padStart(40);
  //the padStart & padEnd method with just 1 paramter of length take an empty string as 2nd paramter to pad with by default
  console.log(output);
}
