import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { basename, extname, join, relative } from 'path';
import { format } from 'prettier';

function getAllTsFiles(dir: string, files = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllTsFiles(fullPath, files);
    } else if (entry.endsWith('.html') || entry.endsWith('.ts')) {
      // make it relative to where you run the script from
      files.push(relative(process.cwd(), fullPath));
    }
  }

  return files;
}

export function getKebabName(filePath: string): string {
  const fileName = basename(filePath, extname(filePath));
  return fileName.replace(/[._\s]+/g, '-').toLowerCase();
}

function extractBetweenHTMLComments(content: string): string {
  const match = content.match(/\s*<!-- @doc-start -->([\s\S]*?)\s*<!-- @doc-end -->/);
  return match ? match[1].trim() : '';
}

function extractBetweenTSComments(content: string): string {
  const match = content.match(/\/\/\s*@doc-start([\s\S]*?)\/\/\s*@doc-end/);
  return match ? match[1].trim() : '';
}

async function copy() {
  const filePaths = getAllTsFiles('projects/ngx-better-forms-docs/src/app');

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    const fileName = getKebabName(filePath);
    const fileContent = readFileSync(filePath, { encoding: 'utf-8' });
    const isHTML = filePath.endsWith('.html');
    const isTS = filePath.endsWith('.ts');

    if (isHTML) {
      if (!fileContent.startsWith('<!-- @documented -->') && !fileContent.startsWith('<!--@documented-->')) {
        continue;
      }
      const snippet = extractBetweenHTMLComments(fileContent);
      const snippetFormatted = await format(snippet, { parser: 'html' });

      writeFileSync(
        'projects/ngx-better-forms-docs/public/code-examples/' + fileName + '.html.txt',
        snippetFormatted,
        'utf8',
      );
    } else if (isTS) {
      if (!fileContent.startsWith('// @documented') && !fileContent.startsWith('//@documented')) {
        continue;
      }

      const snippet = extractBetweenTSComments(fileContent);
      const snippetFormatted = await format(snippet, { parser: 'typescript', singleQuote: true });

      writeFileSync(
        'projects/ngx-better-forms-docs/public/code-examples/' + fileName + '.ts.txt',
        snippetFormatted,
        'utf8',
      );
    }
  }
}

copy();
