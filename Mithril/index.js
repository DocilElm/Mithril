/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import Settings from "./config";
import { data, PREFIX } from "./utils/util";
import "./features/chat";
import "./features/display";
register("command", () => Settings.openGUI()).setName("mithril", true);
register("step", () => {
    if (data.first_time) {
        data.first_time = false; 
        data.save();
        ChatLib.chat("");
        new TextComponent(ChatLib.getCenteredText(`${PREFIX}&aDo /mithril For Settings!`)).chat();
        new TextComponent(ChatLib.getCenteredText(`${PREFIX}&aJoin Our Discord!  &b&nDiscord&r &7(Click)`)).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat();
        ChatLib.chat("");
    };
}).setFps(1);
/*
  TODO
* Mithril profits with inventory because hypixel (maybe)
* Session timer (maybe)
*/