/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import PogObject from "PogData";
const PREFIX = "&9[Mithril] ";
let data = new PogObject("Mithril", {
    "x": 0,
    "y": 0,
    "first_time": true
}, ".mithril_data.json");
register("step", () => {
    if (data.first_time) {
        data.first_time = false; 
        data.save();
        ChatLib.chat("");
        new TextComponent(ChatLib.getCenteredText(`${PREFIX}&aDo /mithril To Change Display Location!`)).chat();
        new TextComponent(ChatLib.getCenteredText(`${PREFIX}&aJoin Our Discord!  &b&nDiscord&r &7(Click)`)).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat();
        ChatLib.chat("");
    };
}).setFps(1);
let ref_mithril = 0;
let comp_mithril = 0;
let ref_tita = 0;
let comp_tita = 0;
let session_xp = 0;
const short_number = (num) => {
  if(num == undefined) return;
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
let abc = new Gui()
register("command", () => {
    abc.open();
}).setName("mithril");
register("dragged", (dx, dy, x, y) => {
    if (!abc.isOpen()) return
    data.x = x
    data.y = y
    data.save()
});
register("chat", (ref) => {
  if(ref == "Mithril") ref_mithril += 1;
  else if(ref == "Titanium") ref_tita += 1;
}).setChatCriteria("REFINED! You found an Enchanted ${ref}!");
register("chat", (comp) => {
  if(comp == "Mithril") comp_mithril += 1;
  else if(comp == "Titanium") comp_tita += 1;
}).setChatCriteria("COMPACT! You found an Enchanted ${comp}!");
register('actionbar', (gained, total, current) => {
  session_xp += parseInt(gained);
}).setCriteria('${*}+${gained} Mining (${total}/${current})${*}');
register("renderOverlay", () => {
  if (abc.isOpen()) {
    const txt = "Click anywhere to move!"
    Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
  }
  Renderer.drawStringWithShadow(`${PREFIX}\n&9Refined Mithril: &6${ref_mithril}\n&9Compact Mithril: &6${comp_mithril}\n&5Refined Titanium: &6${ref_tita}\n&5Compact Titanium: &6${comp_tita}\n&9Session XP: &6${short_number(session_xp)}`, data.x, data.y)
});