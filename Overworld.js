class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {

      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Establish the camera person
      // Now it's on hero but can change!
      const cameraPerson = this.map.gameObjects.hero;

      // Update all objects
      // Object.values(this.map.gameObjects).forEach(object => {
      // });
      
      this.map.drawLowerImage(this.ctx, cameraPerson);
      
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction, 
          map: this.map
        });
        object.sprite.draw(this.ctx, cameraPerson);
      });

      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    }
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();
    
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}