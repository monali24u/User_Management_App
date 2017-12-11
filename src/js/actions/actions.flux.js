import dispatcher from "../dispatcher/dispatcher.flux"
import constants from "../constants/constants.flux"

export function createUser(firstname, lastname, address) {
  dispatcher.dispatch({
    type: constants.ADD_USER,
    firstname,
    lastname,
    address,
  });
}

export function deleteUser(user) {
  dispatcher.dispatch({
    type: constants.DELETE_USER,
    user,
  });
}

export function editUser(user) {
  dispatcher.dispatch({
    type: constants.EDIT_USER,
    user,
  });
}

export function updateUser(id, firstname, lastname, address) {
  dispatcher.dispatch({
    type: constants.UPDATE_USER,
    id,
    firstname,
    lastname,
    address,
  });
}
