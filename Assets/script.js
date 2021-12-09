let searchForm = document.getElementById('search-form')
let searchInput = document.getElementById('textarea-input')

function searchActor() {

    searchForm.addEventListener('submit', function (event) {

        event.preventDefault();

        let actor = searchInput.value

        console.log(actor)

        if (actor) {

            getActor(actor);
        }

    });
}

searchActor();

async function getActor(actor) {

    let actorAPI = `https://imdb-api.com/en/API/SearchName/k_a65zgvjy/${actor}`;

    const response = await fetch(actorAPI)

    const data = await response.json();

    const results = data.results;

    //console.log(results);
    results.forEach(result => {
        if (result.description.includes('Actor') || result.description.includes('Actress')) {

            let actorData = result.description

            //Will seperate every single character into a seperate string
            getActorDataValues = Object.values(actorData)

            /* console.log(getActorDataValues) */

            //Will join all the values so its one giant string, but then splitting every word
            let stringifyActorData = getActorDataValues.join("").split(" ")

            const removeIrrelevantWords = ['(I)', '(II)', '(III)', '(Actor,', '(Actress,']
            
            stringifyActorData = stringifyActorData.filter(checkedData => removeIrrelevantWords.includes(checkedData) === false)

            newActorData = stringifyActorData.toString();

            console.log(newActorData)
        } else {
            console.log('Not an Actor')
        }
    });
}


