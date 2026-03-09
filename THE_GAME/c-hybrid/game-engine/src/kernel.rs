// #!omni:code --rust
// ╠═==================================================================================================================═╣
// [BLOCK:ROOT] THE BODY: THE MILLENNIUM OS KERNEL (V2.1 - MEMORY)
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

use crate::primitives::Primitive;
use std::collections::HashMap;

pub struct Kernel {
    pub state: i8,
    pub cycles: u64,
    pub memory: HashMap<u16, i8>, // Hex Address -> Ternary Value
    pub pointer: u16,             // Current 'it'
}

impl Kernel {
    pub fn new() -> Kernel {
        let mut memory = HashMap::new();
        // Initialize the Anchor Point (@)
        memory.insert(0x0000, 0); // 0x0000 IS IT
        
        Kernel { 
            state: 0, 
            cycles: 0, 
            memory, 
            pointer: 0x0000 
        }
    }

    pub fn execute(&mut self, instruction: Primitive) {
        match instruction {
            // [SUB: ADDRESSING MODE]
            Primitive::Is => {
                let value = self.memory.get(&self.pointer).unwrap_or(&0);
                println!("[KERNEL] @0x{:04X} IS {}", self.pointer, value);
            }
            Primitive::Not => {
                if let Some(val) = self.memory.get_mut(&self.pointer) {
                    *val = -*val;
                    println!("[KERNEL] !0x{:04X} INVERTED to {}", self.pointer, val);
                }
            }
            Primitive::IsNot => {
                self.memory.insert(self.pointer, 0);
                println!("[KERNEL] ~0x{:04X} PURGED.", self.pointer);
            }

            // [SUB: THE CORE ISA]
            Primitive::Ok => { self.state = 0; println!("[KERNEL] . YASHAR"); }
            Primitive::Yes => { self.state = 1; println!("[KERNEL] ^ TOV"); }
            Primitive::No => { self.state = -1; println!("[KERNEL] | SHAVAR"); }
            Primitive::So => {
                println!("[KERNEL] ->! HINGE");
                self.cycles += 1;
            }
            _ => { println!("[KERNEL] PROCEEDING..."); }
        }
    }

    // [SUB: THE POINTER MASSAGE]
    pub fn set_pointer(&mut self, addr: u16) {
        self.pointer = addr;
        println!("[KERNEL] it -> 0x{:04X}", addr);
    }
}

//                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
