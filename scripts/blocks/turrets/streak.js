const tmpColor = new Color();
const colors = [Color.valueOf("8a63eb"), Color.valueOf("b099eb"), Color.valueOf("d2c9eb"), Color.white];
const tscales = [1, 0.7, 0.5, 0.2];
const strokes = [2, 1.5, 1, 0.3];
const lenscales = [1, 1.12, 1.15, 1.17];
const length = 210;

const streakLaser = extend(BasicBulletType, {
  update(b){
    if(b.timer.get(1, 5)){
      Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length, true);
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
streakLaser.damage = 96;
streakLaser.shootEffect = Fx.none;
streakLaser.smokeEffect = Fx.none;
streakLaser.despawnEffect = Fx.none;
streakLaser.hitEffect = Fx.none;

const streak = extendContent(LaserTurret, "streak", {});

streak.shootType = streakLaser;
streak.update = true;
