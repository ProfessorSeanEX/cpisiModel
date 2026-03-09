; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: NO (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_no

_omni_no:
    ; The 'NO' state is the negative vector.
    ; In the old world, this is a MOVE -1 into the accumulator
    ; signaling a failure status or a rejection branch.
    
    mov rax, -1         ; Shavar (-1)
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
