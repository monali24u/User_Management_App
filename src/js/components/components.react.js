import React from "react";
import Name from "./name.react";
import * as UserActions from "../actions/actions.flux"
import UserStore from "../stores/stores.flux"

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
      s_appname : "User Management Application",
      s_fname : "",
      s_lname : "",
      s_address : "",
      users : UserStore.getAll(),
      s_updatebuttonstate : false,
    };

    this.onChange = this.onChange.bind(this)
  }

  render(){
    const firstname  = "First Name";
    const lastname   = "Last Name";
    const address    = "Address";
    var addupdate    = "Add";
    const space = "   ";

     if(this.state.s_updatebuttonstate == true)
     {
           addupdate    = "Update";
     }

    var userComponents = this.state.users.map(function(user) {
        return(<div className="user" key={user.id}>
          <li>{firstname} : {user.userfirstname}{space}
              {lastname} : {user.userlastname}{space}
              {address} : {user.useraddress}{space}
              <button onClick={this.editUser.bind(this, user)}>Edit</button>
              <button onClick={this.deleteUser.bind(this, user)}>Delete</button>
          </li>
        </div>)
    }.bind(this));

    return(
    <div>
        <h1>{this.state.s_appname}</h1>
        <Name p_name = {firstname}/>
        <input name="s_fname" value={this.state.s_fname} onChange={this.onChange} />
        <Name p_name = {lastname}/>
        <input name="s_lname" value={this.state.s_lname} onChange={this.onChange} />
        <Name p_name = {address}/>
        <input name="s_address" value={this.state.s_address} onChange={this.onChange} />
        <button onClick={this.createUser.bind(this)}>{addupdate}</button>
        <ul>{userComponents}</ul>
    </div>
    )
  };
}
