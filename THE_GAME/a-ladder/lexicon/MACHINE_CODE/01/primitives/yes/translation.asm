; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: YES (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_yes

_omni_yes:
    ; The 'YES' state is the positive vector.
    ; In the old world, this is a MOVE 1 into the accumulator
    ; signaling an approved branch or a success status.
    
    mov rax, 1          ; Tov (+1)
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
