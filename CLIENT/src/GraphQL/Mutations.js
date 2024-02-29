import { gql } from "@apollo/client";

export const CREATE_ITEM_MUTATION = gql`
  mutation createItem($item: String!, $price: Int!, $desc: Int!) {
    createItem(item: $item, price: $price, desc: $desc) {
      id
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem($id: ID!, $item: String!, $price: Int!, $desc: String!) {
    updateItem(id: $id, item: $item, price: $price, desc: $desc) {
      id
    }
  }
`;


export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
