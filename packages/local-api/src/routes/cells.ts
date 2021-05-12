import express from 'express';

const router = express.Router();

const createCellsRouter = (filename: string, dir: string) => {
  router.get('/cells', async (req, res) => {
    // Check if Cell Storage File Exists
    // If the file does not exist, add in a default list of cells
    // Else Read the File
    // Parse a list of Cells
    // Send list of cells back to the browser
  });
  router.post('/cells', async (req, res) => {
    // Make sure the file Exists
    // If not, create it
    // Take the list of cells from the request obj
    // Serialize them
    // Write the cells into the file
  });
  return router;
};

export { createCellsRouter };
