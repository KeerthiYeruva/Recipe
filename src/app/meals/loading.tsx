export default function MealsLoading() {
  return (
    <div aria-busy="true" aria-label="Loading meals" className="status-shell">
      <div
        className="skeleton-block"
        style={{ height: "2rem", width: "14rem", marginBottom: "0.8rem" }}
      />
      <div
        className="skeleton-block"
        style={{
          height: "1rem",
          width: "24rem",
          marginBottom: "1.5rem",
          maxWidth: "100%",
        }}
      />
      <div className="explorer-controls" style={{ display: "grid" }}>
        <div className="skeleton-block" style={{ height: "3.2rem" }} />
        <div className="skeleton-block" style={{ height: "3.2rem" }} />
        <div className="skeleton-block" style={{ height: "3.2rem" }} />
      </div>
      <div className="meals-g">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    </div>
  );
}
