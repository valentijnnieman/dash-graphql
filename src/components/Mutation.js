import React from "react";
import PropTypes from "prop-types";
import { GraphQLHoc } from "../lib/GraphQLHoc";

class Mutation extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchQuery(this.props.endpoint, {query: `mutation ${this.props.mutation}`, variables: this.props.variables})
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.mutation!== this.props.mutation) {
      this.props.fetchQuery(this.props.endpoint, {query: `mutation ${this.props.mutation}`, variables: this.props.variables})
    }
  }
  render() {
    if(this.props.children) {
      if(!Array.isArray(this.props.children)) {
        this.props.children = [this.props.children]
      }
      return <div>
        {this.props.children.map(child => {
          child.props.children.props = {...child.props.children.props, value: this.props.value}
          return child
        })}
      </div>
    } else {
      // render() can't return nothing or Dash breaks
      return <div />
    }
  }
}

Mutation.propTypes = {
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
  mutation: PropTypes.string,
  /**
   * The variables for the GraphQL query
   */
  variables: PropTypes.object,
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

export default GraphQLHoc(Mutation)