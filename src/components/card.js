import React, { Component } from 'react';
import axios from 'axios';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posterIMG: ''
    };
    this.poster = this.poster.bind(this);
    // this.getrequest = this.getrequest.bind(this); 
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
    this.poster(this.props.row.movie_imdb_link)
  }

  render()
   {
    return (
      <li>
        <figure className="card-photo">
          <a target="_blank" href={"movie/" + this.props.row.movie_title}><img src={this.state.posterIMG}/></a>
        </figure>
      </li>
    );
  }
}

export default Card;