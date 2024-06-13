const prisma = require('../../lib/prisma');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST':
      try {
        const { name, password } = req.body;
        const user = await prisma.user.create({
          data: { name, password },
        });
        res.status(201).json(user);
      } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.user.delete({
          where: { id: Number(id) },
        });
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Failed to delete user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}