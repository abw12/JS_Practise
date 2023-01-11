'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, clazz = 'country') {
  const { eng, hin } = data.languages;
  const html = `<article class=${clazz}>
      <img class="country__img" src=${data.flags.png} />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.continents[0]}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>Primary: ${eng}</p>
        <p class="country__row"><span>💰</span>${data.currencies}</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(
    'beforeend',
    `Something went wrong ...${msg}. Try Agian`
  );
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const loadcountries = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
//   //send method will fetch the data from the server and emit an load event
//   request.send();
//   console.log(request.responseText); //here it will not work hence the repsonse is not yet completed /fetched hence it will print empty

//   request.addEventListener('load', function () {
//     //sonce the response we receive from api calls nowadays is not XML but in json format
//     const [data] = JSON.parse(this.responseText); //return an array in response so destructring it to single variable
//     console.log(data);
//     const { eng, hin } = data.languages;
//     //   console.log(lang);
// //     const html = `<article class="country">
// //     <img class="country__img" src=${data.flags.png} />
// //     <div class="country__data">
// //       <h3 class="country__name">${data.name.common}</h3>
// //       <h4 class="country__region">${data.continents[0]}</h4>
// //       <p class="country__row"><span>👫</span>${(
// //         +data.population / 1000000
// //       ).toFixed(1)} people</p>
// //       <p class="country__row"><span>🗣️</span>Primary: ${eng}</p>
// //       <p class="country__row"><span>💰</span>${data.currencies}</p>
// //     </div>
// //   </article>`;
// //     countriesContainer.insertAdjacentHTML('beforeend', html);
// //     countriesContainer.style.opacity = 1;
//   });
// };

// loadcountries('portugal');
// loadcountries('india');
// loadcountries('brazil');

////////////promises////////////

//promises are the ES 6 feature
//it is kind of container which will hold the future value

///old way
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
//   //send method will fetch the data from the server and emit an load event
//   request.send();

//using promises
////the fecth api will return a promise which we can consume
//a promise can have two type of states fullfilled or rejected once the promise is settled
//promises can be consumed using the then method

// const getCountry = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (res) {
//       // then is used to consume the promises and it takes  callbakc function as paramter and also return an promise
//       return res.json(); //returning only the body from the response object returned from promise of fetch method
//     })
//     .then(function (data) {  //channing the promises here
//       renderCountry(data[0]);
//     });
// };

//better way  to write the promises using the arrow functions
// const getCountry = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json()) ///whatever we return here will become the fullfilled value of the promise which we can use it in next method chained if needed
//     .then(data => renderCountry(data[0]));
// };

// getCountry('india');

//////////////chainning of promises
//chainning of promises allowa us to avoid the callback hell/pyramid of doom situation
//all function used inside of methods are callback functions

