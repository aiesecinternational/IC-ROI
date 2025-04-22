# IC-ROI

Welcome to the **IC-ROI** (International Congress - Return on Investment) platform by AIESEC.  
This lightweight Node.js GraphQL server allows you to query delegate fee details and associated costs (like flight, iGV, oGV, etc.) for different countries/committees using a CSV file as the data source.

---

## 🔧 Features

- ⚡ Built with **NodeJS** and **GraphQL**
- 📁 Reads data from `fees.csv` file
- 🔍 Query delegate fee, flight fee, and program fees per committee
- 🧪 Integrated GraphiQL playground at `/graphql` for testing queries
- 🌍 Runs locally on `http://localhost:5000/graphql`

---

## 🗂 Project Structure

backend/ ├── .env ├── fees.csv ├── index.js # Main Express server ├── schema.js # GraphQL schema & logic └── README.md


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AbdouGID/ic-roi.git
```
### 2. Install Dependencies
```bash
cd backend
npm install
```
### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory with the following content:
```
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Server
```bash
npm run dev
```
### 5. Access the GraphiQL Playground
http://localhost:5000/graphql

### 6. Query Delegate Fee Details
```graphql
{
  committee(id: 1) {
    id
    name
    delegate_fee
    flight_fee
    iGV_Fee
    oGV_Fee
  }
}
```
## Notes
Delegate fee is hardcoded as 615 for all committees.