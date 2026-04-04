const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // We add not-italic ensuring we don't duplicate it.
    let newContent = content.replace(/className="font-wedges (?!not-italic)/g, 'className="font-wedges not-italic ');
    // Also handle \escaped quotes if they exist
    newContent = newContent.replace(/className=\\"font-wedges (?!not-italic)/g, 'className=\\"font-wedges not-italic ');

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
        changedCount++;
    }
});

console.log(`Replaced in ${changedCount} files.`);
