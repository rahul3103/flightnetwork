import React, { Component } from 'react';
import { schema, Type } from 'lovefield';
import ListItem from './listitem'
import './list.css';


class List extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      movies: [],
      currentPage: 1,
      moviesPerPage: 10,
      toggle: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
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
        db.select().from(movies).exec().then(function(rows){ 
            self.setState ({movies: rows})
      })})
  }

  sortBy(e) {
    if (this.state.toggle) {
    this.setState({movies: this.state.movies.sort(function(a, b) {
    return a[e] === b[e] ? 0 : +(a[e] < b[e]) || -1;
    })})
    this.setState({toggle: false, currentPage: 1})
    }
    else {
      this.setState({movies: this.state.movies.sort(function(a, b) {
    return a[e] === b[e] ? 0 : +(a[e] > b[e]) || -1;
    })})
    this.setState({toggle: true, currentPage: 1})
    }
  }

  next(e) {
    e.preventDefault();
    if (this.state.currentPage < (this.state.movies.length / 10)) {
        this.setState({
        currentPage: (this.state.currentPage + 1)
      });
    }
  }

  previous(e) {
    e.preventDefault();
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: (this.state.currentPage - 1)
      });
    }
  }



  render() {

    const { movies, currentPage, moviesPerPage } = this.state;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const renderMovies = currentMovies.map((movie, index) => {
      return <ListItem key={index} movie={movie}/>;
    });

    let ui = null;
    ui = (
      <table className="container">
          <thead>
            <tr>
              <th><h1><a className="sort" onClick={()=>this.sortBy('movie_title')}>Movie Title</a></h1></th>
              <th><h1><a className="sort" onClick={()=>this.sortBy('director_name')}>Director Name</a></h1></th>
              <th><h1><a className="sort" onClick={()=>this.sortBy('language')}>Language</a></h1></th>
              <th><h1><a className="sort" onClick={()=>this.sortBy('country')}>Country</a></h1></th>
              <th><h1><a className="sort" onClick={()=>this.sortBy('content_rating')}>Content Rating</a></h1></th>
              <th><h1><a className="sort" onClick={()=>this.sortBy('budget')}>Budget($)</a></h1></th>
              <th><h1><a className="sort" onClick={()=>this.sortBy('title_year')}>Title Year</a></h1></th>
            </tr>
          </thead>
          <tbody>
          {renderMovies}
          </tbody>
        </table>
    );
    return (
<div>
      
  {ui}
  <div className="container">
    <a className="move-left move" href="#" onClick={(e) => this.previous(e)}>Previous</a>
    <a className="move-right move" href="#" onClick={(e) => this.next(e)}>Next</a>
  </div>
</div>
    );
  }
}

export default List;