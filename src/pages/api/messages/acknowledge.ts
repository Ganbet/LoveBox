import prisma from '@/lib/database';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await prisma.message.updateMany({
      data: {
        readAt: new Date(),
      },
      where: {
        readAt: null,
      },
    });

    res.status(200).json('');
  }
};

export default handler;
