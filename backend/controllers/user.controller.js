const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { pincode, phone, email, gender, password, firstname, lastname, state, village, district, city } = req.body;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            firstName: firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
            lastName: lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase(),
            phone,
            email: email.toLowerCase(),
            gender: gender.toLowerCase(),
            address: {
                village: village.toLowerCase(),
                city: city.toLowerCase(),
                district: district.toLowerCase(),
                state: state.toLowerCase(),
                pincode,
            },
            password: hashedPassword,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        });

        const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
        res.cookie("token", token, { httpOnly: true, expires: cookieExpiration });
        return res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Registration failed" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: "User not registered" });

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_TOKEN_EXPIRATION,
            });

            const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
            res.cookie("token", token, { httpOnly: true, expires: cookieExpiration });
            return res.status(200).json({ message: "Authenticated" });
        } else {
            return res.status(400).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Login failed" });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Logout failed" });
    }
};

const checkIfLoggedIn = (req, res) => {
    return res.status(200).json({ message: "User is logged in" });
};

module.exports = { registerUser, userLogin, userLogout, checkIfLoggedIn };
