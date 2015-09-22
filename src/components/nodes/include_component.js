'use strict';

var $$ = React.createElement;
var UnsupportedNode = require('./unsupported_node');

var IncludeComponent = React.createClass({

  displayName: "IncludeComponent",

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    componentRegistry: React.PropTypes.object.isRequired
  },

  render: function() {
    var doc = this.props.doc;
    var node = doc.get(this.props.node.nodeId);
    var componentRegistry = this.context.componentRegistry;

    var ComponentClass = componentRegistry.get(node.type);

    if (!ComponentClass) {
      console.error('Could not resolve a component for type: ' + node.type);
      ComponentClass = UnsupportedNode;
    }

    return $$(ComponentClass, {
      key: node.id,
      doc: doc,
      node: node
    });
  }
});

module.exports = IncludeComponent;
