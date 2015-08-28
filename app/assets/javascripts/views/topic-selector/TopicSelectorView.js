var TopicSelectorView = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#topics-container');
    this.template = JST["templates/topic-selector/topicSelectorTemplate"];
  },

  render: function() {
    this.$el.html(this.template);
  }

})
