import config from "../config";
import { data, PREFIX } from "../utils/util";
register("chat", (msg) => {
    if(!config.config_display) return;
    switch (msg) {
        case "REFINED! You found an Enchanted Mithril!":
            data.refined_mithril += 1;
            break;
        case "REFINED! You found an Enchanted Titanium!":
            data.refined_titanium += 1;
            break;
        case "COMPACT! You found an Enchanted Mithril!":
            data.compact_mithril += 1;
            break;
        case "COMPACT! You found an Enchanted Titanium!":
            data.compact_titanium += 1;
            break;
        case "A Golden Goblin has spawned from the earth!":
            data.goblins += 1;
            break;
        case "Mining Speed Boost is now available!":
            if(!config.config_notif_msb) break;
            Client.showTitle("&aMining Speed Boost!", `${PREFIX}`,1,30,1);
            break;
        case "You used your Mining Speed Boost Pickaxe Ability!":
            if(!config.config_notif_msb) break;
            Client.showTitle("&6Used Mining Speed Boost!", `${PREFIX}`,1,30,1);
            break;
        case "Your Mining Speed Boost has expired!":
            if(!config.config_notif_msb) break;
            Client.showTitle("&cMining Speed Boost Expired!", `${PREFIX}`,1,30,1);
            break;
    }
    data.save();
}).setCriteria("${msg}");
register("chat", (amount) => {
    if(!config.config_display) return;
    data.powder_per_goblin = parseInt(amount);
    data.goblin_killed += 1;
    data.save();
}).setCriteria("You received ${amount} ᠅ Mithril Powder from killing a Golden Goblin!")