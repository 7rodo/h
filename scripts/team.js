const team = extendContent(Block, "team", {
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

    table.addImageButton(Icon.wrench, Styles.clearTransi, run(() => {
      tile.configure(0)
    })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.power.status > 0.001))

    table.addImageButton(Icon.add, Styles.clearTransi, run(() => {
      tile.configure(1)
    })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.power.status > 0.001))

  },

  configured(tile, value){
    if(tile.entity.power.status > 0.001){
      try {
        if(this.value == 0){
          print("h")
        } else

        if(this.value == 1){
          print("hh")
        }
      } catch(err){print(err)}
    }
  },

  draw(tile){
    Draw.rect(this.region, tile.drawx(), tile.drawy())
    Draw.color(tile.getTeam().color)
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy())
    Draw.reset()
  }
})
