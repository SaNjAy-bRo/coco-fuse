const { PrismaClient } = require('@prisma/client');

async function test() {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.order.count();
    console.log("SUCCESS:", count);
    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err.message);
    process.exit(1);
  }
}
test();
