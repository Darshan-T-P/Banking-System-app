import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    ssn: {
        type: String,
        required: [true, 'SSN is required'],
        unique: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },
    accountType: {
        type: String,
        enum: ['savings', 'checking'],
        default: 'savings'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Method to get user's full name
userSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

// Method to check if user is of legal age (18+)
userSchema.methods.isLegalAge = function() {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 18;
};

const User = mongoose.model('User', userSchema);

export default User; 