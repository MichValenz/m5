const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('textarea-input')

const actorModal = document.getElementById('actor-modal-warning')
const actorInfo = []
const videoContainer = document.getElementById('display-videos')

function searchActor() {

    searchForm.addEventListener('submit', function (event) {

        event.preventDefault();

        let actor = searchInput.value;

        console.log();
        //isNaN is basically, is Not a Number. Checking if actor is not a number, otherwise will be invalid and will not take.
        if (isNaN(actor)) {
            saveSearch(actor);
            
            getActor(actor);
            
            moveFormUpWhenSearching();
            

        } else if (actor === "") {

            triggerActorModal();

            console.log('is blank')

        } else {

            triggerActorModal();

            console.log('is a number')

        };
    });
}

function triggerActorModal() {

    actorModal.classList.add('is-active');

};

function closeOpenModal() {

    const closeModal = document.querySelector('.modal-close');

    closeModal.addEventListener('click', function () {

        actorModal.classList.remove('is-active');
    });

};

closeOpenModal();

searchActor();

//Noting that async will split off like a branch and deals with more endpoints than sync can. Doing its own thing when it splits. Unlike async, sync does it straight from top to bottom no splitting
//SetTimeout and setInterval are also async because they have a time and will branch off, while the rest of the code will still run.
function getActor(actor) {

    let actorAPI = `https://imdb-api.com/en/API/SearchName/k_dp6255mb/${actor}`;

    fetch(actorAPI).then(function (response) {

        if (response.ok) {

            response.json().then(function (data) {

                const results = data.results;

                //console.log(results);
                results.forEach(result => {

                    //Checks each result array and the conditios HAS to include Actor OR Actress
                    if (result.description.includes('Actor') || result.description.includes('Actress')) {

                        let actorData = result.description

                        //Create an array, from an object. So then we can use other syntax like join, split, filter etc. Will also seperate every single character into a seperate string
                        getActorDataValues = Object.values(actorData);

                        /* console.log(getActorDataValues) */

                        //Will join all the values so its one giant string, but then splitting every word in an array
                        let stringifyActorData = getActorDataValues.join("").split(" ");

                        //An array of words I want to remove from the data we're getting
                        const removeIrrelevantWords = ['(I)', '(II)', '(III)', '(Actor,', '(Actress,'];

                        //Filtering out words we don't need, checks if the stingifyActorData has the words we don't want. When it finds we don't want it will remove them
                        stringifyActorData = stringifyActorData.filter(checkedData => removeIrrelevantWords.includes(checkedData) === false);

                        //This is the variable we want to pass to the Youtube API for it to search
                        let newActorData = stringifyActorData.toString();

                        console.log(newActorData);

                        getTrailer(newActorData);
                    };
                });
            });
        };
    });
};


function getTrailer(newActorData) {
    let trailerAPI =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=" + newActorData + "%22trailer%22&videoType=any&key=AIzaSyBEfQvusH0ElmjEUI5_PuAV9DYkv54Pzgw";

    fetch(trailerAPI).then(function (response) {
        if (response.ok) {

            response.json().then(function (videoId) {
                //console.log(videoId.items[0].id.videoId);
                let newLink = videoId.items[0].id.videoId;
                let trailerHref = `https://www.youtube.com/embed/${newLink}`;
                //const foundMovies = trailers.results;

                displayResults(trailerHref);
            });
        }
    });
}

function displayResults(trailerHref) {
    
    let videoEl = document.createElement('iframe');

    videoEl.setAttribute('src', trailerHref);
    videoEl.setAttribute('width', '320');
    videoEl.setAttribute('height', '240');

    videoContainer.appendChild(videoEl);
}

function moveFormUpWhenSearching() {

    searchForm.classList.add('move-up-when-searching');

    videoContainer.classList.add('move-up-when-searching');
}

//commits textContent to localStorage and global array
function saveSearch(name){
    this.name = String;
    localStorage.setItem("searches",JSON.stringify(name));
    actorInfo.push(name);
    //console.log(actorInfo[0]);
}
