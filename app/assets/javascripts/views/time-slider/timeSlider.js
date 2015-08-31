var TimeSlider = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#map-slider-container');
    this.template = JST["templates/time-slider/timeSliderTemplate"];
  },

  render: function() {
    this.$el.prepend(this.template);
    $("#slider").slider({
      value: 30,
      step: 1,
      min: 1,
      max: 30
    })
    // .slider("pips")
    .each(function() {
      // Add labels to slider
      // Get the options for this slider
      var opt = $(this).data().uiSlider.options;
      // Get the number of possible values
      var vals = opt.max - opt.min;
      // Space out values
      for (var i = 0; i <= vals; i += 5) {
        var el = $('<label>'+ Math.round((i*0.25+2009)) +'</label>').css('left',(i/vals*100)+'%');
        $( "#slider" ).append(el);
      }
    });

  }
});
