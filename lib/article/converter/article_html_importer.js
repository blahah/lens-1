var Substance = require('substance');

var HtmlImporter = Substance.Document.HtmlImporter;
var schema = require('../article_schema');

function ArticleHtmlImporter() {
  ArticleHtmlImporter.super.call(this, { schema: schema });
}

ArticleHtmlImporter.Prototype = function() {

  this.convert = function($rootEl, doc) {
    this.initialize(doc, $rootEl);

    var $body = $rootEl.find('body');
    if (!$body.length) {
      throw new Error('body is mandatory');
    }
    this.body($body);

    this.finish();
  };

  this.meta = function($meta) {
    this.convertElement($meta);
  };

  this.body = function($body) {
    // body/header
    var $header = $body.find('header');
    if (!$header.length) {
      throw new Error('body/header is mandatory');
    }
    this.header($header);

    // body/main
    var $main = $body.find('main');
    if (!$main.length) {
      throw new Error('body/main is mandatory');
    }
    this.main($main);
  };

  this.header = function($header) {
    var $meta = $header.find('meta');
    if (!$meta.length) {
      throw new Error('body/header/meta is mandatory');
    }
    this.meta($meta);

    var $resources = $header.find('resources');
    this.resources($resources);
  };

  this.resources = function($resources) {
    var self = this;
    $resources.children().each(function() {
      var $child = self.$(this);
      self.convertElement($child);
    });
  };

  this.main = function($main) {
    this.convertContainer($main, 'main');
  };

};

Substance.inherit(ArticleHtmlImporter, HtmlImporter);

module.exports = ArticleHtmlImporter;