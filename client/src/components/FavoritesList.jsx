const FavoritesList = ({ favorites }) => {
  return (
    <ul className="list-disc pl-5">
      {favorites.map((favorite, index) => (
        <li key={favorite.objectId}>
          Favorite {index + 1}: {favorite.objectId}
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList;