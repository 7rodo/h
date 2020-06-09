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
disabled.speedMultiplier = 0;
disabled.damage = 0;
disabled.effect = Fx.none;
disabled.color = primeColor;

const pulseHit = newEffect(15, e => {
  Draw.color(primeColor, secColor, e.fin());
  
  Fill.square(e.x, e.y, 4 + e.fin() * 3)
});

const pulseCircle = newEffect(360, e => {
  Draw.color(primeColor);
  
  Lines.stroke(e.fout() * 5);
  Lines.circle(e.x, e.y, e.fin() * 200);
});

const pulseRad = extend(BasicBulletType, {
  draw(b){
  }
});

pulseRad.speed = 9;
pulseRad.lifetime = 360;
pulseRad.damage = 0;
pulseRad.pierce = true;
pulseRad.shootEffect = pulseCircle;
pulseRad.hitEffect = Fx.none;
pulseRad.despawnEffect = Fx.none;
pulseRad.smokeEffect = Fx.none;
pulseRad.status = disabled;
pulseRad.statusDuration = 800;


const pulse = extendContent(PowerTurret, "pulse", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.heatRegion = Core.atlas.find(this.name + "-heat");
    this.baseRegion = Core.atlas.find(this.name + "-base");
    this.spinRegion = Core.atlas.find(this.name + "-spin");
  },
  
  generateIcons(){
    return [
      Core.atlas.find(this.name + "-base"),
      Core.atlas.find(this.name + "-spin"),
      Core.atlas.find(this.name)
    ]
  },
  
  draw(tile){
    Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
    if(tile.entity.power.status > 0.001){
      Draw.rect(this.spinRegion, tile.drawx(), tile.drawy(), Time.time() * 0.4);
    } else {
        Draw.rect(this.spinRegion, tile.drawx(), tile.drawy());
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

pulse.shootType = pulseRad;
