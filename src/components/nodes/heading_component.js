'use strict';

var TextProperty = require('substance-ui/text_property');
var $$ = React.createElement;

var HeadingComponent = React.createClass({
  displayName: "HeadingComponent",

  render: function() {
    var level = this.props.node.level;
    return $$("div", { className: "content-node heading level-"+level, "data-id": this.props.node.id },
      $$(TextProperty, {
        ref: "textProp",
        doc: this.props.doc,
        path: [ this.props.node.id, "content"]
      })
    );
  }
});

module.exports = HeadingComponent;
