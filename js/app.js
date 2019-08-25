$(document).ready(() => {
   $('#searchForm').on('submit', (e) => {
       e.preventDefault();
       let searchText = $('#searchText').val();
       getMovies(searchText);
   });
});

 function movieSelected(id) {
           sessionStorage.setItem('movieId', id);
           window.location = 'movie.html';
           return false;
         }

function getMovies(searchText) {
    axios.get(` http://www.omdbapi.com/?i=tt3896198&apikey=f0105ba3&s=${searchText}`)
         .then((response) => {
          console.log(response);
          let movies = response.data.Search;
          let output = '';
          $.each(movies, (index, movie) => {
            output += `
                    <div class="col-md-3">
                      <div class="card  text-center">
                        <div class="card-body">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>

                        </div>
                     </div>
                    </div>
            `;
          });

          $('#movies').html(output);
         })
         .catch((error) => {
            console.log(error);
         });  

          
}

function getMovie(){
            let movieId = sessionStorage.getItem('movieId');

              axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=f0105ba3`)
         .then((response) => {
          console.log(response);
          let movie = response.data;
          let output = `
                <div class="row">
                    <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                    </div>
                     <div class="col-md-8">
                       <h2>${movie.Title}</h2>
                       <ul class="list-group">
                         <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                         <li class="list-group-item"><strong>Realsed:</strong> ${movie.Realsed}</li>
                         <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                         <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                         <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                         <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                         <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                         
                       </ul>
                    </div>
                </div>
                <div class="row">
                  <div class="card card-body">
                    <h3>Plot:</h3>
                    ${movie.Plot}
                    <hr />
                    <div class="row">
                    <a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary mr-3">View IMDB</a>
                    <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
                    </div>
                  </div>
                </div>
                       `;
                       $('#movie').html(output);
         })
         .catch((error) => {
            console.log(error);
         });  

         }     

