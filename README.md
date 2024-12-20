# Portfolio Tracker Application

This repository contains a full-stack portfolio tracker application built with a React frontend and a Spring Boot backend. It allows users to add, view, edit, and delete stock holdings while dynamically tracking the portfolio's value using real-time stock prices.

## Features
- Add, view, edit, and delete stock holdings.
- Real-time stock price integration using Alpha Vantage API.
- Dashboard with key metrics: total value, top-performing stock, and portfolio distribution.
- Responsive UI built with Material-UI.

---

## Frontend Deployment (Netlify)

### Deployed URL:
[Portfolio Tracker Frontend](https://your-netlify-app-url.netlify.app)

### How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-tracker.git
   cd portfolio-tracker/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

---

## Backend Deployment (Heroku)

### Deployed URL:
[Portfolio Tracker Backend](https://your-heroku-app-url.herokuapp.com)

### How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-tracker.git
   cd portfolio-tracker/backend
   ```
2. Update `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_tracker
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
3. Install dependencies and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8080`.

4. Set up the MySQL database schema:
   ```sql
   CREATE DATABASE portfolio_tracker;

   USE portfolio_tracker;

   CREATE TABLE stocks (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       ticker VARCHAR(50) NOT NULL,
       quantity INT DEFAULT 1,
       buy_price DOUBLE NOT NULL,
       current_price DOUBLE
   );
   ```

---

## Deployment

### Backend Deployment (Heroku)
1. **Install Heroku CLI**:
   Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
2. **Login to Heroku**:
   ```bash
   heroku login
   ```
3. **Create a Heroku App**:
   ```bash
   heroku create portfolio-tracker-backend
   ```
4. **Add JawsDB MySQL Add-on**:
   ```bash
   heroku addons:create jawsdb:kitefin
   ```
5. **Deploy Backend**:
   Push your backend code to Heroku:
   ```bash
   git init
   git add .
   git commit -m "Deploy Backend"
   git push heroku main
   ```
6. **Set API Key Environment Variable**:
   Add the API key for stock price fetching:
   ```bash
   heroku config:set API_KEY=your_alpha_vantage_api_key
   ```
7. **Access Deployed Backend**:
   Your backend is now live at: `https://your-heroku-app-url.herokuapp.com`

### Frontend Deployment (Netlify)
1. **Build the React App**:
   ```bash
   npm run build
   ```
2. **Upload to Netlify**:
   - Go to [Netlify](https://www.netlify.com/).
   - Drag and drop the `build` folder into the dashboard.
3. **Set API URL Environment Variable**:
   Configure the API URL for the frontend:
   - In Netlify, go to **Site Settings > Environment Variables**.
   - Add `REACT_APP_API_URL` with the value: `https://your-heroku-app-url.herokuapp.com`.
4. **Access Deployed Frontend**:
   Your frontend is now live at: `https://your-netlify-app-url.netlify.app`.

---

## Assumptions and Limitations
1. Real-time stock prices are fetched from Alpha Vantage.
2. For simplicity, each stock's quantity is assumed to be 1.
3. Portfolio is limited to 5 stocks per user.

---

## Technologies Used
- **Frontend**: React, Material-UI, Chart.js
- **Backend**: Spring Boot, JPA, Hibernate
- **Database**: MySQL
- **API**: Alpha Vantage

---

## Thank You
