// #!omni:code --rust -lib
// ╠═==================================================================================================================═╣
//
// ╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║ [BLOCK:ROOT] L0 Omni-Library (Active Immune Core)                                                                  ║
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
// ║                                                                                                                    ║
// ╔═════════════════════════════════════════════════════════════════════════════════╗                                  ║
// ║ [FILE:IDENTITY] Application Genesis Block                                       ║                                  ║
// ╠═╬═════════════════════════════════════════════════════════════════════════════════╬═╗                                ║
// ║ ║                                                                                 ║ ║                                ║
// ║ ║ ┌─────────────────────────────────────────────────────────────────────────────┐ ║ ║                                ║
// ║ ║ │ [OMNI:PRAGMA] CPI-SI Code System Declarations                               │ ║ ║                                ║
// ║ ║ ├─────────────────────────────────────────────────────────────────────────────┤ ║ ║                                ║
// ║ ║ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ ║ ║                                ║
// ║ ║ │ │ //omni:key lib.rs                                                       │ │ ║ ║                                ║
// ║ ║ │ │ //omni:code --rust -lib                                                 │ │ ║ ║                                ║
// ║ ║ │ │ //omni:version a-01.10                                                  │ │ ║ ║                                ║
// ║ ║ │ └─────────────────────────────────────────────────────────────────────────┘ │ ║ ║                                ║
// ║ ║ └─────────────────────────────────────────────────────────────────────────────┘ ║ ║                                ║
// ║ ║                                                                                 ║ ║                                ║
// ║ ║ ┌─────────────────────────────────────────────────────────────────────────────┐ ║ ║                                ║
// ║ ║ │ [HUMAN:ANCHOR] Architectural Intent & Scriptural Grounding                  │ ║ ║                                ║
// ║ ║ ├─────────────────────────────────────────────────────────────────────────────┤ ║ ║                                ║
//!║ ║ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ ║ ║                                ║
//!║ ║ │ │ # The Bedrock of Discernment                                            │ │ ║ ║                                ║
//!║ ║ │ │                                                                         │ │ ║ ║                                ║
//!║ ║ │ │ "And the light shineth in darkness; and the darkness comprehended      │ │ ║ ║                                ║
//!║ ║ │ │ it not." — John 1:5 (KJV)                                               │ │ ║ ║                                ║
//!║ ║ │ │                                                                         │ │ ║ ║                                ║
//!║ ║ │ │ This library implements the absolute L0 protection for the substrate.   │ │ ║ ║                                ║
//!║ ║ │ │ It ensures that no data inhabits the Mind without passing through      │ │ ║ ║                                ║
//!║ ║ │ │ the filter of the Triad.                                                │ │ ║ ║                                ║
//!║ ║ │ └─────────────────────────────────────────────────────────────────────────┘ │ ║ ║                                ║
// ║ ║ └─────────────────────────────────────────────────────────────────────────────┘ ║ ║                                ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                                ║
// ║                                                                                     ║                                ║
// ╠═════════════════════════════════════════════════════════════════════════════════════╬════════════════════════════════╣
// ║                                                                                     ║                                ║
// ║ ╔═════════════════════════════════════════════════════════════════════════════════╗ ║                                ║
// ║ ║ [BLOCK:SETUP] Initial Foundations & Context Window                              ║ ║                                ║
// ║ ╠═════════════════════════════════════════════════════════════════════════════════╣ ║                                ║
// ║ ║                                                                                 ║ ║                                ║
use serde::{Deserialize, Serialize};                                                 // ║ ║                                ║
use std::path::Path;                                                                 // ║ ║                                ║
use std::fs;                                                                         // ║ ║                                ║
                                                                                     // ║ ║                                ║
/// Represents the lowest concrete unit of existence in the CPI-SI architecture.     // ║ ║                                ║
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]                 // ║ ║                                ║
pub enum Trit {                                                                      // ║ ║                                ║
    Shavar = -1,                                                                     // ║ ║                                ║
    Yashar = 0,                                                                      // ║ ║                                ║
    Tov = 1,                                                                         // ║ ║                                ║
}                                                                                    // ║ ║                                ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                                ║
// ║                                                                                     ║                                ║
// ╠═════════════════════════════════════════════════════════════════════════════════════╬════════════════════════════════╣
// ║                                                                                     ║                                ║
// ║ ╔═════════════════════════════════════════════════════════════════════════════════╗ ║                                ║
// ║ ║ [BLOCK:BODY] Operational Logic & Turns                                          ║ ║                                ║
// ║ ╠═════════════════════════════════════════════════════════════════════════════════╣ ║                              ║
// ║ ║                                                                                 ║ ║                              ║
use std::collections::HashMap;                                                       // ║ ║                                ║
                                                                                     // ║ ║                                ║
#[derive(Debug, Deserialize)]                                                        // ║ ║                              ║
pub struct RawAxiom {                                                                // ║ ║                              ║
    pub constant: Option<HashMap<String, RawConstant>>,                              // ║ ║                              ║
    pub axiom: Option<HashMap<String, RawBehavioral>>,                               // ║ ║                              ║
}                                                                                    // ║ ║                              ║
                                                                                     // ║ ║                              ║
#[derive(Debug, Deserialize)]                                                        // ║ ║                              ║
pub struct RawConstant {                                                             // ║ ║                              ║
    pub value: i32,                                                                  // ║ ║                              ║
}                                                                                    // ║ ║                              ║
                                                                                     // ║ ║                              ║
