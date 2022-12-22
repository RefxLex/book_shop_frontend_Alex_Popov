import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.removeItem("data");
    localStorage.removeItem("auth");
    localStorage.removeItem("basket");
    localStorage.removeItem("cartId");
    localStorage.removeItem("info");
    localStorage.removeItem("author");
    localStorage.removeItem("category");
    localStorage.removeItem("book");
    localStorage.removeItem("order");

    navigate('/');
  }

  return(
    <div>
      <button type="submit" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
  
}

export default Logout;
