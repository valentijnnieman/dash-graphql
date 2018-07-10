import React from 'react';
import Query from '../components/Query';

export default class App extends React.Component {
    render() {
        return (
          <Query endpoint='https://fakerql.com/graphql' query={{query: '{allUsers{id}}'}}/>
        )
    }
};

App.propTypes = {};
