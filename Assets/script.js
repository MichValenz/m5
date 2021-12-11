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



//Noting that async will split off like a branch and deals with more endpoints than sync can. Doing its own thing when it splits. Unlike async, sync does it straight from top to bottom no splitting
//SetTimeout and setInterval are also async because they have a time and will branch off, while the rest of the code will still run.
function getActor(actor) {

    let actorAPI = `https://imdb-api.com/en/API/SearchName/k_a65zgvjy/${actor}`;

    fetch(actorAPI).then(function (response) {

        if(response.ok) {

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
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + newActorData + "%22trailer%22&videoType=any&key=AIzaSyAsv2NlxCjo0BCfsh1_2T_IQRlnRt5oTdY";
    



  fetch(trailerAPI).then(function(response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function(videoId) {
        //console.log(videoId.items[0].id.videoId);
let newLink = videoId.items[0].id.videoId;
let trailerHref = `https://www.youtube.com/watch?v=${newLink}`;



        //const foundMovies = trailers.results;
      });
    }
  });
}









searchActor();