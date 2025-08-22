
async function getUserPost() {
    
    const urlParam = new URLSearchParams(window.location.search);
    const userId = urlParam.get('userId');

    console.log(userId)

    const inputBox = document.getElementById('userIdInput');
    inputBox.value = userId

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();

    console.log(posts)

    const postList = document.querySelector('.post__list')

    if(posts.length === 0) {
        postList.innerHTML = 'No posts foound for this user.';
        return;
    }

    const postsHtml = posts.map(post => {
        return `
        <div class="post">
            <p class="post__title">${post.title}</p>
            <p class="post__content">${post.body}</p>
        </div>`
    }).join('');

    postList.innerHTML += postsHtml;
}

getUserPost();

document.addEventListener('DOMContentLoaded',() => {
    const inputBox = document.getElementById('userIdInput');
    inputBox.addEventListener('change', getInputValue);

});

function getInputValue(event) {
    
    const userId = event.target.value;
    console.log(`Get UserId ${userId}`)

    fetchPostData(userId);
}

async function fetchPostData(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    creatPostHtml(posts)
}



function creatPostHtml(posts) {

    const postList = document.querySelector('.post__list')
    console.log(posts[0])

    if(posts.length === 0) {
        postList.innerHTML = 'No posts foound for this user.';
        return;
    }

    const postsHtml = posts.map(post => {
        return `
        <div class="post">
            <p class="post__title">${post.title}</p>
            <p class="post__content">${post.body}</p>
        </div>`
    }).join('');

    postList.innerHTML = ''

    postList.innerHTML += postsHtml;
}
