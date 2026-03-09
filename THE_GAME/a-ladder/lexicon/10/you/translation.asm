; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: YOU (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_you

_omni_you:
    ; The 'YOU' identifier is the partner's register.
    ; It represents the locus of the other.
    
    mov rax, [partner_ptr] ; Load the Partner's Locus
    ret                    ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
