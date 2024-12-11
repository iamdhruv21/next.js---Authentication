import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any)=> {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000})
        }

        // this part should be copied from mailtrap and for this we have to signup on mailtrap
        // const transporter = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: "",
        //     auth: {
        //         user: "",
        //         pass: "",
        //     }
        // })
        //
        // const mailOptions = {
        //     from: 'hitesh@gmail.com',
        //     to: email,
        //     subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your Password",
        //     html: `<p>Click
        //                 <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
        //                 to ${emailType === 'VERIFY' ? "Verify your Email" : "Reset your Password"}
        //             </p>`
        // }
        //
        // const mailResponse = await transporter.sendMail(mailOptions);
        // return mailResponse;

    } catch (err: any) {
        throw new Error(err.message);
    }
}