import React from "react";

export default class Name extends React.Component {
  constructor(){
    super();
    this.state ={name : ""};
  }

// handleChange(e){
//   console.log("called");
//   const s_fname = e.target.value;
//   this.props.changeFirstName(s_fname);
// }
// handleChange(e)
// {
//   console.log("called");
//   this.props.handleDataChange(e);
// }
        //<input onChange={this.handleChange.bind(this)}/>
  render(){
      // setTimeout(() => {
      //   this.setState({firstname : "FirstName"})
      // }, 4000)
    return(
      <div>
        <h3>{this.props.p_name}</h3>
      </div>
    )
  };
}
