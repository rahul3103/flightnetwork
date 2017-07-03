// users/' + this.props.match.params.id
import React, { Component } from 'react';
import { schema, Type } from 'lovefield';
import axios from 'axios'

import './movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      movie: '',
      posterIMG: ''
    };
    this.poster = this.poster.bind(this);
  }

  poster(imdb) {
    const self = this;
    const id = imdb.split('/')[4]
    const url = 'https://api.themoviedb.org/3/movie/'+ id +'?&api_key=cfe422613b250f702980a3bbf9e90716'
    axios.get(url)
    .then(function (response) {
      self.setState({posterIMG : 'https://image.tmdb.org/t/p/w500' + response.data.poster_path});
    })
    .catch(function (error) {
      self.setState({posterIMG : 'http://www.beauty-beyond.ca/_assets/img/page/800x1000placeholder.jpg'});
      console.log(error);
    });
  }

  componentWillMount() {
    const self = this;
    const schemaBuilder = schema.create('flight', 1);
    schemaBuilder.createTable('Movies')
      .addColumn('movie_title', Type.STRING)
      .addColumn('director_name', Type.STRING)
      .addColumn('actor_1_name', Type.STRING)
      .addColumn('actor_2_name', Type.STRING)
      .addColumn('genres', Type.STRING)
      .addColumn('language', Type.STRING)
      .addColumn('country', Type.STRING)
      .addColumn('content_rating', Type.STRING)
      .addColumn('budget', Type.NUMBER)
      .addColumn('title_year', Type.NUMBER)
      .addColumn('plot_keywords', Type.STRING)
      .addColumn('movie_imdb_link', Type.STRING)
      .addPrimaryKey(['movie_title'])
    schemaBuilder.connect().then(db => {
        const movies = db.getSchema().table('Movies');
        db.select().from(movies).where(movies.movie_title.eq(this.props.match.params.movie)).exec().then(function(rows){ 
            self.poster(rows[0].movie_imdb_link)
            self.setState ({movie: rows[0]})
      })})
  }


  render() {
    const movie = this.state.movie
    return (
      <div className="col-xs-12 cardcont nopadding">

          <div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
            <h1>{movie.movie_title}</h1>

            <span className="tagline">{movie.director_name}</span>
            <p>{movie.actor_1_name}</p>
            <div className="additional-details">
              <span className="genre-list">{movie.genres}</span>
              <span className="production-list">{movie.actor_2_name}</span>
              <div className="row nopadding release-details">
                <div className="col-xs-6"> Original Release: <span className="meta-data">{movie.title_year}</span></div>
                <div className="col-xs-6"> Running Time: <span className="meta-data">{movie.language} mins</span> </div>
                <div className="col-xs-6"> Box Office: <span className="meta-data">{movie.budget}</span></div>
                <div className="col-xs-6"> Vote Average: <span className="meta-data">{movie.plot_keywords}</span></div>
              </div>
            </div>
          </div>
          <div className="poster-container nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7 ">
            <img id="postertest" className='poster' src={this.state.posterIMG}/>
          </div>
        </div>
    );
  }
}

export default Movie;