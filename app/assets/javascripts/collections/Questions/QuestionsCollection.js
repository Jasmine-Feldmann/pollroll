var QuestionsCollection = Backbone.Collection.extend({

  initialize: function(models, options) {
    this.model = Question,
    this.url = "/questions/" + options.questionId
  }

})
