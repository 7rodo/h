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

  configured(tile, player, value){
    if(tile.entity.power.status > 0.001){
      var handle = [
        //stolen from ritzip's unit spawner, see https://github.com/ritzip/testing for the h
        (tile, player) => tile.entity.setTeam((tile.entity.team().id + 1) > 5 ? 0 : tile.entity.team().id + 1),
        (tile, player) => Vars.player.setTeam(tile.entity.team())
       ];

       handle[value](tile, player);
    }
  },

  draw(tile){
    Draw.rect(this.region, tile.drawx(), tile.drawy())
    Draw.color(tile.entity.team().color)
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy())
    Draw.reset()
  }
});

team.entityType = prov(() => extend(TileEntity, {
  _team: Team.sharded,

  team(){ return this._team },
  setTeam(team){ this._team = Team.get(team) },
}));
