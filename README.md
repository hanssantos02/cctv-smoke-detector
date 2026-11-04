# cctv-smoke-detector

Sentrion SDS200: an indoor Raspberry Pi 4 camera-based smoke-detection research project, with an MQ-2 sensor, local alarms and planned battery backup.

## Resume this project

Clone this repository on another computer:

```bash
git clone https://github.com/hanssantos02/cctv-smoke-detector.git
cd cctv-smoke-detector
```

Open the cloned folder in your coding assistant or editor. Ask the assistant:

> Read AGENTS.md, PROJECT.md, PROGRESS.md and docs/CONTINUE_ON_ANOTHER_PC.md. Resume from the current state. We are still in Phase 1; first confirm which Raspberry Pi parts have arrived. Do not begin wiring, installs or SD-card flashing without the required confirmation.

Read these files in order:

1. [AGENTS.md](AGENTS.md): project rules, teaching style and hardware permissions.
2. [PROJECT.md](PROJECT.md): requirements and design decisions, including dated changes.
3. [PROGRESS.md](PROGRESS.md): completed steps, current budget and unresolved questions.
4. [Continue on another PC](docs/CONTINUE_ON_ANOTHER_PC.md): current handoff and Git sync instructions.
5. [Prototype readiness](docs/PROTOTYPE_READINESS.md): parts needed for the first Pi check.

## Current state

As of 2026-11-04, Asia/Manila:

- **Phase 1: materials buying and readiness checks.** Phase 2 has not been approved or started.
- Planned platform: Raspberry Pi 4 Model B, 4GB; USB camera; MQ-2 through a 3.3V ADS1115 and resistor divider; LEDs/buzzer; external packaged UPS.
- No detector application, verified prototype, wiring build, OS flash or installed project software yet.
- Next hardware task: confirm actual Pi, power-supply label, microSD model/capacity and card-reader availability. A selected store listing does not establish delivery or ownership.
- Table A budget: PHP20,864. Priced Table B additions: PHP1,155. Known combined values: PHP22,019 plus enclosure printing cost still unknown. Other quotes and compatibility checks remain provisional.

## Saved materials

| File | What it preserves |
| --- | --- |
| [BOM](docs/BOM.md) | Prototype/final materials, physical-store list, price evidence and buying decisions |
| [BOM review](docs/BOM_REVIEW.md) | Corrections, selected listings, rejected options and compatibility checks |
| [Excel BOM](outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx) | Current editable workbook, formulas, three worksheets and clickable source links |
| [Original materials PDF](Bill-of-Materials%20%284%29.pdf) | Original supplied bill of materials |
| [Original project paper](FS_CCTV_BASED_SMOKE_DETECTION.PAPER%20%281%29.pdf) | Original supplied project specification |
| [Authoring archive](archive/bom-authoring/README.md) | Historical spreadsheet-generation scripts and sourcing metadata |

The documents preserve the decisions from the chat; Git does not transfer the chat itself or recreate unconfirmed hardware results. Prices are dated evidence, not current offers. Temporary clipboard screenshots from the original computer are not part of this repository.

This is a research prototype. Detection performance and safety certification have not been established; retain independent certified smoke alarms.
