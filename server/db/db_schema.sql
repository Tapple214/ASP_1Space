-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Table for users
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL UNIQUE,
    user_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for task entries in the task manager page
CREATE TABLE IF NOT EXISTS task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name TEXT NOT NULL,
    task_description TEXT NOT NULL,
    task_category TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    finish_by DATETIME,
    user_id INTEGER,
    is_complete BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Table for badges in the task manager page
CREATE TABLE IF NOT EXISTS badge (
    badge_id INTEGER PRIMARY KEY AUTOINCREMENT,
    badge_name TEXT NOT NULL,
    badge_description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- The date when the badge was achieved
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Table for expense entries in the finance board page
CREATE TABLE IF NOT EXISTS expense (
    expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_name TEXT NOT NULL,
    expense_description TEXT NOT NULL,
    expense_category TEXT NOT NULL,
    expense_amount DOUBLE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    is_complete BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Table for financial overview data
CREATE TABLE IF NOT EXISTS financial_overview (
    overview_id INTEGER PRIMARY KEY AUTOINCREMENT,
    income DOUBLE NOT NULL,
    month_budget DOUBLE NOT NULL,
    rent DOUBLE,
    debt DOUBLE,
    invest DOUBLE,
    others DOUBLE,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

COMMIT;
