const wallEffect = newEffect(10, e => {
  Draw.color(Color.valueOf("8fdbb2"), Color.valueOf("7ec49f"), e.fin());
  Lines.stroke(e.fout() * 1.6);
  Lines.square(e.x, e.y, 5 + e.fin() * 2);
});
                             
const wallEffectLarge = newEffect(10, e => {
  Draw.color(Color.valueOf("8fdbb2"), Color.valueOf("7ec49f"), e.fin());
  Lines.stroke(e.fout() * 1.6);
  Lines.square(e.x, e.y, 10 + e.fin() * 2);
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
    
    Effects.effect(wallEffect, 100, 160, 0);
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
  }
});

