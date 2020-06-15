const cru = extendContent(GenericCrafter, "crucible", {
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
    entity = tile.ent()

    Draw.rect(this.region, tile.drawx(), tile.drawy());
    Draw.rect(this.spinRegion, tile.drawx(), tile.drawy(), entity.totalProgress * 2);
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
  }
});
