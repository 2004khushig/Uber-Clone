# Uber Frontend

This is the frontend application for the Uber clone project. It is built using React and Vite.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/uber-clone.git
```

2. Navigate to the frontend directory:

```bash
cd uber/frontend
```

3. Install the dependencies:

```bash
npm install
```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Project Structure

The project structure is as follows:

```
uber/frontend/
├── public/                     # Static assets
├── src/                        # Source files
│   ├── components/             # Reusable components
│   │   ├── ConfirmRide.jsx     # Component for confirming a ride
│   │   ├── LocationSearchPanel.jsx # Component for location search
│   │   ├── LookingForDriver.jsx    # Component for looking for a driver
│   │   ├── VehiclePanel.jsx    # Component for selecting a vehicle
│   │   ├── WaitingForDriver.jsx    # Component for waiting for a driver
│   ├── context/                # Context providers
│   ├── pages/                  # Page components
│   │   ├── CaptainHome.jsx     # Captain home page
│   │   ├── CaptainLogin.jsx    # Captain login page
│   │   ├── CaptainProtectedWrapper.jsx # Wrapper for protected captain routes
│   │   ├── CaptainSignup.jsx   # Captain signup page
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Entry point for the application
│   └── ...                     # Other files
├── .gitignore                  # Git ignore file
├── index.html                  # HTML template
├── package.json                # NPM package file
├── README.md                   # Project documentation
└── vite.config.js              # Vite configuration file
```

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run serve`: Serves the production build locally.

### Environment Variables

Create a `.env` file in the root of the `frontend` directory to define environment variables:

```
VITE_BASE_URL=http://localhost:5000
```

Replace `http://localhost:5000` with the URL of your backend server.

### License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more information.