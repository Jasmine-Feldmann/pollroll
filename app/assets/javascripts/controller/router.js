var AppRouter = Backbone.Router.extend({
  routes: {
    'topics/:topic_id': 'showResults',

    '*actions': 'defaultAction'
  },


  showResults: function(topic) {
    var topicData;
  },

  defaultAction: function() {
    var homeView = new HomeView();
    homeView.render();
  }

});
