import { gql } from "@apollo/client";

export const LOAD_ITEMS = gql`
  query {
    getitems {
      id
      item
      price
      desc
    }
  }
`;


export const LOAD_ITEM_BY_ITEM = gql`
  query LoadItemByItem($item: String!) {
    getitembyitem(item: $item) {
      id
      item
      price
      desc
    }
  }
`;


export const LOAD_ITEM_BY_ID = gql`
  query LoadItemById($id: ID!) {
    getitembyid(id: $id) {
      id
      item
      price
      desc
    }
  }
`;

