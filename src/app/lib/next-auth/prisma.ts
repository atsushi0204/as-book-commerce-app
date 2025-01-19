/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

type pc = PrismaClient;

// ホットリロードされても、インスタンスが新たに作成されなくなる
// ホットリロード：アプリケーションが実行されている間にコードを変更し、その変更をリアルタイムに反映させる技術
// シングルトン
const globalForPrisma = global as any as{
  prisma: pc | undefined;
};

if(!globalForPrisma.prisma){
  globalForPrisma.prisma = new PrismaClient();
};
const prisma: pc = globalForPrisma.prisma;

export default prisma;


