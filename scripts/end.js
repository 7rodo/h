const end = extendContent(Block, "end", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find(this.name + "-top");
  },

  generateIcons(){
    return [
      Core.atlas.find(this.name),
      Core.atlas.find(this.name + "-top")
    ]
  },

  buildConfiguration(tile, table){
    table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
      tile.configure(0)
    })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.power.status > 0.001))
  },

  configured(tile, value){
    if(tile.entity.power.status > 0.001){
      Call.onGameOver(Vars.player.getTeam())
    }
  },

  draw(tile){
    Draw.rect(this.region, tile.drawx(), tile.drawy())
    Draw.color(tile.getTeam().color)
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy())
    Draw.reset()
  }
})

