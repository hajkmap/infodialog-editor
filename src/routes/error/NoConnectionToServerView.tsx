import * as React from "react";

export default function NoConnectionToServerView() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Error: connection to server couldn't be established. Retrying…</h2>
    </main>
  );
}
