const wallEffect = newEffect(10, e => {
  Draw.color(Color.valueOf("73a4ff"));
  Lines.stroke(e.fout() * 3);
  Lines.square(e.x, e.y, 7 + e.fin() * 4);
  
  Draw.color(Color.valueOf("91b7ff"));
  Draw.alpha(0.2);
  Fill.square(e.x, e.y, 7 + e.fin() * 4);
});

const shieldWall = extendContent(Wall, "shieldwall", {
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
    
    if(tile.entity.power.status > 0.001){
      Effects.effect(wallEffect, tile.drawx(), tile.drawy(), tile.rotation());
    }
  },
  
  onDestroyed(tile){
    if(!tile.floor().solid && !tile.floor().isLiquid){
      RubbleDecal.create(tile.drawx(), tile.drawy(), this.size);
    }
  },
  
  handleBulletHit(tile, entity, bullet){
    if(tile.entity.power.status > 0.001){
      entity.damage(bullet.damage() / 3);  
    } else {
        entity.damage(bullet.damage());
      }
    
    if(entity != null && bullet != null){
      Effects.effect(wallEffect, entity.x, entity.y, entity.rotation - 90);
    }
  }
});