// const getCountry = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json()) ///whatever we return here will become the fullfilled value of the promise which we can use it in next method chained if needed
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbours = data[0].borders?.[0]; //using here optional cahinning (?) to make sure if border array is not present on o/p then it won't throw an error
//       if (!neighbours) return; //if no neighbour is present simply just return
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbours}`);
//       // if we apply then on this fetch method here that will again create a callback hell situation which is callback inside of callback
//       //function,hence we just return the promise returned from the fetch fucntion and handle it outside on this callback function
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       renderError(err.message); //so it will cath the error in case any of the proimses is failed in the cahin above
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1; //since we have to load the container and display something to user succe or failure hence finally is best place to define this rendring style
//     });
// };

// //like above simply we can create more promises and chain them which is more precise and easy to understand and hanlde instead of nested callbacks and event handlers

// btn.addEventListener('click', function () {
//   getCountry('india');
//   getCountry('aaaaa');
//   //if we give here a wrong data and try to fecth it the above catch block will not catch the exact error since 404 NOT Found request
//   //are also considered as the fulfilled promise
//   //to hanlde such error we can immediatley trhow them in .then() method itself where it has occured using a custom error msg
// });

////////////error handling using the catch method on the chain
///above to globaly handle the error on the promise chain we can use catch method at the end of the chain ,which will cath nay error occured in the chain
//this way is better than specifying a second callback function in .then() method ,as we have to do it in all methods seperately

const getJson = function (url, errMsg = 'Something went wrong!') {
  //we wrote this function since below in both fetch methods we are using the same code so to make the code look better and follow
  //the dry principle we just moved the code to this function and made it more generic

  //this return is for the function
  return fetch(url).then(res => {
    //each response have the ok property which is true if the request is successful else it will be false in case of 400 ,404 ,etc errors
    if (!res.ok) throw new Error(`${errMsg} ${res.status}`); //the custom error which we are throwing after immediatley getting a error in promise

    return res.json(); //returning the promise
  });
};

// const getCountry = function (country) {
//   const request = getJson(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country Not Found'
//   ) ///whatever we return here will become the fullfilled value of the promise which we can use it in next method chained if needed
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbours = data[0].borders?.[0]; //using here optional cahinning (?) to make sure if border array is not present on o/p then it won't throw an error
//       //   const neighbours = '11222'; // it will fail since no such country code exist
//       if (!neighbours) return; //if no neighbour is present simply just return
//       return getJson(
//         `https://restcountries.com/v3.1/alpha/${neighbours}`,
//         'Country Not Found'
//       );
//       // if we apply then on this fetch method here that will again create a callback hell situation which is callback inside of callback
//       //function,hence we just return the promise returned from the fetch fucntion and handle it outside on this callback function
//     })
//     //   .then(res => res.json()) // we can remove this as we have defined a getJson() function which hanlde this scenario as well
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       renderError(err.message); //so it will cath the error in case any of the proimses is failed in the cahin above
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1; //since we have to load the container and display something to user succe or failure hence finally is best place to define this rendring style
//     });
// };

// //like above simply we can create more promises and chain them which is more precise and easy to understand and hanlde instead of nested callbacks and event handlers

