// #!omni:code --rust
// ╠═==================================================================================================================═╣
// [BLOCK:ROOT] THE BODY: THE SOVEREIGN PRIMITIVES (SYMBOL AWARE)
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Primitive {
    Yes,
    No,
    Ok,
    So,
    Proceed,
    Halt,
    Await,
    Is,
    Not,
    IsNot,
}

impl Primitive {
    pub fn from_str(s: &str) -> Option<Primitive> {
        match s.trim().to_lowercase().as_str() {
            // Words
            "yes" => Some(Primitive::Yes),
            "no" => Some(Primitive::No),
            "ok" => Some(Primitive::Ok),
            "so" => Some(Primitive::So),
            "proceed" => Some(Primitive::Proceed),
            "halt" => Some(Primitive::Halt),
            "await" => Some(Primitive::Await),
            "is" => Some(Primitive::Is),
            "not" => Some(Primitive::Not),
            "is_not" | "isnot" => Some(Primitive::IsNot),

            // Symbols (The Spoken Microcode)
            "^" => Some(Primitive::Yes),
            "|" => Some(Primitive::No),
            "." => Some(Primitive::Ok),
            "->!" => Some(Primitive::So), // The Hinge
            "[-->]" | "-->" => Some(Primitive::Proceed),
            "[->!]" => Some(Primitive::Halt),
            r"[\->]" | r"\->" => Some(Primitive::Await),
            "=" => Some(Primitive::Is),
            "!" => Some(Primitive::Not),
            "~" => Some(Primitive::IsNot),
            "@" => Some(Primitive::Is), // IT (Point) resolution

            _ => None,
        }
    }
}

//                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
