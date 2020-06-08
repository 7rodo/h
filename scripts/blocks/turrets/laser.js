const laser = extendContent(PowerTurret, "laser", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.baseRegion = Core.atlas.find(this.name + "B");
    this.glowRegion = Core.atlas.find(this.name + "G");
  },
  
  draw(){
    Draw.rect(this.baseRegion
  }
  
});
