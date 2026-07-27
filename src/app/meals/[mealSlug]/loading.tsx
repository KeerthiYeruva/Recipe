export default function MealDetailLoading() {
  return (
    <div aria-busy="true" aria-label="Loading recipe details" className="status-shell">
      <div
        className="skeleton-block"
        style={{ height: "1rem", width: "12rem", marginBottom: "1rem" }}
      />
      <header className="header-md" style={{ marginBottom: 0 }}>
        <div className="image-md skeleton-card" />
        <div className="headerText" style={{ flex: 1 }}>
          <div
            className="skeleton-block"
            style={{ height: "1rem", width: "7rem", marginBottom: "1rem" }}
          />
          <div
            className="skeleton-block"
            style={{ height: "3rem", width: "75%", marginBottom: "0.8rem" }}
          />
          <div
            className="skeleton-block"
            style={{ height: "1rem", width: "40%", marginBottom: "0.8rem" }}
          />
          <div
            className="skeleton-block"
            style={{ height: "1rem", width: "100%", marginBottom: "1rem" }}
          />
          <div className="skeleton-block" style={{ height: "6rem", width: "100%" }} />
        </div>
      </header>
    </div>
  );
}
