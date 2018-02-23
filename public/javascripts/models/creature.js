class CreatureAnimated extends PIXI.extras.AnimatedSprite {
  constructor(...args) {
    super(args[0]);
    this.image = args[0];
    this.setLocation();
    this.setLocomotion();
    this.setVisuals(args[2]);
    this.setVisibility();
    this.live(args[1]);
  }
  live(id) {
    this.id = id;
    this.offspring = [];
    this.children = 0;
    this.alive = true;
    this.decayed = false;
  }
  die() {
    this.alive = false;
    this.animationSpeed = 0;
  }
  setLocation() {
    this.x = RandInt(32, app.screen.width * 0.9);
    this.y = RandInt(32, app.screen.height * 0.9);
  }
  setLocomotion() {
    this.vx = 0;
    while (this.vx === 0) {
      this.vx = RandInt(-1, 1);
    }
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = RandInt(-1, 1);
    }
  }
  setVisuals(inherited) {
    if (inherited === undefined) {
      this.colour = new DLColour(128, 128, 128);
    } else {
      let rRand = RandInt(90, 110) / 100;
      let gRand = RandInt(90, 110) / 100;
      let bRand = RandInt(90, 110) / 100;
      let red = Math.floor(inherited.red * rRand);
      let green = Math.floor(inherited.green * gRand);
      let blue = Math.floor(inherited.blue * bRand);
      this.colour = new DLColour(red, green, blue);
    }
    this.height = RandInt(64, 64);
    this.width = RandInt(64, 64);
    this.anchor.set(0.5);
    this.animationSpeed = RandInt(20, 100) / 100;
    this.tint = this.colour.toHex();
    this.rval = 0;
    while (this.rval == 0) {
      this.rval = RandInt(-4, 4) / 100;
    }
  }
  setVisibility() {
    this.RVal = Math.abs(this.colour.red - appBackgroundColor.red) / 255;
    this.GVal = Math.abs(this.colour.green - appBackgroundColor.green) / 255;
    this.BVal = Math.abs(this.colour.blue - appBackgroundColor.blue) / 255;
  }
  getDistance(entity) {
    let x = Math.pow(this.x - entity.x, 2) + Math.pow(this.y - entity.y, 2);
    return Math.sqrt(x);
  }
  getVisibility(spectrum) {
    switch (spectrum) {
      case "R":
        return this.RVal;
        break;
      case "G":
        return this.GVal;
        break;
      default:
        return this.BVal;
        break;
    }
  }
  reproduce() {
    this.children++;
    let kid = new CreatureAnimated(
      this.image,
      `${this.id}.${this.children}`,
      this.colour
    );
    this.offspring.push(kid);
  }
  update(ccount, birthRate) {
    if (this.alive) {

      let rate = birthRate * 10;

      if (RandInt(-1, rate) < 0) {
        this.reproduce();
        if (RandInt(-1, 2) < 0) {
          this.die();
        }
      }

      this.move();
    } else {
      this.tint = 0xffffff;
      this.y += 0.5;
      if (this.y > app.screen.width - 128) {
        this.decayed = true;
      }
    }
  }
  move() {
    this.rotation += this.rval * 0.5;
    this.x += this.vx * 0.5;
    this.y += this.vy * 0.5;

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

class Creature extends PIXI.Sprite {
  constructor(...args) {
    super(...args);
  }
}
