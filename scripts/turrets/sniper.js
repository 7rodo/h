sniperBulletconst sniperBullet = extend(BasicBulletType, {

})
sniperBullet.speed = 2;
sniperBullet.damage = 500 * Mathf.random(1, 5);
sniperBullet.lifetime = 20;
sniperBullet.hitSize = 8;
sniperBullet.drawSize = 40;
sniperBullet.knockback = 0.15;
sniperBullet.recoil = 0.7;
sniperBullet.inaccuracy = 0;
sniperBullet.hitEffect = Fx.none;
sniperBullet.shootEffect = Fx.shootBig;
sniperBullet.smokeEffect = Fx.shootBigSmoke;
sniperBullet.despawnEffect = Fx.none;


const sniper = extendContent(ItemTurret, "sniper", {
  load(){
    this.super$load();

    this.laserRegion = Core.atlas.find("h-sniper-laser");
    this.laserEndRegion = Core.atlas.find("clear");
    this.layer2 = Layer.power;
  },

  bullet(tile, type){
    var entity = tile.ent();

    Bullet.create(type, tile.entity, tile.getTeam(), entity.target.getX(), entity.target.getY(), 0, 1, 1);
  },

  drawLayer2(tile){
    var entity = tile.ent();

    if(entity.cons.valid() && entity.target != null){
      if(Angles.angleDist(entity.angleTo(entity.target), entity.rotation) < this.shootCone){
        var ang = entity.angleTo(entity.target);
        var len = 3;

        Draw.alpha(0.4);
        Drawf.laser(this.laserRegion, this.laserEndRegion,
          tile.drawx() + Angles.trnsx(ang, len),
          tile.drawy() + Angles.trnsy(ang, len),
          entity.target.getX(), entity.target.getY(), entity.heat * 0.50 * entity.efficiency());
        Draw.color();
      }
    }
  }
});
