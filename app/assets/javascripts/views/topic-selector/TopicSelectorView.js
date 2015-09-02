var TopicSelectorView = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#topics-container');
    this.template = JST["templates/topic-selector/topicSelectorTemplate"];
  },

  events: {
    "change #topics-dropdown": "navigateToTopic"
  },

  render: function() {
    this.$el.html(this.template({ topics: this.collection }));
    this.delegateEvents();
  },

  navigateToTopic: function(event) {
    var targetVal = event.target.value;
    if (targetVal.length > 0) {
      Backbone.history.navigate("topics/" + targetVal, { trigger: true });
    }
  }

})
