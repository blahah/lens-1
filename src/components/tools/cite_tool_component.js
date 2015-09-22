'use strict';

var $$ = React.createElement;

// CiteToolComponent
// -------------

var CiteToolComponent = React.createClass({

  displayName: "CiteToolComponent",

  contextTypes: {
    toolRegistry: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      disabled: true
    };
  },

  componentWillMount: function() {
    this.tool = this.context.toolRegistry.get("cite");
    if (!this.tool) {
      throw new Error('Cite tool not registered');
    }
    this.tool.connect(this, {
      'toolstate:changed': this.onToolstateChanged
    });
  },

  onToolstateChanged: function(toolState) {
    this.setState({
      disabled: toolState.disabled
    });
  },

  onClick: function(e) {
    e.preventDefault();
  },

  onMouseDown: function(e) {
    e.preventDefault();
    if (this.state.disabled) return;

    var citation = this.tool.createCitation(this.props.citationType);

    this.context.app.replaceState({
      contextId: "cite",
      citationType: this.props.citationType,
      citationId: citation.id
    });
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.disabled !== nextState.disabled;
  },

  render: function() {
    var classNames = [];
    if (this.props.classNames) classNames = this.props.classNames.slice();
    if (this.state.disabled) classNames.push('disabled');

    return $$("button", {
      className: classNames.join(' '),
      title: this.props.title,
      onMouseDown: this.onMouseDown,
      onClick: this.onClick
    }, this.props.children);
  },

});

module.exports = CiteToolComponent;