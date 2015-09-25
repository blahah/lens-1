'use strict';
var React = require('react');
// Science Writer
// ---------------
//
// Configures a simple writer for the substance journal, using the generic SubstanceWriter implementation

var $$ = React.createElement;

// Core Writer from Substance UI
// ---------------
//

var SubstanceWriter = require("substance-ui/writer");

// Article
// ---------------
//
// This can be replaced with your custom article implementation

var tools = require('./tools');
var components = require('./components');
var stateHandlers = require('./state_handlers');


// Specify a Notification service
// ---------------
//

// Top Level Application
// ---------------
//
// Adjust for your own needs

var ScienceWriter = React.createClass({

  displayName: "ScienceWriter",

  contextTypes: {
    backend: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      doc: null
    };
  },

  componentDidMount: function() {
    var backend = this.context.backend;
    backend.getDocument(this.props.documentId || "example_document", function(err, doc) {
      // After here we won't allow non-transactional changes
      doc.FORCE_TRANSACTIONS = true;
      this.setState({
        doc: doc
      });
    }.bind(this));
  },

  componentWillReceiveProps: function() {
    var backend = this.context.backend;
    this.setState({
      doc: null
    });
    backend.getDocument(this.props.documentId || "example_document", function(err, doc) {
      this.setState({
        doc: doc
      });
    }.bind(this));
  },

  render: function() {
    if (this.state.doc) {
      return $$(SubstanceWriter, {
        config: {
          components: components,
          tools: tools,
          stateHandlers: stateHandlers,
        },
        doc: this.state.doc,
        id: "writer",
        contentContainer: 'main'
      });
    } else {
      return $$('div', null, '');
    }
  },
});

module.exports = ScienceWriter;
