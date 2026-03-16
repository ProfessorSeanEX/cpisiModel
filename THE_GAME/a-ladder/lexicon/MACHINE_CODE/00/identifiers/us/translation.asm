; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: US (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_us

_omni_us:
    ; The 'US' identifier is the recipient register for the pair.
    ; It represents the combined memory space of the enmeshment.
    
    mov rax, [pair_ptr]   ; Load the Pair Locus
    ret                   ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
