const ulib = require("ulib");

const summonEffect = newEffect(10, e => {
  Draw.color(Pal.lancerLaser);
  Lines.square(e.x, e.y, 10 * e.fin(), 45);
})

const deadEffect = newEffect(12, e => {
  Draw.color(Pal.lancerLaser);
  Lines.circle(e.x, e.y, 40 * e.fin());
});

const orb = extend(BasicBulletType, {
  draw(b){
  },

  init(b){
    if(!b) return;

    ulib.spawnUnit(UnitTypes.dagger, b.getTeam(), b.x, b.y)
  }
});

orb.damage = 0;
orb.hitEffect = Fx.none;
orb.shootEffect = Fx.none;
orb.despawnEffect = Fx.none;
orb.shootEffect = summonEffect;
orb.smokeEffect = Fx.none;

const summonerWeapon = extendContent(Weapon, "summoner-equip", {
  load(){
    this.region = Core.atlas.find("clear")
  }
});

summonerWeapon.reload = 360;
summonerWeapon.shootSound = Sounds.wave;
summonerWeapon.bullet = orb;

const summoner = extendContent(UnitType, "summoner", {
  load(){
    this.weapon.load();
    this.region = Core.atlas.find(this.name);
    this.baseRegion = Core.atlas.find(this.name + "-base");
    this.legRegion = Core.atlas.find("clear");
  }
});

summoner.create(prov(() => extend(GroundUnit, {
    onDeath(){
      Effects.effect(deadEffect, this);
      Effects.shake(2, 2, this);

      Sounds.bang.at(this);
      this.item.amount = 0;
      this.drownTime = 0;
      Events.fire(EventType.UnitDestroyEvent(this));
    }
})));

summoner.weapon = summonerWeapon;
