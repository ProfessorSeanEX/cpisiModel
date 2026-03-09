; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: SHE (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_she

_omni_she:
    ; The 'SHE' identifier is the witness register.
    ; It represents the locus of the third party observer (F).
    
    mov rax, [steward_ptr] ; Load the Steward's Witness Locus
    ret                    ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
