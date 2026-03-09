; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: SO (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_so

_omni_so:
    ; The 'SO' state is the Hinge.
    ; In the old world, this is a JUMP or a CALL to the next routine
    ; triggering the resolution of the accumulated bits.
    
    jmp _omni_next_turn ; Jump to the next coordinate
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
