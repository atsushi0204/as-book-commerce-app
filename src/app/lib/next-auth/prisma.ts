import { PrismaClient } from "@prisma/client";

type pc = PrismaClient;

let prisma: pc;

// ホットリロードされても、インスタンスが新たに作成されなくなる
// ホットリロード：アプリケーションが実行されている間にコードを変更し、その変更をリアルタイムに反映させる技術
// シングルトン
const globalForPrisma = global as any as{
  prisma: pc | undefined;
};

if(!globalForPrisma.prisma){
  globalForPrisma.prisma = new PrismaClient();
};

prisma = globalForPrisma.prisma;

export default prisma;


