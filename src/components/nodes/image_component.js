'use strict';

var $$ = React.createElement;

var ImageComponent = React.createClass({

  displayName: "ImageComponent",

  componentWillMount: function() {
    var doc = this.props.doc;
    doc.connect(this, { 'document:changed': this.handleDocumentChange });
  },

  componentWillUnmount: function() {
    var doc = this.props.doc;
    doc.disconnect(this);
  },

  render: function() {
    return $$('div', {className: 'image', contentEditable: false, "data-id": this.props.node.id},
      $$('img', {src: this.props.node.src })
    );
  },

  handleDocumentChange: function(change) {
    if (change.isAffected([this.props.node.id, "src"])) {
      this.forceUpdate();
    }
  },
});

module.exports = ImageComponent;
