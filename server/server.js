const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
const localProducts = [
  { id: 1, name: "Ceramic Flower Vase", price: 699, description: "An elegant ceramic vase designed to add a warm decorative touch to living spaces.", category: "Living Room", room: "Living Room", style: "Minimal", stock: 25, rating: 4.5, image: "ceramic-vase-1.jpg" },
  { id: 2, name: "Decorative Ceramic Vase", price: 849, description: "Modern decorative vase designed to add a stylish touch to shelves and tables.", category: "Living Room", room: "Living Room", style: "Modern", stock: 18, rating: 4.6, image: "ceramic-vase-2.jpg" },
  { id: 3, name: "Textured Cushion", price: 499, description: "Soft textured cushion that adds comfort and warmth to your living space.", category: "Living Room", room: "Living Room", style: "Boho", stock: 30, rating: 4.4, image: "cushion-1.jpg" },
  { id: 4, name: "Decorative Tray", price: 799, description: "Stylish decorative tray for displaying candles, vases and small accessories.", category: "Living Room", room: "Living Room", style: "Contemporary", stock: 15, rating: 4.5, image: "decorative-tray-1.jpg" },
  { id: 5, name: "Bedside Table Lamp", price: 1299, description: "Compact bedside lamp providing warm and comfortable lighting.", category: "Bedroom", room: "Bedroom", style: "Minimal", stock: 20, rating: 4.7, image: "bedside-lamp-1.jpg" },
  { id: 6, name: "Cushion Cover Set", price: 599, description: "Decorative cushion cover set designed for a comfortable and stylish bedroom.", category: "Bedroom", room: "Bedroom", style: "Boho", stock: 35, rating: 4.5, image: "cushion-cover-1.jpg" },
  { id: 7, name: "Round Wall Mirror", price: 1499, description: "Round decorative mirror that creates a clean and elegant bedroom look.", category: "Bedroom", room: "Bedroom", style: "Modern", stock: 12, rating: 4.6, image: "round-mirror-1.jpg" },
  { id: 8, name: "Dream Catcher", price: 449, description: "Handcrafted-style dream catcher suitable for bedroom wall decoration.", category: "Bedroom", room: "Bedroom", style: "Boho", stock: 22, rating: 4.3, image: "dream-catcher-1.jpg" },
  { id: 9, name: "Scented Soy Candle", price: 399, description: "Fragrant soy candle designed to create a relaxing atmosphere.", category: "Lighting & Candles", room: "Bedroom", style: "Minimal", stock: 40, rating: 4.7, image: "scented-candle-1.jpg" },
  { id: 10, name: "Decorative Table Lamp", price: 1599, description: "Elegant table lamp with a warm glow for living room side tables.", category: "Lighting & Candles", room: "Living Room", style: "Contemporary", stock: 16, rating: 4.6, image: "table-lamp-1.jpg" },
  { id: 11, name: "LED Ambient Lamp", price: 1199, description: "Modern LED lamp suitable for creating soft ambient lighting.", category: "Lighting & Candles", room: "Bedroom", style: "Modern", stock: 20, rating: 4.5, image: "led-lamp-1.jpg" },
  { id: 12, name: "Decorative Lantern", price: 899, description: "Decorative lantern that adds a warm and classic touch to interiors.", category: "Lighting & Candles", room: "Living Room", style: "Vintage", stock: 14, rating: 4.4, image: "decorative-lantern-1.jpg" },
  { id: 13, name: "Snake Plant", price: 549, description: "Low-maintenance indoor snake plant suitable for home interiors.", category: "Plants & Planters", room: "Living Room", style: "Natural", stock: 25, rating: 4.6, image: "snake-plant-1.jpg" },
  { id: 14, name: "Ceramic Plant Pot", price: 699, description: "Minimal ceramic planter designed for indoor plants.", category: "Plants & Planters", room: "Living Room", style: "Minimal", stock: 30, rating: 4.5, image: "ceramic-planter-1.jpg" },
  { id: 15, name: "Hanging Planter", price: 599, description: "Decorative hanging planter suitable for indoor corners and balconies.", category: "Plants & Planters", room: "Balcony", style: "Boho", stock: 18, rating: 4.4, image: "hanging-planter-1.jpg" },
  { id: 16, name: "Wooden Plant Stand", price: 999, description: "Wooden stand designed to display indoor plants at an elevated height.", category: "Plants & Planters", room: "Living Room", style: "Scandinavian", stock: 10, rating: 4.5, image: "plant-stand-1.jpg" },
  { id: 17, name: "Abstract Wall Painting", price: 1299, description: "Contemporary abstract artwork for adding character to living room walls.", category: "Wall Décor", room: "Living Room", style: "Contemporary", stock: 15, rating: 4.6, image: "wall-painting-1.jpg" },
  { id: 18, name: "Minimalist Poster Set", price: 699, description: "Set of minimalist decorative posters for bedrooms and study spaces.", category: "Wall Décor", room: "Bedroom", style: "Minimal", stock: 25, rating: 4.5, image: "poster-1.jpg" },
  { id: 19, name: "Floating Wall Shelf", price: 899, description: "Simple floating shelf for displaying small decorative objects.", category: "Wall Décor", room: "Living Room", style: "Scandinavian", stock: 20, rating: 4.4, image: "wall-shelf-1.jpg" },
  { id: 20, name: "Decorative Wall Plate", price: 749, description: "Decorative plate designed to create an artistic wall display.", category: "Wall Décor", room: "Dining Room", style: "Traditional", stock: 14, rating: 4.3, image: "wall-plate-1.jpg" },
  { id: 21, name: "Cotton Table Runner", price: 499, description: "Soft cotton table runner for everyday dining and special occasions.", category: "Dining & Kitchen", room: "Dining Room", style: "Minimal", stock: 30, rating: 4.5, image: "table-runner-1.jpg" },
  { id: 22, name: "Dining Table Centerpiece", price: 899, description: "Elegant centerpiece for decorating dining tables and sideboards.", category: "Dining & Kitchen", room: "Dining Room", style: "Contemporary", stock: 16, rating: 4.6, image: "centerpiece-1.jpg" },
  { id: 23, name: "Wooden Serving Tray", price: 799, description: "Wooden serving tray suitable for serving and decorative display.", category: "Dining & Kitchen", room: "Dining Room", style: "Rustic", stock: 22, rating: 4.5, image: "serving-tray-1.jpg" },
  { id: 24, name: "Ceramic Storage Jar", price: 649, description: "Decorative ceramic jar suitable for kitchen storage and countertop display.", category: "Dining & Kitchen", room: "Kitchen", style: "Minimal", stock: 25, rating: 4.4, image: "decorative-jar-1.jpg" }
];

