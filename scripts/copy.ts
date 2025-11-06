import { readFileSync, writeFileSync } from 'fs';

function copy() {
  const args = process.argv;

  if (args.length !== 4) {
    console.log('Usage: copy.ts [source] [destination]');
    return;
  }

  const source = args[2];
  const destination = args[3];
  const fileContent = readFileSync(source, 'utf-8');
  writeFileSync(destination, fileContent);
}

copy();
