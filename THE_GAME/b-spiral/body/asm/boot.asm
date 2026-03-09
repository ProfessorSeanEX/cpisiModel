; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] THE BODY: THE BOOT PULSE (STRIKE)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global omni_boot_strike

omni_boot_strike:
    ; The absolute strike of the hardware.
    ; Forces all registers to 0.0 before starting.
    
    xor rax, rax
    xor rbx, rbx
    xor rcx, rdx
    
    ; Signal the start via serial/stdout (omitted for speed)
    ret

;                                                                                                   [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
