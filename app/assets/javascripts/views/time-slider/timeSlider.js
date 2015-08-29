$(function() {

  var slider = $("#slider");
  var tooltip = $(".tooltip");

  tooltip.hide()

  slider.slider({
    value: 2015,
    step: 1,
    min: 2009,
    max: 2015,

    start: function(event, ui) {
      tooltip.fadeIn('fast');
    },

    slide: function(event, ui) {
      var value = slider.slider('value');
      var pos = 16;
      tooltip.text(ui.value);
    }

  });

})

