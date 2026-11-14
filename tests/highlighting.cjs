const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const cli = process.env.QSS_TREE_SITTER_CLI || 'tree-sitter';
const root = path.resolve(__dirname, '..');
const grammar = path.join(root, 'grammar');
const query = path.join(root, 'languages', 'qss', 'highlights.scm');
const sample = path.join(__dirname, 'sample.qss');

function run(args) {
  const result = spawnSync(cli, args, { cwd: grammar, encoding: 'utf8' });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, args[0] + ' failed:\n' + result.stderr + '\n' + result.stdout);
  return result.stdout;
}

const files = [sample, ...process.argv.slice(2)];
run(['parse', '--quiet', ...files]);
const captures = run(['query', '--captures', query, sample]).split(/\r?\n/);
const tick = String.fromCharCode(96);
for (const [name, text] of [
  ['comment', '/* QSS */'],
  ['type.builtin', 'QPushButton'],
  ['variable', 'closeButton'],
  ['attribute', 'hover'],
  ['attribute', 'add-line'],
  ['attribute', 'horizontal'],
  ['attribute', 'active'],
  ['operator', '!'],
  ['property', 'qproperty-icon'],
  ['function.builtin', 'qlineargradient'],
  ['string.special', '$image(mainwindow.close)$'],
  ['string.special', '$color(window.text)$'],
  ['string.special', '$font(font1)$'],
  ['number', '12px'],
  ['string.special', '#fff'],
]) {
  assert.ok(captures.some(line => line.includes(' - ' + name + ',') && line.includes('text: ' + tick + text + tick)), name + ': ' + text);
}
console.log('QSS highlighting checks passed for ' + files.length + ' files');
