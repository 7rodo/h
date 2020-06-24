const primeColor = Color.valueOf("8dbef2");
const secColor = Color.valueOf("9fcdff");

const disabled = extendContent(StatusEffect, "disabled", {
  update(unit, time){
    this.super$update(unit, time);
    
    unit.getTimer().get(unit.getShootTimer(true), 1);
    unit.getTimer().get(unit.getShootTimer(false), 1);
  }
});

disabled.damageMultiplier = 0;
disabled.armorMultiplier = 0.8;
disabled.speedMultiplier = 0.00000001;
disabled.damage = 0;
disabled.effect = Fx.none;
disabled.color = primeColor;

const pulseHit = newEffect(20, e => {
  Draw.color(primeColor, secColor, e.fin());
  
  Lines.stroke(3 * e.fout());
  Lines.square(e.x, e.y, 4 + e.fin() * 3, 45);
});

const pulseCircle = newEffect(80, e => {
  Draw.color(primeColor);
  
  Lines.stroke(e.fout() * 5);
  Lines.circle(e.x, e.y, e.fin() * 200);
});

const pulseRad = extend(BasicBulletType, {
  draw(b){
  },
});

pulseRad.speed = 0.001;
pulseRad.lifetime = 1;
pulseRad.damage = 0;
pulseRad.knockback = 0;
pulseRad.recoil = 0;
pulseRad.pierce = false;
pulseRad.drawSize = 0;
pulseRad.hitSize = 1;
//pulseRad.splashDamage = 0;
//pulseRad.splashDamageRadius = 250;
pulseRad.shootEffect = Fx.none;
pulseRad.hitEffect = pulseHit;
pulseRad.despawnEffect = Fx.none;
pulseRad.smokeEffect = Fx.none;
pulseRad.status = disabled;
pulseRad.statusDuration = 190;

const pulseDis = extend(BasicBulletType, {
  draw(b){
    
  },
  
  update(b){
    const hh = false
    
    Units.nearbyEnemies(b.getTeam(), b.x - 180, b.y - 180, b.x * 180, b.y * 180, cons(unit => {
      if(unit.withinDst(b.x, b.y, 180)){ 
        if(!unit.isDead() && unit instanceof HealthTrait){
          Calls.createBullet(pulseRad, b.getTeam(), unit.x, unit.y, 0, 1, 1);
          if(!hh){
            hh = true;
          }
        }
      }
    }));
  }
});

pulseRad.hitSize = 1;
pulseRad.drawSize = 0;
pulseDis.damage = 0;
pulseDis.knockback = 0;

const pulse = extendContent(PowerTurret, "pulse", {
  load(){
    this.region = Core.atlas.find("clear");
    this.heatRegion = Core.atlas.find("clear");
    this.baseRegion = Core.atlas.find(this.name);
    this.lightRegion = Core.atlas.find(this.name + "-light");
    this.topRegion = Core.atlas.find(this.name + "-top");
    this.rotRegion = Core.atlas.find(this.name + "-rot");
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name),
      Core.atlas.find(this.name + "-rot"),
      Core.atlas.find(this.name + "-top")
    ]
  },
  
  draw(tile){
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
    Draw.rect(this.rotRegion, tile.drawx(), tile.drawy(), Time.time() * 3.4);
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
    if(tile.entity.power.status > 0.001){
      Draw.alpha(Mathf.random(0.2, 0.3));
      Draw.rect(this.lightRegion, tile.drawx(), tile.drawy());
      Draw.reset();
    } 
  },
  
  update(tile){
    this.super$update(tile);
  },
  
  shouldTurn(tile){
    this.super$shouldTurn(tile);
    return true;
  }
});

pulse.shootType = pulseDis;
pulse.shootEffect = pulseCircle;
