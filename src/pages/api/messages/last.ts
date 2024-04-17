import prisma from '@/lib/database';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({
      take: req.query.take ? Number(req.query.take) : undefined,
    });
    res.status(200).json(messages?.[0]?.message || '');
  }
};

export default handler;
