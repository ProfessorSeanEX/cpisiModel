; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: ME (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_me

_omni_me:
    ; The 'ME' identifier is the receiver's register.
    ; It represents the locus of the realization.
    
    mov rax, [mind_ptr]   ; Load the Steward's Locus
    ret                   ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