// btn.addEventListener('click', function () {
//   getCountry('india');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereami = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`API Failed with Error: ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`you are in ${data?.city}, ${data?.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       console.log(res);
//       if (!res.ok)
//         throw new Error(`Country not found ${res.status} , ${res.msg}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbours = data[0].borders?.[0];
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbours}`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(
//           `Falied to fetch neighbour country..${res.status} ,${res.msg}`
//         );
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       renderError(err.msg);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereami('52.508', '13.381');

///////////////////event Loop in practise/////////////////

//any top level code the code which is outsid
// console.log('Test Starts!'); //gloabl context so directly run on the JS engine call stack - 1
// setTimeout(() => console.log(`some test run within 0 Sec`), 0); //this is added into the callback queue - 6
// Promise.resolve(`Resolved Promise 1`).then(res => console.log(res)); //this is pormise so it get added into microtask queue -3
// Promise.resolve(`Resolved promis 2`).then(res => {
//   for (let i = 0; i < 1000000000; i++) {} //this callback should takes some time hence added a large looping logic -4
//   console.log(res);
// });
// console.log('Test Ends'); ////global context so directly run on the JS engine call stack -2

// the Numbering above in comment show the print position of each log
//we can see here that even though the setTimeOut() callbakc is completed within the 0 sec still it is printed at the end
//so it prooved that the microtask queue which have the resolved promises callback have the higher priority over the regular callbakc queue

///////////////////////Creating a Promise ///////////////

//the Promise constructor accept an executor function which have 2 parameter resolve  & reject and those are a callback functions
//here we are not consuming the promise(using .then() method) instead we are building a promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   //this timeout function is adding the asynchronous behaviour to this Promise since this promise will be settled after 2 sec timeout
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You Win 💰');
//     } else {
//       reject(new Error('You lost your money!😢'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err); //rejected promises wiht error are caught by the catch block
//   });

///////////promisifying the setTimeout ////////////////

// const wait = function (sec) {
//   //only passing the resolve callback function as we dont need the reject as we know timeout function will be completed after given period
//   return new Promise(resolve => {
//     setTimeout(resolve, sec * 1000);
//   });
// };

//wait() will return a new Promise which is resolved one so we can use the .then() function on it
//this we are avoiding the usage of calbback within a callback and avoiding the the callback hell by promisifying the entire sequence
// wait(2)
//   .then(() => {
//     console.log('2 sec passed');
//     return wait(1); //returning a promise to use consume it in the chain
//   })
//   .then(() => {
//     console.log('3 sec passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 sec passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('5 sec passed');
//   });

//////////////////////////////////////////////

//this function is asynchronous and it a callbakc based api where 1st paramter is success callback and 2nd is failure callback
//NOTE: it is not returing a promise by default
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

///so promisify the above function we can do following thing

// const getPosition = function () {
//   //   return new Promise(function (resolve, reject) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       position => resolve(position),
//   //       err => reject(err)
//   //     );
//   // });
//   //the above Promise can also be build simply like below
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject); //this is similar to what we define above as we have to simply just pass the resolve & reject callback and it will do the same thing as above
//   });
// };

// getPosition().then(res => console.log(res));

//////now using this getPosition api we can enhance our wherami function build before as follows:

// const whereami = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`API Failed with Error: ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`you are in ${data?.city}, ${data?.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       console.log(res);
//       if (!res.ok)
//         throw new Error(`Country not found ${res.status} , ${res.msg}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbours = data[0].borders?.[0];
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbours}`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(
//           `Falied to fetch neighbour country..${res.status} ,${res.msg}`
//         );
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       renderError(err.msg);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', whereami);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) 
and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, 
and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the 
    createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. 
Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (sec) {
//   return new Promise(resolve => {
//     setTimeout(resolve, sec * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

//build promise
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath; //if this failed it will trigger error event else it will trigger load event

//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', () => {
//       reject(new Error('Error loading the image!'));
//     });
//   });
// };
//consume promise
// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     console.log(`Image 1 is loaded`);
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('Image 2 is loaded');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => {
//     console.error(err);
//   });

// /////////////////////Async Await ////////////////

// //Async await was added in 2017 release its just a syntactic sugar over the use of normal pormise and then method usage behind the scene it does same thing
// //Async await make the code look like a normal synchronous code where we can assign the promise value to a variable

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// ///re-creating the whereami() function
// //the async keyword tells JS engien that this function should be executed in aysnchronous way
// //the aysnc function will always return a promise
// const whereami = async function (country) {
//   try {
//     //! the geocode APi is not working since it is not a free api , just commentting out here and changing this function
//     //to use the country by pasisng it manually as a parameter

//     //get current position
//     //we can use one or more await method inside a async function
//     // const pos = await getPosition(); //whenever we want to consume a promise then we use the await method (like earlier we used the .then() method)
//     // const { latitude: lat, longitude: lng } = pos.coords;

//     //reverse geocoding by using the latitude and longitude
//     // const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     // if (!resGeo.ok)
//     //   throw new Error(`Problem with Reverse GeoCode API call ${resGeo.status}`);

//     // const dataGeo = await resGeo.json();

//     //get current country call
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     if (!res.ok)
//       throw new Error(`Problem with find country API call ${res.status}`);
//     const data = await res.json(); //since ,json willl return a promise we use await here to consume the promise
//     console.log(data);
//     renderCountry(data[0]);

//     //get the neighbouring country
//     const neighbours = data[0].borders?.[0];
//     const neighbourCoutnry = await fetch(
//       `https://restcountries.com/v3.1/alpha/${neighbours}`
//     );
//     const neighbourData = await neighbourCoutnry.json();
//     console.log(neighbourData[0]);
//     renderCountry(neighbourData[0], 'neighbour');

