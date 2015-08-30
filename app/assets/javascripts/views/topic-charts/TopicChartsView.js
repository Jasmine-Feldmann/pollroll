var TopicChartsView = Backbone.View.extend({

  initialize: function() {
    this.$el = $("#charts-container");
    this.template = JST["templates/topic-charts/topicChartsTemplate"];
  },

  render: function() {
    this.$el.html(this.template({ charts: this.collection }));
    drawDatamap(this.collection[0].attributes);
    var timeSlider = new TimeSlider();
    timeSlider.render();
    this.$el.find("#slider").on("slidechange", this.updateChartData.bind(this));
  },

  updateChartData: function(event, ui) {
    $("#map-container").html("");
    drawDatamap(this.collection[30 - ui.value].attributes);
    InitLineGraph(this.collection[0].attributes);
  }

})