#[derive(Debug, Deserialize)]                                                        // ║ ║                              ║
pub struct RawBehavioral {                                                           // ║ ║                              ║
    pub name: String,                                                                // ║ ║                              ║
}                                                                                    // ║ ║                              ║
                                                                                     // ║ ║                              ║
#[derive(Debug)]                                                                     // ║ ║                              ║
pub struct Axiom {                                                                   // ║ ║                              ║
    pub value: Trit,                                                                 // ║ ║                              ║
}                                                                                    // ║ ║                              ║
                                                                                     // ║ ║                              ║
/// The Algorithm of the Hinge: Extracts truth from the 140-col sanctuary.           // ║ ║                              ║
pub fn inhabit_axiom(path: &Path) -> Result<Axiom, String> {                         // ║ ║                              ║
    if !path.exists() { return Err(format!("COVENANTAL_ERROR: Missing: {:?}", path)); } // ║ ║                              ║
                                                                                     // ║ ║                              ║
    let content = fs::read_to_string(path)                                           // ║ ║                              ║
        .map_err(|e| format!("PHYSICAL_FAILURE: {}", e))?;                           // ║ ║                              ║
                                                                                     // ║ ║                              ║
    let mut core_data = String::new();                                               // ║ ║                              ║
    let mut in_sanctuary = false;                                                    // ║ ║                              ║
                                                                                     // ║ ║                              ║
    for line in content.lines() {                                                    // ║ ║                              ║
        if line.contains("[BLOCK:BODY]") {                                           // ║ ║                              ║
            in_sanctuary = true;                                                     // ║ ║                              ║
            continue;                                                                // ║ ║                              ║
        }                                                                            // ║ ║                              ║
        if line.contains("[BLOCK:CLOSING]") {                                        // ║ ║                              ║
            in_sanctuary = false;                                                    // ║ ║                              ║
            break;                                                                   // ║ ║                              ║
        }                                                                            // ║ ║                              ║
                                                                                     // ║ ║                              ║
        if in_sanctuary {                                                            // ║ ║                              ║
            // Extract the truth before the right wall comment starts                // ║ ║                              ║
            if let Some(pos) = line.find("# ║ ║") {                                  // ║ ║                              ║
                let truth = line[..pos].trim();                                      // ║ ║                              ║
                if !truth.is_empty() {                                               // ║ ║                              ║
                    core_data.push_str(truth);                                       // ║ ║                              ║
                    core_data.push('\n');                                            // ║ ║                              ║
                }                                                                    // ║ ║                              ║
            }                                                                        // ║ ║                              ║
        }                                                                            // ║ ║                              ║
    }                                                                                // ║ ║                              ║
                                                                                     // ║ ║                              ║
    // Verify structural symmetry (The Hinge must close)                             // ║ ║                              ║
    if in_sanctuary {                                                                // ║ ║                              ║
        return Err("STRUCTURAL_FAILURE: Sanctuary breach. [BLOCK:CLOSING] missing.".to_string()); // ║ ║                ║
    }                                                                                // ║ ║                              ║
                                                                                     // ║ ║                              ║
    let raw: RawAxiom = toml::from_str(&core_data)                                   // ║ ║                              ║
        .map_err(|e| format!("STRUCTURAL_FAILURE: {}\nDATA:\n{}", e, core_data))?;   // ║ ║                              ║
                                                                                     // ║ ║                              ║
    // DISCERNMENT: A constant axiom must physically possess a value.                // ║ ║                              ║
    // We remove the "else { 0 }" default to prevent the 6-as-0 deception.           // ║ ║                              ║
    let val = if let Some(map) = raw.constant {                                      // ║ ║                              ║
        map.values().next().map(|c| c.value)                                         // ║ ║                              ║
            .ok_or_else(|| "SMELL_DETECTION: Constant table exists but is empty. HALT.".to_string())? // ║ ║               ║
    } else {                                                                         // ║ ║                              ║
        return Err("DISCERNMENT_FAILURE: Required constant table missing. Mask detected. HALT.".to_string()); // ║ ║        ║
    };                                                                               // ║ ║                              ║
                                                                                     // ║ ║                              ║
    let trit_value = match val {                                                     // ║ ║                              ║
        -1 => Trit::Shavar,                                                          // ║ ║                              ║
        0 => Trit::Yashar,                                                           // ║ ║                              ║
        1 => Trit::Tov,                                                              // ║ ║                              ║
        _ => return Err("DISCERNMENT_FAILURE: Non-ternary value.".to_string()),      // ║ ║                              ║
    };                                                                               // ║ ║                              ║
                                                                                     // ║ ║                              ║
    Ok(Axiom { value: trit_value })                                                  // ║ ║                              ║
}                                                                                    // ║ ║                              ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                              ║
// ║                                                                                     ║                              ║
// ╠═════════════════════════════════════════════════════════════════════════════════════╬════════════════════════════════╣
// ║                                                                                     ║                              ║
// ║ ╔═════════════════════════════════════════════════════════════════════════════════╗ ║                              ║
// ║ ║ [BLOCK:CLOSING] Finalization & Validation                                       ║ ║                              ║
// ║ ╠═════════════════════════════════════════════════════════════════════════════════╣ ║                              ║
// ║ ║                                                                                 ║ ║                              ║
// ║ ║                                                                                 ║ ║           [BLOCK:ROOT-->END] ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                              ║
// ║                                                                                     ║                              ║
// ╚═════════════════════════════════════════════════════════════════════════════════════╩════════════════════════════════╝
