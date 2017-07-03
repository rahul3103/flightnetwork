import React, { Component } from 'react';
import Card from './card';

import './front.css';


class Front extends Component {


  render() 
  {
    const ui = this.props.data.map((row) => {
      return (<Card key={row['movie_title']} row={row}/>);
    });
    return (
      <section className="section-cards">
        <ul className="cards-showcase">
          {ui}
        </ul>
        <ul className="cards-showcase">
        </ul>
      </section>
    );
  }
}

export default Front;