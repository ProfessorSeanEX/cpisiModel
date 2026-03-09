; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: OK (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_ok

_omni_ok:
    ; The 'OK' state is the absence of drift.
    ; In the old world, this is a No-Operation (Stillness)
    ; or a balanced comparison that returns a Zero flag.
    
    nop                 ; Stillness (Yashar)
    xor rax, rax        ; Anchor return value to 0
    ret                 ; Return to the Anchor

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
