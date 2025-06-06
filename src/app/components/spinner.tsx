export const Spinner: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "5px solid #F0EEFD",
          borderTop: "5px solid #6558EF",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};
