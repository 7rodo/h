module.exports = {
  spawnUnit(unit, team, x, y){
    if(unit === undefined){
      unit = UnitTypes.crawler;
    }

    var baseunit= unit.create(team);

    baseunit.set(x, y);
    baseunit.add();
    Events.fire(new EventType.UnitCreateEvent(baseunit));
    return baseunit;
  }
}
