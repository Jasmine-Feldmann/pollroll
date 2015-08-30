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
    this.$el.find("#slider").on("slide", this.updateChartData.bind(this));
    this.$el.find(".ui-tabs-nav").on("click", this.toggeleTab.bind(this))
  },

  updateChartData: function(event, ui) {
    $("#map-container").html("");
    drawDatamap(this.collection[30 - ui.value].attributes);
    InitLineGraph(this.collection[0].attributes);
  },

  toggleTab: function(event, ui) {
    var active = $("ui-tabs").tabs("option", "active");
  }

})
