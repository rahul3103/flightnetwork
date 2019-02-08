import React, { Component } from 'react';
import { schema } from 'lovefield';

import './search.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      searchedMovie: []
    };
  }

  movieSearch(term) {
    const schemaBuilder = schema.create('flight', 1);
    schemaBuilder.connect().then(db => {
      const movies = db.getSchema().table('Movies');
      db.select()
        .from(movies)
        .where(movies.movie_title.match(term.toLowerCase()))
        .limit(5)
        .exec()
        .then(rows => this.setState({ searchedMovie: rows }));
    });
  }

  onInputChange(e) {
    e.preventDefault();
    if (e.target.value) {
      this.movieSearch(e.target.value);
    } else this.setState({ searchedMovie: [] });
  }

  render() {
    let ui = null;
    ui = this.state.searchedMovie.map(movie => {
      return (
        <li className="result" key={movie.movie_title}>
          {' '}
          <a target="_blank" href={'movie/' + movie.movie_title}>
            {movie.movie_title}
          </a>
        </li>
      );
    });
    return (
      <form>
        <input
          onChange={event => this.onInputChange(event)}
          type="search"
          placeholder="Search by Movie Name"
        />
        <ul>{ui}</ul>
      </form>
    );
  }
}

export default SearchBar;
