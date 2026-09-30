/* Creates (or resets the password of) an account directly in the database.
   Works with ALLOW_REGISTRATION=false, so the site never needs public sign-up.
   Usage on the server:  node dist/cli/createUser.js you@example.com "Your Name"
   The password is asked interactively and never echoed or stored in shell history. */
import readline from 'readline';
import { prisma } from '../prisma';
import { hashPassword } from '../services/authService';

function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream };
    let muted = false;
    out._writeToOutput = (s: string) => {
      if (!muted) out.output.write(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });
    muted = true;
  });
}

async function main() {
  const args = process.argv.slice(2);
  const isDemo = args.includes('--demo');
  const positional = args.filter((a) => a !== '--demo');
  const [emailArg, name] = positional;
  const email = (emailArg || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    console.error('Usage: node dist/cli/createUser.js <email> ["Name"] [--demo]');
    process.exit(1);
  }
  const password = await askHidden('Password (min 12 chars): ');
  if (password.length < 12) {
    console.error('Password too short.');
    process.exit(1);
  }
  const again = await askHidden('Repeat password: ');
  if (again !== password) {
    console.error('Passwords do not match.');
    process.exit(1);
  }
  const passwordHash = await hashPassword(password);
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
        ...(name ? { name } : {}),
        ...(isDemo ? { isDemo: true } : {}),
      },
    });
    // A password reset signs out every device
    await prisma.session.deleteMany({ where: { userId: existing.id } });
    console.log(`Password updated for ${email}${isDemo ? ' (marked as demo)' : ''}. All sessions were signed out.`);
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        isDemo,
      },
    });
    console.log(`Account created for ${email}${isDemo ? ' (marked as demo)' : ''}.`);
  }
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('Failed:', err.message);
  await prisma.$disconnect();
  process.exit(1);
});
