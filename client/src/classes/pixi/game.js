import * as PIXI from "@/vendors/pixijs/pixi.min.mjs";

export default class Game {
    constructor(parent, onStart, tick) {
        this.PIXI = PIXI;
        this.app = null;
        this.parent = parent;
        this.onStart = onStart;
        this.tick = tick;
        this.init();
    }

    init() {
        this.app = new PIXI.Application({
            width: window.innerWidth, 
            height: window.innerHeight / 2, 
            backgroundColor: 0x000000, 
            resolution: 1,
        });
        this.parent.appendChild(this.app.view);
        this.onStart(this.PIXI, this.app);

        this.app.ticker.add((delta) => {
            this.tick(delta);
        });
    }
}
