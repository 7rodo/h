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

const colors1 = [color1, color2, Color.valueOf("ffffff")];
const tscales1 = [0.3, 0.2, 0.15, 0.1];
const lenscales1 = [1, 1.1, 1.13, 1.14];
const length1 = 9;

const teslaFrag = extend(BasicBulletType, {
  update(b){
    Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length1);
  },  
  draw(b){
    f1 = Mathf.curve(b.fin(), 0, 0.2);
    baseLen1 = length1 * f1;

    Lines.lineAngle(b.x, b.y, b.rot(), baseLen1);
      for(p = 0; p < 3; p++){
      Draw.color(colors1[p]);
      for(g = 0; g < tscales.length; g++){
        Lines.stroke(7 * b.fout() * (s == 0 ? 1 : s == 1 ? 1 : 0.1) * tscales1[g]);
        Lines.lineAngle(b.x, b.y, b.rot(), baseLen1 * lenscales1[g]);
      }
    }
    Draw.reset();
  }
});

teslaFrag.speed = 1.1;
teslaFrag.lifetime = 9;
teslaFrag.pierce = true;
teslaFrag.hitSize = 3;
teslaFrag.collides = true;
teslaFrag.collidesGround = true;
teslaFrag.collidesAir = false;
teslaFrag.collidesTiles = false;
teslaFrag.damage = 0.26;
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
    Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length);
  },  
  
  hit(b, hitx, hity){
   	if(hitx != null && hity != null && b.getData() != null && b.getData()[1]){			
      //var angle = Angles.angle(b.x, b.y, hitx, hity);			
      Effects.effect(this.hitEffect, hitx, hity, b.rot());			
      len = Mathf.dst(b.x, b.y, hitx, hity);			
      b.getData()[0] = len;			
      b.getData()[1] = false;			
      //b.setData(len);	
      //Stolen from AdvanceContent's Eclipse hit(b, hitx, hity)
    }
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
teslaLaser.fragBullet = teslaFrag;
teslaLaser.fragBullets = 2;
teslaLaser.fragVelocityMin = 0;
teslaLaser.fragVelocityMax = 0.2;
teslaLaser.hitShake = 0.2;


const tesla = extendContent(PowerTurret, "tesla", {});

tesla.shootType = teslaLaser;
tesla.shootEffect = laserShoot;
tesla.smokeEffect = teslaSmoke;
