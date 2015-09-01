var TopicChartsView = Backbone.View.extend({

  initialize: function() {
    this.$el = $("#charts-container");
    this.template = JST["templates/topic-charts/topicChartsTemplate"];
  },

  render: function() {
    this.$el.html(this.template({ charts: this.collection }));

    // this condition handles the display of the map.
    if (this.collection[0].collection.options.topicId == 1) {
      drawDatamap(this.collection[0].attributes[0]);
      // display map legend
      this.$el.find("#first-chart-container").append(JST["templates/topic-charts/map-legend-template"]);
      // initiate the line graph
      InitLineGraph(this.collection[1].attributes.responses);
      $("#line-graph-container").hide();
      $("#bar-graph-container").hide();
      var timeSlider = new TimeSlider();
      timeSlider.render();
      this.$el.find("#slider").on("slide", this.updateChartData.bind(this));
      this.$el.find(".ui-tabs-panel").on("click", this.toggleTab)
    }
    else {
      choiceLineGraph(this.collection);
      initBarChart(this.collection);
      $("#line-graph-container").hide();
      this.$el.find(".ui-tabs-panel").on("click", this.toggleTab)
    }
  },

  updateChartData: function(event, ui) {
    var scroll = $(window).scrollTop();
    $("#map-container").html("");
    drawDatamap(this.collection[0].attributes[30 - ui.value]);
    $(window).scrollTop(scroll);
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
