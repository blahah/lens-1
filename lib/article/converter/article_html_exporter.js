var Substance = require('substance');
var _ = Substance._;

var HtmlExporter = Substance.Document.HtmlExporter;
var schema = require('../article_schema');

function ArticleHtmlExporter() {
  ArticleHtmlExporter.super.call(this, { schema: schema });
}

ArticleHtmlExporter.Prototype = function() {

  this.convert = function(doc, options) {
    this.initialize(doc, options);
    var $doc = this.createHtmlDocument();

    // html/head
    // Note: this contains only some data to be HTML compliant
    var $head = $doc.find('head');
    $head.append($('<!-- title is only there to calm down the validator. do not edit -->'))
      .append($('<title>🐰</title>'))
      .append($('<meta charset="utf-8"></meta>'));

    // html/body
    var $body = $doc.find('body');
    $body.append(this.header());
    $body.append(this.main());

    // $doc.html() can not be called, so we just render the html element
    return ['<!DOCTYPE html>', '<html lang="en">', $doc.find('html').html(), '</html>'].join('');
  };

  this.header = function() {
    var $header = $('<header>');
    $header.append(this.meta());
    $header.append(this.resources());
    return $header;
  };

  this.meta = function() {
    var doc = this.state.doc;
    var articleMeta = doc.get('article-meta');
    return articleMeta.toHtml(this);
  };

  this.resources = function() {
    var doc = this.state.doc;
    var $resources = $('<resources>');

    var figures = doc.getIndex('type').get('image_figure');
    _.each(figures, function(figure) {
      $resources.append(figure.toHtml(this));
    }, this);

    var tables = doc.getIndex('type').get('table_figure');
    _.each(tables, function(table) {
      $resources.append(table.toHtml(this));
    }, this);

    var bibItems = doc.getIndex('type').get('bib_item');
    _.each(bibItems, function(bibItem) {
      $resources.append(bibItem.toHtml(this));
    }, this);

    return $resources;
  };

  this.main = function() {
    var doc = this.state.doc;
    var main = doc.get('main');
    var $main = $('<main>').append(this.convertContainer(main));
    return $main;
  };

};

Substance.inherit(ArticleHtmlExporter, HtmlExporter);

module.exports = ArticleHtmlExporter;
