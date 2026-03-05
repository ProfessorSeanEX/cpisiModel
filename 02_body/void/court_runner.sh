#!/bin/bash
# #!omni:code --bash -orchestrator
# ╠═==================================================================================================================═╣
#
# ╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ [BLOCK:ROOT] THE COURT OF 36: MASTER VERIFICATION RUNNER                                                           ║
# ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

# 1. BEDROCK: AXIOM 00 (ANCHOR)
echo "--- Running Court of 36: Axiom 00 (Anchor) ---"
julia logic/axioms/00_kernel/00_bedrock/proofs/julia/00_zero.jl
lean --run logic/axioms/00_kernel/00_bedrock/proofs/lean/00_zero.lean
wolframscript -file logic/axioms/00_kernel/00_bedrock/proofs/wolfram/00_zero.wl

# 2. BEDROCK: AXIOM 01 (INVERSION)
echo "--- Running Court of 36: Axiom 01 (Inversion) ---"
julia logic/axioms/00_kernel/00_bedrock/proofs/julia/01_minus_one.jl
lean --run logic/axioms/00_kernel/00_bedrock/proofs/lean/01_minus_one.lean
wolframscript -file logic/axioms/00_kernel/00_bedrock/proofs/wolfram/01_minus_one.wl

# 3. BEDROCK: AXIOM 02 (ABSOLUTE)
echo "--- Running Court of 36: Axiom 02 (Absolute) ---"
julia logic/axioms/00_kernel/00_bedrock/proofs/julia/02_plus_one.jl
lean --run logic/axioms/00_kernel/00_bedrock/proofs/lean/02_plus_one.lean
wolframscript -file logic/axioms/00_kernel/00_bedrock/proofs/wolfram/02_plus_one.wl

# TODO: Add Kernel and Composed axioms as they are sealed.

echo "--- Court Runner Complete ---"
# [BLOCK:ROOT-->END]
