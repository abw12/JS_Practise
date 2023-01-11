'use strict';

//this is the way of writing a callback function where we have to pass the function name which need to be call in the parameter list 
//while invoking the first function 
// function game(player1,callback){
//     console.log(player1);
//     const match = `1st match is between player1 ${player1}`;
//     callback();
//     return match;
// }

// function callme(){
//     console.log("this is callme fucntion which is a callback");
// }

// console.log(game("abhishek",callme));

// //function declaration

// function calc(one,two){
//     console.log(one,two);
// }

// calc("love","like");

// //function expression
// const calc2 = function (num1,num2){
//     return num1 + num2;
// }

// console.log(calc2(2,3));

// //process of hoisting is possible in fucntion declaration only which means we can call a function before defining/initializing it

// calcHoisting("fast","speed")

// function calcHoisting(one,two){
//     console.log(one,two);
// }

// //same thing if we try with function expression it will fail
// // console.log(calc3(20,8)); //it will give error => Cannot access 'calc3' before initialization


// // const calc3 = function (num1,num2){
// //     return num1 - num2;
// // }

// //Arrow function
// const calcAge = brithYear => 2037 - brithYear; //simple one line function with one parameter ,we don't thave to use return keyword

// const myAge = calcAge(1997);

// console.log(myAge);

// //arrow function are easy to write but you shouldn't use it always as one drawback of arrow function is we can't use the this keywrod inside the arrow function

// const calcAge2 = (birthyear,gradYear) =>{
//     const atAge =  gradYear - birthyear;
//     return atAge;
// }

// console.log(calcAge2(1997,2019));

//function assignment 

// let dolphinScore = [85,54,41];
// let koalasScore = [23,34,27];

// const calcAverage = (scores) =>{
//     let avg = (scores[0] + scores[1] +scores[2])/3;     
//     return avg;
// }

// const dolphinsAvg = calcAverage(dolphinScore);
// const koalasAvg = calcAverage(koalasScore);

// checkWinner(dolphinsAvg,koalasAvg); //call before initializing the function since its a function declaration

// function checkWinner(avg1,avg2) {
//     if(avg1 >= avg2 * 2){
//         console.log(`dolphins win there avg score is: ${avg1}`);
//     }else if(avg2 >= avg1*2){
//         console.log(`koalas win there avg score is: ${avg2}`);
//     }else{
//         console.log("Match Tied");
//     }
// }


//array methods in JS
// const years = new Array(1991,1997,1990);

// years.push(2000); //push method will add element at the end of the array
// console.log(years);
// years.unshift(1989) //add elemnt at the begining of the array
// years.pop() //remove the last element of the array and return the element
// console.log(years);
// years.shift(); //remove the first elemnt from array and return the element back
// console.log(years);
// console.log(years.indexOf(1997));
// console.log(years.includes('1991')); //it check with strict equality and does not perform type coersion hence this will return false
// console.log(years.includes(1991));

//the way we can use function expression inside the object since expression produces an output.we can't use function declaration inside the object 
//we can use also 'this' keyword which refers to current object instance which have invoked the fucntion
//this.age will create a new property in the object  
// const abhi = {
//     firstName : "abhishek",
//     lastName : "wasave",
//     birthYear : 1997,
//     job : "s/w developer",
//     hobby : ["sports","gym"],
//     hasDriverLicense: false,
//     // calcAge : function(birthYear){          
//     //     return 2030 - birthYear;
//     // }
//     // calcAge : function(){
//     //     return 2030 - this.birthYear;      
//     // }
//     calcAge : function(){
//         this.age = 2030 - this.birthYear;
//         return this.age;
//     },
//     getSummary: function(){
//         return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and his hobbies are ${this['hobby']} ,do he have adriver license ? ${this.hasDriverLicense ? 'yes' : 'no'}!`;
//     }
// }

// console.log(abhi.firstName) // using Dot notation we try to directly access the obj property so here we r trying to get value of key firstname if there is no such key then it will return undefined 
// console.log(abhi['firstname']) //the bracket notation evalute the expression so we are not here directly accessing the key(property) of the obj 

//major diff in Dot & bracket notation is shown below
// const interestedIn = prompt("What are you interested in knowing about abhi? is it his firstName,lastName,age,job or hobby?");
// console.log(abhi.interestedIn); //this will give you undefined since there is no property called interestedIn in obj abhi
// console.log(abhi[interestedIn]); //if user enter job when prompted here the interestedIn will become job and since job property is present in abhi obj will get its value

//adding some property operation
// abhi.location="India";
// abhi['twitter'] = "abhi@twitter.com";
// abhi.friends=["sarang","vedant","vicky"];

// console.log(abhi.calcAge(1997));  //this is how we can call the function above mentioned with parameter
// console.log(abhi['calcAge'](1997)) //this is how we can call function using bracket notation with parameter

// console.log(abhi.calcAge()); //we can access the fucntion similar to all other property of the obj
// console.log(abhi['calcAge']());
// console.log(abhi.age);  //since we are stroing the calculated age form the function expression in the age property now we dont have to calculate age again and agian
// console.log(abhi.age);
// console.log(abhi.age);
// console.log(abhi);
// console.log(`${abhi.firstName} have ${abhi.friends.length} friends, and his best friend is called ${abhi.friends[0]}`);
// console.log(abhi.getSummary());

//objects assignment
const mark = {
    fullName :  "Mark Miller",
    weight : 90,
    height : 1.69,
    calcBmi :function(){
        this.BMI = this.weight/this.height**2;
        return this.BMI;
    }
}

const john = {
    fullName :  "John Smith",
    weight : 92,
    height : 1.32,
    calcBmi : function(){
        this.BMI = this.weight/this.height**2;
        return this.BMI;
    }
}

console.log(`Johns's BMI (${john.calcBmi()}) is ${john.calcBmi() > mark.calcBmi() ? "higher" : "lower"} than Mark's (${mark.BMI})!`)




