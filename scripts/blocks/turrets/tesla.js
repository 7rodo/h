const color1 = Color.valueOf("fafafa");
const color2 = Color.valueOf("ebebeb");

const teslaSmoke = newEffect(30, e => {
  Draw.color(color1);
  Fill.circle(e.x, e.y, e.fin() * 4);

  Draw.color(color2);
  Fill.circle(e.x, e.y, e.fin() * 3);
});

const laserShoot = newEffect(21, e => {
  Draw.color(color1);
  
  for(var h = 0; h < 2; h++){
    var hh = Mathf.signs[h];
    Drawf.tri(e.x, e.y, 4 * e.fout(), 29, e.rotation + 90 * hh);
  }
});

const teslaShoot = newEffect(21, e => {
  Draw.color(color1);

  Fill.circle(e.x, e.y, e.fin() * 4);
});

const colors = [color1, color2, Color.valueOf("ffffff")];
const tscales = [0.5, 0.4, 0.3, 0.2];
const lenscales = [1, 1.1, 1.13, 1.14];
const length = 99;

const teslaLaser = extend(BasicBulletType, {
  update(b){
    Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length);
  },  
  draw(b){
    f = Mathf.curve(b.fin(), 0, 0.2);
    baseLen = length * f;

    Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
      for(s = 0; s < 3; s++){
      Draw.color(colors[s]);
      for(i = 0; i < tscales.length; i++){
        Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales[i]);
        Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
      }
    }
    Draw.reset();
  }
});

teslaLaser.speed = 0.9;
teslaLaser.lifetime = 13;
teslaLaser.pierce = true;
teslaLaser.hitSize = 6;
teslaLaser.collides = true;
teslaLaser.collidesGround = true;
teslaLaser.collidesAir = false;
teslaLaser.collidesTiles = false;
teslaLaser.damage = 2;
teslaLaser.shootEffect = laserShoot;
teslaLaser.smokeEffect = Fx.none;
teslaLaser.despawnEffect = Fx.none;
teslaLaser.hitEffect = Fx.none;
teslaLaser.lightining = 4;
teslaLaser.lightingLength = 6;
teslaLaser.hitShake = 0.2;


const tesla = extendContent(PowerTurret, "tesla", {});

tesla.shootType = teslaLaser;
tesla.shootEffect = laserShoot;
tesla.smokeEffect = teslaSmoke;
