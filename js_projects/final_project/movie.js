const apiKey = '47a33bd7';

async function fetchMovieTitles(text) {

    try {
        // Search by title key words, will get 10 result
        const response = await fetch(`http://www.omdbapi.com/?s=${text}&page=1&apikey=${apiKey}`)
        if( !response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const firstPage = await response.json();
        console.log(firstPage);
        if (firstPage.Response && firstPage.Response ==='False') {
                throw new Error(firstPage.Error);
        }

        const movieList = firstPage.Search; //Get a Array of objects max length is 10
        const totalResult = Number(firstPage.totalResults);
        const totalPage = Math.ceil(totalResult / 10);
        const testPages = 2; // for saving messages to OMDB

        for(let i=2; i<=testPages; i++) {
            const response = await fetch(`http://www.omdbapi.com/?s=${text}&page=${i}&apikey=${apiKey}`);
            if( !response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const nextPage = await response.json();
            console.log(nextPage);
            if (nextPage.Response && nextPage.Response ==='False') {
                throw new Error(nextPage.Error);
            }

            movieList.push(...nextPage.Search)
        }

        return movieList;

    } catch (error) {
        console.log('Error: ', error);
        return [];
    }
}

const cache = new Map();

function creatMovieHtml(movieInfo) {
    const movieContainer = document.querySelector('.movie-list');

    const movieHtml = movieInfo.map(movie => {
        cache.set(movie.imdbID, movie);
        return `
        <div class="movie" data-user-id="${movie.imdbID}">
            <figure class="img__wrapper">
                <img src="${movie.Poster}" alt="" onerror="this.onerror=null; this.src='./place_holder_202_300.png';" class="movie__img">
                <p class="movie__rating">${movie.imdbRating}</p>
                <div class="overlay">
                    <button class="play-btn"><i class="fa-regular fa-circle-play"></i></button>
                    <div class="overlay__row">
                        <div class="overlay__content">
                            <p class="movie__rating--overlay">${movie.imdbRating}</p>
                            <p class="movie__name--overlay">${movie.Title}</p>
                            <div class="movie__type--wrapper">
                                <p class="movie__PG">${movie.Rated}</p>
                                <p class="movie__type">${movie.Genre}</p>
                            </div>
                            <p class="movie__year"><span class="white__light">Year:</span> ${movie.Year}</p>
                            <p class="movie__actors"><span class="white__light">Actors:</span> ${movie.Actors}</p>
                            <p class="movie__plot">${movie.Plot}</p>
                        </div>
                    </div>
                    <button id="open_modal" class="movie__details">Details</button>
                </div>
            </figure>
            <div class="movie__info">
                <p class="movie__name">${movie.Title}</p>
                <p class="movie__year">Year: ${movie.Year}</p>
                <p class="movie__type">${movie.Rated}</p>
            </div>
        </div>`
    }).join('');

    movieContainer.innerHTML = movieHtml
    // movieContainer.innerHTML += movieHtml;
}

// Below load initial movie list from local file
// Then use movie name to fetch each movie from OMDB
// Then create HTML page as inital content.

async function getMovieTitle() {
    const movieFileURL = 'ini_movies.txt';

    try {
        const fileResponse = await fetch(movieFileURL);
        if (!fileResponse.ok) {
            throw new Error(`Failed to load initial file: ${fileResponse.statusText}`);
        }

        const fileContent = await fileResponse.text();
        const movieTitles = fileContent.split('\n')
                            .map(title => title.trim())
                            .filter(title => title.length > 0);
        return movieTitles;
    } catch (error) {
        console.log (`Failed to load initial data. Details: ${error.message}`);
        return [];
    }
}

// Use movies Title list to fetch all movies details
// Both below two functions are working. The second one has higher perfermence.
// async function fetchMovieData(movieTitles) {
//     const allMovieData = [];
//     for(let i=0; i < movieTitles.length; i++ ) {
//         try {
//                 const processedTitle = movieTitles[i].replace(/ /g, "+");
//                 const response = await fetch(`http://www.omdbapi.com/?t=${processedTitle}&apikey=${apiKey}`);
//                 if( !response.ok) {
//                     throw new Error(`HTTP Error! Status: ${response.status}`);
//                 }

//                 const movieInfo = await response.json();
//                 console.log(movieInfo);
//                 if (movieInfo.Response && movieInfo.Response ==='False') {
//                     throw new Error(movieInfo.Error);
//                 }

//                 allMovieData.push(movieInfo);

//         } catch (error) {
//             console.log('Error: ', error);
//         }
//     }

//     return allMovieData;
// }

// Use movie's Title to fetch one movie details
const byId = `http://www.omdbapi.com/?i=tt0120338`;
async function fetchMovieData(movieTitles) {

    const MovieDataPromises = movieTitles.map(async (title) => {
    try {
        const processedTitle = title.replace(/ /g, "+");
        const url = `http://www.omdbapi.com/?t=${processedTitle}&apikey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP Error! Status: ${response.status} for title: ${title}`);
            return null;
        }
        const data = await response.json();
        if (data.Response && data.Response === 'False') {
            console.warn(`Could not find a movie for title: ${title}. Error: ${data.Error}`);
            return null; // Return null for movies that weren't found
        }
        return data;

        } catch (error) {
            console.log(`Error for ${title}: `, error);
            return null;
        }
    });

    try {
        const fetchData = await Promise.all(MovieDataPromises);
        const allMovieData = fetchData.filter(movie => movie !== null);
        return allMovieData;

    } catch (error) {
        console.error('An error occurred during load movie data: ', error);
        return [];
    }
}

