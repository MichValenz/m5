const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('textarea-input')

const actorModal = document.getElementById('actor-modal-warning')

function searchActor() {

    searchForm.addEventListener('submit', function (event) {

        event.preventDefault();

        let actor = searchInput.value;

        console.log();
        //isNaN is basically, is Not a Number. Checking if actor is not a number, otherwise will be invalid and will not take.
        if (isNaN(actor)) {

            getActor(actor);

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

    let actorAPI = `https://imdb-api.com/en/API/SearchName/k_a65zgvjy/${actor}`;

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
                        const removeIrrelevantWords = ['(I)', '(II)', '(III)', '(IV)', '(V)', '(VI)', '(Actor,', '(Actress,'];

                        //Filtering out words we don't need, checks if the stingifyActorData has the words we don't want. When it finds we don't want it will remove them
                        stringifyActorData = stringifyActorData.filter(checkedData => removeIrrelevantWords.includes(checkedData) === false);

                        //This is the variable we want to pass to the Youtube API for it to search
                        newActorData = stringifyActorData.toString();

                        console.log(newActorData);
                    };
                });
            });
        };
    });
};


