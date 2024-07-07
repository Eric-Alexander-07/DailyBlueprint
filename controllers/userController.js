// controllers/userController.js

const userModel = require('../models/user');

// Authenticate user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const existingEmail = await userModel.getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    await userModel.createUser({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Authenticate user
exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'User authenticated successfully' });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ error: 'User with this email does not exist' });
    }

    await userModel.deleteUserByEmail(email);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await userModel.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.error('Error retrieving users:', error);
//     res.status(500).json({ error: 'Error retrieving users' });
//   }
// };

// // Add a new user
// exports.addUser = async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     await userModel.addUser(username, email, password);
//     res.status(201).send('User added successfully');
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'Error adding user' });
//   }
// };

// // Delete a user by user_id
// exports.deleteUser = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     await userModel.deleteUserById(userId);
//     res.status(200).send(`User with ID ${userId} deleted successfully`);
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Error deleting user' });
//   }
// };
// // controllers/userController.js


// // Your controller functions below
// // Example:
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await userModel.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.error('Error retrieving users:', error);
//     res.status(500).json({ error: 'Error retrieving users' });
//   }
// };

// Register new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    // Check if the username already exists
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if the email already exists
    const existingEmail = await userModel.getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new user
    await userModel.createUser({ username, email, password });

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};