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

function getActor(actor) {
    let actorAPI = "https://imdb-api.com/en/API/SearchName/k_dp6255mb/" + actor;

    let divOutputContainer = document.getElementById('testing-output');

    fetch(actorAPI).then(function(response) {

        if(response.ok) {

            response.json().then(function (data) {
                
                for (var i = 0; i < 10; i++) {

                    let textContainer = document.createElement('p')
                    textContainer.innerHTML = data.results[i].description

                    console.log(data.results[i].description)

                    divOutputContainer.appendChild(textContainer)
                }

                console.log(data)
            })
        }
    })
}

searchActor();

