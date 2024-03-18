import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [totalPrice, setTotalPrice] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [playersBought, setPlayersBought] = useState([]);
  const [addedPlayer, setAddedPlayer] = useState("");

  const filteredData = bakeryData.filter(
    (item) =>
      item.position.toUpperCase() === selectedPosition.toUpperCase() &&
      !playersBought.includes(item.name)
  );

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    console.log(selectedPosition);
  };

  const addItem = (price, name) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    let totalPriceNum;
    if (totalPrice === "") {
      totalPriceNum = 0;
    } else {
      totalPriceNum = parseInt(totalPrice.replace(/,/g, ""), 10);
    }
    const newTotalPrice = totalPriceNum + intValue;
    const formattedTotalPrice = newTotalPrice.toLocaleString();
    playersBought.push(name);
    setPlayersBought(playersBought);
    setTotalPrice(formattedTotalPrice);
    cartItems.push(name);
  };

  return (
    <div className="App">
      <div class="instructions-container">
        <h1>Transfer Market</h1>
        <h2>
          Add players to your team by selecting them from the market shown
          below:
        </h2>
        <h3>
          Each player card has a picture of the player, along with his position,
          club, and nationality. The price of the player is also listed in each
          card in euros.
        </h3>
        <br />
        <h3>Players Available in the Market</h3>
      </div>
      <div class="position-filter">
        <label>
          <p>Filter by Position:</p>
          <select
            value={selectedPosition || ""}
            onChange={(e) => handlePositionChange(e.target.value)}
          >
            <option value="ST">ST</option>
            <option value="CAM">CAM</option>
            <option value="CM">CM</option>
            <option value="CDM">CDM</option>
            <option value="LB">LB</option>
            <option value="CB">CB</option>
            <option value="RB">RB</option>
            <option value="GK">GK</option>
          </select>
        </label>
      </div>
      <div class="player-card-container">
        {filteredData.map((item, index) => (
          <div class="player-card">
            <BakeryItem
              clickHandler={() => addItem(item.price, item.name)}
              item={item}
              index={index}
              image={item.image}
            />
          </div>
        ))}
      </div>
      <div class="squad-container">
        <h2>My Squad</h2>
        <div>
          <p>
            <b>Total Price:</b> {totalPrice}
            <div>
              {cartItems.map((item) => (
                <li>{item}</li>
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
