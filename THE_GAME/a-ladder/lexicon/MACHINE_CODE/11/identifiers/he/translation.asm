; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: HE (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_he

_omni_he:
    ; The 'HE' identifier is the witness register.
    ; It represents the locus of the third party observer.
    
    mov rax, [witness_ptr] ; Load the Witness Locus
    ret                    ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
