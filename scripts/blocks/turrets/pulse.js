const primeColor = Color.valueOf("dbef2");

const disabled = new StatusEffect("disabled");
  disabled.damageMultiplier = 0;
  disabled.armorMultiplier = 0.8;
  disabled.speedMultiplier = 0;
  disabled.damage = 0;
  disanled.effect = Fx.none;
  disabled.color = primeColor;

const pulseCircle = newEffect(120, e => {
  Draw.color(primeColor);
  
  Lines.stroke(e.fout() * 9);
  Lines.circle(e.x, e.y, e.fin() * 15);
});

const pulseRad = extend(BasicBullrtType, {
  draw(b){
    Effects.effect(pulseCircle, tile.drawx(), tile.drawy());
  }
});

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
    Draw.rect(this.spinRegion, tile.drawx(), tile.drawy(), tile.entity.rotation() += 8);
  },
  
  update(tile){
    
  },
  
  shouldTurn(tile){
    
  }
});
