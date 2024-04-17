import prisma from '@/lib/database';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await prisma.message.create({
      data: {
        message: req.body.message,
      },
    });
    res.status(200).json({ message: 'Message sent' });
  } else if (req.method === 'GET') {
    const messages = await prisma.message.findMany({
      take: req.query.take ? Number(req.query.take) : undefined,
    });
    res.status(200).json(messages);
  }
};

export default handler;
