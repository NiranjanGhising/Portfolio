from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

# Load Gmail credentials from environment variables
GMAIL_USER = os.getenv("channelstudy100@gmail.com")  # Your Gmail address
GMAIL_PASSWORD = os.getenv("fxsu qxum zxfr dhdm")  # App password (see notes below)

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    name = data.get('name', 'Anonymous')
    email = data.get('email', 'No email provided')
    message = data['message']  # Required field

    # Compose email
    msg = MIMEMultipart()
    msg['Subject'] = f"New message from {name}"
    msg['From'] = GMAIL_USER
    msg['To'] = GMAIL_USER  # Send to yourself

    body = f"""
    Name: {name}
    Email: {email}
    Message: {message}
    """
    msg.attach(MIMEText(body, 'plain'))

    # Send email
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(GMAIL_USER, GMAIL_PASSWORD)
            server.send_message(msg)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)