const ulib = require("ulib");

const deadEffect = newEffect(12, e => {
  Draw.color(Pal.lancerLaser, Color.white, e.fin());
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
orb.shootEffect = Fx.none;
orb.smokeEffect = Fx.none;

const summonerWeapon = extendContent(Weapon, "summoner-equip", {
  load(){
    this.region = Core.atlas.find("clear")
  }
});

summonerWeapon.reload = 600;
summonerWeapon.shootSound = Sounds.wave;
summonerWeapon.bullet = orb;

const summoner = extendContent(UnitType, "summoner", {
  load(){
    this.weapon.load();
    this.region = Core.atlas.find(this.name);
    this.baseRegion = Core.atlas.find(this.name + "-base");
    this.legRegion = Core.atlas.find(this.name + "-leg");
  }
}, prov(() => extend(GroundUnit, {})));

summoner.weapon = 
