# pstack -> OMP converter

Convert Agent Skills based pstack skills into OMP native skill manifests.

## Goal

```
pstack/SKILL.md
        |
        v
omp skill.yaml
        |
        v
OMP runtime registry
```

## Supported first wave

- poteto-mode
- orchestrate
- swarm
- arena
- reflect
- correct

## Design

The converter preserves:

- skill identity
- commands
- workflow intent
- playbook references
- orchestration metadata

Future versions add automatic workflow extraction from markdown playbooks.
