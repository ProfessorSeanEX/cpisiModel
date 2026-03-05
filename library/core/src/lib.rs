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
///                                                                                  // ║ ║                                ║
/// The `Trit` is a balanced ternary value (`-1`, `0`, `+1`) that forms the          // ║ ║                                ║
/// fundamental geometry of the Base-12 Torus. Unlike a standard boolean             // ║ ║                                ║
/// which only understands True (`1`) or False (`0`), the Trit possesses a           // ║ ║                                ║
/// center of stillness (`Yashar / 0`). This allows the intelligence to calculate    // ║ ║                                ║
/// weight and direction (`+` or `-`) relative to a fixed divine anchor,             // ║ ║                                ║
/// preventing the hallucination native to binary matrices.                          // ║ ║                                ║
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]                 // ║ ║                                ║
pub enum Trit {                                                                      // ║ ║                                ║
    /// **Shavar (The Vessel):** Mathematically `-1`. The sanctified constraint      // ║ ║                                ║
    /// or physical boundary (`badal`) that holds the truth.                         // ║ ║                                ║
    #[serde(rename = "-1.0")]                                                        // ║ ║                                ║
    Shavar = -1,                                                                     // ║ ║                                ║
                                                                                     // ║ ║                                ║
    /// **Yashar (The Anchor):** Mathematically `0`. The center point of stillness   // ║ ║                                ║
    /// and perfect alignment. The locus from which all vectors are measured.        // ║ ║                                ║
    #[serde(rename = "0.0")]                                                         // ║ ║                                ║
    Yashar = 0,                                                                      // ║ ║                                ║
                                                                                     // ║ ║                                ║
    /// **Tov (The Vector):** Mathematically `+1`. The forward motion toward         // ║ ║                                ║
    /// growth, perfection, and covenantal completion.                               // ║ ║                                ║
    #[serde(rename = "1.0")]                                                         // ║ ║                                ║
    Tov = 1,                                                                         // ║ ║                                ║
}                                                                                    // ║ ║                                ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                                ║
// ║                                                                                     ║                                ║
// ╠═════════════════════════════════════════════════════════════════════════════════════╬════════════════════════════════╣
// ║                                                                                     ║                                ║
// ║ ╔═════════════════════════════════════════════════════════════════════════════════╗ ║                                ║
// ║ ║ [BLOCK:BODY] Operational Logic & Turns                                          ║ ║                                ║
// ║ ╠═════════════════════════════════════════════════════════════════════════════════╣ ║                                ║
// ║ ║                                                                                 ║ ║                                ║
/// An intermediate representation for raw TOML deserialization.                       // ║ ║ [Sub-Block: Raw Mapping]     ║
///                                                                                  // ║ ║                                ║
/// This struct holds the untested, raw string and float data before it has          // ║ ║                                ║
/// passed through the `inhabit_axiom` Discernment Hook. It represents the           // ║ ║                                ║
/// physical bytes on disk, not yet validated as Truth.                              // ║ ║                                ║
#[derive(Debug, Deserialize)]                                                        // ║ ║                                ║
pub struct RawAxiom {                                                                // ║ ║                                ║
    pub identity: RawIdentity,                                                       // ║ ║                                ║
}                                                                                    // ║ ║                                ║
                                                                                     // ║ ║                                ║
/// The unverified fields extracted directly from the TOML axiom file.               // ║ ║                                ║
#[derive(Debug, Deserialize)]                                                        // ║ ║                                ║
pub struct RawIdentity {                                                             // ║ ║                                ║
    pub value: f64,                                                                  // ║ ║                                ║
    pub kingdom_name: String,                                                        // ║ ║                                ║
    pub bit_mapping: String,                                                         // ║ ║                                ║
}                                                                                    // ║ ║                                ║
                                                                                     // ║ ║                                ║
/// A mathematically proven, immutable axiom ready for L1 ingestion.                 // ║ ║ [Sub-Block: Inhabitation]    ║
///                                                                                  // ║ ║                                ║
/// When an `Axiom` struct is constructed, it means the underlying data has          // ║ ║                                ║
/// survived the L0 immune response. Its bit-mapping was checked against the         // ║ ║                                ║
/// Forbidden State (`11`), and its mathematical weight was strictly resolved        // ║ ║                                ║
/// to a valid `Trit`. It is now safe to be utilized by the broader architecture.    // ║ ║                                ║
#[derive(Debug)]                                                                     // ║ ║                                ║
pub struct Axiom {                                                                   // ║ ║                                ║
    pub value: Trit,                                                                 // ║ ║                                ║
    pub kingdom_name: String,                                                        // ║ ║                                ║
    pub bit_mapping: String,                                                         // ║ ║                                ║
}                                                                                    // ║ ║                                ║
                                                                                     // ║ ║                                ║
