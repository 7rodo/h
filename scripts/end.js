const end = extendContent(Block, "end", {
  buildConfiguration(tile, table){
    table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
      tile.configure(0)
    })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.power.status > 0.001))
  },

  configured(tile, value){
    if(tile.entity.power.status > 0.001){
      Call.onGameOver(Vars.player.getTeam())
    }
  }
})

