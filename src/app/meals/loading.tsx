export default function MealsLoading() {
  return (
    <div aria-busy="true" aria-label="Loading meals">
      <div className="meals-explorer">
        <div className="explorer-controls">
          <div className="control-field search-field">
            <div
              style={{
                height: "2rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
          </div>
          <div className="control-field">
            <div
              style={{
                height: "2rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
          </div>
          <div className="control-field">
            <div
              style={{
                height: "2rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
          </div>
        </div>

        <div
          className="meals-g"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                height: "400px",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
