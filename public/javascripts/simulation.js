let display = document.getElementById("app");

let creatureCount = 32,
  predatorCount = 3;

let app = new PIXI.Application({
  width: $("#app").width(),
  height: window.innerHeight - 64
});

var appBackgroundColor = new DLColour(
  CONFIG.env.red,
  CONFIG.env.green,
  CONFIG.env.blue,
  1
);

app.renderer.backgroundColor = appBackgroundColor.toHex();
display.appendChild(app.view);

PIXI.loader
  .add("/images/animals.json")
  .add("/images/predator.png")
  .load(setup);

function setup() {

  factory = new DLCreaturesFactory();
  let creatures = [];
  let predators = [];

  for (let i = 0; i < CONFIG.prey; i++) {
    creatures[i] = factory.NewCreature();
  }

  for (let i = 0; i < CONFIG.predators; i++) {
    predators.push(factory.NewPredator("R"));
    predators.push(factory.NewPredator("G"));
    predators.push(factory.NewPredator("B"));
  }

  creatures.forEach(creature => {
    app.stage.addChild(creature);
    creature.play();
  });

  predators.forEach(predator => {
    app.stage.addChild(predator);
  });

  app.ticker.add(function() {
    let offspring = [];

    for (let i = 0; i < creatures.length; i++) {
      if (!creatures[i].alive) {
        app.stage.removeChild(creatures[i]);
        creatures.splice(i, 1);
      }
    }

    let ccount = creatures.length;
    $("#ccount").html(ccount);

    CONFIG.bRate = ccount * 3;
    $("#birthSlide").slider("value", CONFIG.bRate);
    $("#birthRate").html(CONFIG.bRate);
    let pRate = ccount * Math.pow(ccount, -2) * 1000;
    CONFIG.pRate = Math.round(pRate, 0);
    $("#predationSlide").slider("value", CONFIG.pRate);
    $("#predationRate").html(CONFIG.pRate);

    CONFIG.avg.red = 0;
    CONFIG.avg.green = 0;
    CONFIG.avg.blue = 0;

    creatures.forEach(creature => {
      creature.update(ccount, CONFIG.bRate);
      for (let i = 0; i < creature.offspring.length; i++) {
        offspring.push(creature.offspring.pop());
      }
      CONFIG.avg.red += creature.colour.red;
      CONFIG.avg.green += creature.colour.green;
      CONFIG.avg.blue += creature.colour.blue;
    });

    CONFIG.avg.red = CONFIG.avg.red / ccount;
    CONFIG.avg.green = CONFIG.avg.green / ccount;
    CONFIG.avg.blue = CONFIG.avg.blue / ccount;

    chart.data.datasets[1].data = [
      CONFIG.avg.red,
      CONFIG.avg.green,
      CONFIG.avg.blue
    ];
    chart.update();

    for (let i = 0; i < offspring.length; i++) {
      let newbie = offspring.pop();
      creatures.push(newbie);
      app.stage.addChild(newbie);
    }

    predators.forEach(predator => {
      predator.update(creatures, CONFIG.pRate);
    });
  });
}
