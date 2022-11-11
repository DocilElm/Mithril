import PogObject from "PogData";
export const PREFIX = "&9[Mithril] ";
export let data = new PogObject("Mithril", {
    "refined_mithril": 0,
    "refined_titanium": 0,
    "compact_mithril": 0,
    "compact_titanium": 0,
    "powder_per_goblin": 0,
    "goblin_killed": 0,
    "goblins": 0,
    "x": 0,
    "y": 0,
    "first_time": true
}, ".mithril_data.json");
export const short_number = (num) => {
    if(num == undefined) return;
    return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
export let abc = new Gui()
register("command", () => {
      abc.open();
}).setName("mithrildisplayrender");
register("dragged", (dx, dy, x, y) => {
      if (!abc.isOpen()) return
      data.x = x
      data.y = y
      data.save()
});
register("command", () => {
      data.refined_mithril = 0;
      data.refined_titanium = 0;
      data.compact_mithril = 0;
      data.compact_titanium = 0;
      data.powder_per_goblin = 0;
      data.goblin_killed = 0;
      data.goblins = 0;
      data.save();
}).setName("mithril_rs");