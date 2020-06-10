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
    Drawf.tri(e.x, e.y, 4 * e.fout(), 29, e.rotation + 67 * hh);
  }
});

const teslaShoot = newEffect(21, e => {
  Draw.color(color1);

  Fill.circle(e.x, e.y, e.fin() * 8);
});

const teslaHit = newEffect(21, e => {
  Draw.color(color1, color2, e.fin());

  Fill.circle(e.x, e.y, e.fin() * 4);
});

const colors1 = [color1, color2, Color.valueOf("ffffff")];
//const tscales1 = [0.3, 0.2, 0.15, 0.1];
//const lenscales1 = [1, 1.1, 1.13, 1.14];
const length1 = 3;

const teslaFrag = extend(BasicBulletType, {
  draw(b){
    Lightning.create(b.getTeam(), color1, this.damage, b.x, b.y, b.rot(), length1);
  },  
                     
  update(b){
  }
});

teslaFrag.lifetime = 1;
teslaFrag.pierce = false;
teslaFrag.hitSize = 3;
teslaFrag.damage = 1.12;
teslaFrag.collides = true;
teslaFrag.collidesGround = true;
teslaFrag.collidesAir = false;
teslaFrag.collidesTiles = false;
teslaFrag.shootEffect = Fx.none;
teslaFrag.smokeEffect = Fx.none;
teslaFrag.despawnEffect = Fx.none;
teslaFrag.hitEffect = Fx.none;

const colors = [color1, color2, Color.valueOf("ffffff")];
const tscales = [0.5, 0.4, 0.3, 0.2];
const lenscales = [1, 1.1, 1.13, 1.14];
const length = 99;

const teslaLaser = extend(BasicBulletType, {
  update(b){
    Damage.collideLine(b, b.getTeam(), Fx.none, b.x, b.y, b.rot(), length, true);
  },  
  
  draw(b){
    const f = Mathf.curve(b.fin(), 0, 0.1);
    const baseLen = length * f;

    Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
      for(s = 0; s < 3; s++){
      Draw.color(colors[s])
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
teslaLaser.drawSize = 99;
teslaLaser.collides = true;
teslaLaser.collidesGround = true;
teslaLaser.collidesAir = false;
teslaLaser.collidesTiles = false;
teslaLaser.damage = 1.775;
teslaLaser.shootEffect = laserShoot;
teslaLaser.smokeEffect = Fx.none;
teslaLaser.despawnEffect = Fx.none;
teslaLaser.hitEffect = Fx.none;
/*
teslaLaser.lightining = 4;
teslaLaser.lightingLength = 6;
*/
teslaLaser.fragBullet = teslaFrag;
teslaLaser.fragBullets = 2;
teslaLaser.fragVelocityMin = 0;
teslaLaser.fragVelocityMax = 0.2;
//teslaLaser.hitShake = 0.2;


const tesla = extendContent(PowerTurret, "tesla", {});

tesla.shootType = teslaLaser;
tesla.shootEffect = laserShoot;
tesla.smokeEffect = teslaSmoke;
