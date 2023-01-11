'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, 30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displayMovements = function (currentAcc, sort) {
  containerMovements.innerHTML = ''; //to remove the default rows of movements

  //using slice method to make a copy of array and do sort on it.otherwise sort method will methodify the original array
  //we display movements on UI from bottom to top ad we want to display descending order whenever we click on sort button
  //so the sorting here should be ascending
  const movs = sort
    ? currentAcc.movements.slice().sort((a, b) => a - b)
    : currentAcc.movements;

  movs.forEach(function (amount, i) {
    const typeOfMovement = amount > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${typeOfMovement}">${
      i + 1
    } ${typeOfMovement}</div>
      <div class="movements__value">${amount}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // sorted = !sorted;
  });
};

// displayMovements(account1.movements);

//display balance for an account
const calcDisplayBalance = function (currentAcc) {
  currentAcc.balance = currentAcc.movements.reduce(
    (accu, curr) => accu + curr,
    0
  );
  labelBalance.textContent = `${currentAcc.balance}€`;
};

// calcDisplayBalance(account1.movements);

////calcDisplaySummary
const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((accu, val) => accu + val);
  labelSumIn.textContent = `${deposits}€`;

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((accu, val) => accu + val, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;

  //bank is giving the interest on each deposit but only if the interest value is more than 1 euro
  const interested = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accu, int) => accu + int);

  labelSumInterest.textContent = `${interested}€`;
};

// calcDisplaySummary(account1.movements);

///create username for accounts
const createUserNames = function (accounts) {
  accounts.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

//updateUI method
const updateUI = function (currentAccount) {
  displayMovements(currentAccount, false);
  //update balance
  calcDisplayBalance(currentAccount);
  //update summary
  calcDisplaySummary(currentAccount);
};

////////Event Handler///////////////

let currentAccount;

//Login feature
btnLogin.addEventListener('click', function (event) {
  //Prevent Form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display Welcome message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    } `;
    containerApp.style.opacity = 100;

    //Clear username & password
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //to loose focus from pin inputfield

    //call updateUI
    updateUI(currentAccount);
  } else {
    alert(`Wrong username or pin!😒`);
  }
});

///Transfer feature
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  //update current user details
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.userName !== receiverAcc?.userName
  ) {
    //clear input fields
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();

    //update movements
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //call updateUI
    updateUI(currentAccount);
  } else if (currentAccount.balance < amount) {
    alert(`You don't have sufficient balance in account!😢`);
  } else {
    alert(`Wrong details entered!`);
  }

  console.log(currentAccount);
  console.log(receiverAcc);
});

//close account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  // const closeUserName = accounts.find(acc => acc.userName === inputCloseUsername);
  // const closePin = accounts.find(acc => acc.pin === inputClosePin);

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(
        acc =>
          acc.pin === currentAccount.pin &&
          acc.userName === currentAccount.userName
      ),
      1
    );
    containerApp.style.opacity = 0;
    inputClosePin.value = inputCloseUsername.value = '';
  } else {
    alert(`Incorrect Credentials .. try with some valid Creds!🥱`);
  }
  console.log(accounts);
});

//Request Loan

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  //allow loan only if any deposit in the account > 10% of requested loan amount (amount /10 or amount * 0.1 to cacluate the 10% )
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add the loan amount to movements
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  } else {
    alert('Requested Loan amount is too high!😑');
  }
  inputLoanAmount.value = '';
});

//flag to toggle from sorting to normal order
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  console.log('click', sorted);

  displayMovements(currentAccount, !sorted);
  sorted = !sorted; //switch back to false
});

/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

///slice method
// const arr = ['a', 'b', 'c', 'd', 'e'];

//slice do changes in the copy and not the original array
// console.log(arr.slice(1, 3)); //wil lreturn b,c in new array
// console.log(arr.slice()); //this will return the shallow copy of the array just like we do using spread operator
// console.log([...arr]);

