; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: IS (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_is

_omni_is:
    ; The 'IS' state is the Presence.
    ; In the old world, this is a bit-test that returns TRUE
    ; or a MOV 1 that signifies existing data.
    
    mov rax, 1          ; I AM (+1)
    test rax, rax       ; Verify Existence
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