const defaultAdmin = {
  name: "Admin User",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};
function ensureTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      description TEXT,
      category VARCHAR(100),
      room VARCHAR(100),
      style VARCHAR(100),
      stock INT DEFAULT 0,
      rating DECIMAL(3,1) DEFAULT 0.0,
      image VARCHAR(255)
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('customer', 'admin') DEFAULT 'customer'
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      customer_name VARCHAR(150),
      email VARCHAR(150),
      phone VARCHAR(30),
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      pincode VARCHAR(20),
      total_amount DECIMAL(10,2) NOT NULL,
      status VARCHAR(30) DEFAULT 'Placed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT DEFAULT 1,
      price DECIMAL(10,2) NOT NULL
    )`
  ];

  return Promise.all(
    queries.map(
      (query) =>
        new Promise((resolve, reject) => {
          db.query(query, (err) => {
            if (err) return reject(err);
            resolve();
          });
        })
    )
  );
}

function seedProducts() {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS total FROM products", (countErr, rows) => {
      if (countErr) return reject(countErr);

      const total = rows[0].total || 0;
      if (total > 0) return resolve();

      const values = localProducts.map((product) => [
        product.name,
        product.price,
        product.description,
        product.category,
        product.room,
        product.style,
        product.stock,
        product.rating,
        product.image
      ]);

      db.query(
        `INSERT INTO products
          (name, price, description, category, room, style, stock, rating, image)
          VALUES ?`,
        [values],
        (insertErr) => {
          if (insertErr) return reject(insertErr);
          resolve();
        }
      );
    });
  });
}

function seedDefaultAdmin() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [defaultAdmin.email],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length > 0) return resolve();

        const hashedPassword = bcrypt.hashSync(defaultAdmin.password, 10);

        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')",
          [defaultAdmin.name, defaultAdmin.email, hashedPassword],
          (insertErr) => {
            if (insertErr) return reject(insertErr);
            resolve();
          }
        );
      }
    );
  });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CasaNest API"
  });
});

app.get("/api/db-test", (req, res) => {
  db.query("SELECT 1 AS result", (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Database connection failed"
      });
    }

    res.json({
      success: true,
      message: "CasaNest database connected successfully",
      result: results[0].result
    });
  });
});

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id ASC", (err, rows) => {
    if (err) {
      console.error("Get products failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Unable to load products"
      });
    }

    const products = rows.map((product) => ({
      ...product,
      price: Number(product.price),
      rating: Number(product.rating)
    }));

    res.json(products);
  });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error("Get product failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Unable to load product"
      });
    }

    if (!rows[0]) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const product = {
      ...rows[0],
      price: Number(rows[0].price),
      rating: Number(rows[0].rating)
    };

    res.json(product);
  });
});

app.post("/api/products", verifyToken, (req, res) => {
  const {
    name,
    price,
    description,
    category,
    room,
    style,
    stock,
    rating,
    image
  } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  db.query(
    `INSERT INTO products
      (name, price, description, category, room, style, stock, rating, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      price,
      description,
      category,
      room,
      style,
      stock,
      rating || 4.5,
      image || "placeholder.jpg"
    ],
    (err, result) => {
      if (err) {
        console.error("Create product failed:", err.message);
        return res.status(500).json({
          success: false,
          message: "Product could not be added"
        });
      }

      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: {
          id: result.insertId,
          name,
          price,
          description,
          category,
          room,
          style,
          stock,
          rating,
          image
        }
      });
    }
  );
});

