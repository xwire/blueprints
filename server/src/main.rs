#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use app::types::{Blueprint, DataType};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![load_blueprints])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn load_blueprints() -> Vec<Blueprint> {
  return Vec::from([Blueprint {
    id: String::from("123"),
    title: String::from("My Blueprint Title"),
    inputs: vec![DataType::String, DataType::Number, DataType::Bool, DataType::Object],
    outputs: vec![DataType::String, DataType::Number, DataType::Bool, DataType::Object],
  }]);
}