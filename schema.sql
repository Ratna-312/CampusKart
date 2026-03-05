-- ============================================================
-- UniKart — PostgreSQL Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== USERS ====================
CREATE TYPE user_role AS ENUM ('STUDENT', 'ADMIN');

CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  phone       VARCHAR(15),
  hostel      VARCHAR(50),
  role        user_role DEFAULT 'STUDENT',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== CATEGORIES ====================
CREATE TABLE categories (
  id          VARCHAR(50) PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  icon        VARCHAR(10),
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== PRODUCTS ====================
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category_id VARCHAR(50) REFERENCES categories(id) ON DELETE SET NULL,
  emoji       VARCHAR(10) DEFAULT '📦',
  image_url   TEXT,
  stock       INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  featured    BOOLEAN DEFAULT FALSE,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_products_active   ON products(active) WHERE active = TRUE;

-- ==================== CART ITEMS ====================
CREATE TABLE cart_items (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id  INT REFERENCES products(id) ON DELETE CASCADE,
  quantity    INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ==================== ORDERS ====================
CREATE TYPE order_status AS ENUM ('PLACED', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

CREATE TABLE orders (
  id                VARCHAR(20) PRIMARY KEY,
  user_id           UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name     VARCHAR(100) NOT NULL,
  delivery_location VARCHAR(100) NOT NULL,
  subtotal          DECIMAL(10,2) NOT NULL,
  delivery_fee      DECIMAL(10,2) DEFAULT 10.00,
  total             DECIMAL(10,2) NOT NULL,
  status            order_status DEFAULT 'PLACED',
  payment_id        VARCHAR(100),
  payment_method    VARCHAR(50),
  notes             TEXT,
  estimated_delivery TIMESTAMPTZ,
  delivered_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_user   ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date   ON orders(created_at DESC);

-- ==================== ORDER ITEMS ====================
CREATE TABLE order_items (
  id          SERIAL PRIMARY KEY,
  order_id    VARCHAR(20) REFERENCES orders(id) ON DELETE CASCADE,
  product_id  INT REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(200) NOT NULL,  -- Snapshot at time of order
  quantity    INT NOT NULL CHECK (quantity > 0),
  unit_price  DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ==================== ORDER STATUS HISTORY ====================
CREATE TABLE order_status_history (
  id          SERIAL PRIMARY KEY,
  order_id    VARCHAR(20) REFERENCES orders(id) ON DELETE CASCADE,
  status      order_status NOT NULL,
  changed_by  UUID REFERENCES users(id),
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_status_history_order ON order_status_history(order_id);

-- ==================== DELIVERY LOCATIONS ====================
CREATE TABLE delivery_locations (
  id          VARCHAR(50) PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  emoji       VARCHAR(10),
  active      BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0
);

-- ==================== SEED DATA ====================

-- Categories
INSERT INTO categories (id, name, icon, sort_order) VALUES
  ('pens',        'Pens',          '🖊️', 1),
  ('notebooks',   'Notebooks',     '📓', 2),
  ('lab-records', 'Lab Records',   '🔬', 3),
  ('printouts',   'Printouts',     '🖨️', 4),
  ('binding',     'Binding',       '📎', 5),
  ('exam-pads',   'Exam Pads',     '📝', 6),
  ('calculators', 'Calculators',   '🔢', 7),
  ('art',         'Art Supplies',  '🎨', 8);

-- Delivery Locations
INSERT INTO delivery_locations (id, name, emoji, sort_order) VALUES
  ('hostel-a',  'Hostel Block A', '🏢', 1),
  ('hostel-b',  'Hostel Block B', '🏢', 2),
  ('hostel-c',  'Hostel Block C', '🏢', 3),
  ('library',   'Library',        '📚', 4),
  ('academic',  'Academic Block', '🎓', 5),
  ('canteen',   'Canteen Area',   '🍔', 6),
  ('main-gate', 'Main Gate',      '🚪', 7);

-- Sample Products
INSERT INTO products (name, description, price, category_id, emoji, stock, featured) VALUES
  ('Pilot V5 Pen (Blue)',        'Smooth 0.5mm liquid ink',               45,   'pens',        '🖊️', 120, TRUE),
  ('Pilot V5 Pen (Black)',       'Smooth 0.5mm liquid ink',               45,   'pens',        '🖊️', 95,  FALSE),
  ('Cello Gripper Pack (5)',     'Comfortable grip, blue ink',            60,   'pens',        '✒️',  80,  FALSE),
  ('Reynolds 045 (10-pack)',     'Classic ballpoint, fine tip',           90,   'pens',        '🖋️', 65,  TRUE),
  ('Highlighter Set (6 colors)', 'Neon markers for notes',               120,  'pens',        '🌈', 40,  FALSE),
  ('Classmate Notebook (200pg)', 'Single line, spiral bound',            75,   'notebooks',   '📓', 200, TRUE),
  ('Classmate Notebook (100pg)', 'Single line, side stapled',            40,   'notebooks',   '📗', 250, FALSE),
  ('A4 Graph Notebook',          '1cm grid, 100 pages',                  55,   'notebooks',   '📐', 90,  FALSE),
  ('Long Notebook (400pg)',      'Register-style, ruled',                120,  'notebooks',   '📕', 60,  FALSE),
  ('Physics Lab Record',         '100 pages, interleaved, hard bound',   85,   'lab-records', '🔬', 150, TRUE),
  ('Chemistry Lab Record',       '100 pages, interleaved, hard bound',   85,   'lab-records', '⚗️', 140, FALSE),
  ('CSE Lab Record',             '100 pages, plain, hard bound',         80,   'lab-records', '💻', 130, FALSE),
  ('B&W Printout (per page)',    'A4 single side, quality print',        3,    'printouts',   '🖨️', 999, FALSE),
  ('Color Printout (per page)',  'A4 single side, vivid colors',         10,   'printouts',   '🌈', 999, TRUE),
  ('Spiral Binding',             'Plastic spiral, up to 100 pages',      30,   'binding',     '📎', 500, FALSE),
  ('Hard Binding',               'Professional hard cover binding',      80,   'binding',     '📚', 200, FALSE),
  ('Soft Binding (Tape)',        'Tape binding, up to 50 pages',         20,   'binding',     '📑', 400, FALSE),
  ('Exam Writing Pad (A4)',      '80 sheets, ruled, top punched',        35,   'exam-pads',   '📝', 300, TRUE),
  ('Exam Pad + Supplement (5)',  'Main + 5 supplements combo',           50,   'exam-pads',   '📄', 180, FALSE),
  ('Casio FX-991ES Plus',       'Scientific calculator, 417 functions',  1350, 'calculators', '🔢', 25,  TRUE),
  ('Casio FX-82MS',             'Basic scientific, 240 functions',       750,  'calculators', '🧮', 35,  FALSE),
  ('Geometry Box (Camlin)',      'Complete geometry set',                 120,  'art',         '📏', 50,  FALSE),
  ('Eraser & Sharpener Combo',  'Faber-Castell, dust-free',              25,   'art',         '✏️', 200, FALSE),
  ('A3 Drawing Sheet (10-pack)','Cartridge paper, 150 GSM',              60,   'art',         '🎨', 75,  FALSE);

-- Auto-update trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated    BEFORE UPDATE ON users       FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON products    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER trg_cart_updated     BEFORE UPDATE ON cart_items   FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER trg_orders_updated   BEFORE UPDATE ON orders      FOR EACH ROW EXECUTE FUNCTION update_modified_column();
