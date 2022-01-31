export default class GO {
    constructor(PIXI, app, sprite, x, y, width, height) {
        this.PIXI = PIXI;
        this.app = app;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.entity = null;

        this.init();
    }

    init() {
        const texture = this.PIXI.Texture.from(this.sprite);
        this.entity = new this.PIXI.Sprite(texture);
        this.entity.x = this.x;
        this.entity.y = this.y;
        this.entity.width = this.width;
        this.entity.height = this.height;
        this.entity.anchor.set(0.5);
        this.app.stage.addChild(this.entity);
    }
}