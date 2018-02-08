var RandInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class DLColour {
    constructor(r, g, b, a) {
        this.red = r,
            this.green = g,
            this.blue = b,
            this.alpha = a
    }

    toString() {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
    }

    toHex() {
        return this.rgb2hex( this.toString() );
    }

    rgb2hex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "0x" +
         ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }
}

class DLColourRand extends DLColour {
    constructor() {
        let r = RandInt(0, 255);
        let g = RandInt(0, 255);
        let b = RandInt(0, 255);
        super(r, g, b, 1);
    }
}