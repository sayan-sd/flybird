module.exports = ({ name, otp }) => {
    return `
        <html>
            <head>
                <style>
                    .container {
                        font-family: Arial, sans-serif;
                        max-width: 400px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        text-align: center;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>OTP Verification</h2>
                    <p>Hello ${name},</p>
                    <p>Your One-Time Password (OTP) is:</p>
                    <p class="otp">${otp}</p>
                    <p>This OTP is valid for a short period. Do not share it with anyone.</p>
                    <p>Regards,<br/>Your Company</p>
                </div>
            </body>
        </html>
    `;
};
