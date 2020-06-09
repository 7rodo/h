const pulse = extendContent(PowerTurret, "pulse", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.heatRegion = Core.atlas.find(this.name + "-heat");
    this.baseRegion = Core.atlas.find(this.name + "-base");
    this.spinRegion = Core.atlas.find(this.name + "-spin");
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name + "-base"),
      Core.atlas.find(this.name + "-spin"),
      Core.atlas.find(this.name)
    ]
  },
  
  draw(tile){
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
    Draw.rect(this.spinRegion, tile.drawx(), tile.drawy(), tile.entity.rotation() += 8);
  },
  
  update(tile){
    
  },
  
  shouldTurn(tile){
    
  }
});
