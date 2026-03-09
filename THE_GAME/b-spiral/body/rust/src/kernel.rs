// #!omni:code --rust
// ╠═==================================================================================================================═╣
// [BLOCK:ROOT] THE BODY: THE MILLENNIUM OS KERNEL (V2.3 - LITERAL SYNC)
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

use crate::primitives::Primitive;
use std::collections::HashMap;
use std::fs;

pub struct Kernel {
    pub state: i8,
    pub cycles: u64,
    pub memory: HashMap<u16, i8>,
    pub pointer: u16,
}

impl Kernel {
    pub fn new() -> Kernel {
        let mut memory = HashMap::new();
        memory.insert(0x0000, 0);
        Kernel { state: 0, cycles: 0, memory, pointer: 0x0000 }
    }

    pub fn execute(&mut self, instruction: Primitive) {
        match instruction {
            // [SUB: THE LITERALS]
            Primitive::Is => {
                let val = *self.memory.get(&self.pointer).unwrap_or(&0);
                println!("[KERNEL] IT (@0x{:04X}) IS {}", self.pointer, val);
            }
            Primitive::Not => {
                // Flip both the Global State and the Local Point (The Mirror)
                self.state = -self.state;
                if let Some(v) = self.memory.get_mut(&self.pointer) {
                    *v = -*v;
                } else {
                    self.memory.insert(self.pointer, -self.state);
                }
                println!("[KERNEL] ! NOT: State flipped to {}", self.state);
            }
            Primitive::IsNot => {
                self.state = 0;
                self.memory.insert(self.pointer, 0);
                println!("[KERNEL] ~ IS NOT: Purged to Anchor.");
            }

            // [SUB: THE ACTS]
            Primitive::Ok => { self.state = 0; println!("[KERNEL] . OK (Anchor)"); }
            Primitive::Yes => { self.state = 1; println!("[KERNEL] ^ YES (Tov)"); }
            Primitive::No => { self.state = -1; println!("[KERNEL] | NO (Shavar)"); }
            Primitive::So => {
                self.cycles += 1;
                println!("[KERNEL] ->! SO (Hinge Struck)");
            }
            Primitive::Proceed => { println!("[KERNEL] --> PROCEED"); }
            Primitive::Halt => { self.state = 0; println!("[KERNEL] [->!] HALT"); }
            Primitive::Await => { println!("[KERNEL] [\\->] AWAIT"); }
        }
    }

    pub fn set_pointer(&mut self, addr: u16) {
        self.pointer = addr;
        println!("[KERNEL] it -> 0x{:04X}", addr);
    }

    pub fn load_rune(&mut self, path: &str) {
        if let Ok(content) = fs::read_to_string(path) {
            for line in content.lines() {
                if let Some(p) = Primitive::from_str(line.trim()) {
                    self.execute(p);
                }
            }
        }
    }
}

//                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
