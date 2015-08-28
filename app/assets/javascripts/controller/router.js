var AppRouter = Backbone.Router.extend({
  routes: {
    'topics/:topicId': 'showResults',

    '*actions': 'defaultAction'
  },


  showResults: function(topicId) {
    var resultsView = new ResultsView();
    resultsView.render();
    var topicResponses = new TopicResponses([], { topicId: topicId });
    topicResponses.fetch({
      success: function(response) {
        var questionsView = new QuestionsView({ collection: response.models });
        questionsView.render();
      }
    });
  },

  defaultAction: function() {
    var homeView = new HomeView();
    homeView.render();
    $('#topics-container').on('change', '#topics-dropdown', function(event) {
      this.navigate("topics/" + $(event.target).val(), { trigger: true });
    }.bind(this));
  }

});
