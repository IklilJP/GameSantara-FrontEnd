function MeatballMenu({ IsMenuActive, setIsMenuActive }) {
  return (
    <button
      className={`meatball ${IsMenuActive ? "active" : ""}`}
      onClick={() => setIsMenuActive(!IsMenuActive)}>
      <span className="dot"> </span>
      <span className="dot"> </span>
      <span className="dot"> </span>
    </button>
  );
}

export default MeatballMenu;
