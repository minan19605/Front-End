console.log('test this is a world')

function addValues(x, y) {
    return x+y
}

console.log(addValues(5,8))

function fetchData(status) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 1)
            {
            const data = {msg: "load data successful"};
            resolve(data);}
            else 
            {
                reject(new Error("load failure lol"))
            }
        }, 600);
    });
}

fetchData(1)
    .then(result => {
        console.log("Promise success: ", result.msg)
    })
    .catch (error => {
        console.error("Promise reject: ", error.message)
    });

console.log("Requesting data.....");

function login(usrname, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (usrname === 'user' && password === 'pass') {
                resolve({token: 'abc123xyz', userId: 123});
            } 
            else {
                reject(new Error("Wrong user name or password"));
            }
        }, 500);
    });
}

function getUserProfile(userId, token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token === 'abc123xyz') {
                resolve({id: userId, name: "John Leon", email: 'john@gmail.com'});
            }
            else{
                reject(new Error("Invalid token"))
            }
        }, 700);
    });
}

login('user', 'pass')
    .then(loginData => {
        console.log("login success, get: ", loginData.token);
        return getUserProfile(loginData.userId, loginData.token);
    })
    .then(profile => {
        console.log("Get user profile: ", profile.name);
        return "All done!"
    })
    .then(finalMessage => {
        console.log(finalMessage);
    })
    .catch(error => {
        console.error("Occured errors: ", error.message);
    })

console.log("Start to excute asynch steps...")

setTimeout((()=>{console.log('****Seperate for then method and asynch method****');}),3000);

// asynch, await sample code

function fetchUser(userId) {
    console.log(`Fetching user ${userId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId == 1) {
                resolve({id: 1, name: 'Alice', email: 'alice@gmail.com'});
            }
            else if ( userId == 2) {
                resolve({id: 2, name: 'Bob', email: 'bob@gmail.com'});
            }
            else {
                reject(new Error(`User with Id ${userId} not found`));
            }
        }, 1000);
    });
}

function fetcPostsByUserId(userId) {
    console.log(`Fetching posts for user ${userId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                resolve ([
                    { id: 101, title: 'My First Post', userId: 1},
                    { id: 102, title: `Another Post`, userId: 1}
                ]);
            } else if (userId === 2) {
                resolve([
                    {id: 201, title: `Bob's Adventures`, userId: 2},
                    {id: 202, title: 'Alice like sweetie', userId: 2},
                ]);
            }
            else {
                reject(new Error(`No posts found for user ID ${userId}`));
            }
        },1000);
    });
}

function displayUserData(user, posts) {
    console.log(`\n-- Display Data for ${user.name} ---`);
    console.log(`User ID: ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Posts:`);
    if (posts && posts.length > 0) {
        posts.forEach(post => { console.log(` - ${post.title}`);});
    }
    else {
        console.log(` No posts found.`)
    }
    console.log(`---------------------------------`)
}

async function getUserAndPosts(userId) {
    try {
        const user = await fetchUser(userId);
        console.log(`Successfully fetched user: ${user.name}`);

        const posts = await fetcPostsByUserId(user.id);
        console.log(` Successfully fetched posts for ${user.name}`);

        displayUserData(user, posts)
    }catch (error) {
        console.error(`\nError in getUserAndPosts for user Id ${userId}: ${error.message}`);
    }
}

// --- Run the async functions ---
console.log('\n Async Starting data fetch operations... \n');

getUserAndPosts(1);

setTimeout(() => { getUserAndPosts(2)}, 2500);

setTimeout(() => { getUserAndPosts(99);}, 5000);

// Fetch user from a website
async function fetchAllUsersAsync(params) {
    console.log("Fetching all users with async/await...");
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        users.forEach(user => {
            console.log(`- ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
        });
    } catch (error) {
        console.error("Failed to fetch users: ", error);
    }
}

fetch('https://jsonplaceholder.typicode.com/users/1').then(
    response => response.json()
    .then(
        data => {
            console.log(data.email)
        }
    )
);

async function fetchOneUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    console.log(`*****Email: ${data.email}`);
}

fetchOneUser();

async function whatHappens() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const dataPromise = response.json(); // Notice: NO await here

    console.log("This is a Promise, not the data:", dataPromise);

    const data = await dataPromise; // You still have to await it eventually
    console.log("This is the actual data:", data);
}

whatHappens();