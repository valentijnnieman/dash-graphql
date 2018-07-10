import React from "react";
import PropTypes from "prop-types";

export const GraphQLHoc = ComposedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: this.props.value
      };
      this.fetchQuery = this.fetchQuery.bind(this);
    }
    fetchQuery(endpoint, query) {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          query
        )
      })
        .then(r => r.json())
        .then(data => {
          console.log('dash-graphql received data:',data);
          if (this.props.setProps) {
            this.props.setProps({
              value: data.data
            });
          }
          this.setState({
            value: data.data
          });
        });
    }
    render() {
      return (
        <ComposedComponent
          {...this.props}
          value={this.state.value}
          fetchQuery={this.fetchQuery}
        />
      );
    }
  };
};

GraphQLHoc.propTypes = {
  /**
   * The id of the component in Dash
   */
  id: PropTypes.string,
  /**
   * The URL of the server's endpoint
   */
  endpoint: PropTypes.string,
  /**
   * The GraphQL query you want to sent to the endpoint
   */
  query: PropTypes.string,
  /**
   * The returned data from the GraphQL server
   */
  value: PropTypes.object,
  children: PropTypes.any,
  /**
   * Dash provided callback for updating props
   */
  setProps: PropTypes.any
};
