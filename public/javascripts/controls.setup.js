$(function() {
  $("#birthSlide").slider({
    value: CONFIG.birthRate,
    min: 10,
    max: 450,
    create: function(event, ui) {
      $("#birthRate").html(CONFIG.birthRate);
    },
    change: function(event, ui) {
      CONFIG.birthRate = ui.value;
    },
    slide: function(event, ui) {
      $("#birthRate").html(ui.value);
    }
  });
  $("#predationSlide").slider({
    value: CONFIG.predationRate,
    min: 2,
    max: 62,
    create: function(event, ui) {
      $("#predationRate").html(CONFIG.predationRate);
    },
    change: function(event, ui) {
      CONFIG.predationRate = ui.value;
    },
    slide: function(event, ui) {
      $("#predationRate").html(ui.value);
    }
  });
});
