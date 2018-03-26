var ccount = 0;

class DLCreaturesFactory {
  constructor() {
    this.creatures = 0;
    this.predators = 0;
  }
  
  BaseCreature() {}

  NewCreature() {
    this.creatures++;

    var frames = [];

    for (let i = 0; i < 4; i++) {
      frames.push(PIXI.Texture.fromFrame("creature_" + i + ".png"));
    }

    ccount++;

    var anim = new CreatureAnimated(frames, ccount);

    return anim;
  }

  NewPredator(predtype) {
    this.predators++;

    let texture = PIXI.loader.resources["/images/predator.png"].texture;

    let anim = new CreatureSprite(texture, predtype);

    return anim;
  }
}
