$(function() {

  var slider = $("#slider");

  slider.slider({
    value: 2015,
    step: 1,
    min: 2009,
    max: 2015

  }).slider("pips");

})

