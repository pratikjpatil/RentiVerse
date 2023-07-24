const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const {pincode, phone, email, address, password } = req.body;
    let name = req.body.name.split(" ");
    try {
        const existingUser = await User.findOne({ email: email});

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            firstName: name[0],
            lastName: name[1],
            phone: phone,
            email: email,
            address: address,
            password: hashedPassword
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, {expiresIn: "2d"});

        const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
        
        res.cookie("token", token, { httpOnly: true, expires: cookieExpiration});
        return res.status(200).json({ message: "Registration successfull" });


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

            const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, {expiresIn: "2d"});

            const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
            console.log(token)
            res.cookie("token", token, {httpOnly: true, expires: cookieExpiration});
            res.status(200).json({message: "Authenticated" });

        }
        else {
            return res.status(400).json({ message: "Incorrect password" });
        }

    } catch (error) {

        console.log(error);
        return res.status(500).send(error);

    }
}

const userLogout = async(req, res) => {

    try {
        res.clearCookie("token", { httpOnly: true });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' });
    }

}

const checkIfLoggedIn = (req,res)=>{
    return res.status(200).json({message: "User is logged in" });
}


module.exports = { registerUser, userLogin, userLogout, checkIfLoggedIn };