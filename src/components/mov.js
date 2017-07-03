// users/' + this.props.match.params.id
import React, { Component } from 'react';
import { schema, Type } from 'lovefield';
import axios from 'axios'

import './mov.css';

class Movie extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      movie: '',
      posterIMG: '',
      overview: ''
    };
    this.poster = this.poster.bind(this);
  }

  poster(imdb) {
    const self = this;
    const id = imdb.split('/')[4]
    const url = 'https://api.themoviedb.org/3/movie/'+ id +'?&api_key=cfe422613b250f702980a3bbf9e90716'
    axios.get(url)
    .then(function (response) {
      self.setState({posterIMG : 'https://image.tmdb.org/t/p/w500' + response.data.poster_path, overview: response.data.overview});
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
    let genres = ''
    let keywrds = ''
    let budget = ''

    const movie = this.state.movie
    const sectionStyle = {
      backgroundImage: `url(${this.state.posterIMG})`
    };
    if (movie.genres){
      genres = movie.genres.replace(/\|/gi, ', ')
    }
    if (movie.plot_keywords){
      keywrds = movie.plot_keywords.replace(/\|/gi, ', ')
    }

    if (movie.budget) {
      budget = Math.abs(Number(movie.budget)) / 1.0e+6 + "M"
    }
    return (
      
<div className="moviecard">
  <div className="movie-poster" style={ sectionStyle }></div>
  <div id="movie-content">
    <div className="movie-ratings"><span className="title">Country : </span><span className="score-out-of">{movie.country}</span></div>
    <div className="movie-title"><a href={movie.movie_imdb_link} target="_blank">{movie.movie_title}</a><span className="movie-year">{movie.title_year}</span></div>
    <div className="movie-details"><span className="movie-rating">{movie.content_rating}</span><span className="movie-duration">{movie.language}</span><span className="movie-genre">{ genres }</span></div>
    <div className="movie-castcrew"><span className="title">Director</span><span className="name">{movie.director_name}</span></div>
    <div className="movie-castcrew"><span className="title">Cast</span><span className="name">{movie.actor_1_name}, {movie.actor_2_name}</span></div>
    <div className="movie-castcrew"><span className="title">Budget</span><span className="name">$ {budget}</span></div>
    <div className="movie-synopsis">{this.state.overview}</div>
    <div className="movie-key"><span className="movie-genre">{ keywrds }</span></div>
  </div>
</div>
    );
  }
}

export default Movie;