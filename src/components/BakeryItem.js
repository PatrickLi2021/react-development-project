import "./bakeryItem.css";

export default function BakeryItem(props) {
  const { item, index, clickHandler, image } = props;
  return (
    <div class="player-container">
      <div class="player-info-container">
        <p>
          <b>{item.position}</b>
        </p>
        <img src={item.countryflag} alt="soccer player" />
        <img src={item.clubbadge} alt="soccer player" />
      </div>
      <div class="player-image-container">
        <img src={item.playerpic} alt="soccer player" />
        <p>
          <b>{item.name}</b>
        </p>
        <p>
          <b>{item.price}</b>
        </p>
      </div>
      <button onClick={clickHandler}>Add</button>
    </div>
  );
}
