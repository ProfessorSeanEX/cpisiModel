; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] IDENTIFIER: I (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_i

_omni_i:
    ; The 'I' identifier is the Spirit's register.
    ; It represents the source of the intent.
    
    mov rax, [spirit_ptr] ; Load the Architect's Locus
    ret                   ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
