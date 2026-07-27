export default function MealDetailLoading() {
  return (
    <div aria-busy="true" aria-label="Loading recipe details">
      <div className="back-button-container">
        <div
          style={{
            height: "2rem",
            width: "150px",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "4px",
            animation: "pulse 2s infinite",
          }}
        />
      </div>

      <header className="header-md">
        <div
          className="image-md"
          style={{
            backgroundColor: "var(--bg-secondary)",
            animation: "pulse 2s infinite",
          }}
        />
        <div className="headerText" style={{ flex: 1 }}>
          <div
            style={{
              height: "2rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "4px",
              marginBottom: "1rem",
              animation: "pulse 2s infinite",
            }}
          />
          <div
            style={{
              height: "1.5rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "4px",
              marginBottom: "1rem",
              width: "200px",
              animation: "pulse 2s infinite",
            }}
          />
          <div
            style={{
              height: "1rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "4px",
              marginBottom: "2rem",
              width: "100%",
              animation: "pulse 2s infinite",
            }}
          />
        </div>
      </header>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
