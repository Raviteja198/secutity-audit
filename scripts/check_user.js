const fs = require('fs');
const path = require('path');
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const s = fs.readFileSync(envPath, 'utf8');
  s.split(/\r?\n/).forEach(line => {
    const l = line.trim();
    if (!l || l.startsWith('#')) return;
    const idx = l.indexOf('=');
    if (idx === -1) return;
    const key = l.slice(0, idx);
    const value = l.slice(idx + 1);
    process.env[key] = value;
  });
}

const { PrismaClient } = require('@prisma/client');

(async () => {
  const p = new PrismaClient();
  try {
    const u = await p.user.findUnique({ where: { email: 'ravitejamusku198@gmail.com' } });
    console.log(JSON.stringify(u, null, 2));
  } catch (e) {
    console.error('ERROR', e);
    process.exit(1);
  } finally {
    await p.$disconnect();
  }
})();