app.put("/api/products/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  const {
    name,
    price,
    description,
    category,
    room,
    style,
    stock,
    rating,
    image
  } = req.body;

  db.query(
    `UPDATE products
     SET name = ?, price = ?, description = ?, category = ?, room = ?,
         style = ?, stock = ?, rating = ?, image = ?
     WHERE id = ?`,
    [name, price, description, category, room, style, stock, rating, image, id],
    (err) => {
      if (err) {
        console.error("Update product failed:", err.message);
        return res.status(500).json({
          success: false,
          message: "Product could not be updated"
        });
      }

      res.json({
        success: true,
        message: "Product updated successfully"
      });
    }
  );
});

app.delete("/api/products/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Delete product failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Product could not be deleted"
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  });
});

// REGISTER
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required"
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.error("User lookup failed:", err.message);
        return res.status(500).json({
          success: false,
          message: "Registration failed"
        });
      }

      if (rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: "User already exists"
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')",
        [name, email, hashedPassword],
        (insertErr, result) => {
          if (insertErr) {
            console.error("User insert failed:", insertErr.message);
            return res.status(500).json({
              success: false,
              message: "Registration failed"
            });
          }

          res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
              id: result.insertId,
              name,
              email,
              role: "customer"
            }
          });
        }
      );
    }
  );
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.error("Login lookup failed:", err.message);
        return res.status(500).json({
          success: false,
          message: "Login failed"
        });
      }

      if (!rows[0]) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const user = rows[0];
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  );
});

// CREATE ORDER
app.post("/api/orders", verifyToken, (req, res) => {
  const {
    items = [],
    total_amount,
    customer_name,
    email,
    phone,
    address,
    city,
    state,
    pincode
  } = req.body;

  if (!items.length || !total_amount) {
    return res.status(400).json({
      success: false,
      message: "Order items are required"
    });
  }

  const userId = req.user.id;

  db.query(
    `INSERT INTO orders
      (user_id, customer_name, email, phone, address, city, state, pincode, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Placed')`,
    [
      userId,
      customer_name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      total_amount
    ],
    (orderErr, result) => {
      if (orderErr) {
        console.error("Create order failed:", orderErr.message);
        return res.status(500).json({
          success: false,
          message: "Order could not be placed"
        });
      }

      const orderId = result.insertId;
      const orderItems = items.map((item) => [
        orderId,
        item.product_id,
        item.quantity,
        item.price
      ]);

      db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
        [orderItems],
        (itemErr) => {
          if (itemErr) {
            console.error("Create order items failed:", itemErr.message);
            return res.status(500).json({
              success: false,
              message: "Order could not be placed"
            });
          }

          res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: {
              id: orderId,
              user_id: userId,
              total_amount,
              status: "Placed",
              created_at: new Date()
            }
          });
        }
      );
    }
  );
});

// GET ORDERS
app.get("/api/orders", verifyToken, (req, res) => {
  const query =
    req.user.role === "admin"
      ? "SELECT * FROM orders ORDER BY created_at DESC"
      : "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";

  const params = req.user.role === "admin" ? [] : [req.user.id];

  db.query(query, params, (err, rows) => {
    if (err) {
      console.error("Fetch orders failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Unable to load orders"
      });
    }

    res.json(
      rows.map((order) => ({
        ...order,
        total_amount: Number(order.total_amount)
      }))
    );
  });
});

// GET ORDER DETAILS
app.get("/api/orders/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM orders WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error("Fetch order failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Unable to load order"
      });
    }

    const order = rows[0];

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (req.user.role !== "admin" && order.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id],
      (itemErr, items) => {
        if (itemErr) {
          console.error("Fetch order items failed:", itemErr.message);
          return res.status(500).json({
            success: false,
            message: "Unable to load order details"
          });
        }

        res.json({
          success: true,
          order: {
            ...order,
            total_amount: Number(order.total_amount),
            items: items.map((item) => ({
              ...item,
              price: Number(item.price)
            }))
          }
        });
      }
    );
  });
});

ensureTables()
  .then(() => seedProducts())
  .then(() => seedDefaultAdmin())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CasaNest server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  });