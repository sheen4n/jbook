import path from 'path';
import fs from 'fs/promises';
import express from 'express';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      // Read the File
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Add code to create a file and add default cells
      } else {
        throw error;
      }
    }
  });
  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj
    // Serialize them
    const { cells }: { cells: Cell[] } = req.body;
    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'ok' });
  });
  return router;
};

export { createCellsRouter };
