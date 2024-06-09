// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_shell::ShellExt;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let sidecar_command = app.shell().sidecar(
                "its-node"
            ).unwrap().args(["../src/main.js"]);
            sidecar_command
                .spawn()
                .map(|_| {
                    Ok(())
                })
                .unwrap()
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
