import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const sourceArg = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const sourceDir = path.resolve(sourceArg || process.env.TAXONOMY_SOURCE_DIR || "data/source");
const validateOnly = process.argv.includes("--validate-only");
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!validateOnly && (!supabaseUrl || !serviceRoleKey)) {
  throw new Error("Set VITE_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY before importing.");
}

const readJson = async (fileName) => JSON.parse(await readFile(path.join(sourceDir, fileName), "utf8"));
const [taxonomy, moduleMap, synonyms, moduleTypes, questionBlocks] = await Promise.all([
  readJson("sexualna_taxonomia_flat_v2.json"),
  readJson("topic_module_map_v1.json"),
  readJson("sexualna_taxonomia_synonyma_v2.json"),
  readJson("module_types_v1.json"),
  readJson("question_blocks_v1.json"),
]);

const taxonomyById = new Map(taxonomy.map((item) => [item.id, item]));
const moduleTypeIds = new Set(moduleTypes.map((item) => item.module_type_id));
const blockIds = new Set(questionBlocks.map((item) => item.block_id));

for (const item of moduleMap) {
  if (!taxonomyById.has(item.source_taxonomy_id)) throw new Error(`Missing taxonomy node: ${item.source_taxonomy_id}`);
  if (!moduleTypeIds.has(item.module_type)) throw new Error(`Unknown module type: ${item.module_type}`);
  for (const blockId of [...item.simple_blocks, ...item.advanced_blocks]) {
    if (!blockIds.has(blockId)) throw new Error(`Unknown question block: ${blockId}`);
  }
}

const synonymsByName = new Map(
  synonyms.map((item) => [item.canonical_sk.trim().toLocaleLowerCase("sk"), item.synonyms]),
);
const catalogNodeTypes = new Set([
  "practice_or_preference", "fantasy", "fetish", "fluid_or_substance",
  "orgasm_or_arousal", "position", "relational_scenario", "roleplay_scenario", "toy_or_prop",
]);

const topics = moduleMap.map((item) => {
  const node = taxonomyById.get(item.source_taxonomy_id);
  return {
    topic_id: item.topic_id,
    source_taxonomy_id: item.source_taxonomy_id,
    parent_id: node.parent_id || null,
    slug: node.slug || item.topic_id,
    name_sk: item.name_sk,
    name_en: node.name_en || null,
    path_sk: item.path_sk,
    category: item.path_sk.split(" > ")[1] || null,
    level: item.level,
    node_type: item.node_type,
    recommended_usage: node.recommended_usage,
    module_type: item.module_type,
    classification_confidence: item.classification_confidence,
    classification_tags: item.classification_tags || [],
    tags: node.tags || [],
    alt_names: synonymsByName.get(item.name_sk.trim().toLocaleLowerCase("sk")) || [],
    simple_enabled: item.simple_enabled,
    advanced_enabled: item.advanced_enabled,
    simple_blocks: item.simple_blocks || [],
    advanced_blocks: item.advanced_blocks || [],
    catalog_visible: catalogNodeTypes.has(item.node_type) && node.recommended_usage !== "exclude_filter",
  };
});

console.log(`Validated ${topics.length} mapped topics from ${sourceDir}`);
console.log(`Visible catalog topics: ${topics.filter((topic) => topic.catalog_visible).length}`);
if (validateOnly) process.exit(0);

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
for (let index = 0; index < topics.length; index += 200) {
  const batch = topics.slice(index, index + 200);
  const { error } = await supabase.from("topics").upsert(batch, { onConflict: "topic_id" });
  if (error) throw error;
  console.log(`Imported ${Math.min(index + batch.length, topics.length)}/${topics.length}`);
}
