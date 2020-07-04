const order = extendContent(Block, "order66", {
  buildConfiguration(tile, table){
    table.addImageButton(Icon.eye, Styles.clearTransi, run(() => {
      tile.configure(0)
    })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid() && !tile.entity.power.status > 0.001))
  },

  configured(tile, value){
    if(tile.entity.cons.valid() && tile.entity.power.status > 0.001){
      tile.entity.cons.trigger()
    }
  }
})

