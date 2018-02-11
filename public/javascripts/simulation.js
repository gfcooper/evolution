//Create a Pixi Application
let display = document.getElementById('app');
let creatureCount = 64, predatorCount = 3;

let app = new PIXI.Application({ width: $("#app").width(), height: window.innerHeight - 64 });
// let app = new PIXI.Application();
var appBackgroundColor = new DLColour(240, 255, 240, 1);
app.renderer.backgroundColor = appBackgroundColor.toHex();

display.appendChild(app.view);

PIXI.loader
  .add("/images/animals.json")
  .add("/images/predator.png")
  .load(setup);

function setup() {
  factory = new DLCreaturs();
  let creatures = [];
  let predators = [];

  for (let i = 0; i < creatureCount; i++) {
    creatures[i] = factory.NewCreature();
  }

  predators[0] = factory.NewPredator('R');
  predators[1] = factory.NewPredator('G');
  predators[2] = factory.NewPredator('B');
  predators[3] = factory.NewPredator('R');
  predators[4] = factory.NewPredator('G');
  predators[5] = factory.NewPredator('B');


  creatures.forEach(creature => {
    app.stage.addChild(creature);
  });

  predators.forEach(predator => {
    app.stage.addChild(predator);
  });

  app.ticker.add(function () {

    creatures.forEach(creature => {
      creature.travel();
    });

    predators.forEach(predator => {
      predator.update(creatures);
    });

  });
}