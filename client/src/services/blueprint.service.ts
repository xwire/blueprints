import {Blueprint} from "../types/blueprint";
import * as Tauri from "@tauri-apps/api/tauri";

class _BlueprintService {

  async fetchBlueprints(): Promise<Blueprint[]> {
    return Tauri.invoke('load_blueprints');
  }
}

export const BlueprintService = new _BlueprintService();