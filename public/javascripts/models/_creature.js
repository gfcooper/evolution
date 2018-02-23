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

    










}