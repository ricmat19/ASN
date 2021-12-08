import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CollectionContext = createContext();

export const CollectionContextProvider = (props) => {
  const [collection, setCollection] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState([]);

  const createItem = (item) => {
    setCollection([...collection, item]);
  };

  const createUser = (newUser) => {
    setUser([...user, newUser]);
  };

  return (
    <CollectionContext.Provider
      value={{
        collection: collection,
        setCollection: setCollection,
        createItem,
        selectedItem: selectedItem,
        setSelectedItem: setSelectedItem,
        user: user,
        setUser: setUser,
        createUser,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};

CollectionContextProvider.propTypes = {
  children: PropTypes.any,
};
