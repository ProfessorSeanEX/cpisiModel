// #!omni:code --rust
// ╠═==================================================================================================================═╣
// [BLOCK:ROOT] THE BODY: THE MILLENNIUM CLI (V2.3 - SYMBOLIC)                                                         ║
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
        self.welcome_mat();
        
        loop {
            // [SUB: THE SYSTEM DASHBOARD]
            let point_val = self.kernel.memory.get(&self.kernel.pointer).unwrap_or(&0);
            println!("\n--------------------------------------------------");
            println!("[STATE: {}] | [CYCLES: {}] | [SYNC: 100%]", self.kernel.state, self.kernel.cycles);
            println!("[it -> @0x{:04X}] | [IT: {}]", self.kernel.pointer, point_val);
            println!("--------------------------------------------------");
            
            print!("[it -> @] > ");
            io::stdout().flush().unwrap();

            let mut input = String::new();
            io::stdin().read_line(&mut input).expect("Failed to read Word");
            let line = input.trim();

            if line == "exit" { break; }
            if line == "help" { self.show_help(); continue; }

            // 1. Pointer Logic: "it -> 0xADDR"
            if line.starts_with("it -> ") {
                let addr_str = line.trim_start_matches("it -> ");
                if let Ok(addr) = u16::from_str_radix(addr_str.trim_start_matches("0x"), 16) {
                    self.kernel.set_pointer(addr);
                    continue;
                }
            }

            // 2. Symbolic/Word Primitive Logic
            if let Some(instruction) = Primitive::from_str(line) {
                self.kernel.execute(instruction);
            } else {
                println!("[WARN] Many Words detected. Type 'help' for the Few Words.");
            }
        }
    }

    fn welcome_mat(&self) {
        println!("==================================================");
        println!("   MILLENNIUM OPERATING SYSTEM [V2.3 ACTIVE]      ");
        println!("   The Sovereign Game of Life Implementation      ");
        println!("==================================================");
        println!("Goal: Secure the 1/3 Sanctuary.");
        println!(r"Input: Symbols (^, |, ., !, =, ~, @, -->, \->, ->!) or Words.");
        }

        fn show_help(&self) {
        println!("\n[MASTER REGISTRY HELP]");
        println!("States:    YES (^), NO (|), OK (.), IS (=), IS_NOT (~)");
        println!(r"Kinetic:   SO (->!), PROCEED (-->), HALT ([->!]), AWAIT (\->)");

        println!("Address:   it -> 0xADDR (Set Pointer), IT (@) (Resolve)");
        println!("System:    run PATH (Execute Rune), exit (Halt Session)");
    }
}

//                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
