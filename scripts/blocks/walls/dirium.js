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
  
  draw(){
    Draw.rect(this.region, tile.drawx(), tile.drawy());
  },
  
  handleBulletHit(entity, bullet){
    entity.damage(bullet.damage());
    
    Effects.effect(wallEffect, this);
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
  
  draw(){
    Draw.rect(this.region, tile.drawx(), tile.drawy());
  },
  
  handleBulletHit(entity, bullet){
    entity.damage(bullet.damage());
    
    Effects.effect(wallEffectLarge, this);
  }
});

