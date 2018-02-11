var ccount = 0;

class DLCreaturs {
  constructor() {
    this.creatures = 0;
    this.predators = 0;
  }

  BaseCreature() {
  }

  NewCreature() {
    this.creatures++;
    var frames = [];

    for (let i = 0; i < 5; i++) {
      frames.push(PIXI.Texture.fromFrame('frame0' + i + '.png'));
    }

    ccount++;

    var anim = new PIXI.extras.AnimatedSprite(frames);
    anim.id = ccount;
    anim.alive = true;
    anim.dlcolour = new DLColourRand();
    anim.setVisibility = () => {
      let rVal = Math.abs(anim.dlcolour.red - appBackgroundColor.red);
      let gVal = Math.abs(anim.dlcolour.green - appBackgroundColor.green);
      let bVal = Math.abs(anim.dlcolour.blue - appBackgroundColor.blue);
      return (rVal + gVal + bVal) / 765;
    }
    anim.visibility = anim.setVisibility();
    anim.x = RandInt(32, app.screen.width * .9);
    anim.y = RandInt(32, app.screen.height * .9);
    anim.anchor.set(0.5);
    anim.animationSpeed = RandInt(20, 100) / 100;
    anim.play();
    anim.height = RandInt(32, 128);
    anim.width = RandInt(32, 128);
    anim.tint = anim.dlcolour.toHex();
    anim.vx = RandInt(-1, 1);
    anim.vy = RandInt(-1, 1);
    anim.rval = RandInt(-4, 4) / 100;

    anim.overcomeInertia = () => {
      if (anim.vx == 0) {
        anim.vx = RandInt(-1, 1);
      }

      if (anim.vy == 0) {
        anim.vy = RandInt(-1, 1);
      }
    }

    anim.die = () => {
      anim.alive = false;
    }

    anim.travel = () => {

      if (anim.alive) {

        anim.rotation += anim.rval;
        anim.x += anim.vx;
        anim.y += anim.vy;

        anim.overcomeInertia();

        if (anim.x < anim.width / 2) {
          anim.x == 0;
          anim.vx *= -1;
        }

        if (anim.x > app.screen.width - (anim.width / 2)) {
          anim.x == app.screen.width;
          anim.vx *= -1;
        }

        if (anim.y < anim.height / 2) {
          anim.y == 0;
          anim.vy *= -1;
        }

        if (anim.y > app.screen.height - (anim.height / 2)) {
          anim.y == app.screen.height;
          anim.vy *= -1;
        }

      } else {
        anim.tint = 0x000000;
        anim.y++;
      }
    }

    return anim;
  }

  NewPredator(predtype) {
    this.predators++;

    let colour;

    switch (predtype) {
      case 'R':
        colour = new DLColour(255, 0, 0, 1);
        break;
      case 'G':
        colour = new DLColour(0, 255, 0, 1);
        break;
      case 'B':
        colour = new DLColour(0, 0, 255, 1);
        break;
      default:
        colour = new DLColour(0, 0, 0, 1);
        break;
    }

    let anim = new PIXI.Sprite(PIXI.loader.resources["/images/predator.png"].texture);
    anim.id = ccount;
    anim.type = predtype;
    anim.alive = true;
    anim.dlcolour = colour;
    anim.x = RandInt(32, app.screen.width * .9);
    anim.y = RandInt(32, app.screen.height * .9);
    anim.anchor.set(0.5);
    anim.height = 96;
    anim.width = 96;
    anim.tint = 0xFFFFFF;
    anim.vx = RandInt(-1, 1);
    anim.vy = RandInt(-1, 1);
    anim.rval = RandInt(-4, 4) / 100;
    anim.energy = RandInt(800, 3200);
    anim.hunting = false;

    anim.overcomeInertia = () => {
      if (anim.vx == 0) {
        anim.vx = RandInt(-1, 1);
      }

      if (anim.vy == 0) {
        anim.vy = RandInt(-1, 1);
      }
    }

    anim.die = () => {
      anim.alive = false;
    }

    anim.hunt = (creatures) => {
      
      anim.overcomeInertia();
      
      anim.rotation += anim.rval;

      let creature = creatures[1];

      if (creature.x < anim.x) {
        anim.x -= Math.abs(anim.vx);
      } else if (creature.x > anim.x) {
        anim.x += Math.abs(anim.vx);
      }

      if (creature.y < anim.y) {
        anim.y -= Math.abs(anim.vy);
      } else if (creature.y > anim.y) {
        anim.y += Math.abs(anim.vy);
      }
    }

    anim.travel = () => {
      
      if (anim.alive) {
        
        anim.energy--;

        anim.rotation += anim.rval;
        anim.x += anim.vx;
        anim.y += anim.vy;

        anim.overcomeInertia();

        if (anim.x < anim.width / 2) {
          anim.x == 0;
          anim.vx *= -1;
        }

        if (anim.x > app.screen.width - (anim.width / 2)) {
          anim.x == app.screen.width;
          anim.vx *= -1;
        }

        if (anim.y < anim.height / 2) {
          anim.y == 0;
          anim.vy *= -1;
        }

        if (anim.y > app.screen.height - (anim.height / 2)) {
          anim.y == app.screen.height;
          anim.vy *= -1;
        }

      } else {
        anim.tint = 0x000000;
        anim.y++;
      }
    }

    anim.update = (creatures) => {
      
      if (anim.energy < 0) {
        anim.hunting = true;
        anim.tint = anim.dlcolour.toHex();
      }

      if (anim.hunting) {
        anim.hunt(creatures);
      } else {
        anim.travel();
      }

    }

    return anim;
  }
}