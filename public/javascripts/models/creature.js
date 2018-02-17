class DLCreature {

    constructor(id) {
        this.id = id,
        this.pixi = this.setPIXI(),
            this.setLocation(),
            this.setLocomotion(),
            this.setVisuals(),
            this.setVisibility(),
            this.live()
    }

    setPIXI() {
        let frames = [];

        for (let i = 0; i < 5; i++) {
            frames.push(PIXI.Texture.fromFrame('creature_' + i + '.png'));
        }

        let anim = new PIXI.extras.AnimatedSprite(frames);
        anim.play();
        return anim;
    }

    live() {
        this.alive = true;
    }

    die() {
        this.alive = false;
    }

    setVisibility() {
        this.visRed = Math.abs(this.colour.red - appBackgroundColor.red) / 255;
        this.visGreen = Math.abs(this.colour.green - appBackgroundColor.green) / 255;
        this.visBlue = Math.abs(this.colour.blue - appBackgroundColor.blue) / 255;
    }

    setVisuals() {
        this.colour = new DLColourRand();
        this.pixi.height = RandInt(32, 128);
        this.pixi.width = RandInt(32, 128);
        this.pixi.anchor.set(0.5);
        this.pixi.animationSpeed = RandInt(20, 100) / 100;
        this.pixi.tint = this.colour.toHex();
        while (this.rval === 0) {
            this.rval = RandInt(-4, 4) / 100;
        }
    }

    setLocomotion() {
        while (this.pixi.vx === 0) {
            this.pixi.vx = RandInt(-1, 1);
        }
        while (this.pixi.vy === 0) {
            this.pixi.vy = RandInt(-1, 1);
        }
    }

    setLocation() {
        this.pixi.x = RandInt(32, 128);
        this.pixi.y = RandInt(32, 128);
    }

    update() {
        if (this.alive) {
            this.move();
        } else {
            this.pixi.tint = 0x000000;
            this.pixi.y++;
        }
    }

    move() {
        this.pixi.rotation += this.rval;
        this.pixi.x += this.pixi.vx;
        this.pixi.y += this.pixi.vy;

        if (this.pixi.x < this.pixi.width / 2) {
            this.pixi.x == 0;
            this.pixi.vx *= -1;
        }

        if (this.pixi.x > app.screen.width - (this.pixi.width / 2)) {
            this.pixi.x == app.screen.width;
            this.pixi.vx *= -1;
        }

        if (this.pixi.y < this.pixi.height / 2) {
            this.pixi.y == 0;
            this.pixi.vy *= -1;
        }

        if (this.pixi.y > app.screen.height - (this.pixi.height / 2)) {
            this.pixi.y == app.screen.height;
            this.pixi.vy *= -1;
        }
    }
}