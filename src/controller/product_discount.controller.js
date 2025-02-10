const db = require("../utile/db");

//  product discounts
exports.GetAllProductDiscount = (req, res) => {
    const sql = `SELECT pd.*, p.pro_names FROM product_discount pd 
                 INNER JOIN products p ON pd.product_id = p.id`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(200).json(results); // Return the fetched data
    });
};




// Create multiple product discounts
exports.CreateProductDiscount = (req, res) => {
    const discounts = req.body; // Assuming req.body is an array of discount objects

    if (!Array.isArray(discounts)) {
        return res.status(400).json({ error: "Expected an array of discount objects" });
    }

    const sql = "INSERT INTO product_discount (names, product_id, discount_amount, date_start, date_end, user_at) VALUES ?";
    const values = discounts.map(discount => [
        discount.names,
        discount.product_id,
        discount.discount_amount,
        discount.date_start,
        discount.date_end,
        discount.user_at      
    ]);

    db.query(sql, [values], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }

        res.status(201).json({
            message: "Product discounts created successfully",
            inserted_ids: results.insertId, // This will return the first inserted ID
        });
    });
};






exports.UpdateProductDiscount = (req, res) => {
    const discounts = req.body;

    if (!Array.isArray(discounts) || discounts.length === 0) {
        return res.status(400).json({ error: "Expected an array of discount objects" });
    }

    const sql = `
      UPDATE product_discount 
      SET names = ?, product_id = ?, discount_amount = ?, date_start = ?, date_end = ?, user_at = ?
      WHERE id = ?
    `;

    const promises = discounts.map(discount => {
        const values = [
            discount.names,
            discount.product_id,
            discount.discount_amount,
            discount.date_start,
            discount.date_end,
            discount.user_at,
            discount.id
        ];
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    });

    Promise.all(promises)
        .then(() => res.status(200).json({ message: "Product discounts updated successfully" }))
        .catch(err => res.status(500).json({ error: "Database error", details: err }));
};







////  SET GLOBAL event_scheduler = ON;


// DELIMITER //

// CREATE EVENT update_product_discounts
// ON SCHEDULE EVERY 1 DAY
// STARTS CURRENT_TIMESTAMP
// DO
// BEGIN
//     -- Apply active discounts
//     UPDATE products p
//     JOIN product_discount pd ON p.id = pd.product_id
//     SET p.discount = pd.discount_amount
//     WHERE CURDATE() BETWEEN pd.date_start AND pd.date_end;

//     -- Reset expired discounts
//     UPDATE products p
//     SET p.discount = 0
//     WHERE p.id IN (SELECT product_id FROM product_discount WHERE date_end < CURDATE());
// END;
// //

// DELIMITER ;