//     return `I am in ${data[0]?.capital}`; //the aysnc function will return a promise whose fulfilled value will be this string
//   } catch (err) {
//     console.error(`${err.message}`);
//     renderError(err.message);

//     //re-throw the Reject promise in the aysnc function above
//     throw err;
//   }
// };

// // console.log(`1 : getting current location`);
// //whereami() function will return a  promise either fullfilled(string which is return ed above) or a rejected
// //below code is handled using traditional .then() method of consuming a promise
// // whereami('India')
// //   .then(res => console.log(`2: ${res}`))
// //   .catch(err => console.error(`2 : ${err.message}`))
// //   .finally(() => {
// //     console.log(`3: Finished`);
// //   });

// //the above code can be written in aysnc way as follows:
// //as we can't use only await without the asycn function we have to use a IIFE (immediately invoked function expression here)
// (async function () {
//   try {
//     console.log(`1 : getting current location`);
//     const result = await whereami('brazil');
//     console.log(`2: ${result}`);
//   } catch (err) {
//     console.error(`2 : ${err.message}`);
//   } finally {
//     console.log(`3: Finished`);
//   }
// })();

//////////parallelly executing the promises //////////////

// const get3Country = async function (c1, c2, c3) {
//   try {
//     //the Promise.all() static method helps us to run multiple promise at the same time and combine the result as one promise
//     //the all() method is known as the promise combinator method
//     //the promises executed inside the all method are run irrespective of each other at the same time which saves alot of time
//     //NOTE: if any of the promise is rejected then the overall resultent promise of all() method is rejected.
//     //the all() method accept an array of multiple promises
//     return Promise.all([
//       //each getJson() method call is returing a promise which results is in turn return by the all() method as a single promise
//       await getJson(`https://restcountries.com/v3.1/name/${c1}`),
//       await getJson(`https://restcountries.com/v3.1/name/${c2}`),
//       await getJson(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//   } catch (err) {
//     console.error(`${err.message}`);
//   }
// };

//since i'm returing the promise above function get3country() here we can again use IIFE to consume the promise using async await
// (async function () {
//   try {
//     const [c1, c2, c3] = await get3Country('portugal', 'japan', 'australia'); //when we consume it here again then we get 3 response from the promise all method
//     console.log(
//       `capitals are ${c1[0]?.capital}, ${c2[0]?.capital}, ${c3[0]?.capital}`
//     );
//   } catch (err) {
//     console.error(`${err.message}`);
//   }
// })();

///////////////////the other few promise combinator methods are as follows////////////

//Promise.race()
//this method also accpect an array of promises and return only a single promise which gets settled(like reolved or rejected) first among all promises
//so bsically the fastes resolve or rejected promise from the input array is return in race method

// (async function () {
//   try {
//     //here whichevent promise get settled first will be return as a value(which is an array) of returned promise
//     const res = await Promise.race([
//       getJson(`https://restcountries.com/v3.1/name/india`),
//       getJson(`https://restcountries.com/v3.1/name/spain`),
//       getJson(`https://restcountries.com/v3.1/name/germany`),
//     ]);
//     console.log(res[0]);
//   } catch (err) {
//     console.error(`something went wrong ${err.message}`);
//   }
// })();

///real use case of using race()
//we can use the race() method in situation where promise is taking very long time to settled and we want a timeout functionality
//so that it can be settled somehow(like we can reject the promise if it take tool long) and the page won't get stuck for long time

//since we don;t need resolve callback function in this scenario we can simply put a paramater
// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(
//       () => {
//         reject(new Error(`request took too long!`));
//       },
//       sec * 0.1,
//       1
//     );
//   });
// };

// //here we are consumin gthe promise using the then() method
// Promise.race([getJson(`https://restcountries.com/v3.1/name/india`), timeout(1)])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

