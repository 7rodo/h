const primeColor = Color.valueOf("#ff6b4a");
const effectColor1 = Color.valueOf("#f27356");
const effectColor2 = Color.valueOf("#f26747");
const popEffect = newEffect(20, e => {
	Draw.color(primeColor, effectColor1, e.fin());
	const hh = new Floatc2({get: function(x, y){
	  Draw.color(effectColor1, effectColor2, e.fin());
		Fill.circle(e.x, e.y, e.fin() * 3);
	}});
	//randLenVectors(long seed, int amount, float length, float angle, float range, Floatc2 const)
	Angles.randLenVectors(e.id, 8, e.fout(), e.rotation, 10, hh);
});

const melt = new StatusEffect("melt");
  melt.damageMultiplier = 1;
  melt.speedMultiplier = 0.5;
  melt.armorMultiplier = 1;
  melt.damage = 0.6;
  melt.color = effectColor1;
  melt.effect = popEffect;
  
const lava = extendContent(Liquid, "lava", {});
  lava.temperature = 1;
  lava.flammability = 1;
  lava.viscosity = 0.8;
  lava.color = primeColor;
  lava.lightColor = Color.valueOf("f27356");
  lava.effect = burning;
