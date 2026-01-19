import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(url + "/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    setCartItems((prev) => {
      if (prev[itemId] === 1) {
        // deleting object with count 0
        const updatedCart = { ...prev };
        delete updatedCart[itemId]; // removing key with value 0
        return updatedCart;
      } else {
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      }
    });
    if (token) {
      await axios.post(
        url + "/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  // const completelyRemoveFromCart = (itemId) => {
  //   setCartItems((prev) => {
  //     const updatedCart = { ...prev };
  //     delete updatedCart[itemId];
  //     return updatedCart;
  //   });
  // };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (let item in cartItems) {
      if (cartItems[item]) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/cart/get",
      {},
      { headers: { token } },
    );
    setCartItems(response.data.cartData);
  };

  const clearCart = () => {
    setCartItems({});
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
