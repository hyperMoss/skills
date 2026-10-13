# OMP Core Spec v0.1

This directory defines the OMP-native primitives used by orchestration skills.

## Core objects

- Agent: an execution role with capabilities and permissions.
- Task: a bounded unit of work with goal, context and acceptance criteria.
- Workflow: a DAG or pipeline that coordinates multiple agents.
- Mode: an execution policy controlling planning, autonomy and checkpoints.
- Skill: a discoverable capability package loaded by OMP.

## Runtime model

```
Task
 |
 v
Mode
 |
 v
Workflow
 |
 +--> Agent
 |
 +--> Skill
```

The spec intentionally separates orchestration from domain capabilities.
