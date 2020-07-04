const order = extendContent(Block, "order66", {
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid() && !tile.entity.power.status > 0.001))
    },

    configured(tile, value){
        if(tile.entity.cons.valid() && tile.entity.power.status > 0.001){

            for(var i = 0; i < 15; i++){
                Calls.createBullet(Bullets.flakExplosive, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
            }
            tile.entity.cons.trigger()
        }
    }
})

