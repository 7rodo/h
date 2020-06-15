const cru = extendContent(GenericSmelter, "crucible", {
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
    
    //draw glowing center
    if(entity.warmup > 0 && this.flameColor.a > 0.001){
      float g = 0.3;
      float r = 0.06;
      float cr = Mathf.random(0.1);
      
      Draw.alpha(((1 - g) + Mathf.absin(Time.time(), 8, g) + Mathf.random(r) - r) * entity.warmup);

      Draw.tint(this.flameColor);
      Fill.circle(tile.drawx(), tile.drawy(), 3 + Mathf.absin(Time.time(), 5, 2) + cr);
      Draw.color(1, 1, 1, entity.warmup);
      //Draw.rect(topRegion, tile.drawx(), tile.drawy());
      Fill.circle(tile.drawx(), tile.drawy(), 1.9 + Mathf.absin(Time.time(), 5, 1) + cr);

      Draw.color();
    }
  }
});
