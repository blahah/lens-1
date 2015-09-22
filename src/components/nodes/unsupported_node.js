'use strict';

var $$ = React.createElement;

var UnsupportedNodeComponent = React.createClass({
  displayName: "UnsupportedNodeComponent",

  render: function() {
    var rawJson = JSON.stringify(this.props.node.properties, null, 2);
    return $$("pre",
      { className: "content-node unsupported", "data-id": this.props.node.id, contentEditable: false },
      rawJson
    );
  }
});

module.exports = UnsupportedNodeComponent;
