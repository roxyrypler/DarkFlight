<template>
  <div id="game"></div>
</template>

<script>
import Game from "../classes/pixi/game.js";
import World from "../classes/pixi/wo.js";
import GO from "../classes/pixi/go.js";
import assets from "@/importreg/shooterassetreg.js";

export default {
  name: "Shooter",
  components: {},
  data: () => ({
    PIXI: null,
    app: null,
    game: null,
    world: new World(),
  }),
  computed: {},
  methods: {
    start() {
      this.world.wo["test"] = new GO(
        this.PIXI,
        this.app,
        assets.background,
        this.app.screen.width / 2,
        this.app.screen.height / 2,
        this.app.screen.width,
        this.app.screen.height
      );

      this.world.wo["crosshair"] = new GO(
        this.PIXI,
        this.app,
        assets.crosshair,
        this.app.screen.width / 2,
        this.app.screen.height / 2,
        100,
        100
      );

      console.log(this.app.screen.width);
      //console.log(this.app.renderer.plugins.interaction.mouseOverRenderer);
      //console.log(this.app.renderer.plugins.interaction.mouse.global.x);
    },
    tick(delta) {
      if (this.app.renderer.plugins.interaction.mouseOverRenderer) {
        this.world.wo.crosshair.entity.x = this.app.renderer.plugins.interaction.mouse.global.x;
        this.world.wo.crosshair.entity.y = this.app.renderer.plugins.interaction.mouse.global.y;
      }
    }
  },
  mounted: function () {
    this.game = new Game(document.getElementById("game"), (PIXI, app) => {
      this.app = app;
      this.PIXI = PIXI;
      this.start();
    }, (delta) => {
      this.tick(delta);
    });
  },
  beforeUnmount: function () {},
};
</script>

<style scoped>
#game {
  cursor: none;
}
</style>
