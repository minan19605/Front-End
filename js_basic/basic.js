
const arr = [3,4,7,8]
let sum = 0
let j = 0
for(let i=0; i<arr.length, j+=arr[i]; i++) {
    console.log(`The value is ${j}`);
}


arr.forEach(element => {
    sum += element;
});

console.log(`arr_sum ${sum}`);

const theSum = arr.reduce((sum, item) => {
    sum += item;
    return sum;
}, 0)

console.log(`Reduce get the sum is ${theSum}`)

let items = [
    {name: 'Apple', price: 1},
    {name: 'Orange', price: 2},
    {name: 'Mango', price: 3}
];

let totzalPrice = 0;

items.forEach(item => {
    totzalPrice += item.price;
})

console.log(`Total Price is ${totzalPrice}`);

const totalPrice = items.reduce((sum, item) => {
    return sum += item.price;
},0);

console.log(`Total Price is ${totalPrice}`);

/* Group by category */
let items_1 = [
  { name: 'Apple', category: 'Fruit' },
  { name: 'Onion', category: 'Vegetable' },
  { name: 'Orange', category: 'Fruit' },
  { name: 'Lettuce', category: 'Vegetable' },
];

const groupedItems = items_1.reduce((accumulator, item) => {
  const category = item.category; // every iterate will create a new variable.
  if (!accumulator[category]) {
    accumulator[category] = []
  }
  accumulator[category].push(item.name);
  return accumulator
}, {})

console.log(groupedItems);

// Remove duplicate items from a array
const items_2 = [1, 2, 3, 1, 2, 3, 7, 8, 7];

let noDuplicateItems = items_2.reduce((accumulator, item, c_idx) => {
    if (!accumulator.includes(item) && c_idx > 3) {
        accumulator.push(item)
    }
    return accumulator
}, []);

noDuplicateItems = items_2.reduce((accumulator, item, c_idx) => {
    if (!accumulator.includes(item) && c_idx > 3) {
        accumulator.push(item)
    }
    return accumulator
}, []);

console.log(noDuplicateItems);

const grades = [80, 90, 75, 95];

// First, calculate the total sum of the array
// Note: one line code, don't need {} and return
const totalSum = grades.reduce((acc, current) => acc + current, 0);
console.log(totalSum)

const fruits = ['apple', 'banana', 'cherry', 'banana'];

// Create a new array that includes all items EXCEPT 'banana'
const newFruits = fruits.filter(fruit => fruit !== 'banana');

console.log(newFruits); // Output: ['apple', 'cherry']
console.log(fruits);  

const mixedValues = [10, "hello", 0, "", null, undefined, -1, true, false, {}, []];

// Use map() to create a new array of boolean values
const booleanArray = mixedValues.map(item => !!item);

console.log("Original array:", mixedValues);
console.log("Boolean array: ", booleanArray);


async function getUserTodo()
{
    const request = await fetch('https://jsonplaceholder.typicode.com/todos');
    const users = await request.json();
    
    let count =0;
    let incompletdUsers = []
    for(let user of users){
        if (count >= 6) break;

        if (user.completed === false) {
                // console.log(user)
                incompletdUsers.push(user)
                count ++
            }
    }

    return incompletdUsers
}

async function getUser(){
    const users = await getUserTodo();

    for(let user of users){
        console.log(user.title)
    }
    
}


console.log("Get uncompelted users: \n");

getUser()

async function getFirstSixPendingTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  const firstSixPending = todos.filter(todo => !todo.completed).slice(0, 6);

  // This console.log will print the items
  console.log("Inside async function, found items:");
  console.log(firstSixPending);

  // But the function still returns a Promise
  return firstSixPending; 
}

// Main function without await
function main() {
  console.log("Calling the async function...");
  const result = getFirstSixPendingTodos(); // This returns a Promise immediately!
  console.log("Result received:", result); // This logs the Promise, not the items.
  console.log("Main function is done.");
}

main();