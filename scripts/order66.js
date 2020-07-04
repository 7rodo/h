const reverseCircle = newEffect(20, e => {
  Draw.color(Pal.lancerLaser, Color.white, e.fin())
  Lines.stroke(e.fin() * 3)
  Lines.circle(e.x, e.y, e.fout() * 65)
});

const order = extendContent(Block, "order66", {
  buildConfiguration(tile, table){
    table.addImageButton(Icon.eye, Styles.clearTransi, run(() => {
      tile.configure(0)
    })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid() && !tile.entity.power.status > 0.001))
  },

  configured(tile, value){
    if(tile.entity.cons.valid() && tile.entity.power.status > 0.001){
      Damage.damage(tile.drawx(), tile.drawy(), 1250 * 8, Mathf.random(540, 840) * Mathf.random(1, 4))
    }
  },

  update(tile){
    if(tile.entity.power.status > 0.001){
      if(Mathf.chance(0.005)){
        Effects.effect(reverseCircle, tile.drawx(), tile.drawy())
      }

      if(Mathf.chance(0.04)){
        Lightning.create(Team.crux, Pal.lancerLaser, Mathf.random(2.7, 9.6), tile.drawx() + Mathf.random(-60, 60), tile.drawy() + Mathf.random(-60, 60), Mathf.random(360), Mathf.random(4, 11))
      }
    }
  }
});

