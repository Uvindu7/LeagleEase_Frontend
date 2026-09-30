import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const dir = 'e:\\2.2 Project\\Legal Ease Frontend\\src\\assets\\lawyers';

const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of files) {
  const filePath = join(dir, file);
  const sizeBefore = statSync(filePath).size;

  if (sizeBefore < 100 * 1024) {
    console.log(`⏭  Skipping ${file} (${(sizeBefore / 1024).toFixed(1)} KB — already small)`);
    continue;
  }

  const tmpPath = filePath + '.tmp';
  await sharp(filePath)
    .resize({ width: 400, height: 400, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmpPath);

  const sizeAfter = statSync(tmpPath).size;

  // Overwrite original with compressed version
  const { renameSync } = await import('fs');
  renameSync(tmpPath, filePath);

  console.log(`✅ ${file}: ${(sizeBefore / 1024).toFixed(1)} KB → ${(sizeAfter / 1024).toFixed(1)} KB (saved ${((1 - sizeAfter / sizeBefore) * 100).toFixed(0)}%)`);
}

console.log('\nDone! All large images compressed.');
