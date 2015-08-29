var TopicChartsView = Backbone.View.extend({

  initialize: function() {
    this.$el = $("#charts-container");
    this.template = JST["templates/topic-charts/topicChartsTemplate"];
  },

  render: function() {
    this.$el.html(this.template({ charts: this.collection }));
    console.log(this.collection[0].attributes);
    drawDatamap(this.collection[0].attributes);
    InitLineGraph(this.collection[0].attributes);
  }
})