// Use Movie's IMDB ID list to fetch each Movie's details
async function fetchMovieDataByID(movieIDs) {

    const MovieDataPromises = movieIDs.map(async (ID) => {
    try {
        const url = `http://www.omdbapi.com/?i=${ID}&apikey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP Error! Status: ${response.status} for ID: ${title}`);
            return null;
        }
        const data = await response.json();
        if (data.Response && data.Response === 'False') {
            console.warn(`Could not find a movie for ID: ${title}. Error: ${data.Error}`);
            return null; // Return null for movies that weren't found
        }
        return data;

        } catch (error) {
            console.log(`Error for ${title}: `, error);
            return null;
        }
    });

    try {
        const fetchData = await Promise.all(MovieDataPromises);
        const allMovieData = fetchData.filter(movie => movie !== null);
        return allMovieData;

    } catch (error) {
        console.error('An error occurred during load movie data: ', error);
        return [];
    }
}

// Get initial move data from local JSON file.
// Don't need fetch from OMDB. There has limitation of max to 1000 message/day
async function getMovieDataFromLocalJson() {
    const movieFileURL = 'movie.json';

    try {
        const fileResponse = await fetch(movieFileURL);
        if (!fileResponse.ok) {
            throw new Error(`Failed to load initial json file: ${fileResponse.statusText}`);
        }

        const fileContent = await fileResponse.text();
        const moiveData = JSON.parse(fileContent);
        return moiveData;
    } catch (error) {
        console.log (`Failed to load initial json data. Details: ${error.message}`);
        return [];
    }
}

// Create initial page
document.addEventListener('DOMContentLoaded', async () => {
    const errInfo = document.getElementById('error-message-container');

    // const movieTitles = await getMovieTitle();
    // if (movieTitles.length === 0) {
    //     errInfo.textContent = 'Load local initial file failed.'
    //     return;
    // }

    // const allMovieData = await fetchMovieData(movieTitles);
    // if (allMovieData.length === 0) {
    //     errInfo.textContent = 'Fetch movies data failed.'
    //     return;
    // }

    const spin = document.querySelector('.spin-loading')
    spin.classList.add('spin--visible')

    const allMovieData = await getMovieDataFromLocalJson();

    // console.log(allMovieData);
    creatMovieHtml(allMovieData);
    spin.classList.remove('spin--visible')

    // Select the home link or button
    const homeLink = document.querySelector('.home-nav');

    // Add a click event listener
    homeLink.addEventListener('click', (event) => {
        // Prevent the default link behavior
        event.preventDefault();
        
        // Reload the current page
        window.location.reload();
    });
});

