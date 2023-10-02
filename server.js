const express = require('express');
const app = express();
const port = 3000;
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors')

app.use(cors({
        origin: 'http://167.71.182.163:3000/'  
}));



const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample',
  port: 3306,
  connectionLimit: 5,
});

app.use(bodyParser.json());

const options = {
    swaggerDefinition: {
        info: {
            title: 'Sonu Basnet Assignment 8',
            version: '1.0.0',
            description: ' Assignment 8 using Swaggar',
        },
        host: `167.71.182.163:${port}`,
        basePath: '/',
    },
    apis: ['./server.js'],  // Assuming this code is in server.js
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
/**
 * @swagger
 * /food/{id}:
 *   get:
 *     description: Get food item by ID
 *     parameters:
 *       - name: id
 *         description: Food item's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved food item
 *         schema:
 *           $ref: '#/definitions/FoodItem'
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal Server Error
 * definitions:
 *   FoodItem:
 *     properties:
 *       ITEM_ID:
 *         type: number
 *       NAME:
 *         type: string
 *       DESCRIPTION:
 *         type: string
 *       PRICE:
 *         type: number
 *       CATEGORY:
 *         type: string
 */
app.get('/food/:id', async (req, res)=> {
  
  console.log("you passed in " + req.params.id);

  //connect to the database
   try {
    conn = await pool.getConnection();
    let query = 'SELECT * FROM foods WHERE ITEM_ID = ' + req.params.id;
    console.log(query);
    const rows = await conn.query(query);
    console.log(rows); 
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json(rows);
    } catch (err) {
    throw err;
    } finally {
    if (conn) return conn.end();
    }

});

// app.get('/order/:orderNum', async (req, res)=> {
// Swagger Documentation:
// /**
//  * @swagger
//  * /order/{orderNum}:
//  *   get:
//  *     summary: Get order details by order number
//  *     parameters:
//  *       - name: orderNum
//  *         in: path
//  *         description: Order number
//  *         required: true
//  *         type: string
//  *     responses:
//  *       '200':
//  *         description: Successful response with order details
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: object
//  *             properties:
//  *               ORD_NUM: 
//  *                 type: string
//  *                 description: Order number
//  *               ORD_AMOUNT: 
//  *                 type: number
//  *                 description: Order amount
//  *               ADVANCE_AMOUNT: 
//  *                 type: number
//  *                 description: Advance amount
//  *               ORD_DATE: 
//  *                 type: string
//  *                 format: date
//  *                 description: Order date
//  *               CUST_CODE: 
//  *                 type: string
//  *                 description: Customer code
//  *               AGENT_CODE: 
//  *                 type: string
//  *                 description: Agent code
//  *               ORD_DESCRIPTION: 
//  *                 type: string
//  *                 description: Order description
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Internal Server Error
//  */
async function getOrderDetails(req, res) {
  console.log("You passed in " + req.params.orderNum);

  // Connect to the database
  try {
    let conn = await pool.getConnection();
    let query = 'SELECT * FROM daysorder WHERE ORD_NUM = ' + req.params.orderNum;
    console.log(query);
    const rows = await conn.query(query);
    console.log(rows);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

// Register the route with Express
app.get('/order/:orderNum', getOrderDetails);

app.get('/order/:orderNum', async (req, res)=> {
  
  console.log("you passed in " + req.params.orderNum);

  //connect to the database
   try {
    conn = await pool.getConnection();
    let query = 'SELECT * FROM daysorder WHERE ORD_NUM = ' + req.params.orderNum;
    console.log(query);
    const rows = await conn.query(query);
    console.log(rows); 
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json(rows);
    } catch (err) {
    throw err;
    } finally {
    if (conn) return conn.end();
    }

});

/**
 * @swagger
 * /student/{rollId}:
 *   get:
 *     description: Get student report by roll ID
 *     parameters:
 *       - name: rollId
 *         description: Student's roll ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved student report
 *         schema:
 *           type: object
 *           properties:
 *             ROLLID:
 *               type: number
 *             NAME:
 *               type: string
 *             GRADE:
 *               type: string
 *             MARKS:
 *               type: number
 *       404:
 *         description: Student report not found
 *       500:
 *         description: Internal Server Error
 */
app.get('/student/:rollId', async (req, res)=> {
  
  console.log("you passed in " + req.params.rollId);

  //connect to the database
   try {
    conn = await pool.getConnection();
    let query = 'SELECT * FROM studentreport WHERE ROLLID = ' + req.params.rollId;
    console.log(query);
    const rows = await conn.query(query);
    console.log(rows); 
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json(rows);
    } catch (err) {
    throw err;
    } finally {
    if (conn) return conn.end();
    }

});

app.get('/item/:itemCode', async (req, res) => {
  console.log("you passed in " + req.params.itemCode);

  // Connect to the database
  let conn;
  try {
    conn = await pool.getConnection();
    let query = 'SELECT * FROM listofitem WHERE ITEMCODE = ?'; 
    const values = [req.params.itemCode]; 
    console.log(query, values);

    const [rows] = await conn.execute(query, values); 
    console.log(rows);

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release(); 
  }

});



/**
 * @swagger
 * /foods/{ITEM_ID}:
 *   delete:
 *     description: Delete a food item by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ITEM_ID
 *         description: ID of the food item to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted food item
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal Server Error
 */
app.delete('/foods/:ITEM_ID', async (req, res) => {
  try {
    const { ITEM_ID } = req.params;

    const checkQuery = 'SELECT ITEM_ID FROM foods WHERE ITEM_ID = ?';
    const [checkResult] = await pool.query(checkQuery, [ITEM_ID]);

    if (checkResult.length === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }


    const deleteQuery = 'DELETE FROM foods WHERE ITEM_ID = ?';
    await pool.query(deleteQuery, [ITEM_ID]);

    res.json({ message: 'Food item deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /foods:
 *   post:
 *     description: Add a new food
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: food
 *         description: Food object
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           ITEM_ID:
 *             type: number
 *           ITEM_NAME:
 *             type: string
 *           ITEM_UNIT:
 *             type: string
 *           COMPANY_ID:
 *             type: number
 *     responses:
 *       200:
 *         description: Successfully added food
 *       500:
 *         description: Internal Server Error
 */
app.post('/foods', async (req, res) => {
  try {
    const { ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID } = req.body;

    if (!ITEM_ID || !ITEM_NAME || !ITEM_UNIT || !COMPANY_ID) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO foods (ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID) VALUES (?, ?, ?, ?)';
    await pool.query(query, [ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID]);

    res.json({ message: 'Food added successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

/**
 * @swagger
 * /foods/{ITEM_ID}:
 *   put:
 *     description: Update a food item by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ITEM_ID
 *         description: ID of the food item to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: food
 *         description: Food object containing updated data
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ITEM_NAME:
 *               type: string
 *             ITEM_UNIT:
 *               type: string
 *             COMPANY_ID:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully updated food item
 *       400:
 *         description: Bad Request. Invalid or missing input data.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: An error message indicating the cause of the bad request.
 *       404:
 *         description: Food item not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: An error message indicating that the food item was not found.
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: A generic error message indicating an internal server error.
 */
app.put('/foods/:ITEM_ID', async (req, res) => {
  try {
    const { ITEM_ID } = req.params;
    const { ITEM_NAME, ITEM_UNIT, COMPANY_ID } = req.body;

    if (!ITEM_NAME || !ITEM_UNIT || !COMPANY_ID) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const checkQuery = 'SELECT ITEM_ID FROM foods WHERE ITEM_ID = ?';
    const [checkResult] = await pool.query(checkQuery, [ITEM_ID]);

    if (checkResult.length === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const updateQuery = 'UPDATE foods SET ITEM_NAME = ?, ITEM_UNIT = ?, COMPANY_ID = ? WHERE ITEM_ID = ?';
    await pool.query(updateQuery, [ITEM_NAME, ITEM_UNIT, COMPANY_ID, ITEM_ID]);

    res.json({ message: 'Food item updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /foods/{ITEM_ID}:
 *   put:
 *     description: Update a food item by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ITEM_ID
 *         description: ID of the food item to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: food
 *         description: Food object containing updated data
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ITEM_NAME:
 *               type: string
 *             ITEM_UNIT:
 *               type: string
 *             COMPANY_ID:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully updated food item
 *       400:
 *         description: Bad Request. Invalid or missing input data.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: An error message indicating the cause of the bad request.
 *       404:
 *         description: Food item not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: An error message indicating that the food item was not found.
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: A generic error message indicating an internal server error.
 */
app.put('/foods/:ITEM_ID', async (req, res) => {
  try {
    const { ITEM_ID } = req.params;
    const { ITEM_NAME, ITEM_UNIT, COMPANY_ID } = req.body;
    console.log('Received data:', { ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID });

    if (!ITEM_NAME || !ITEM_UNIT || !COMPANY_ID) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const checkQuery = 'SELECT ITEM_ID FROM foods WHERE ITEM_ID = ?';
    const [checkResult] = await pool.query(checkQuery, [ITEM_ID]);

    if (checkResult.length === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const updateQuery = 'UPDATE foods SET ITEM_NAME = ?, ITEM_UNIT = ?, COMPANY_ID = ? WHERE ITEM_ID = ?';
    await pool.query(updateQuery, [ITEM_NAME, ITEM_UNIT, COMPANY_ID, ITEM_ID]);

    res.json({ message: 'Food item updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /foods/{ITEM_ID}:
 *   patch:
 *     description: Update a food item by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ITEM_ID
 *         description: ID of the food item
 *         in: path
 *         required: true
 *         type: string
 *       - name: foodItem
 *         description: Updated food item object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ITEM_NAME:
 *               type: string
 *               description: New name for the food item
 *             ITEM_UNIT:
 *               type: string
 *               description: New unit for the food item
 *             COMPANY_ID:
 *               type: string
 *               description: New company ID for the food item
 *     responses:
 *       200:
 *         description: Successfully updated food item
 *         schema:
 *           type: object
 *           properties:
 *             ITEM_ID:
 *               type: string
 *               description: ID of the updated food item
 *             ITEM_NAME:
 *               type: string
 *               description: Updated name of the food item
 *             ITEM_UNIT:
 *               type: string
 *               description: Updated unit of the food item
 *             COMPANY_ID:
 *               type: string
 *               description: Updated company ID of the food item
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal Server Error
 */
app.patch('/foods/:ITEM_ID', async (req, res) => {
  try {
    const { ITEM_ID } = req.params;
    const { ITEM_NAME, ITEM_UNIT, COMPANY_ID } = req.body;

    if (!ITEM_NAME || !ITEM_UNIT || !COMPANY_ID) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const existingFoodItem = await pool.query('SELECT * FROM foods WHERE ITEM_ID = ?', [ITEM_ID]);

    if (existingFoodItem.length === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const query = 'UPDATE foods SET ITEM_NAME = ?, ITEM_UNIT = ?, COMPANY_ID = ? WHERE ITEM_ID = ?';
    const result = await pool.query(query, [ITEM_NAME, ITEM_UNIT, COMPANY_ID, ITEM_ID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json({
      ITEM_ID: ITEM_ID,
      ITEM_NAME: ITEM_NAME,
      ITEM_UNIT: ITEM_UNIT,
      COMPANY_ID: COMPANY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
});
