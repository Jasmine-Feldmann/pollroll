var ResultsView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("#results-container");
    this.template = JST["templates/results/resultsTemplate"];
  },

  render: function() {
    this.$el.html(this.template);
  }
});
