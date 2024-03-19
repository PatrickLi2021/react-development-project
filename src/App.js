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
  const [filteredData, setFilteredData] = useState(bakeryData);
  const [sortState, setSortState] = useState("none");

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    if (position === "All") {
      setFilteredData(
        bakeryData.filter((item) => !playersBought.includes(item.name))
      );
    } else {
      setFilteredData(
        bakeryData.filter(
          (item) =>
            item.position.toUpperCase() === position.toUpperCase() &&
            !playersBought.includes(item.name)
        )
      );
    }
  };

  const handleSort = (sortValue) => {
    setSortState(sortValue);
    console.log(sortValue);
    if (sortValue === "ASC") {
      setFilteredData(
        filteredData.sort(
          (a, b) => convertPriceToNum(a.price) - convertPriceToNum(b.price)
        )
      );
    } else if (sortValue === "DESC") {
      setFilteredData(
        filteredData.sort(
          (a, b) => convertPriceToNum(b.price) - convertPriceToNum(a.price)
        )
      );
    }
  };

  const convertPriceToNum = (price) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    return intValue;
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
    console.log(selectedPosition);
    console.log("hi");
    if (selectedPosition === "All" || selectedPosition === "") {
      setFilteredData(
        bakeryData.filter(
          (item) =>
            !playersBought.includes(item.name) &&
            item.position.toUpperCase() !== selectedPosition.toUpperCase()
        )
      );
    } else {
      setFilteredData(
        bakeryData.filter(
          (item) =>
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            !playersBought.includes(item.name)
        )
      );
    }
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
            <option value="All">All</option>
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
        <label>
          <p>Sort By:</p>
          <select
            value={selectedPosition || ""}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="None">None</option>
            <option value="ASC">Price Ascending</option>
            <option value="DESC">Price Descending</option>
          </select>
        </label>
      </div>
      <div class="player-card-container">
        {filteredData.map((item, index) => (
          <div class="player-card">
            <BakeryItem
              clickHandler={() => addItem(item.price, item.name, item.position)}
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
            <b>Total Price (in €): </b> {totalPrice}
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
