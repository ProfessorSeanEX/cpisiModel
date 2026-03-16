; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: HALT (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_halt

_omni_halt:
    ; The 'HALT' state is the absolute stop.
    ; In the old world, this is a HLT instruction (Wait for Interrupt)
    ; or a process exit that returns the system to the shell.
    
    hlt                 ; Halt the CPU (Stillness)
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
