# TODO.md

## Phase 4 — Smart Contracts + Web3 Infrastructure

### Step 0 — Repo analysis (done)
- Reviewed existing Solidity contracts under `contracts/`.
- Reviewed frontend Web3 scaffolding (`components/providers.tsx`, `lib/web3-utils.ts`).

### Step 1 — Create Hardhat workspace inside `/contracts` (pending)
- Create `/contracts/package.json`, `hardhat.config.ts`, `/contracts/.env` guidance.
- Add Hardhat+tooling deps and scripts folder.

### Step 2 — Relocate Solidity contracts into Hardhat convention
- Move/copy existing contracts into `/contracts/contracts/*.sol`.

### Step 3 — Align Solidity contracts with intended interfaces
- Add missing functions/events required by frontend.
- Align function signatures with ABIs.

### Step 4 — Fix frontend ABI usage
- Replace mock ABIs in `lib/web3-utils.ts` with real compiled ABI imports from artifacts.
- Align address/export config (`NEXT_PUBLIC_*_ADDRESS`).

### Step 5 — Add deploy script + frontend export
- Implement `contracts/scripts/deploy.ts`.
- Add helper to write deployed addresses for frontend.

### Step 6 — Compile & smoke test
- Run `npx hardhat compile`.
- Ensure artifacts exist and ABI imports work.

### Step 7 — Deploy to Sepolia
- Run deploy to Sepolia.
- Verify deployed addresses output.