///splice method
///1st paramter is the begin index(includes) and 2nd parameter is the count of element to be removed including beign index & return the removed elements
///splice method make changes in the original array
// console.log(arr.splice(0, 3)); //will include 0,1,2 index rest will be deleted
// console.log(arr); //you can see here the original array is meodified
//slice method is used mostly to remove the last index of array
// console.log(arr.splice(-1));

//reverse method
//reverse method also mutate(change the original array)
// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// // console.log(arr2.reverse());
// // console.log(arr2); //the original array also got reversed

// //concat
// //concat will return a new array after joining the two array it does not mutate the original array
// console.log(arr.concat(arr2));
// console.log([...arr, ...arr2]); //spread operator also does the same work and return a new shallow copy of array

//join
//join will return the string using the specified delimeter
// console.log(arr.join('-'));

// ///'at' method
// const arr3 = [145, 44, 678];
// console.log(arr3[1]); //usually we do this to get particular index value
// console.log(arr3.at(1)); //this is same as above using the at method

// //traditional way of getting the last index
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// //using the at method its much easier at we can use negative from right side of array to get element from end of the arrays
// console.log(arr3.at(-1)); //will return the last index in array

// //at method also works in strings
// console.log('abhishek'.at(-3));

////forEach loop

// const records = [189, 190, -111, -120, 129, 330, -330];

//the forEach loop accept a callback function which can take 3 parameters (1st is mandatory)
//1st is the current value of the array on which it is looping
//2nd is the index of the array which we can use in code block
//3rd is the entire array on which forEach is looping
// records.forEach(function (rec, i, array) {
//   if (rec > 0) {
//     console.log(`Record No ${i + 1}: ${rec} deposited `);
//   } else {
//     console.log(`Record No ${i + 1}: ${Math.abs(rec)} withdrawed`);
//   }
// });

//NOTE: difference in forEach and 'for of' loop is that forEach does not allow use of break/continue statement

//forEach method for Map & Set
// const currency = new Map([
//   ['Rupees', 'India'],
//   ['USD', 'United State Of America'],
//   ['Pound', 'Great Britain'],
//   ['Euro', 'Europe'],
// ]);

// //here 1st param is value 2nd is the key and 3rd is the map itself
// currency.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// const nations = new Set(['Ind', 'SL', 'Pak', 'Aus', 'Aus', 'Ind', 'NZ']);
// //here since Set don't have any key the key is same as the value in forEach
// nations.forEach(function (value, key, set) {
//   console.log(`${key} : ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//1)
// const checkDogs = function (jarray, kArray) {
//   const copyJArr = [...jarray];
//   console.log(copyJArr);
//   copyJArr.splice(0, 1);
//   copyJArr.splice(-2);
//   //2)
//   const dogsAges = [...copyJArr, ...kArray];
//   console.log(dogsAges);

//   //3)
//   dogsAges.forEach((age, index) => {
//     console.log(
//       `Dog number ${index + 1} is an ${checkIfAdult(
//         age
//       )}, and is ${age} years old`
//     );
//   });
// };

// const checkIfAdult = age => (age >= 3 ? 'adult' : '🐶 puppy');

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//////////Data Transformation method : Map ////////////////////////////////

// const currencyInRupee = [500, 5000, 6000, 7000, 702, 99.2, 1012.9];

// //The Map method return apply the function and mapp each element of original arry to the new array and return the new array
// //how it works:
// //it take a callback fn and on each element of original array it return some value and add it to newly created array and at the end return that array
// const rupeeToDollar = currencyInRupee.map(rupee => Math.floor(rupee / 72.25));
// console.log(rupeeToDollar);

//////Filter method ////////////

//this way more pushes us toward using functional programming approach where we can chain the methods together
// const deposit = account1.movements.filter(function (mov) {
//   return mov > 0;
// });

// //traditional way of doing the smae thing
// const depositT = [];
// for (const mov of account1.movements) if (mov > 0) depositT.push(mov);

// console.log(account1.movements);
// console.log(deposit);
// console.log(depositT);

// const withdrawals = account1.movements.filter(mov => mov < 0);
// console.log(withdrawals);

