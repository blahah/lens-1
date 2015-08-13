'use strict';

// i18n
require('./i18n/load');

var Substance = require('substance');
var OO = Substance.OO;
var Component = Substance.Component;
var $$ = Component.$$;

var Backend = require("./backend");
var NotificationService = require("./notification_service");
var CrossrefSearch = require('../lib/article/bib/crossref_search');
var ScienceWriter = require("../src/science_writer");

function App() {
  Component.Root.apply(this, arguments);

  this.backend = new Backend();
  this.notifications = new NotificationService();

  this.childContext = {
    backend: this.backend,
    notifications: this.notifications,
    bibSearchEngines: [new CrossrefSearch()],
  };
}

App.Prototype = function() {

  this.render = function() {
    return $$('div').addClass('app').append(
      $$(ScienceWriter).key('writer')
    );
  };

  this.didMount = function() {
    var self = this;
    this.backend.getDocument('sample', function(err, doc) {
      self.refs.writer.setProps({doc: doc});
    });
  };

};

OO.inherit(App, Component.Root);

$(function() {
  new App().mount($('#container'));
});
