export default function FavoritesLoading() {
  return (
    <div aria-busy="true" aria-label="Loading favorite recipes">
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            height: "2rem",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "4px",
            marginBottom: "2rem",
            animation: "pulse 2s infinite",
          }}
        />
        <div
          className="meals-g"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[1, 2, 3].map((i) => (
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
