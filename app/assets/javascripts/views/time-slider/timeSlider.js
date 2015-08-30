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
    }).slider("pips");
  }

});
