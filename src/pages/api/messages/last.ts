import prisma from '@/lib/database';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
      where: {
        sentAt: null,
      },
    });
    const lastRecord = messages?.[0];

    if (lastRecord) {
      await prisma.message.update({
        data: {
          sentAt: new Date(),
        },
        where: {
          id: lastRecord.id,
        },
      });
    }

    res.status(200).json(lastRecord?.message || '');
  }
};

export default handler;
