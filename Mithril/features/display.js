import config from "../config";
import { abc, data, PREFIX, short_number } from "../utils/util";
let session_xp = 0;
let session_pet_xp = 0;
let compact_ench = 0;
let drill_fuel = 0;
let purse_powder = null;
let old_compact = 0;
register('actionbar', (gained) => {
  if(!config.config_display) return;
  if(Player.getHeldItem() == null) return;
  let h_obj = Player.getHeldItem().getNBT().toObject()["tag"]["ExtraAttributes"];
  let scoreb = Scoreboard.getLines().map(line => line.getName().removeFormatting()); 
  let new_comp = parseInt(h_obj["compact_blocks"]);
  scoreb.forEach(line => {
        if (line.includes("Mithril")) {
            purse_powder = line.split(":")[1].replace(" ","");
        }
  })
  if(old_compact == 0) old_compact = new_comp;
  else if(old_compact !== new_comp){
    session_xp += parseInt(gained);
    session_pet_xp += parseInt(gained*1.5);
    compact_ench = parseInt(h_obj["compact_blocks"]);
    drill_fuel = parseInt(h_obj["drill_fuel"]);
    old_compact = new_comp;
  }
}).setCriteria('${*}+${gained} Mining ${*}');
register("renderOverlay", () => {
  if(!config.config_display) return;
  if (abc.isOpen()) {
    const txt = "Click anywhere to move!"
    Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
  }
  let refm_txt = `&9Refined Mithril: &6${data.refined_mithril}`;
  let reft_txt = `&5Refined Titanium: &6${data.refined_titanium}`;
  let compm_txt = `&9Compact Mithril: &6${data.compact_mithril}`;
  let compt_txt = `&5Compact Titanium: &6${data.compact_titanium}`;
  let sessionxp_txt = `&9Session XP: &6${short_number(session_xp)}`;
  let session_petxp_txt = `&9Session Pet XP: &6${short_number(session_pet_xp)}`;
  let goblins_txt = `&aGoblins: &6${data.goblins}  &2Powder: &6${short_number(data.powder_per_goblin*data.goblin_killed)}`;
  let compe_txt = compact_ench >= 1000000 ?`&9Compacted Blocks: &6${short_number(compact_ench)}` : `&9Compacted Blocks: &7${short_number(compact_ench)}`;
  let drillf_txt = drill_fuel >= 1000 ?`&9Drill Fuel: &6${short_number(drill_fuel)}` : `&9Drill Fuel: &c${short_number(drill_fuel)}`;
  let powderp_txt = `&2Purse Powder: &6${purse_powder}`;
  Renderer.drawStringWithShadow(`${PREFIX}\n${refm_txt}\n${compm_txt}\n${reft_txt}\n${compt_txt}\n${sessionxp_txt}\n${session_petxp_txt}\n${goblins_txt}\n${compe_txt}\n${drillf_txt}\n${powderp_txt}`, data.x, data.y)
});