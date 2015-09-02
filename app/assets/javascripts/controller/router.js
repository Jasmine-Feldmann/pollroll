var AppRouter = Backbone.Router.extend({
  routes: {
    'topics/:topicId': 'showResults',

    '*actions': 'defaultAction'
  },


  showResults: function(topicId) {
    if ($('#topics-container').length === 0) {
      this.defaultAction();
    }
    var resultsView = new ResultsView();
    resultsView.render();
    var topicCharts = new TopicCharts([], { topicId: topicId });
    topicCharts.fetch({
      success: function(response) {
        // Ensure that the correct option is displayed as 'selected' in the dropdown.
        $('option:nth-child(' + (parseInt(topicId)+1) + ')').attr('selected', true);
        var topicChartsView = new TopicChartsView({ collection: response.models });
        topicChartsView.render();
      }
    });
  },

  defaultAction: function() {
    var homeView = new HomeView();
    homeView.render();
  }

});
