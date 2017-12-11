import { EventEmitter } from "events";

import dispatcher from "../dispatcher/dispatcher.flux"
import constants from "../constants/constants.flux"

class UserStore extends EventEmitter {
  constructor(){
    super();
    this.users = [
    // {
    //   id: 1,
    //   userfirstname: "",
    //   userlastname: "",
    //   useraddress: ""
    // },
    // {
    //   id: 2,
    //   userfirstname: "",
    //   userlastname: "",
    //   useraddress: ""
    // },
    ];
    this.updateuser = [
    {
      id: 3,
      userfirstname: "",
      userlastname: "",
      useraddress: ""
    }
    ];
  }

  createUser(userfirstname, userlastname, useraddress){
    const id = Date.now();
    this.users.push({
      id,
      userfirstname,
      userlastname,
      useraddress,
    });

    this.emit("change");
  }

  deleteUser(user){
    const newUsers = this.users;
    if(newUsers.indexOf(user) > -1){
      newUsers.splice(newUsers.indexOf(user), 1);
      this.users = newUsers;
    }

    this.updateuser.id = 3;
    this.updateuser.userfirstname = "";
    this.updateuser.userlastname = "";
    this.updateuser.useraddress = "";

    this.emit("change");
  }

  editUser(user){
    if(this.users.indexOf(user) > -1){
      this.updateuser = user;
    }
    this.emit("change");
  }

  updateUser(id, userfirstname, userlastname, useraddress){
    for(var i = 0; i < this.users.length; i++) {
        if(this.users[i].id == id) {
            this.users[i].userfirstname = userfirstname;
            this.users[i].userlastname = userlastname;
            this.users[i].useraddress = useraddress;
            break;
        }
    }

    this.emit("change");
  }

  getAll()
  {
    return this.users;
  }
  getUpdateUser()
  {
    return this.updateuser;
  }

  handleActions(action){
    switch(action.type){
        case constants.ADD_USER:{
         this.createUser(action.firstname,action.lastname,action.address);
         break;
       }
       case constants.DELETE_USER:{
        this.deleteUser(action.user);
        break;
      }
      case constants.EDIT_USER:{
       this.editUser(action.user);
       break;
     }
     case constants.UPDATE_USER:{
      this.updateUser(action.id, action.firstname,action.lastname,action.address);
      break;
    }
    }
  }
}

const userStore = new UserStore;
//window.userStore = userStore;
dispatcher.register(userStore.handleActions.bind(userStore));
//window.dispatcher = dispatcher;
export default userStore;