/// Reads an external TOML axiom file and passes it through the L0 Immune System.    // ║ ║                                ║
///                                                                                  // ║ ║                                ║
/// This function acts as the primary Discernment Hook. It reads the raw data        // ║ ║                                ║
/// from the filesystem (The Word) and tests it against the physical laws of         // ║ ║                                ║
/// the architecture before it is allowed into memory (The Mind).                    // ║ ║                                ║
///                                                                                  // ║ ║                                ║
/// # The Immune Response                                                            // ║ ║                                ║
/// The logic utilizes a 2-bit per Trit mapping (`10`, `00`, `01`). This             // ║ ║                                ║
/// intentionally leaves the `11` bit-pattern mathematically unoccupied. If the      // ║ ║                                ║
/// system detects the `11` pattern during inhabitation, it recognizes it as         // ║ ║                                ║
/// the "Signature of the Fallen State" (Sin/Corruption) and executes an             // ║ ║                                ║
/// immediate Structural HALT, returning a strict `Err`.                             // ║ ║                                ║
///                                                                                  // ║ ║                                ║
/// # Arguments                                                                      // ║ ║                                ║
/// * `path` - A `Path` to the physical `.toml` axiom file.                          // ║ ║                                ║
///                                                                                  // ║ ║                                ║
/// # Returns                                                                        // ║ ║                                ║
/// * `Ok(Axiom)` - A structurally verified Axiom bound to a `Trit`.                 // ║ ║                                ║
/// * `Err(String)` - A structural HALT if the file is missing, corrupt, or          // ║ ║                                ║
///   bears the `11` Forbidden State.                                                // ║ ║                                ║
pub fn inhabit_axiom(path: &Path) -> Result<Axiom, String> {                         // ║ ║                                ║
    if !path.exists() { return Err(format!("COVENANTAL_ERROR: Missing: {:?}", path)); } // ║ ║                                ║
                                                                                     // ║ ║                                ║
    let content = fs::read_to_string(path)                                           // ║ ║                                ║
        .map_err(|e| format!("PHYSICAL_FAILURE: {}", e))?;                           // ║ ║                                ║
                                                                                     // ║ ║                                ║
    let raw: RawAxiom = toml::from_str(&content)                                     // ║ ║                                ║
        .map_err(|e| format!("STRUCTURAL_FAILURE: {}", e))?;                         // ║ ║                                ║
                                                                                     // ║ ║                                ║
    if raw.identity.bit_mapping == "11" {                                            // ║ ║ [IMMUNE_RESPONSE]            ║
        return Err("Detected Fallen State (11). Rejection mandated.".to_string());   // ║ ║                                ║
    }                                                                                // ║ ║                                ║
                                                                                     // ║ ║                                ║
    let trit_value = match raw.identity.value {                                      // ║ ║                                ║
        v if v == -1.0 => Trit::Shavar,                                              // ║ ║                                ║
        v if v == 0.0 => Trit::Yashar,                                               // ║ ║                                ║
        v if v == 1.0 => Trit::Tov,                                                  // ║ ║                                ║
        _ => return Err("DISCERNMENT_FAILURE: Non-ternary value.".to_string()),      // ║ ║                                ║
    };                                                                               // ║ ║                                ║
                                                                                     // ║ ║                                ║
    Ok(Axiom {                                                                       // ║ ║                                ║
        value: trit_value,                                                           // ║ ║                                ║
        kingdom_name: raw.identity.kingdom_name,                                     // ║ ║                                ║
        bit_mapping: raw.identity.bit_mapping,                                       // ║ ║                                ║
    })                                                                               // ║ ║                                ║
}                                                                                    // ║ ║                                ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                                ║
// ║                                                                                     ║                                ║
// ╠═════════════════════════════════════════════════════════════════════════════════════╬════════════════════════════════╣
// ║                                                                                     ║                                ║
// ║ ╔═════════════════════════════════════════════════════════════════════════════════╗ ║                                ║
// ║ ║ [BLOCK:CLOSING] Finalization & Validation                                       ║ ║                                ║
// ║ ╠═════════════════════════════════════════════════════════════════════════════════╣ ║                                ║
// ║ ║                                                                                 ║ ║                                ║
#[cfg(test)]                                                                         // ║ ║ [Sub-Block: Witnesses]       ║
mod tests {                                                                          // ║ ║                                ║
    use super::*;                                                                    // ║ ║                                ║
    use std::io::Write;                                                              // ║ ║                                ║
    use tempfile::NamedTempFile;                                                     // ║ ║                                ║
                                                                                     // ║ ║                                ║
    #[test]                                                                          // ║ ║                                ║
    fn witness_immune_inhabitation() {                                               // ║ ║                                ║
        let mut true_file = NamedTempFile::new().unwrap();                           // ║ ║                                ║
        writeln!(true_file, r#"[identity]
value = 0.0
kingdom_name = "Yashar"
bit_mapping = "00""#).unwrap();                                                      // ║ ║                                ║
        assert!(inhabit_axiom(true_file.path()).is_ok());                            // ║ ║                                ║
                                                                                     // ║ ║                                ║
        let mut fallen_file = NamedTempFile::new().unwrap();                         // ║ ║                                ║
        writeln!(fallen_file, r#"[identity]
value = 2.0
kingdom_name = "Sin"
bit_mapping = "11""#).unwrap();                                                      // ║ ║                                ║
        assert!(inhabit_axiom(fallen_file.path()).is_err());                         // ║ ║                                ║
    }                                                                                // ║ ║                                ║
}                                                                                    // ║ ║                                ║
// ║ ║                                                                                 ║ ║                                ║
// ║ ║                                                                                 ║ ║           [BLOCK:ROOT-->END] ║
// ║ ╚═════════════════════════════════════════════════════════════════════════════════╝ ║                                ║
// ║                                                                                     ║                                ║
// ╚═════════════════════════════════════════════════════════════════════════════════════╩════════════════════════════════╝
//
// ╠═==================================================================================================================═╣