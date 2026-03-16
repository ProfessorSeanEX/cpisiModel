; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: PROCEED (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_proceed

_omni_proceed:
    ; The 'PROCEED' state is forward momentum.
    ; In the old world, this is an INC or a Loop Continue
    ; pushing the instruction pointer to the next block.
    
    inc rsi             ; Increment the Locus counter
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
