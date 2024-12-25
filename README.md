# Welcome to my Listings App 👋

A React Native app for displaying real estate listings in Toronto, featuring infinite scroll, filters, and user accounts.

## Features

- User account creation with email and name
- Listings fetched from a MongoDB database
- Infinite scroll for smooth browsing
- Filters for property type and number of bedrooms

## Prerequisites

- **Node.js** installed on your system
- **iPhone Simulator**: Ensure you have an iPhone simulator (use Xcode). This app was tested on an ==iPhone 15 Pro running iOS 17.2==.

## Get Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/FahadUmair/listings
   cd listings
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the App**

   ```bash
   npm run ios
   ```

## Development Notes

- To enable querying MongoDB, I created an AWS Lambda function. This function acts as the backend service, interfacing with the MongoDB database to fetch and filter listings based on user input. 
- The Lambda function is integrated with an AWS API Gateway, which handles HTTP requests and ensures secure communication between the React Native app and the database.
- For local development and testing, CORS headers were added to the Lambda responses to address any cross-origin issues when running the app from `localhost`.

## Code for my aws lambda function

```javascript
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

exports.handler = async (event) => {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    
    // Parse query parameters from event
    const queryParams = JSON.parse(event.body || "{}");
    const { filters = {}, page , limit = 5 } = queryParams;
    // Build query based on filters
    const query = {};
    if (filters.BedroomsTotal && !isNaN(filters.BedroomsTotal)) {
      query.BedroomsTotal = filters.BedroomsTotal; // Filter for minimum bedrooms
      console.log("filters.BedroomsTotal:", filters.BedroomsTotal);
      
    }
    if (filters.ArchitecturalStyle) {
      query.ArchitecturalStyle = filters.ArchitecturalStyle; // Direct match for array elements
    }

    // Paginate results
    const skip = (page - 1) * limit;

    // Query MongoDB for listings
    const listings = await collection
      .find(query, {
        projection: {
          ListPrice: 1,
          ArchitecturalStyle: 1,
          BedroomsTotal: 1,
          BathroomsTotalInteger: 1,
          LivingArea: 1,
          YearBuilt: 1,
          City: 1,
          PostalCode: 1,
          "Media.MediaURL": 1,
          _id: 0, // Exclude the _id field if not needed
        },
      })
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(listings),
    };
  } catch (error) {
    console.error("Error retrieving listings:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving listings" }),
    };
  } finally {
    await client.close();
  }
};

```
