
const shieldGen = extendContent(ForceProjector, "shieldgen", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.spinRegion = Core.atlas.find(this.name + "-spin");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name),
      Core.atlas.find(this.name + "-spin"),
      Core.atlas.find(this.name + "-top")
    ]
  },
  
  draw(tile){
    entity = tile.ent();
    
    Draw.rect(this.region, tile.drawx(), tile.drawy());
    
    if(entity.buildup <= 0){
      Draw.alpha(entity.buildup / breakage * 0.75);
      Draw.blend(Blending.additive);
      Linea.circle(tile.drawy(), tile.drawx(). 10)
      Draw.blend();
      Draw.reset();
    }
    
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
    
  }
});
