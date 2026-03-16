; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: NOT (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_not

_omni_not:
    ; The 'NOT' state is the Inversion.
    ; In the old world, this is a bitwise NOT instruction
    ; that flips all the bits in the register.
    
    not rax             ; Invert the Accumulator
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
