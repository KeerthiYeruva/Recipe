export default function FavoritesLoading() {
  return (
    <div aria-busy="true" aria-label="Loading favorite recipes" className="status-shell">
      <div
        className="skeleton-block"
        style={{ height: "2rem", width: "16rem", marginBottom: "1rem" }}
      />
      <div
        className="skeleton-block"
        style={{
          height: "1rem",
          width: "22rem",
          marginBottom: "1.8rem",
          maxWidth: "100%",
        }}
      />
      <div className="meals-g">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    </div>
  );
}
