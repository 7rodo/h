const sniperBullet = extend(BasicBulletType, {});

sniperBullet.speed = 16;
sniperBullet.damage = 500
sniperBullet.lifetime = 200;
sniperBullet.hitSize = 8;
sniperBullet.drawSize = 40;
sniperBullet.knockback = 0.15;
sniperBullet.recoil = 0.7;
sniperBullet.inaccuracy = 0;
sniperBullet.hitEffect = Fx.flakExplosionBig;
sniperBullet.shootEffect = Fx.shootBig;
sniperBullet.smokeEffect = Fx.shootBigSmoke;
sniperBullet.despawnEffect = Fx.flakExplosionBig
sniperBullet.bulletWidth = 15;
sniperBullet.bulletHeight = 20;
sniperBullet.bulletShrink = 0.5;

const sniperBulletFlame = extend(BasicBulletType, {
  hitTile(b, tile){
    Fire.create(tile);
  }
});

sniperBulletFlame.speed = 16;
sniperBulletFlame.damage = 480
sniperBulletFlame.lifetime = 200;
sniperBulletFlame.hitSize = 8;
sniperBulletFlame.drawSize = 40;
sniperBulletFlame.knockback = 0.15;
sniperBulletFlame.recoil = 0.7;
sniperBulletFlame.inaccuracy = 0;
sniperBulletFlame.hitEffect = Fx.flakExplosionBig;
sniperBulletFlame.shootEffect = Fx.shootBig;
sniperBulletFlame.smokeEffect = Fx.shootBigSmoke;
sniperBulletFlame.despawnEffect = Fx.flakExplosionBig;
sniperBulletFlame.bulletWidth = 15;
sniperBulletFlame.bulletHeight = 20;
sniperBulletFlame.bulletShrink = 0.5;

const sniperBulletExp = extend(BasicBulletType, {});

sniperBulletExp.speed = 16;
sniperBulletExp.damage = 240;
sniperBulletExp.lifetime = 200;
sniperBulletExp.hitSize = 8;
sniperBulletExp.drawSize = 40;
sniperBulletExp.knockback = 0.3;
sniperBulletExp.recoil = 0.7;
sniperBulletExp.inaccuracy = 0;
sniperBulletExp.splashDamage = 360;
sniperBulletExp.splashDamageRadius = 48;
sniperBulletExp.hitEffect = Fx.explosion;
sniperBulletExp.shootEffect = Fx.shootBig;
sniperBulletExp.smokeEffect = Fx.shootBigSmoke;
sniperBulletExp.despawnEffect = Fx.explosion;
sniperBulletExp.status = StatusEffects.burning;
sniperBulletExp.bulletWidth = 15;
sniperBulletExp.bulletHeight = 20;
sniperBulletExp.bulletShrink = 0.5;

const sniper = extendContent(ItemTurret, "sniper", {
  init(){
    sniper.ammo(
      Items.graphite, sniperBullet,
      Items.pyratite, sniperBulletFlame,
      Items.blastCompound, sniperBulletExp
    );
    this.super$init();
  },

  load(){
    this.super$load();

    this.laserRegion = Core.atlas.find("h-sniper-laser");
    this.laserEndRegion = Core.atlas.find("clear");
    this.layer2 = Layer.power;
  },

  drawLayer2(tile){
    var entity = tile.ent();

    if(entity.target != null){
      if(Angles.angleDist(entity.angleTo(entity.target), entity.rotation) < this.shootCone){
        var ang = entity.angleTo(entity.target);
        var len = 3;

        Draw.alpha(0.4);
        Drawf.laser(this.laserRegion, this.laserEndRegion,
          tile.drawx() + Angles.trnsx(ang, len),
          tile.drawy() + Angles.trnsy(ang, len),
          entity.target.getX(), entity.target.getY(), 0.2);
        Draw.color();
      }
    }
  }
});