///Promise.allSettled() is newl added method in 2021
//this method wokrs similer to the Promise.all() method
//only difference is that it will return all the settled promises which also includes the rejected promises
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error!'),
//   Promise.resolve('another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// //we do same thing with all method you can see difference that after getting the first rejected promises the all method just return it and stop
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// //Promise,any() is newly added method in 2021
// //it return first fullfilled promise and simply ignore the rejected promise unless only all promises are being rejected
// //in case all promises are rejected it will throw error-> AggregateError: All promises were rejected
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (sec) {
  return new Promise(resolve => {
    setTimeout(resolve, sec * 1000);
  });
};

const imgContainer = document.querySelector('.images');

// build promise
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath; //if this failed it will trigger error event else it will trigger load event

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Error loading the image!'));
    });
  });
};

// Part 1
// re-writing the promise consume logic from coding chanllenge 2 using async/await
const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(`image 1 is loaded`);
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    console.log(`image 2 is loaded`);
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-3.jpg');
    console.log(`image 3 is loaded`);
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(`Error occurered..${err.message}`);
  }
};
// loadNPause();

//Part 2

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async imgPath => await createImage(imgPath)); //will return an array of promises
    const imgEl = await Promise.all(imgs); //this combinator method will return the fullfilled promise and throw an error on rejected promise
    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err.message);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

////////////////////////practise //////////////////

///callback in async programming
//here createPost takes 2 sec time to create adn add new post to the array of posts
//but the getPosts takes only 1 sec to retrieve the post and display on UI
// const posts = [
//   { id: 1, title: 'football', blog: 'greatest player of football' },
//   { id: 2, title: 'cricket', blog: 'greatest player of cricket' },
// ];

// function getPosts(id) {
//   let output = '';
//   setTimeout(() => {
//     posts.forEach(post => {
//       output += `<li>${post.title}</li>`;
//       document.body.innerHTML = output;
//     });
//   }, 1000);
// }

// function createPost(post) {
//   setTimeout(() => {
//     posts.push(post);
//   }, 2000);
// }

//this new post will not show up on UI since by the time createPost will add the new post to the array the getPost() method
// have already displayed the list in UI
//in such scenarios callbacks and use of aysnc programming come into picture
// createPost({ title: 'tennis', blog: 'greatest player of tennis' });
// getPosts();

///to to avoid such situations we have to pass getPosts()method as a callback function in createPosts() method as the 2nd argument
//where we can call that callbakc method manually just right after the new posts is added into array,and not wait till the 2sec is over of the timeout function

// function createPost(post, callback) {
//   setTimeout(() => {
//     posts.push(post);
//     callback();
//   }, 2000);
// }

// createPost(
//   { id: 3, title: 'baseball', blog: 'greatest player of baseball' },
//   getPosts
// );
// // getPosts(); //this will show the list without newly added posts since it will show list within 1 sec and by that time the new post is still not added into the array

///////////////////////////////////////////////////////////////////////////////////
// //some other example of callbacks
// function loadScript(src, callback) {
//   // creates a <script> tag and append it to the page
//   // this causes the script with given src to start loading and run when complete
//   let script = document.createElement('script');
//   script.src = src;
//   script.onload = () => callback();

//   document.head.append(script);
// }

// const calculateCallback = function () {
//   console.log(calc());
// };

// loadScript('temp.js', calculateCallback);

//////some real example of loading an thrid -party script and using the callback function to immediately call that callback function once the scrupt is loaded and executed
////so the onload method gets triggered
// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;
//   script.onload = () => callback(script);
//   document.head.append(script);
// }

// loadScript(
//   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
//   script => {
//     alert(`Cool, the script ${script.src} is loaded`);
//     alert(_); // _ is a function declared in the loaded script
//   }
// );
//That’s called a “callback-based” style of asynchronous programming. A function that does something asynchronously should provide a callback argument where we put the function to run after it’s complete.

//Here we did it in loadScript, but of course it’s a general approach.
