var HomeView = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#container'),
    this.template = JST["templates/home/homeTemplate"]
  },

  render: function() {
    this.$el.html(this.template);
    var topics = [];
    var topicSelectorView = new TopicSelectorView({ collection: topics });
    topicSelectorView.render();
  }

});
