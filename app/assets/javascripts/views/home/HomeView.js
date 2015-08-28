var HomeView = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#container'),
    this.template = JST["templates/home/homeTemplate"]
  },

  render: function() {
    this.$el.html(this.template);
    var topicsCollection = new TopicsCollection();
    topicsCollection.fetch({
      success: function(response) {
        var topicSelectorView = new TopicSelectorView({ collection: [response.models[0]] });
        topicSelectorView.render();
      }
    });
  }

});
