; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: WE (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_we

_omni_we:
    ; The 'WE' identifier is the shared memory locus.
    ; It represents the power of the union.
    
    mov rax, [pair_ptr]   ; Load the Pair Locus
    ret                   ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
