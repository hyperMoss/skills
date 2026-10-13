import fs from "node:fs/promises";
import matter from "gray-matter";
import YAML from "yaml";

export interface OMPSkill {
  apiVersion: "omp/v1";
  kind: "Skill";
  metadata: {
    name: string;
    version: string;
    description?: string;
  };
  spec: {
    type: "skill" | "mode" | "workflow";
    commands?: string[];
    workflow?: unknown;
  };
}

function extractName(markdown: string) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "unknown";
}

function convert(markdown: string): OMPSkill {
  const parsed = matter(markdown);
  const name = extractName(markdown);

  const isMode = name.includes("poteto-mode");

  return {
    apiVersion: "omp/v1",
    kind: "Skill",
    metadata: {
      name,
      version: "0.1.0",
      description: parsed.data.description,
    },
    spec: {
      type: isMode ? "mode" : "skill",
      commands: [`/${name}`],
      workflow: isMode
        ? {
            router: true,
            playbooks: [
              "feature",
              "bug-fix",
              "architecture",
              "orchestrate",
            ],
          }
        : undefined,
    },
  };
}

export async function convertPstackSkill(
  input: string,
  output: string,
) {
  const markdown = await fs.readFile(input, "utf8");
  const skill = convert(markdown);
  await fs.writeFile(output, YAML.stringify(skill));
}
