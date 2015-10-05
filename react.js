var React = require('react');

// Usage:
// var LensWriter = require('lens-writer/adapters/react');
// 
// React.createElement(LensWriter, {
//   content: LENS_ARTICLE_XML,
//   handleSave: function(doc, cb) {
//     var xml = doc.toXml();
//   }
// });


// Lens + Substance
var LensWriter = require('./src/lens_writer');
var Article = require('./lib/article');
var Component = require('substance/ui/component');
var $$ = Component.$$;

var ReactLensWriter = React.createClass({

  handleSave: function(doc, cb) {
    this.props.handleSave(doc, cb);
  },

  // New props arrived, update the editor
  componentDidUpdate: function() {
    var doc = Article.fromXml(this.props.content);
    this.writer.extendProps({
      doc: doc
    });
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this);
    var doc = Article.fromXml(this.props.content);

    this.writer = Component.mount($$(LensWriter, {doc: doc}), el);
  },

  render: function() {
    return React.DOM.div({
      className: 'lens-writer-wrapper'
    });
  }
});

ReactLensWriter.propTypes = {
  content: React.PropTypes.string // XML source of the document
};

module.exports = ReactLensWriter;