const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const { firstName, lastName, phone, email, address, password } = req.body;


    try {
        const existingUser = await User.findOne({ email: email});

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: address,
            password: hashedPassword
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);

        return res.status(200).json({ result, token });


    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User not registered" });

        const match = await bcrypt.compare(password, user.password);

        if (match) {

            const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);

            return res.status(200).json({ user: user, token: token });

        }
        else {
            return res.status(400).json({ message: "Incorrect password" });
        }

    } catch (error) {

        console.log(error);
        return res.status(500).send(error);

    }
}

module.exports = { registerUser, userLogin };