/////Reduce Method////////

//reduce method where 1st parameter is  callback function it has 1st parameter as accumulator rest remaining parameter are same.
//accumulator is like sum which gets add up one big value which we return it at the end of iteration over the array.
//the 2nd parameter of reduce method is the initial value of the accumulator .
// const balanceAcc1 = account1.movements.reduce(function (
//   accumulator,
//   amount,
//   i,
//   movArray
// ) {
//   console.log(`Iteration: ${i} ${accumulator}`);
//   return accumulator + amount; //return the current accumulator value to next iteration where again it add the current value to accumulator and return it
// },
// 0);

// console.log(balanceAcc1);

// //Find Maximum Value in Movements array
// //here accumulator will act as the current Max Value in each iteration & initial value will be the first index of movements array
// const maxMov = account1.movements.reduce(function (accu, mov) {
//   if (mov > accu) return mov;
//   else return accu;
// });

// //same thing written below in arrow function

// // const maxMov = account1.movements.reduce(
// //   (accu, mov) => (mov > accu ? mov : accu),
// //   account1.movements[0]
// // );
// console.log(maxMov);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//1)
// const calcAverageHumanAge = function (dogsAges) {
//   return (
//     dogsAges
//       .map(age => {
//         return age <= 2 ? 2 * age : 16 + age * 4;
//       })
//       .filter(age => {
//         return age >= 18;
//       })
//       // .reduce((accu, currAge, i, array) => {
//       //   if (i === array.length - 1) {
//       //     accu += currAge;
//       //     return accu / array.length;
//       //   } else {
//       //     return accu + currAge;
//       //   }
//       // });
//       //avg can be calulated as ,suppose for 2 ,3 => (2+3)/2 =2.5 and also another way is immediately divid each number by length like 2/2 + 3/2 = 2.5;
//       //another way of writting the reduce method using the 2nd approach of calc the avg
//       .reduce((accu, age, i, arr) => accu + age / arr.length, 0)
//   );
// };

// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

/////////Find MEthod///////////////
///find method return the first matched condition ,and just return a single elemnt

// const firstWithdrawal = account1.movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

//Find method comes handy to retrieve object from array of objects based on some property of object
// const accountJessica = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accountJessica);

// ////Some Condition
// //it loop over the array and accept a predicate condition & return true or false

// console.log(account1.movements);
// const anyDeposits = account1.movements.some(mov => mov > 200);
// console.log(anyDeposits);

// //Every:condition
// //it return true if only all the array elements satisfy the given predicate condition

// console.log(account1.movements.every(mov => mov > 0)); //false
// console.log(account4.movements.every(mov => mov > 0)); //since account4 have all positive movements it will return true here

// //seperate callback function
// //untill now we saw that we're writting the callback function inside of methods itself but we can also pass them by writting it sperately

// //this comes handy where we are using the same function in different scenarios
// const allDeposits = mov => mov > 200;
// console.log(account4.movements.some(allDeposits));
// console.log(account4.movements.find(allDeposits));
// console.log(account4.movements.every(allDeposits));

//////////Flat & FlatMap methods////////////////

// const nestedArr = [12, 1, [2, 3], 5, 6, [7, 8]];
// //flat() method accept 1 argumetn which tell it the level/depth of flattening by default it work for 1 level of flattening
// console.log(nestedArr.flat());

//if we have more in-depth nesting then to flat it we can speciy the level in flat() method argument
// const deeperArr = [[1, 2, [3, 4]], 5, 6, [7, 8, [9, 10, [12, 15, [16, 7]]]]]; //this is 4 level deep nesting
// console.log(deeperArr.flat(4));

// const overallbalance = accounts
//   .map(acc => {
//     return acc.movements;
//   })
//   .flat()
//   .reduce((accu, curr) => accu + curr);

// console.log(overallbalance);

// //FlatMap
// //mostly flat() method is used with the map() method ,as we first map the input and then apply flat on it ,it accept a callback function
// //so the flatMap() method was introduce to improve performence by combining both these methods
// //NOTE: though flatMap() method only flats 1 level of nested arrays ,we can't pass the level as arugments in flatMap() method

