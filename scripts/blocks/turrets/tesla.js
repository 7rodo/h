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
    const tscales = [0.9, 0.6, 0.4, 0.1];
    const lenscales = [0.9, 1, 1.1, 1.12];
    const length = 95;

    f = Mathf.curve(b.fin(), 0, 0.2);
    baseLen = 95 * f;

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

teslaLaser.lifetime = 16;
teslaLaser.pierce = false;
teslaLaser.hitSize = 4;
teslaLaser.collidesAir = false;
teslaLaser.damage = 8
teslaLaser.damage
teslaLaser.splashDamage = 8;
teslaLaser.shootEffect = Fx.none;
teslaLaser.smokeEffect = Fx.none;
teslaLaser.despawnEffect = Fx.none;
teslaLaser.hitEffect = Fx.none;


const tesla = extendContent(PowerTurret, "tesla", {});

tesla.shootType = teslaLaser;
tesla.shootEffect = teslaShoot;
tesla.smokeEffect = teslaSmoke;