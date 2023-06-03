//Create a function that takes the age in years and returns the age in days.

function yeartodays(age) {
  var result = age * 365;
  return result;
}
var a = 20;
console.log(yeartodays(a));

// Create a function that takes an array of numbers and returns the smallest number in the set
const array = [99, 88, 66, 44, 2, 3, 5];
var min = array[0];
for (var i = 0; i < array.length; i++) {
  if (min > array[i]) {
    min = array[i];
  }
}
console.log(min);

// Create a function that takes any non-negative number as an array and return it with its digits in descending order. Descending order is when you sort from highest to lowest.
function takeArray(number) {
  let numberString = String(number);
  let numArray = [];

  for (let i = 0; i < numberString.length; i++) {
    numArray.push(Number(numberString[i]));
  }

  for (let i = 0; i < numArray.length - 1; i++) {
    for (let j = 0; j < numArray.length - i - 1; j++) {
      if (numArray[j] < numArray[j + 1]) {
        let temp = numArray[j];
        numArray[j] = numArray[j + 1];
        numArray[j + 1] = temp;
      }
    }
  }

  return numArray;
}

let number = 34567;
console.log(takeArray(number));


//Create a function that takes an array of numbers and returns the average of this numbers.
const arr2 = [50, 4, 59, 7, 1, 34];
var sum = 0;
for (var i = 0; i < arr2.length; i++) {
  sum += arr2[i];
}
var result = sum / arr2.length;
console.log(result);
