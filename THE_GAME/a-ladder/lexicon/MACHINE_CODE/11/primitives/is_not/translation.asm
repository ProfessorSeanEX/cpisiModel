; #!omni:code --asm
; ╠═==================================================================================================================═╣
; [BLOCK:ROOT] PRIMITIVE: IS_NOT (X86_64 TRANSLATION)
; ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

section .text
    global _omni_is_not

_omni_is_not:
    ; The 'IS_NOT' state is the Void.
    ; In the old world, this is a NULL pointer
    ; or an invalid memory address that triggers a SEGFAULT.
    
    xor rax, rax        ; Clear the Accumulator (0)
    mov rdi, 0          ; Set Target to NULL
    ret                 ; Return to the Anchor (or Crash)

;                                                                                                   [BLOCK:ROOT-->END] ║
; ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
