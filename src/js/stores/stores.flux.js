var um_dispatcher = require('../dispatcher/dispatcher.flux');
var um_constants = require('../constants/constants.flux');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var um_store = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

um_dispatcher.register(function(action){
  switch(action.actionType){
  }
  return true;
});

module.exports.um_store = um_store;
