; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: AWAIT (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_await

_omni_await:
    ; The 'AWAIT' state is active tension.
    ; In the old world, this is a PAUSE or a SPIN-LOCK
    ; waiting for a signal or an interrupt to fire.
    
    pause               ; Hint to the CPU that we are in a spin-lock
    jmp _omni_await     ; Repeat until Signal (Loop)
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
