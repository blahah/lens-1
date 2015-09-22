'use strict';

var $$ = React.createElement;

var CitationComponent = React.createClass({

  displayName: "CitationComponent",

  contextTypes: {
    surface: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this.props.node.connect(this, {
      "label:changed": this.onLabelChanged
    });
  },

  componentWillUnmount: function() {
    this.props.node.disconnect(this);
  },

  render: function() {
    return $$('span', {
      className: this.getClassName(),
      "data-id": this.props.node.id,
      "data-external": 1,
      "contentEditable": false,
      onClick: this.onClick,
      onMouseDown: this.onMouseDown
    }, this.props.node.label || "");
  },

  onMouseDown: function(e) {
    e.preventDefault();
    var citation = this.props.node;
    var surface = this.context.surface;

    surface.setSelection(citation.getSelection());
    surface.rerenderDomSelection();
  },

  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  onLabelChanged: function() {
    this.forceUpdate();
  },

  getClassName: function() {
    var classNames = this.props.node.getClassNames();
    if (this.props.classNames) {
      classNames += " " + this.props.classNames.join(' ');
    }
    return classNames.replace(/_/g, '-');
  },
});

module.exports = CitationComponent;
