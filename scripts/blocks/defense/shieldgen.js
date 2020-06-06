
const shieldGen = extendContent(ForceProjector, "shieldgen", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name)
    ]
  },
  
  draw(tile){
    power = tile.entity.power.status
    
    Draw.rect(this.region, tile.drawx(), tile.drawy());
    
    if(tile.entity.power.status > 0.001){
      Draw.alpha(0.4);
      Draw.blend(Blending.additive);
      Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
      Draw.blend();
      Draw.reset();
    }
  }
});
