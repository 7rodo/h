const wallEffect = newEffect(7, e => {
  Draw.color(Color.valueOf("8fdbb2"), Color.valueOf("7ec49f"), e.fin());
  Lines.stroke(e.fout() * 3);
  Lines.square(e.x, e.y, e.fin() * 4);
});
                             
const wallEffectLarge = newEffect(7, e => {
  Draw.color(Color.valueOf("8fdbb2"), Color.valueOf("7ec49f"), e.fin());
  Lines.stroke(e.fout() * 3);
  Lines.square(e.x, e.y, e.fin() * 4);
});                            
                              
const dirWall = extendContent(Wall, "diriumwall", {
  load(){
    this.region = Core.atlas.find(this.name);
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name)
    ]
  },
  
  draw(tile){
    Draw.rect(this.region, tile.drawx(), tile.drawy());
  },
  
  onDestroyed(tile){
    Effects.effect(wallEffect, tile);
    
    if(!tile.floor().solid && !tile.floor().isLiquid){
      RubbleDecal.create(tile.drawx(), tile.drawy(), this.size);
    }
  },
  
  handleBulletHit(entity, bullet){
  entity.damage(bullet.damage());  
  
  if(entity != null && bullet != null){
    Effects.effect(wallEffect, entity.x, entity.y, entity.rotation - 90);
  }
}
});

const dirWallLarge = extendContent(Wall, "diriumwalllarge", {
  load(){
    this.region = Core.atlas.find(this.name);
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name)
    ]
  },
  
  draw(tile){
    Draw.rect(this.region, tile.drawx(), tile.drawy());
  },
  
  onDestroyed(tile){
    Effects.effect(wallEffectLarge, tile);
    
    if(!tile.floor().solid && !tile.floor().isLiquid){
      RubbleDecal.create(tile.drawx(), tile.drawy(), this.size);
    }
  },
  
  handleBulletHit(entity, bullet){
  entity.damage(bullet.damage());
    
  if(entity != null && bullet != null){
    Effects.effect(wallEffectLarge, entity.x, entity.y, entity.rotation - 90);
  }
}
});

//Thanks to @GlennFolker for making the handleBulletHit finally working.
