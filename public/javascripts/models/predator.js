class CreatureSprite extends PIXI.Sprite {
  constructor(...args) {
    super(args[0]);
    this.setType(args[1]);
    this.setEnergy(CONFIG.pRate);
    this.everything();
    this.preyInRange = [];
  }

  setType(predtype) {
    this.predtype = predtype;

    this.type = predtype;

    switch (predtype) {
      case "R":
        this.colour = new DLColour(255, 0, 0, 1);
        break;

      case "G":
        this.colour = new DLColour(0, 255, 0, 1);
        break;

      case "B":
        this.colour = new DLColour(0, 0, 255, 1);
        break;

      default:
        this.colour = new DLColour(0, 0, 0, 1);
        break;
    }
  }

  everything() {
    this.x = RandInt(32, app.screen.width * 0.9);
    this.y = RandInt(32, app.screen.height * 0.9);
    this.anchor.set(0.5);
    this.height = 64;
    this.width = 64;
    this.tint = 0xffffff;
    this.vx = 0;
    while (Math.abs(this.vx) != 2) {
      this.vx = RandInt(-2, 2);
    }
    this.vy = 0;
    while (Math.abs(this.vy) != 2) {
      this.vy = RandInt(-2, 2);
    }
    this.rval = RandInt(-4, 4) / 100;
    this.hunting = false;
  }

  setEnergy(minRate) {
    this.energy = RandInt(minRate, Math.pow(minRate / 2, 2.2));
  }

  detectPrey(creatures) {
    this.preyInRange = creatures.filter(x => x.getDistance(this) < 250);
  }

  selectPrey(creatures) {
    this.preyInRange.forEach(creature => {
      if (
        this.prey === undefined ||
        creature.getVisibility(this.predtype) >
          this.prey.getVisibility(this.predtype)
      ) {
        if (creature.alive) {
          this.prey = creature;
        }
      }
    });
  }

  update(creatures, predationRate) {
    if (this.energy < 0) {
      this.hunting = true;
      this.tint = this.colour.toHex();
    }

    if (this.hunting) {
      this.hunt(creatures, predationRate);
    } else {
      this.tint = 0xffffff;
      this.travel();
    }
  }

  hunt(creatures, predationRate) {
    this.rotation += this.rval;

    this.detectPrey(creatures);

    if (this.preyInRange.length > 0) {
      if (this.prey === undefined) {
        this.selectPrey(this.preyInRange);
      } else if (!this.prey.alive) {
        this.prey = undefined;
        this.selectPrey(this.preyInRange);
      }
      if (this.prey !== undefined) {
        if (this.prey.x < this.x) {
          this.x -= Math.abs(this.vx);
        } else {
          this.x += Math.abs(this.vx);
        }

        if (this.prey.y < this.y) {
          this.y -= Math.abs(this.vy);
        } else {
          this.y += Math.abs(this.vy);
        }

        let xDiff = (this.prey.x - this.x) / this.prey.x;
        let yDiff = (this.prey.y - this.y) / this.prey.y;

        if (Math.abs(xDiff) < 0.05 && Math.abs(yDiff) < 0.05) {
          this.setEnergy(predationRate);
          this.prey.die();
          this.hunting = false;
          this.prey = undefined;
        }
      }
    }
  }

  travel() {
    this.energy--;

    this.rotation += this.rval;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.width / 2) {
      this.x == 0;
      this.vx *= -1;
    }

    if (this.x > app.screen.width - this.width / 2) {
      this.x == app.screen.width;
      this.vx *= -1;
    }

    if (this.y < this.height / 2) {
      this.y == 0;
      this.vy *= -1;
    }

    if (this.y > app.screen.height - this.height / 2) {
      this.y == app.screen.height;
      this.vy *= -1;
    }
  }
}