// const overallbalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((accu, curr) => accu + curr);
// console.log(overallbalance2);

///////sort method//////////////////

//in JS sort method only sort the strings if we dont pass the callback function compareTo
//NOTE: sort method mutates(changes) the original array

//string
const strArr = ['abhishek', 'sarnag', 'vicky', 'adhish', 'vedant'];
// console.log(strArr.sort());

//number
// same thing does't work for Numbers
const num = [2, 1, 8, 9, 11, 4, 3];
// console.log(num.sort()); //does not sort the array

//to make it work we have to implement the compareTo callback function
//how compareTo works :
// if we return any negative value ( like -1 or return < 0) , where A,B are continous array elements (keep the order as A,B);
//if we return  any positive value ( like 1 or return > 0) , where A,B are continous array elemtns (switch the order as B,A)

//here a,b are the two conitous elements of an array ,sort will loop over the array and return the result of compareTo callBack function on each element
//ascending order
// console.log(
//   num.sort((a, b) => {
//     if (a > b) return 1; //switch values
//     if (a < b) return -1; //keep same
//   })
// );

//we can simplify more on the above callBack function
//as we know if we do a - b ,if a is bigger value then it will return as positive value and if a is smaller value then it will return as a negative value
//can use the same logic below
// console.log(num.sort((a, b) => a - b));

//descending order
//simply just change the paramters in the compareto condition
// console.log(
//   num.sort((a, b) => {
//     if (a > b) return -1;
//     if (a < b) return 1;
//   })
// );

// console.log(num.sort((a, b) => b - a));

///fill & from method ////////////////

///different way to create an array
// const y = new Array(1, 2, 3, 4, 5, 6, 7);
// console.log(y);

//fill method mutates the original array
// const x = new Array(7); //when we specifiy only 1 arugument in the Array constructor then it take it as length of the array
// x.fill(2); //the value to be filled in entire array
// console.log(x);

//fill method also accept 2 more parameter just like slice() method startIndex and the endIndex
// x.fill(3, 2, 5);
// console.log(x);

///from method mutates the original array
//it accept 2 parameter 1st is the object which have a length property & 2nd the callBack function just like we have in map() method(Basically its a map() only
//the callback function will fill the array based on the implementation provided
// const z = Array.from({ length: 7 }, (val, i) => i + 1);
// console.log(z); // [1, 2, 3, 4, 5, 6, 7]

//generate 100 dice rolls number
// const random = Math.trunc(Math.random() * 10) + 1;
// console.log(random);
// const diceRolls = Array.from(
//   { length: 100 },
//   () => Math.trunc(Math.random() * 6) + 1
// );
// console.log(diceRolls);

///getting html div element
//considering any event handler here

// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );

///the same thing can be done using spread operator as well to fill array with the dive elements as we did using from method
//but from method is more cleaner
//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];

//   console.log(movementsUI);
//   console.log(movementsUI2);
// });

///////Array method practise///////////////

// 1)

//using flat method
// const bankDepositSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((accu, curr) => accu + curr, 0);
// console.log(bankDepositSum);

// //using flatMap
// const bankDepositSum2 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((accu, curr) => accu + curr, 0);
// console.log(bankDepositSum2);

// ///2)
// //count the number of deposits which are atleast 1000

// //one way doint it
// const numOf100Deposits = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numOf100Deposits);

// //same thing done using the reduce method
// //reduce method accumulator is just like a global(or variable outside of current scope) variable which we use to simply perform sum ,count,etc. task
// //so below we are using it as a counter ,so 0 the initial value of accumulator here is the initial value of the counter as well
// const numOf100Deposits2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((counter, val) => (val >= 1000 ? ++counter : counter), 0);
// console.log(numOf100Deposits2);

// //3)
// //reduce method which take accumulator as object
// //one object which will give sum of deposits & withdrawal acrros accounts

