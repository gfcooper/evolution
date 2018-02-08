function NewCreature() {
    let animal_cell;

    var frames = [];

    for (let i = 0; i < 5; i++) {
        frames.push(PIXI.Texture.fromFrame('frame0' + i + '.png'));
    }

    var anim = new PIXI.extras.AnimatedSprite(frames);
    anim.x = RandInt(32, app.screen.width * .9);
    anim.y = RandInt(32, app.screen.height * .9);
    anim.anchor.set(0.5);
    anim.animationSpeed = RandInt(20, 100) / 100;
    anim.play();
    anim.height = RandInt(32, 64);
    anim.width = RandInt(32, 64);
    anim.tint = new DLColourRand().toHex();
    anim.vx = RandInt(-2, 2);
    anim.vy = RandInt(-2, 2);
    anim.rval = RandInt(-4, 4) / 100;

    anim.overcomeInertia = () => {
      if (anim.vx == 0) {
        anim.vx = RandInt(-2, 2);
      }

      if (anim.vy == 0) {
        anim.vy = RandInt(-2, 2);
      }
    }

    anim.travel = () => {

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

    }

    return anim;
}