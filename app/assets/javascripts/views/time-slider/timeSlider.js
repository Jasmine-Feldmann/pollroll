var TimeSlider = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#map-container');
    this.template = JST["templates/time-slider/timeSliderTemplate"];
  },

  render: function() {
    this.$el.prepend(this.template);
    $("#slider").slider({
      value: 2015,
      step: 1,
      min: 2009,
      max: 2015
    }).slider("pips");
  }

});
