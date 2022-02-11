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
    spawnTimer: 0,
  }),
  computed: {},
  methods: {
    start() {
      this.world.wo["bg"] = new GO(
        this.PIXI,
        this.app,
        assets.background,
        this.app.screen.width / 2,
        this.app.screen.height / 2,
        this.app.screen.width,
        this.app.screen.height
      );
/*
      this.world.wo["bround"] = new GO(
        this.PIXI,
        this.app,
        assets.foreground,
        this.app.screen.width / 2,
        this.app.screen.height / 2,
        this.app.screen.width,
        this.app.screen.height
      );
*/
      this.world.wo["crosshair"] = new GO(
        this.PIXI,
        this.app,
        assets.crosshair,
        this.app.screen.width / 2,
        this.app.screen.height / 2,
        100,
        100
      );
    },
    tick(delta) {
      if (this.app.renderer.plugins.interaction.mouseOverRenderer) {
        this.world.wo.crosshair.entity.x =
          this.app.renderer.plugins.interaction.mouse.global.x;
        this.world.wo.crosshair.entity.y =
          this.app.renderer.plugins.interaction.mouse.global.y;
      }
      this.handleSpawner();
      this.enemyHandler();
    },
    handleSpawner() {
      if (this.spawnTimer > 100) {
        this.spawnTimer = 0;

        let randInt = this.generateRandomInt();
        let enemyName = `enemy${randInt}`;
        this.world.wo[enemyName] = new GO(
          this.PIXI,
          this.app,
          assets.enemys.enemy1,
          this.generateRandomIntInRange(10, this.app.screen.width - 10),
          this.app.screen.height + 50,
          100,
          100
        );
        this.world.wo[enemyName].tag = "enemy";

        this.world.wo.crosshair.entity.parent.removeChild(this.world.wo.crosshair.entity);
        this.world.wo["crosshair"] = new GO(
          this.PIXI,
          this.app,
          assets.crosshair,
          this.app.renderer.plugins.interaction.mouse.global.x,
          this.app.renderer.plugins.interaction.mouse.global.y,
          100,
          100
        );
      } else {
        this.spawnTimer++;
      }
    },
    enemyHandler() {
      for (const [key, value] of Object.entries(this.world.wo)) {
        if (value?.tag && value?.tag == "enemy") {
          value.entity.y -=1;
          if (value.entity?.y < 100 && value.entity !== null) {
            //console.log("Jaa", this.world.wo[`${key}`].entity.parent);
            this.world.wo[`${key}`].entity.parent.removeChild(this.world.wo[`${key}`].entity);
            this.world.wo[`${key}`] = null;
          }
        }
      }
    },
    generateRandomInt() {
      return Math.floor(Math.random(1000) * 100);
    },
    generateRandomIntInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  },
  mounted: function () {
    this.game = new Game(
      document.getElementById("game"),
      (PIXI, app) => {
        this.app = app;
        this.PIXI = PIXI;
        this.start();
      },
      (delta) => {
        this.tick(delta);
      }
    );
  },
  beforeUnmount: function () {},
};
</script>

<style scoped>
#game {
  cursor: none;
}
</style>
