# Airbnb Project – Wanderlust Clone

A full-stack web application inspired by **Airbnb**, built with the **MERN stack (MongoDB, Express, React, Node.js)**.

## Features

- Browse, search, and book property listings.
- View property locations on an interactive map using **Leaflet** & **OpenStreetMap**.
- User authentication and secure account management with **Passport.js**.
- Upload images for listings and store data in **MongoDB Atlas**.
- Geocoding integration for dynamic location display.
- Responsive and user-friendly UI.

## Tech Stack

- **Frontend:** React, EJS templates
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** Passport.js
- **Maps & Geocoding:** Leaflet, OpenStreetMap, Nominatim
- **File Storage:** Cloudinary (optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vishalkushwaha29/AirbnbProject.git
Navigate to the project folder:

2. cd AirbnbProject


3. Install dependencies:

npm install


4. Create a .env file and add:

ATLASDB_URL=<Your MongoDB Atlas URL>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
SECRET=<your_session_secret>


5. Start the server:

npm run dev


Open http://localhost:8080
 in your browser.

6. Usage

Add new listings with images and descriptions.

Browse existing listings.

View listings on the map.

Update or delete listings (if owner).

Contribution

Fork the repo and create your branch:

git checkout -b feature/YourFeature


7. Commit your changes:

git commit -m "Add some feature"


Push to the branch:

git push origin feature/YourFeature


Create a Pull Request.

License

This project is licensed under the MIT License.

Made with ❤️ by Vishal Kushwaha.
