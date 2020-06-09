const laser = extendContent(PowerTurret, "laser", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.baseRegion = Core.atlas.find(this.name + "-base");
    this.spinRegion = Core.atlas.find(this.name + "-spin");
  },
  
  draw(){
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy()
  }
  
});
