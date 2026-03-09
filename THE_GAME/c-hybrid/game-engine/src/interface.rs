// #!omni:code --rust
// ╠═==================================================================================================================═╣
// [BLOCK:ROOT] THE BODY: THE MILLENNIUM CLI (V2.1 - ADDRESSING)
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

use crate::kernel::Kernel;
use crate::primitives::Primitive;
use std::io::{self, Write};

pub struct CLI {
    kernel: Kernel,
}

impl CLI {
    pub fn new() -> CLI {
        CLI { kernel: Kernel::new() }
    }

    pub fn run(&mut self) {
        println!("--- MILLENNIUM OS [V2.1 ADDRESSING] ---");
        
        loop {
            print!("[it -> 0x{:04X}] > ", self.kernel.pointer);
            io::stdout().flush().unwrap();

            let mut input = String::new();
            io::stdin().read_line(&mut input).expect("Failed to read Word");
            let line = input.trim();

            if line == "exit" { break; }

            // 1. Check for Pointer Assignment: "it -> 0x0001"
            if line.starts_with("it -> ") {
                let addr_str = line.trim_start_matches("it -> ");
                if let Ok(addr) = u16::from_str_radix(addr_str.trim_start_matches("0x"), 16) {
                    self.kernel.set_pointer(addr);
                    continue;
                }
            }

            // 2. Otherwise process as Primitive
            if let Some(instruction) = Primitive::from_str(line) {
                self.kernel.execute(instruction);
            } else {
                println!("[WARN] Many Words. State: HALT.");
            }
        }
    }
}

//                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
