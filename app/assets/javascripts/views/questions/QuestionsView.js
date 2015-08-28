var QuestionsView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("#questions-container");
    this.template = JST["templates/questions/questionsTemplate"]
  },

  render: function() {
    this.$el.html(this.template({ questions: this.collection }));
  }

});
