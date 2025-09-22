# Ionic Cheese Backend

A simple REST API for managing cheeses, built with Node.js, Express, and TypeScript.

## Features

- REST API for cheese management
- MongoDB database with Mongoose
- Firebase authentication
- Data validation
- CORS enabled

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB / Mongoose
- Firebase Admin
- bcrypt
- JWT

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ionic-cheese-back
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create a `.env` file):
```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
FIREBASE_CONFIG=<firebase-configuration>
```

## Running the Application

### Development Mode
```bash
npm start
```

### Production Mode
```bash
npm run build
npm run serve
```

The server will run on port 3000 by default.

## API Endpoints

- `GET /` - Welcome message
- `/api/cheeses` - Cheese management
- `/api/world-cheeses` - World cheeses

## Project Structure

```
├── app.ts                 # Main entry point
├── config/               # DB and Firebase configuration
├── controllers/          # Business logic
├── models/              # Data models
├── routes/              # Route definitions
└── validators/          # Data validators
```

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Author

**Georgina TS** - [GitHub](https://github.com/GeorginaTS)

## License

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

### Terms of Use

- ✅ You can use this code for educational purposes
- ✅ You can study and learn from the code
- ✅ You can fork the repository for experimentation
- ❌ You cannot redistribute the code without explicit permission
- ❌ You cannot use this code commercially without authorization
- 📝 **Required**: You must always mention the original author (Georgina TS) in any use or derivation of the code

For additional permissions or commercial use, please contact the author.