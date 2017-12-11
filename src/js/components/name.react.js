import React from "react";

export default class Name extends React.Component {
  constructor(){
    super();
    this.state ={name : ""};
  }

  render(){
    return(
      <div>
        <h4>{this.props.p_name}</h4>
      </div>
    )
  };
}
