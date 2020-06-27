const gu = extendContent(Block, "giveup", {
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    configured(tile, value){
        if(tile.entity.cons.valid()){
            Call.onGameOver(Vars.player.getTeam());
            tile.entity.cons.trigger();
        }
    }
})
