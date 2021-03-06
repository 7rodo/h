const tmpColor = new Color();
const colors = [Color.valueOf("8a63eb"), Color.valueOf("b099eb"), Color.valueOf("d2c9eb"), Color.white];
const tscales = [0.8, 0.6, 0.5, 0.2];
const strokes = [1.6, 1.3, 0.7, 0.2];
const lenscales = [1, 1.1, 1.13, 1.15];
const length = 210;

const streakLaser = extend(BasicBulletType, {
  update(b){
    if(b.timer.get(1, 5)){
      Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length, true);
    }

    if(Mathf.chance(0.9)){
      Lightning.create(b.getTeam(), colors[2], Mathf.random(2, 7), b.x, b.y, Mathf.random(360), Mathf.random(10, 18));
    }
  },
  draw(b){
    var baseLen = length * b.fout();

    Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
      for(var s = 0; s < colors.length; s++){
        Draw.color(tmpColor.set(colors[s]).mul(1 + Mathf.absin(Time.time(), 1, 0.1)));
         for(var i = 0; i < tscales.length; i++){
           Tmp.v1.trns(b.rot() + 180, (lenscales[i] - 1) * 35);
           Lines.stroke((9 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
           Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), baseLen * lenscales[i], CapStyle.none);
         }
      }
    Draw.reset();
  }
});

streakLaser.speed = 0.01;
streakLaser.lifetime = 16;
streakLaser.pierce = true;
streakLaser.hitSize = 6;
streakLaser.drawSize = 400;
streakLaser.collides = true;
streakLaser.collidesGround = true;
streakLaser.collidesAir = true;
streakLaser.collidesTiles = true;
streakLaser.damage = 86;
streakLaser.shootEffect = Fx.none;
streakLaser.smokeEffect = Fx.none;
streakLaser.despawnEffect = Fx.none;
streakLaser.hitEffect = Fx.none;

const streakSquare = newEffect(18, h => {
  Draw.alpha(0.6);
  Draw.color(colors[2], colors[1], h.fin());
  Lines.circle(h.x, h.y, h.fout() * 30);
});

const streak = extendContent(LaserTurret, "streak", {
  load(){
    this.super$load();

    this.region = Core.atlas.find(this.name);
    this.baseRegion = Core.atlas.find("block-3");
    this.heatRegion = Core.atlas.find(this.name + "-heat");
  },

  draw(tile){
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy())
    Draw.color();

    if(tile.entity.power.status > 0.0001){
      if(Mathf.chance(0.005)){
        Effects.effect(streakSquare, tile.drawx(), tile.drawy())
      }
    }
  }
});

streak.shootType = streakLaser;
streak.update = true;
