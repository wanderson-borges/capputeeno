import { gql } from "@apollo/client";

// Query para buscar os produtos
export const GET_PRODUCTS = gql`
  query GetProducts {
    allProducts {
      id
      name
      description
      price_in_cents
      image_url
      category
      sales
      created_at
    }
  }
`;
