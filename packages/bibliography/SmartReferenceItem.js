var oo = require('substance/util/oo');
var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

// Used in BibItemsPanel
function SmartReferenceItem() {
  Component.apply(this, arguments);
}

SmartReferenceItem.Prototype = function() {
  this.render = function() {
    var el = $$('div')
      .addClass('bib-item border-bottom pad item small clearfix')
      .attr('data-id', this.props.node.DOI);

    if (this.props.active) {
      el.addClass('active');
    }

    el.append($$('div').addClass('label').append(
      $$('a').attr('href', 'http://dx.doi.org/' + this.props.node.DOI).
        attr('target', '_blank').
        append(this.props.node.DOI)
      )
    );

    var clickable = $$('div').addClass('text').append(this.props.node.title[0]);
    clickable.on('click', this.onClick);
    clickable.on('mousedown', this.onMouseDown);
    el.append(clickable)

    var items = this.props.node.matches.map(function (match) {
      return $$('div').addClass('snippet').append('...' + match + '...');
    }.bind(this))

    el.append($$('div').append(items));
    return el;
  };

  this.onClick = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  this.onMouseDown = function(e) {
    e.preventDefault();
    this.props.handleSelection(this.props.node);
  };

  this.onLabelChanged = function() {
    this.rerender();
  };
};

oo.inherit(SmartReferenceItem, Component);

module.exports = SmartReferenceItem;
