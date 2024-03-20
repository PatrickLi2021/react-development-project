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
  const [totalPrice, setTotalPrice] = useState("0");
  const [cartItems, setCartItems] = useState([]);
  const [originalItems, setOriginalItems] = useState(bakeryData);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [playersBought, setPlayersBought] = useState([]);
  const [filteredData, setFilteredData] = useState(bakeryData);
  const [sortState, setSortState] = useState("none");

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    if (position === "All") {
      setFilteredData(
        filteredData.filter((item) => !playersBought.includes(item.name))
      );
    } else {
      setFilteredData(
        filteredData.filter(
          (item) =>
            item.position.toUpperCase() === position.toUpperCase() &&
            !playersBought.includes(item.name)
        )
      );
    }
  };

  const handleReset = () => {
    setFilteredData(originalItems);
    setSelectedPosition("All");
    setSortState("None");
  };

  const handleSort = (sortValue) => {
    console.log(sortValue);
    if (sortValue === "ASC") {
      setSortState(sortValue);
      setFilteredData(
        filteredData.toSorted(
          (a, b) => convertPriceToNum(a.price) - convertPriceToNum(b.price)
        )
      );
    } else if (sortValue === "DESC") {
      setSortState(sortValue);
      setFilteredData(
        filteredData.toSorted(
          (a, b) => convertPriceToNum(b.price) - convertPriceToNum(a.price)
        )
      );
    } else if (sortValue === "None") {
      setSortState("None");
      setFilteredData(originalItems);
    }
  };

  const convertPriceToNum = (price) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    return intValue;
  };

  const removeItem = (item, price, name) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    let totalPriceNum;
    if (totalPrice === "") {
      totalPriceNum = 0;
    } else {
      totalPriceNum = parseInt(totalPrice.replace(/,/g, ""), 10);
    }
    const newTotalPrice = totalPriceNum - intValue;
    const formattedTotalPrice = newTotalPrice.toLocaleString();
    setTotalPrice(formattedTotalPrice);
    // setPlayersRemoved(playersRemoved.push(item));
    let index = playersBought.indexOf(item);
    if (index !== -1) {
      playersBought.splice(index, 1);
    }
    setPlayersBought(playersBought);
    console.log(playersBought);
    setFilteredData(
      bakeryData.filter(
        (item) =>
          !playersBought.includes(item) &&
          item.position.toUpperCase() !== selectedPosition.toUpperCase()
      )
    );
    console.log(bakeryData);
  };

  const addItem = (item, price, name) => {
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
    setTotalPrice(formattedTotalPrice);
    playersBought.push(item);
    setPlayersBought(playersBought);
    if (selectedPosition === "All" || selectedPosition === "") {
      setFilteredData(
        bakeryData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.position.toUpperCase() !== selectedPosition.toUpperCase()
        )
      );
    } else {
      setFilteredData(
        bakeryData.filter(
          (item) =>
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            !playersBought.includes(item)
        )
      );
    }
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
          club (shown by the badge), and nationality (shown by the flag). The
          price of the player (in euros) is also listed in each card.
        </h3>
        <p>
          <b>How to Use: </b>On this page, we have a list of soccer players that
          you can choose from to build (aggregate) your team. Each player has a
          particular cost (market value) associated with them that corresponds
          to how much a team would have to pay to buy them in real life. You can
          choose to buy different players to add to your team and the total
          cost/value of your team will be shown below, along with the players
          that you buy. You can choose to filter by position and sort the
          available players by how much their market value is.
        </p>
        <p>Here is a guide to what the position abbreviations correspond to:</p>
        <ul>
          <li>
            <b>ST = </b> Striker
          </li>
          <li>
            <b>LW = </b> Left Winger
          </li>
          <li>
            <b>RW = </b> Right Winger
          </li>
          <li>
            <b>CAM = </b>Central Attacking Midfielder
          </li>
          <li>
            <b>CM = </b>Central Midfielder
          </li>
          <li>
            <b>CDM = </b> Central Defensive Midfielder
          </li>
          <li>
            <b>LB = </b> Left Back
          </li>
          <li>
            <b>CB = </b> Center Back
          </li>
          <li>
            <b>RB = </b> Right Back
          </li>
          <li>
            <b>GK = </b> Goalkeeper
          </li>
        </ul>

        <h3>Players Available in the Market</h3>
      </div>
      <div class="filter-sort-reset-container">
        <div class="filter-container">
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
        </div>
        <div class="sort-container">
          <label>
            <p>Sort By:</p>
            <select
              value={sortState || ""}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="None">None</option>
              <option value="ASC">Price Ascending</option>
              <option value="DESC">Price Descending</option>
            </select>
          </label>
        </div>
        <div>
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      </div>
      <div class="player-card-container">
        {filteredData.map((item, index) => (
          <div class="player-card">
            <BakeryItem
              clickHandler={() => addItem(item, item.price, item.name)}
              item={item}
              index={index}
              image={item.image}
              inCart={playersBought.includes(item)}
            />
          </div>
        ))}
      </div>
      <div class="squad-container">
        <h2>My Squad</h2>
        <div>
          <p>
            <b>Total Price (in €): </b> {totalPrice}
            <div class="cart-aggregator-container">
              {playersBought.map((item, index) => (
                <div class="player-card">
                  <BakeryItem
                    clickHandler={() => removeItem(item, item.price, item.name)}
                    item={item}
                    index={index}
                    image={item.image}
                    inCart={playersBought.includes(item)}
                  />
                </div>
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
