const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      const token = jwt.sign(
        { isAdmin: true },
        process.env.JWT_SECRET || 'portfolio_jwt_secret_token_key_2026',
        { expiresIn: '7d' }
      );
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid Admin Password' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginAdmin };
