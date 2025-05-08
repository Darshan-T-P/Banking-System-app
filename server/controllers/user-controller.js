import User from '../models/model.js';
import Account from '../models/account.js';
import Transaction from '../models/transcationModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Sign Up Controller
export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, address, state, postalCode, dateOfBirth, ssn } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if SSN is already registered
        const existingSSN = await User.findOne({ ssn });
        if (existingSSN) {
            return res.status(400).json({ message: 'SSN already registered' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Store the hashed password
            address,
            state,
            postalCode,
            dateOfBirth,
            ssn
        });

        // Check if user is of legal age
        if (!user.isLegalAge()) {
            return res.status(400).json({ message: 'Must be 18 or older to create an account' });
        }

        // Save user
        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Sign In Controller
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check password by comparing hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
};

// Update User Controller
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Don't allow password update through this route
        delete updates.password;

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete User Controller
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(id).select('-password').populate('bankAccounts');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Add a new bank account
export const addBankAccount = async (req, res) => {
    try {
        const { bankName, accountType, balance } = req.body;
        const { id } = req.params; // Getting userId from params

        // Ensure that userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid userId' });
        }

        // Ensure that the user exists
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Create a new bank account
        const newAccount = new Account({
            userId: id, // Use the userId from params
            bankName,
            accountType,
            balance,
        });

        await newAccount.save();

        // Optionally, you can push the new account into the user bankAccounts field:
        user.bankAccounts.push(newAccount._id);
        await user.save();

        res.status(201).json({
            message: 'Bank account created successfully',
            account: newAccount,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error adding bank account', error: error.message });
    }
};

// Get all bank accounts for a user
export const getBankAccounts = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const accounts = await Account.find({ userId: id });
        if (!accounts.length) {
            return res.status(404).json({ message: 'No bank accounts found for this user' });
        }

        res.status(200).json({ accounts });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching bank accounts', error: error.message });
    }
};

// Create a new transaction (debit or credit)
export const createTransaction = async (req, res) => {
    try {
      const { accountId, amount, transactionType, description } = req.body;
  
      // Check if account exists
      const account = await Account.findById(accountId);
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      // Update the account balance based on transaction type
      let newBalance = account.balance;
      if (transactionType === 'credit') {
        newBalance += amount;
      } else if (transactionType === 'debit') {
        if (amount > account.balance) {
          return res.status(400).json({ message: 'Insufficient funds' });
        }
        newBalance -= amount;
      }
  
      // Update account balance
      account.balance = newBalance;
      await account.save();
  
      // Create a new transaction record
      const transaction = new Transaction({
        accountId,
        amount,
        transactionType,
        description,
        balanceAfterTransaction: newBalance,
      });
      await transaction.save();
  
      return res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Fetch transaction history for an account
  export const getTransactions = async (req, res) => {
    try {
      const { accountId } = req.params;
  
      // Fetch transactions associated with the account
      const transactions = await Transaction.find({ accountId }).sort({ createdAt: -1 });
  
      return res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // POST Route for transferring money between accounts
  export const transferMoney = async (req, res) => {
    const { senderAccountId, receiverAccountId, amount, description } = req.body;
  
    if (!senderAccountId || !receiverAccountId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'All fields are required and the amount must be greater than 0' });
    }
  
    try {
      // Retrieve sender and receiver accounts from the database
      const sender = await Account.findById(senderAccountId);
      const receiver = await Account.findById(receiverAccountId);
  
      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or Receiver account not found' });
      }
  
      // Check if sender has enough balance
      if (sender.balance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      // Deduct amount from sender's balance
      sender.balance -= amount;
  
      // Add amount to receiver's balance
      receiver.balance += amount;
  
      // Create a transaction record for the sender (debit)
      const senderTransaction = new Transaction({
        accountId: senderAccountId,
        amount,
        transactionType: 'debit',
        description: `Transfer to ${receiverAccountId}: ${description}`,
        balanceAfterTransaction: sender.balance,
      });
  
      // Create a transaction record for the receiver (credit)
      const receiverTransaction = new Transaction({
        accountId: receiverAccountId,
        amount,
        transactionType: 'credit',
        description: `Transfer from ${senderAccountId}: ${description}`,
        balanceAfterTransaction: receiver.balance,
      });
  
      // Save both transactions and updated accounts
      await senderTransaction.save();
      await receiverTransaction.save();
      await sender.save();
      await receiver.save();
  
      // Send success response with transaction details
      res.json({ success: true, transaction: senderTransaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred during the transaction' });
    }
  }