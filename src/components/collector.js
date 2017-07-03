import React, { Component } from 'react';
import axios from 'axios';
import { schema, Type } from 'lovefield';
import Front from './front'

class Collector extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      searchedMovie: [],
      ten: [],
      email: ''
    };
    this.insertdb = this.insertdb.bind(this);
    this.selectten = this.selectten.bind(this);

    
  }


  createdb() {
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
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

    return schemaBuilder
  }

  insertdb(db, values) {
    const item = db.getSchema().table('Movies');
    const rows = values.map(value => item.createRow(value));
    db.insertOrReplace().into(item).values(rows).exec();
}
  selectten(db) {
    const item = db.getSchema().table('Movies');
    db.select().from(item).limit(10).exec().then(rows => this.setState ({ten: this.state.ten.concat(rows)}))
  }


  componentWillMount() {
    const self = this;
    const API_URL = 'http://starlord.hackerearth.com/movieslisting'
    axios.get(API_URL)
    .then(function (response) {
      let data = response.data.map(row => {
        row.movie_title = row.movie_title.trim().toLowerCase();
        return row;
      });
      const schema = self.createdb()
      schema.connect().then(db => {
        self.insertdb(db, data)
        self.selectten(db)
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  

  render() {
    return (
      <div>
      <Front data={this.state.ten}/>
      </div>
    );
  }
}

export default Collector;