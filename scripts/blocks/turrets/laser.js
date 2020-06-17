const laser = extendContent(PowerTurret, "laser", {
  load(){
    this.super$load();
    
    this.laserRegion = Core.atlas.find("laser");
    this.laserEndRegion = Core.atlas.find("laser-end");
    this.layer2 = Layer.power;
  },
  
  bullet(tile, type){
    Bullet.create(type, tile.entity, tile.getTeam(), entity.target.getX(), entity.target.getY(), 0, 1, 1);
  },
  
  drawLayer2(tile){
    var entity = tile.ent();
    
    if (entity.cons.valid() && entity.target != null){
      if (Angles.angleDist(entity.angleTo(entity.target), entity.rotation) < this.shootCone){
        var ang = entity.angleTo(entity.target);
        var len = 5;
        
        Draw.color(Color.valueOf("d3ebff"));
        Drawf.laser(this.laserRegion, this.laserEndRegion, 
          tile.drawx() + Angles.trnsx(ang, len),
          tile.drawy() + Angles.trnsy(ang, len),
          entity.target.getX(), entity.target.getY(), entity.heat * 0.4 * entity.efficiency());
        Draw.color();
      }
    }
  },
  
  shouldActiveSound(tile){
    var entity = tile.ent();
    
    if(tile != null && entity.target != null && entity.cons.valid()){
      return Angles.angleDist(entity.angleTo(entity.target), entity.rotation) < this.shootCone;
    } else {
        return false;
      }
  }
})
