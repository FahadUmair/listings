// Import required interfaces for handling filters and listing data
import { Filter } from "@/interfaces/Filter";
import { Listing } from "@/interfaces/Listing";

// Interface defining the structure of the API response
export interface ListingsResponse {
  statusCode: number;
  body: Listing[];
}

/**
 * Fetches property listings from the API with optional filters and pagination
 * @param filters - Optional filter criteria for bedrooms and architectural style
 * @param page - Page number for pagination, defaults to 1
 * @param limit - Number of results per page, defaults to 5
 * @returns Promise resolving to an array of Listing objects
 */
export const getListings = async (
  filters: Filter = {},
  page: number = 1,
  limit: number = 5
): Promise<Listing[]> => {
  // API endpoint URL
  const apiUrl = "https://w9fj2uo083.execute-api.us-east-1.amazonaws.com/dev";

  // Log the current page number being requested
  console.log("it is called: "+page)

  // Construct the request body with filters and pagination parameters
  const body = JSON.stringify({
    filters: {
      BedroomsTotal: filters.BedroomsTotal,
      ArchitecturalStyle: filters.ArchitecturalStyle,
    },
    page: page,
    limit: limit,
  });

  // Send a POST request with filters, page, and limit
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "body": body }),
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  // Parse the response as JSON and return the listings
  const data: ListingsResponse = await response.json();
  return data.body;
};
