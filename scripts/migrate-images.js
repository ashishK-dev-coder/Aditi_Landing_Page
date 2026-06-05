const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const contentPath = path.join(rootDir, 'visual-data', 'content.json');
const publicImagesPath = path.join(rootDir, 'public', 'images');

if (!fs.existsSync(contentPath)) {
  console.log('content.json not found');
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

let movedCount = 0;

function processNode(node, sectionName) {
  if (Array.isArray(node)) {
    node.forEach(item => processNode(item, sectionName));
  } else if (typeof node === 'object' && node !== null) {
    for (const key in node) {
      if (typeof node[key] === 'string' && node[key].startsWith('/images/') && node[key].split('/').length === 3) {
        // e.g. "/images/lifestyle_wellness_1780074407043.png"
        const filename = path.basename(node[key]);
        const oldPath = path.join(publicImagesPath, filename);
        
        // Clean section name for folder
        const folderName = sectionName.replace(/[^a-z0-9_-]/gi, '').toLowerCase();
        const newDir = path.join(publicImagesPath, folderName);
        const newPath = path.join(newDir, filename);

        if (fs.existsSync(oldPath)) {
          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
          }
          fs.renameSync(oldPath, newPath);
          node[key] = `/images/${folderName}/${filename}`;
          console.log(`Moved ${filename} -> ${folderName}/`);
          movedCount++;
        }
      } else {
        processNode(node[key], sectionName);
      }
    }
  }
}

for (const section in content) {
  if (section !== 'site' && section !== 'navbar' && section !== '_note') {
    processNode(content[section], section);
  }
}

fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');
console.log(`Migration complete. Moved ${movedCount} files.`);
