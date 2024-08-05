// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// // Get User Profile
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user).select('-password'); // Exclude password from the result
//     const profileImageUrl = user.avatarUrl ? `${req.protocol}://${req.get('host')}/${user.avatarUrl.replace(/\\/g, '/')}` : null;
//     res.json({
//         ...user.toObject(),
//         profileImageUrl // Include the URL in the response
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Update User Profile
// const updateUserProfile = async (req, res) => {
//   const { username, email, password, phoneNumber, avatarUrl } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update user fields
//     if (username) user.username = username;
    
//     if (email && user.email !== email) {
//       const emailExists = await User.findOne({ email });
//       if (emailExists) {
//         return res.status(400).json({ message: 'Email already in use' });
//       }
//       user.email = email;
//     }

//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (req.file) {
//       user.avatarUrl = req.file.path.replace(/\\/g, '/'); // Save the file path to the avatarUrl field
//     }

//     // Hash the new password if it is provided
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       username: updatedUser.username,
//       email: updatedUser.email,
//       phoneNumber: updatedUser.phoneNumber,
//       avatarUrl: updatedUser.avatarUrl,
//       balance: updatedUser.balance,
//       role: updatedUser.role,
//       purchaseHistory: updatedUser.purchaseHistory,
//       createdAt: updatedUser.createdAt,
//       updatedAt: updatedUser.updatedAt,
//     });
//   } catch (error) {
//     console.error('Update profile error:', error.message);
//     res.status(500).json({ error: 'Server error', message: error.message });
//   }
// };

// const deleteUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.body.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     await User.findByIdAndDelete(req.body.id);
    
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select('-password'); // Exclude passwords from the result
//     const userCount = await User.countDocuments({}); // Get the count of all users

//     res.json({
//       count: userCount,
//       users: users
//     })
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const deleteAllUsersExcept = async (req, res) => {
//   const { exceptUserIds } = req.body; // An array of user IDs to be excluded from deletion

//   try {
//     // Validate input
//     if (!Array.isArray(exceptUserIds) || exceptUserIds.length === 0) {
//       return res.status(400).json({ message: 'No user IDs provided to exclude' });
//     }

//     // Delete users not in the exceptUserIds array
//     await User.deleteMany({ _id: { $nin: exceptUserIds } });

//     res.json({ message: 'All users except specified ones have been deleted' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = {
//   getUserProfile,
//   updateUserProfile,
//   getAllUsers,
//   deleteUserProfile,
//   deleteAllUsersExcept, 
// };
