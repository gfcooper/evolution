$(function() {

  $("#birthSlide").slider({
    value: CONFIG.bRate,
    min: 8,
    max: 1024,
    create: function(event, ui) {
      $("#birthRate").html(CONFIG.bRate);
    },
    change: function(event, ui) {
      CONFIG.bRate = ui.value;
    },
    slide: function(event, ui) {
      $("#birthRate").html(ui.value);
    }
  });

  $("#deathSlide").slider({
    value: CONFIG.dRate,
    min: 8,
    max: 1024,
    create: function(event, ui) {
      $("#deathRate").html(CONFIG.dRate);
    },
    change: function(event, ui) {
      CONFIG.dRate = ui.value;
    },
    slide: function(event, ui) {
      $("#deathRate").html(ui.value);
    }
  });

  $("#predationSlide").slider({
    value: CONFIG.pRate,
    min: 2,
    max: 64,
    create: function(event, ui) {
      $("#predationRate").html(CONFIG.pRate);
    },
    change: function(event, ui) {
      CONFIG.pRate = ui.value;
    },
    slide: function(event, ui) {
      $("#predationRate").html(ui.value);
    }
  });

});
