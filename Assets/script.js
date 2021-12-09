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

    fetch(actorAPI).then(function (response) {

        if (response.ok) {

            response.json().then(function (data) {

                for (var i = 0; i < 5; i++) {

                    let test = data.results[i].description;

                   let testSecond = Object.values(test);
                    //toString makes commas for EVERY letter which is not what I want
                    //Join lets you pick how you space it or don't even space it at all
                  let testThird = testSecond.join("");

                    console.log(testThird)
                }

                console.log(data)
            })
        }
    })
}

searchActor();

