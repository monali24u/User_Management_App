import React from "react";
import Name from "./name.react";
import * as UserActions from "../actions/actions.flux"
import UserStore from "../stores/stores.flux"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import Input from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

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

  componentWillMount(){
    UserStore.on("change", () => {
    this.setState({
      users : UserStore.getAll(),
    })

    var updateuser = UserStore.getUpdateUser();
    this.state.s_fname = updateuser.userfirstname;
    this.state.s_lname = updateuser.userlastname;
    this.state.s_address = updateuser.useraddress;
  })
  }


  //Gets change from text boxes
  onChange(e) {
        this.setState({[e.target.name]: e.target.value})
  }
  createUser(){
      if(this.state.s_updatebuttonstate == false){
         UserActions.createUser(this.state.s_fname, this.state.s_lname, this.state.s_address);
       }
       else {
        var updateuser = UserStore.getUpdateUser();
         UserActions.updateUser(updateuser.id, this.state.s_fname, this.state.s_lname, this.state.s_address);
         this.state.s_updatebuttonstate = false;
       }
       this.state.s_fname = "";
       this.state.s_lname = "";
       this.state.s_address = "";
  };

  deleteUser(user){
    UserActions.deleteUser(user);
  };
  editUser(user){
        this.state.s_updatebuttonstate = true;
        UserActions.editUser(user);
  };

//<li>{firstname} : {user.userfirstname} {lastname} : {user.userlastname}  {address} : {user.useraddress} <button id={user.id} onClick={(e) => this.deleteUser(e)}>Delete</button></li>
  render(){
    const firstname  = "First Name";
    const lastname   = "Last Name";
    const address    = "Address";
    var addupdate    = "Add";

     if(this.state.s_updatebuttonstate == true)
     {
           addupdate    = "Update";
     }

    var userComponents = this.state.users.map(function(user) {
        return(
          <TableRow className="user" key={user.id}>
            <TableCell>{user.userfirstname}</TableCell>
            <TableCell>{user.userlastname}</TableCell>
            <TableCell>{user.useraddress}</TableCell>
            <TableCell><Button raised color="primary" onClick={this.editUser.bind(this, user)}>Edit</Button></TableCell>
            <TableCell><Button raised color="accent" onClick={this.deleteUser.bind(this, user)}>Delete</Button></TableCell>
          </TableRow>
          )
    }.bind(this));

    return(
    <div>
    <Grid container spacing={24}>
        <Grid style={{background:'#90CAF9'}} item xs={12}>
          <h1 style={{textAlign: 'center', color:'#E040FB'}}>{this.state.s_appname}</h1>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3}>
            <form style={{padding: 20 + 'px'}}>
              <Name p_name = {firstname}/>
              <Input style={{width: 300 + 'px'}}  maxLength="10" placeholder="Your Name.." name="s_fname" value={this.state.s_fname} onChange={this.onChange} />
              <Name p_name = {lastname}/>
              <Input style={{maxLength: 10, width: 300 + 'px'}} placeholder="Your Last Name.." name="s_lname" value={this.state.s_lname} onChange={this.onChange} />
              <Name p_name = {address}/>
              <Input style={{width: 300 + 'px'}} placeholder="Your Address.." name="s_address" value={this.state.s_address} onChange={this.onChange} />
              <div style={{height: 30 + 'px'}}/>
              <Button raised color="primary" onClick={this.createUser.bind(this)}>{addupdate}</Button>
            </form>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
        <Table>
          <TableHead>
            <TableRow style={{fontSize: 15 + 'px', color:"black"}}>
              <TableCell>{firstname}</TableCell>
              <TableCell>{lastname}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {userComponents}
          </TableBody>
        </Table>
        </Grid>
      </Grid>
    </div>
    )
  };
}
