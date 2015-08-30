var TopicChartsView = Backbone.View.extend({

  initialize: function() {
    this.$el = $("#charts-container");
    this.template = JST["templates/topic-charts/topicChartsTemplate"];
  },

  render: function() {
    this.$el.html(this.template({ charts: this.collection }));
    drawDatamap(this.collection[0].attributes);
    InitLineGraph(this.collection[0].attributes);
    $("#line-graph-container").hide()
    var timeSlider = new TimeSlider();
    timeSlider.render();
    this.$el.find("#slider").on("slidechange", this.updateChartData.bind(this));
    this.$el.find(".ui-tabs-panel").on("click", this.toggleTab)
  },

  updateChartData: function(event, ui) {
    $("#map-container").html("");
    drawDatamap(this.collection[30 - ui.value].attributes);
  },

  toggleTab: function(event, ui) {
    event.preventDefault();
    $("div ul a li").removeClass("active");
    $(".charts").hide()
    var link = $(this.parentElement).attr("href")
    $(this).addClass("active");
    $(link).show();
  }

})
