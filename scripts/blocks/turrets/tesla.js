const color1 = Color.valueOf("fafafa");

const teslaSmoke = newEffect(65, e => {
  Draw.color(color1);
  Fill.circle(e.x, e.y, e.fin() * 3);

  Draw.color();
  Fill.circle(e.x, e.y, e.fin() * 2);
});

const teslaShoot = newEffect(21, e => {
  Draw.color(color1);

  for(i : Mathf.signs){
    Drawf.tri(e.x, e.y, 4 * e.fout(), 29, e.rotation + 90 * i);
  }
});

const teslaLaser = extend(BasicBulletType, {
  draw(b){
    const colors = [color1.cpy().mul(1, 1, 1, 0.4), color1, Color.white];
    const tscales = [1, 0.7, 0.5, 0.2];
    const lenscales = [1, 1.1, 1.13, 1.14];
    const length = 95;

    f = Mathf.curve(b.fin(), 0, 0.2);
    baseLen = 95 * f;

    Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
      for(int s = 0; s < 3; s++){
      Draw.color(colors[s]);
      for(int i = 0; i < tscales.length; i++){
        Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales[i]);
        Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
      }
    }
    Draw.reset();
  }
});

teslaLaser.lifetime = 16;
teslaLaser.pierce = true;
teslaLaser.hitSize = 4;
teslaLaser.collidesAir = false;
teslaLaser.damage = 8
teslaLaser.damage
teslaLaser.splashDamage = 8;
teslaLaser.shootEffect = Fx.none;
teslaLaser.smokeEffect = Fx.none;
teslaLaser.despawnEffect = Fx.none;
teslaLaser.hitEffect = Fx.none;


const tesla = extendContent(LaserTurret, "tesla", {});

tesla.shootType = teslaLaser;
tesla.shootEffect = teslaShoot;
tesla.smokeEffect = teslaSmoke;
