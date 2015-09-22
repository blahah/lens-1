'use strict';

var TextProperty = require('substance-ui/text_property');
var $$ = React.createElement;

var FigureComponent = React.createClass({

  displayName: "FigureComponent",

  contextTypes: {
    componentRegistry: React.PropTypes.object.isRequired
  },

  render: function() {
    var componentRegistry = this.context.componentRegistry;
    var contentNode = this.props.node.getContentNode();
    var ContentComponentClass = componentRegistry.get(contentNode.type);

    var specificType = this.props.node.type;

    return $$('div', { className: "content-node figure clearfix "+specificType, "data-id": this.props.node.id },
      $$('div', {className: 'label', contentEditable: false}, this.props.node.label),
      $$(TextProperty, {
        tagName: 'div',
        // ref: "textProp",
        className: 'title',
        doc: this.props.doc,
        path: [ this.props.node.id, "title"]
      }),

      $$('div', {
        className: 'figure-content'
      },
        $$(ContentComponentClass, {
          doc: this.props.doc,
          node: contentNode
        })
      ),

      $$('div', {className: 'description small'},
        $$(TextProperty, {
          tagName: 'div',
          className: 'caption',
          ref: "textProp",
          doc: this.props.doc,
          path: [ this.props.node.id, "caption"]
        })
      )
    );
  }
});

module.exports = FigureComponent;