function createModalHtml(movie) {
    return `
    <button class="close-btn"  >
        <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="modal">
        <div class="modal-combo">
            <img src="${movie.Poster}" onerror="this.onerror=null; this.src='./place_holder_202_300.png';" alt="" class="modal-img">
            <div class="modal-info">
                <p class="modal__title">${movie.Title}</p>
                <div class="modal_type_rating">
                    <p class="movie__PG">${movie.Rated}</p>
                    <p class="movie__type">${movie.Genre}</p>
                    <p class="movie__type movie__rating--modal">${movie.imdbRating}</p>
                </div>
                <p class="modal-info__para">Released: ${movie.Released}</p>
                <p class="modal-info__para">Runtime: ${movie.Runtime}</p>
                <p class="modal-info__para">Director: ${movie.Director}</p>
                <p class="modal-info__para">Actors: ${movie.Actors}</p>
                <div class="modal_btns">
                    <button class="modal_btn modal-play"><i class="fa-regular fa-circle-play"></i><span class="modal-btn-name"> Play</span></button>
                    <button class="modal_btn modal-save"><i class="fa-regular fa-bookmark"></i><span class="modal-btn-name"> Save</span></button>
                </div>
            </div>
        </div>
        <p class="modal__plot">${movie.Plot}</p>
    </div>
    `;
}

// Modal process
document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.querySelector('.movie-list');
    const header = document.querySelector('.header')
    const mainPart = document.querySelector('.main')
    const modalContainer = document.getElementById('modal-container');
    
    // Function to hide the modal
    function closeModal() {
        modalContainer.classList.remove('modal-visible');
        header.classList.remove('blur-background');
        mainPart.classList.remove('blur-background');
    }

    movieList.addEventListener('click', (event) => {
        const detailsButton = event.target.closest('.movie__details');

        if (detailsButton) {
            const theMovie = event.target.closest('.movie'); 
            const userId = theMovie.dataset.userId
            // console.log(userId);
            const movieData = cache.get(userId);
            console.log(movieData)

            
            modalContainer.classList.add('modal-visible');
            header.classList.add('blur-background');
            mainPart.classList.add('blur-background')

            if (movieData) {
                const modalHtml = createModalHtml(movieData);
                modalContainer.innerHTML = modalHtml;
                // console.log(modalContainer.innerHTML)
            }

            const closeButton = document.querySelector('.close-btn');
            closeButton.addEventListener('click', closeModal);
        }
    });
});

// Get the search bar input
// Search all matched movie titles
// Then fetch each movie's details
// Create HTML by results.
document.addEventListener('DOMContentLoaded',() => {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-icon');

    const header = document.querySelector('.header')
    const mainPart = document.querySelector('.main')

    const slider = document.getElementById('myRange');
    const output = document.getElementById('sliderValue');

    // Initialize a variable to hold the slider's value
    let selectedYear = slider.value;

    // Update the displayed value and the variable when the slider moves
    slider.addEventListener('input', () => {
        output.textContent = slider.value;
        selectedYear = slider.value;
    });

    searchIcon.addEventListener('click', async () => {

        // blur backgound
        header.classList.add('blur-background');
        mainPart.classList.add('blur-background')

        // Display spin for loading
        const spin = document.querySelector('.spin-loading')
        spin.classList.add('spin--visible')

        let searchContent = searchInput.value;
        if (searchContent){
            searchContent = searchContent.split(" ").join('+');

            const errInfo = document.getElementById('error-message-container');
           
            const movieList = await fetchMovieTitles(searchContent);
            if (movieList.length === 0) {
                errInfo.textContent = 'Search movie titles failed.'
                return;
            }
            const allMovieIDs = movieList
                .filter(movie => {
                    return movie.Poster !== "N/A" && parseInt(movie.Year) >= selectedYear;
                })
                .map(movie => movie.imdbID);

            console.log(allMovieIDs)

            const allMovieData = await fetchMovieDataByID(allMovieIDs);
            if (allMovieData.length === 0) {
                errInfo.textContent = 'Fetch movies data failed.'
                return;
            }

            creatMovieHtml(allMovieData);
            errInfo.textContent = ''
            header.classList.remove('blur-background');
            mainPart.classList.remove('blur-background');
            spin.classList.remove('spin--visible')
        }
    });
});