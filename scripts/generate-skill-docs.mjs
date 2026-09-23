import { readdir, readFile, mkdir, unlink, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const skillsRoot = join(root, 'skills')
const outputRoot = join(root, 'docs', 'skills')

await mkdir(outputRoot, { recursive: true })

const skills = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()

const expected = new Set(['index.md', ...skills.map((name) => `${name}.md`)])
for (const entry of await readdir(outputRoot, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.md') && !expected.has(entry.name)) {
    await unlink(join(outputRoot, entry.name))
  }
}

const catalog = await readFile(join(skillsRoot, 'README.md'), 'utf8')
const siteCatalog = catalog.replace(/\(([^/()]+)\/SKILL\.md\)/g, '($1.md)')
await writeFile(join(outputRoot, 'index.md'), siteCatalog, 'utf8')

for (const name of skills) {
  const source = await readFile(join(skillsRoot, name, 'SKILL.md'), 'utf8')
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!frontmatter) throw new Error(`${name}/SKILL.md has no YAML frontmatter`)

  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]
  if (!description) throw new Error(`${name}/SKILL.md has no description`)

  const body = source.slice(frontmatter[0].length).trim()
  const referenced = [...body.matchAll(/`docs\/([^`]+\.md)`/g)]
    .map((match) => match[1])
    .filter((path, index, all) => all.indexOf(path) === index)

  const related = referenced.length
    ? `\n\n## Dokumen terkait\n\n${referenced.map((path) => `- [${path}](/${path})`).join('\n')}\n`
    : ''

  await writeFile(
    join(outputRoot, `${name}.md`),
    `---\ntitle: ${JSON.stringify(name)}\ndescription: ${JSON.stringify(description)}\n---\n\n${body}${related}\n`,
    'utf8'
  )
}

console.log(`Generated ${skills.length} skill pages and catalog`)
