# Hana - Flower Store

Hana is a full-stack web application built with **React** for the frontend and **Express** for the backend. It allows users to manage flowers in a flower store, including adding new flowers, restocking, and marking them as sold.

Repository link: https://github.com/coconath0/hana

## **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [Usage](#usage)

## **Features**
- **Add Flowers**: Add new flowers to the flower store with details like `name`, `type`, `price`, and `quantity`.
- **Restock Flowers**: Update the quantity of flowers in stock and mark them as available.
- **Sell Flowers**: Mark flowers as sold with customer details and sale date.
- **Dynamic Flower ID Generation**: Automatically generate unique IDs for each flower when added, following the last added flower’s ID.
- **Frontend & Backend**: Built with React for the frontend and Express for the backend.

## **Tech Stack**
- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (MongoDB Atlas for cloud storage)
- **Deployment**: Render (for full-stack deployment)

## **Installation**

To run this project locally, follow the steps below:

### **1. Clone the Repository**
```bash
git clone https://github.com/coconath0/hana.git
cd hana
```

### **2. Install Backend Dependencies**
Go to the `backend` directory and install the backend dependencies:
```bash
cd backend
npm install
```

### **3. Install Frontend Dependencies**
Go to the `src` directory and install the frontend dependencies:
```bash
cd ../src
npm install
```

## **Backend Setup**

The backend is an **Express.js** server that interacts with **MongoDB Atlas** for data storage.

### **1. Database Configuration**
Ensure your **MongoDB Atlas** connection string is set up correctly. In `backend/server.js`, the following MongoDB URI is used:

```javascript
const mongoURI = "mongodb+srv://your-username:your-password@cluster0.mongodb.net/hana?retryWrites=true&w=majority";
```

### **2. API Endpoints**

The backend provides the following API endpoints:

- **GET /flowers**: Get a list of all flowers.
- **POST /flowers**: Add a new flower to the store (requires `name`, `type`, `price`, and `quantity`).
- **PUT /flowers/:id/restock**: Restock a flower by increasing its quantity.
- **PUT /flowers/:id/sell**: Mark a flower as sold with customer details and sale date.

## **Frontend Setup**

The frontend is a **React.js** application that allows users to interact with the flower store through a user-friendly interface.

### **1. Running the React App Locally**
After setting up the backend, run the frontend with the following command:

```bash
npm start
```

This will start the React development server on `http://localhost:3000`.

### **2. API Integration**
The React app communicates with the backend through the following API calls:

- **GET** `/flowers`: Fetches the list of flowers from the backend.
- **POST** `/flowers`: Sends data to add a new flower.
- **PUT** `/flowers/:id/restock`: Restocks a specific flower.
- **PUT** `/flowers/:id/sell`: Marks a flower as sold.

## **Deployment**

To deploy this project to **Render**, follow the steps below:

### **1. Prepare the Project for Deployment**
1. **Build the React App**:
   In the root directory, build the React app by running:
   ```bash
   npm run build
   ```

2. **Configure the Backend to Serve the Frontend**:
   In the `backend/server.js` file, update your Express server to serve the React build files in production:

   ```javascript
   const path = require('path');
   
   app.use(express.static(path.join(__dirname, '..', 'build')));

   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
   });
   ```

### **2. Deploy to Render**
1. **Create a Render Account**: If you don’t have one, sign up at [Render](https://render.com/).
2. **Connect GitHub Repository to Render**: Link your GitHub repository to Render.
3. **Set Up Backend Deployment**: Configure the **Node.js** environment in Render to deploy the backend.
4. **Set Up Frontend Deployment**: Build the React app using Render’s build command and serve it with Express.

Once deployed, Render will provide you with a public URL where both the frontend and backend will be accessible.

## **Usage**

1. **Add a New Flower**: 
   Navigate to the "Add Flower" form on the homepage, enter flower details, and submit the form. The flower will be added to the database, and the next `id` will be automatically assigned.
   
2. **View All Flowers**: 
   Navigate to the "Flowers List" page to see all the flowers in the store.

3. **Restock Flowers**: 
   For any flower with low stock, navigate to the "Restock" button and enter the quantity to restock.

4. **Sell a Flower**: 
   Mark flowers as sold by clicking on the "Sell" button and entering the customer’s name and sale date.
