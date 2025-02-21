import { getOTPEmailTemplate, transporter } from "config/mail"

export const sendOTPEmail = async (email: string, username: string, otp: string): Promise<boolean> =>{
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Cuez Email Verification OTP',
            html: getOTPEmailTemplate(username, otp)
        }
        await transporter.sendMail(mailOptions)
        return true
    } catch( error){
        console.log('Error sending email:', error)
        return true
    }
}