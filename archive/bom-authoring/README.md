# Historical BOM authoring files

These files preserve the earlier spreadsheet authoring and review work. They are archived evidence, **not an installable application or a current one-command workbook build**.

- The saved workbook under outputs/ is the current deliverable.
- build-bom.mjs creates the early workbook; rerunning it would overwrite later sourcing, ownership and physical-store edits. Do not run it against the current deliverable.
- update-store-links.mjs contains successive historical actions. Old actions use old totals and must not be rerun indiscriminately.
- bom-data.mjs records the base item data with later edits; it is useful context but does not reproduce every current workbook annotation/layout.
- pending-store-item.json and store-link-targets.json describe the last completed B12 physical-store update. They are historical task state, not a queued operation.
- finalize-store-links.py restores/verifies native workbook links and notes after an artifact-tool export. Its paths and expected scratch inputs were specific to the original computer.
- Other verification results, price evidence and extracted source text are dated records.

Scripts retain their original bytes and may reference /home/hans/, the original Codex dependency runtime, tmp/review, or scratch files not tracked here. Before reuse, adapt paths and use the currently available spreadsheet skill/runtime. Do not install dependencies or recreate symlinks automatically. Do not execute scripts merely to read the project on another PC.

Temporary workbook copies, rendered images, dependency folders and clipboard screenshots are excluded. Current facts and next steps are documented in PROJECT.md, PROGRESS.md and docs/CONTINUE_ON_ANOTHER_PC.md.
