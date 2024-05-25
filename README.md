# Crypto POS System

Crypto POS System is a payment processing application that allows merchants to accept cryptocurrency payments and convert them to fiat currency. The system integrates with NOWPayments for crypto payment processing and Coinlayer for cryptocurrency to fiat conversion.

## Getting Started

### Installation

1. Clone the repository:

```
git clone https://github.com/TechnoPhasePRO/crypto-pos-system.git
cd crypto-pos-system
```
2. Install dependencies:
```
npm install
```
3. Set up environment variables:
Create a `.env` file in the root directory of the project with the following content:
```
MONGODB_URI=<mongodb_uri>
NOW_PAYMENTS_API_KEY=<nowpayments_api_key>
COINLAYER_API_KEY=<coinlayer_api_key>
```

## Running the Application
1. Start MongoDB if it's not already running:
```
mongod
```
2. Start the application:
```
npm start
```
3. To test IPN callbacks, run ngrok:
```
ngrok http 3000
```
Replace the IPN callback URL in code with the ngrok URL.

## API Endpoints
### Initiate Payment
URL - POST :`/payment/initiate`
```
Request:
{
  "merchantId": "raj123",
  "cryptoAmount": 0.01
}
```
```
Response:
{
  "id": "payment123",
  "merchantId": "raj123",
  "cryptoAmount": 0.01,
  "fiatAmount": 0,
  "status": "pending",
  "createdAt": "2024-05-23T14:48:00.000Z",
  "updatedAt": "2024-05-23T14:48:00.000Z",
  "__v": 0
}
```
### Handle Payment Confirmation
URL - POST `/payment/confirm`
```
Request:
{
  "paymentId": "payment123"
}
```
```
Response: 
{
  "message": "Payment confirmed and account balance updated"
}
```

## License
This project is licensed under the MIT License