// //here sum is the accumulator which is an object so on each iteration it will return an object
// const { deposit: totalDeposits, withdrawal: totalWithdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, curr) => {
//       // curr > 0 ? (sum.deposit += curr) : (sum.withdrawal += curr);
//       //can also do  above line like
//       sum[curr > 0 ? 'deposit' : 'withdrawal'] += curr;
//       return sum;
//     },
//     { deposit: 0, withdrawal: 0 }
//   );

// console.log(totalDeposits, totalWithdrawals);

// //reduce with array
// //above example with returning an array
// const [deposits, withdrawals] = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, curr) => {
//       curr > 0 ? (sum[0] += curr) : (sum[1] += curr);
//       return sum;
//     },
//     [0, 0]
//   );
// console.log(deposits, withdrawals);

// //4)
// //convert a string to titleCase
// //input this is a titlecase -> This Is a TitleCase

// const convertToTitle = function (title) {
//   const exception = [
//     'a',
//     'an',
//     'and',
//     'with',
//     'the',
//     'but',
//     'or',
//     'on',
//     'in',
//     'is',
//   ];

//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => {
//       return exception.includes(word) ? word : capitalize(word);
//     })
//     .join(' ');
//   //again captilazie the output string to make the first word first letter of sentence is capital
//   return capitalize(titleCase);
// };
// console.log(convertToTitle('this is a nice title without the passage'));
// console.log(convertToTitle('this is a LONG title with the passage'));
// console.log(convertToTitle('this is a Longer and bigger title'));
// console.log(convertToTitle('and i did it man!'));

// console.log('abhishek is a winner'.slice(1, 4));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. 
Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, 
and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and 
an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order 
(keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  {   : 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const foodInRange = dog =>
  dog.curFood > dog.recommededFood * 0.9 &&
  dog.curFood < dog.recommededFood * 1.1;

//1)
dogs.forEach(dog => {
  dog.recommededFood = Math.trunc(dog.weight ** 0.75 * 28);
  // console.log(dog.recommededFood);
});
// console.log(dogs);

const checkEatingPortion = function (dog) {
  if (foodInRange(dog)) {
    return `Dog eating portion is correct`;
  } else if (dog.curFood < dog.recommededFood) {
    return `Dog Eating portion is too little`;
  } else if (dog.curFood > dog.recommededFood) {
    return `Dog Eating portion is too high`;
  }
};

//2)
const sarahsDog = checkEatingPortion(
  dogs.find(dog => dog.owners.includes('Sarah'))
);
console.log(sarahsDog);

//3)
const ownersEatTooLittle = function (dogs) {
  return dogs
    .filter(dog => dog.curFood < dog.recommededFood)
    .flatMap(dogObj => dogObj.owners);
};
console.log(ownersEatTooLittle(dogs));

const ownersEatTooMuch = function (dogs) {
  return dogs
    .filter(dog => dog.curFood > dog.recommededFood)
    .flatMap(dogObj => dogObj.owners);
};

console.log(ownersEatTooMuch(dogs));

//4)
const eatTooMuchOwners = ownersEatTooMuch(dogs)
  .join(' and ')
  .concat(`'s dogs eat too much!`);
console.log(eatTooMuchOwners);

const eatTooLittleOwners = ownersEatTooLittle(dogs)
  .join(' and ')
  .concat(`'s dogs eat too little!`);
console.log(eatTooLittleOwners);

//5)
const dogEatingRecommendedFood = dogs.every(
  dog => dog.curFood === dog.recommededFood
);
console.log(dogEatingRecommendedFood);

//6)
const dogEatingOkayFood = dogs.some(dog => foodInRange(dog));
console.log(dogEatingOkayFood);

//7)
const okayEatingDogs = dogs.filter(dog => foodInRange(dog));
console.log(okayEatingDogs);

//8) sorted in ascending order
const sortedByRecommendedFood = dogs
  .slice()
  .sort((a, b) => a.recommededFood - b.recommededFood);
console.log(sortedByRecommendedFood);
