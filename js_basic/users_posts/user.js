// console.log('test');


async function getUserData() {
    const request = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersData = await request.json();

    return usersData;
}

async function createUserHtml() {

    const userList = document.querySelector('.user__list');

    const usersData = await getUserData();

    const userHtml = usersData.map(user => {
        return `
        <div class="user" data-user-id="${user.id}">
            <h3 class="username">${user.name}</h3>
            <p class="email">${user.email}</p>
            <p class="phone">${user.phone}</p>
        </div>`
    }).join('');

    userList.innerHTML += userHtml;
}

createUserHtml();

function userClick() {
    const userList = document.querySelector('.user__list');
    userList.addEventListener('click', (event) => {

        const clickedUser = event.target.closest('.user')
        const userId = clickedUser.dataset.userId;

        const postHtml = `post.html?userId=${userId}`;
        window.open(postHtml, '_blank');
    });
}

userClick()
