var AppRouter = Backbone.Router.extend({
  routes: {
    'topics/:topicId': 'showResults',

    '*actions': 'defaultAction'
  },


  showResults: function(topicId) {
    var resultsView = new ResultsView();
    resultsView.render();
    var topicCharts = new TopicCharts([], { topicId: topicId });
    topicCharts.fetch({
      success: function(response) {
        var topicChartsView = new TopicChartsView({ collection: response.models });
        topicChartsView.render();
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
