# Continue on another PC

Handoff date: 2026-11-04, Asia/Manila. Repository: https://github.com/hanssantos02/cctv-smoke-detector

## Current phase and next action

We are still in **Phase 1: materials buying and readiness checks**. Reaching B12, the last final-build BOM row, did not approve Phase 2. The user most recently asked which existing BOM parts are needed to begin with the Pi itself; the answer is saved in [PROTOTYPE_READINESS.md](PROTOTYPE_READINESS.md).

First confirm what is physically on hand, especially the Pi model, power-supply label/plug, microSD model/capacity, and card reader. Only the SD card, soldering equipment, 3D printer, heat-shrink tubing, cable ties and tie-mount bases have been reported owned. The SD card's suitability is unconfirmed. Earlier shopping selections are not delivery confirmations.

Do not flash a card, install packages, use sudo, modify files outside the project, or begin physical wiring merely because the repository is cloned. Follow AGENTS.md and ask for the applicable confirmation. File-only Git setup does not advance the hardware phase.

## Important state to preserve

- Pi4 4GB remains the planned board. USB camera candidates remain unverified; do not substitute one or claim it works based on seller descriptions alone.
- MQ-2 uses the planned ADS1115 at 3.3V and a two-10kΩ voltage divider. Wiring/pin assignments and delivered modules still need verification; no completed WIRING.md or tested code exists.
- The selected Pi case's bundled fan is unconfirmed. Separate fan and heatsink costs remain until actual contents/fit are known.
- External packaged UPS remains required for backup validation. It can wait for a first Pi boot check; it has not been removed.
- B01 enclosure will be printed on the user's printer. Filament/material/printing cost is unknown; do not enter zero merely because the printer is owned.
- B03 uses two male1×40 straight2.54mm strips and one female1×40 strip, with the ribbon cable candidate separate. A separate boxed2×20 header is optional. Check geometry/orientation before wiring.
- B04 connector kit and B08 entry/clamp candidates still need final sizing/quotes. B06 additional mounting allowance is conditional on reusing the A19 hardware kit.
- B09 one mixed10±2-piece tag pack has a provisional PHP98 screenshot quote. Writability and fit remain unknown; owned finishing materials are not bought again.
- B10 camera mount and B11 guards/vent mesh remain pending. Do not assume they were deleted when the user moved to B12.
- B12 two non-illuminated, normally-open momentary, two-terminal panel buttons are on the physical-store list. The two A17 tactile switches are separate prototype parts.
- Budget: Table A PHP20,864; priced Table B PHP1,155; known sum PHP22,019 plus B01 printing TBD. Final/grand spreadsheet totals deliberately show INPUT NEEDED. Quotes/allowances may require repricing.

## Files and authority

Read AGENTS.md, PROJECT.md and PROGRESS.md at each new session, then the current relevant documents. Dated entries form a history; later explicit decisions supersede earlier ones. Use the current BOM tables and the final workbook for the present amounts, not an old total embedded in the change history.

The authoritative workbook is:

`outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx`

It has BOM Summary, Review Notes and Physical Store sheets. Keep native links, formulas, validation and freeze panes when editing. The snapshot has 41 clickable store links. Reuse the spreadsheet skill available on the destination computer; its runtime path may differ. No spreadsheet runtime or node_modules is included in Git.

The archive contains historical scripts with machine-specific paths and old action branches. **Do not run build-bom.mjs to regenerate the current workbook:** doing so can erase later narrow edits. Read the archive README before reusing any tooling. Original PDFs are preserved unchanged.

## First clone

Git must already be installed. If it is absent, ask before installing anything.

```bash
git clone https://github.com/hanssantos02/cctv-smoke-detector.git
cd cctv-smoke-detector
git status
git log -5 --oneline
```

An editor with Markdown support and Excel or LibreOffice is enough to read the saved work. Hardware-development tools are not needed just to resume the planning discussion.

## Switching between computers

Before working on a previously cloned PC, check for local edits, then pull:

```bash
git status
git pull --ff-only
```

If local changes or a divergent-history error appear, preserve them and ask for help. Do not use reset --hard, force-push or discard changes to make the error disappear.

After a completed work step, update PROGRESS.md and the affected project files. Stage only the intended named files. For example, after a BOM edit:

```bash
git add PROGRESS.md PROJECT.md docs/BOM.md docs/BOM_REVIEW.md outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx
git diff --cached --stat
git commit -m "docs: record updated materials and project progress"
git push origin main
```

Include any other newly created/edited deliverable explicitly. A commit is a saved local checkpoint; a push sends committed checkpoints to GitHub. A pull brings them to the other PC. Work on one PC at a time and push before switching. Commit identity and GitHub write access must be configured on each PC; never put credentials, Wi-Fi passwords or tokens into project files.

The original computer uses an existing GitHub SSH key. A new PC needs its own authorized GitHub authentication to push; the clone URL above does not transfer credentials. If the new PC already has an authorized SSH key, it can use this remote URL:

```bash
git remote set-url origin git@github.com:hanssantos02/cctv-smoke-detector.git
```

Otherwise sign in through your Git client before pushing. Do not copy private keys or tokens into this repository. Repository creation does not install Git or authenticate another PC for you.

The workbook is binary, so simultaneous spreadsheet edits cannot be merged like text. Avoid editing it independently on two computers.

## Resume prompt

> Read AGENTS.md, PROJECT.md, PROGRESS.md and docs/CONTINUE_ON_ANOTHER_PC.md. Continue the Sentrion SDS200 project from its recorded state. We are in Phase1, not an approved Phase2 build. First confirm the Pi, supply, SD card and reader actually on hand. Preserve the selected BOM decisions, distinguish owned parts from store candidates, and update progress after each completed step.
