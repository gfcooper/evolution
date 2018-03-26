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

    let colour;

    switch (predtype) {
      case "R":
        colour = new DLColour(255, 0, 0, 1);
        break;
      case "G":
        colour = new DLColour(0, 255, 0, 1);
        break;
      case "B":
        colour = new DLColour(0, 0, 255, 1);
        break;
      default:
        colour = new DLColour(0, 0, 0, 1);
        break;
    }

    let anim = new PIXI.Sprite(
      PIXI.loader.resources["/images/predator.png"].texture
    );
    anim.id = ccount;
    anim.predtype = predtype;
    anim.type = predtype;
    anim.alive = true;
    anim.dlcolour = colour;
    anim.x = RandInt(32, app.screen.width * 0.9);
    anim.y = RandInt(32, app.screen.height * 0.9);
    anim.anchor.set(0.5);
    anim.height = 96;
    anim.width = 96;
    anim.tint = 0xffffff;
    anim.vx = 0;
    while (Math.abs(anim.vx) != 2) {
      anim.vx = RandInt(-2, 2);
    }
    anim.vy = 0;
    while (Math.abs(anim.vy) != 2) {
      anim.vy = RandInt(-2, 2);
    }
    anim.rval = RandInt(-4, 4) / 100;
    anim.hunting = false;

    anim.setEnergy = (minRate) => {
      anim.energy = RandInt(minRate, Math.pow(minRate / 2, 2.2));
    };

    anim.setEnergy(CONFIG.pRate);

    anim.preyInRange = [];

    anim.detectPrey = creatures => {
      anim.preyInRange = creatures.filter(x => x.getDistance(anim) < 250);
    };

    anim.selectPrey = creatures => {
      anim.preyInRange.forEach(creature => {
        if (
          anim.prey === undefined ||
          creature.getVisibility(anim.predtype) >
            anim.prey.getVisibility(anim.predtype)
        ) {
          if (creature.alive) {
            anim.prey = creature;
          }
        }
      });
    };

    anim.die = () => {
      anim.alive = false;
    };

    anim.hunt = (creatures, predationRate) => {
      anim.rotation += anim.rval;

      anim.detectPrey(creatures);

      if (anim.preyInRange.length > 0) {
        if (anim.prey === undefined) {
          anim.selectPrey(anim.preyInRange);
        } else if (!anim.prey.alive) {
          anim.prey = undefined;
          anim.selectPrey(anim.preyInRange);
        }
        if (anim.prey !== undefined) {
          if (anim.prey.x < anim.x) {
            anim.x -= Math.abs(anim.vx);
          } else {
            anim.x += Math.abs(anim.vx);
          }

          if (anim.prey.y < anim.y) {
            anim.y -= Math.abs(anim.vy);
          } else {
            anim.y += Math.abs(anim.vy);
          }

          let xDiff = (anim.prey.x - anim.x) / anim.prey.x;
          let yDiff = (anim.prey.y - anim.y) / anim.prey.y;

          if (Math.abs(xDiff) < 0.05 && Math.abs(yDiff) < 0.05) {
            anim.setEnergy(predationRate);
            anim.prey.die();
            anim.hunting = false;
            anim.prey = undefined;
          }
        }
      }
    };

    anim.travel = () => {
      if (anim.alive) {
        anim.energy--;

        anim.rotation += anim.rval;
        anim.x += anim.vx;
        anim.y += anim.vy;

        if (anim.x < anim.width / 2) {
          anim.x == 0;
          anim.vx *= -1;
        }

        if (anim.x > app.screen.width - anim.width / 2) {
          anim.x == app.screen.width;
          anim.vx *= -1;
        }

        if (anim.y < anim.height / 2) {
          anim.y == 0;
          anim.vy *= -1;
        }

        if (anim.y > app.screen.height - anim.height / 2) {
          anim.y == app.screen.height;
          anim.vy *= -1;
        }
      } else {
        anim.tint = 0x000000;
        anim.y++;
      }
    };

    anim.update = (creatures, predationRate) => {
      if (anim.energy < 0) {
        anim.hunting = true;
        anim.tint = anim.dlcolour.toHex();
      }

      if (anim.hunting) {
        anim.hunt(creatures, predationRate);
      } else {
        anim.tint = 0xffffff;
        anim.travel();
      }
    };

    return anim;
  }
}
