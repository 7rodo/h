const color1 = Color.valueOf("fafafa");
const color2 = Color.valueOf("ebebeb");

const teslaSmoke = newEffect(65, e => {
  Draw.color(color1);
  Fill.circle(e.x, e.y, e.fin() * 3);

  Draw.color(color2);
  Fill.circle(e.x, e.y, e.fin() * 2);
});

const teslaShoot = newEffect(21, e => {
  Draw.color(color1);

  Fill.circle(e.x, e.y, e.fin() * 2);
});

const teslaLaser = extend(BasicBulletType, {
  draw(b){
    const colors = [color1, color2, Color.valueOf("ffffff")];
    const tscales = [0.5, 0.4, 0.3, 0.2];
    const lenscales = [1, 1.1, 1.13, 1.14];
    const length = 99;

    f = Mathf.curve(b.fin(), 0, 0.2);
    baseLen = length * f;

    Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
      for(s = 0; s < 3; s++){
      Draw.color(colors[s]);
      for(i = 0; i < tscales.length; i++){
        Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.5) * tscales[i]);
        Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
      }
    }
    Draw.reset();
  }
});

teslaLaser.speed = 5;
teslaLaser.lifetime = 15;
teslaLaser.pierce = true;
teslaLaser.hitSize = 6;
teslaLaser.collides = true;
teslaLaser.collidesGround = true;
teslaLaser.collidesAir = false;
teslaLaser.collidesTiles = false;
teslaLaser.damage = 16;
teslaLaser.shootEffect = Fx.none;
teslaLaser.smokeEffect = Fx.none;
teslaLaser.despawnEffect = Fx.none;
teslaLaser.hitEffect = Fx.none;
teslaLaser.lightining = 3;
teslaLaser.lightningLength = 5;


const tesla = extendContent(PowerTurret, "tesla", {});

tesla.shootType = teslaLaser;
tesla.shootEffect = teslaShoot;
tesla.smokeEffect = teslaSmoke;
