import React, {Component} from 'react';


class ListItem extends Component {
  

  render() {
    const movie = this.props.movie;

    return (
      <tr>
        <td>
          <a href={"movie/"+movie.movie_title}>{movie.movie_title}</a>
        </td>
        <td>
          {movie.director_name}
        </td>
        <td>
          {movie.language}
        </td>
        <td>{movie.country}</td>
        <td>
          {movie.content_rating}
        </td>
        <td>
          {movie.budget}
        </td>
        <td>
          {movie.title_year}
        </td>
      </tr>
    );
  }
}

export default ListItem;