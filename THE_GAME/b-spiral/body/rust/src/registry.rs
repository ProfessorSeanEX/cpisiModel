// #!omni:code --rust
// ╠═==================================================================================================================═╣
// [BLOCK:ROOT] THE BODY: THE SYSTEM REGISTRY (DATA-DRIVEN)
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

use std::collections::HashMap;
use serde::Deserialize;
use std::fs;
use std::path::Path;

#[derive(Deserialize, Clone, Debug)]
pub struct InstructionData {
    pub mnemonic: String,
    pub symbol: Option<String>,
    pub bitcode: Option<String>,
    pub opcode: Option<String>,
}

pub struct Registry {
    pub instructions: HashMap<String, InstructionData>, // Symbol/Word -> Data
}

impl Registry {
    pub fn new() -> Registry {
        let mut registry = Registry { instructions: HashMap::new() };
        registry.boot_load();
        registry
    }

    // [SUB: THE REFLECTIVE CRAWL]
    fn boot_load(&mut self) {
        println!("[REGISTRY] Crawling the Lexicon...");
        let base_path = "../../a-ladder/lexicon/primitives";
        
        // Crawl 00, 01, 10, 11
        for entry in fs::read_dir(base_path).expect("Lexicon missing") {
            let entry = entry.unwrap();
            if entry.path().is_dir() {
                self.load_jurisdiction(&entry.path());
            }
        }
    }

    fn load_jurisdiction(&mut self, path: &Path) {
        for entry in fs::read_dir(path).unwrap() {
            let entry = entry.unwrap();
            if entry.path().is_dir() {
                self.load_instruction(&entry.path());
            }
        }
    }

    fn load_instruction(&mut self, path: &Path) {
        let schema_path = path.join("schema.toml");
        if schema_path.exists() {
            let content = fs::read_to_string(schema_path).unwrap();
            // [TODO: Parse TOML and map to symbols]
            println!("[REGISTRY] Ingested: {:?}", path.file_name().unwrap());
        }
    }
}

//                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
