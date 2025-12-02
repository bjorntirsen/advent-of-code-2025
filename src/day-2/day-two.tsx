import { useState } from "react";
import { getResultDayOnePartOne } from "./day-two-utils";
// import { inputPartOne } from "./input-part-one";
// import { inputExample } from "./input-example";
// import { getResultDayOnePartTwo } from "./day-one-utils-part-two";
// import { debugInput } from "./debug-input";

export default function DayTwo() {
  const [result, setResult] = useState("");
  return (
    <section>
      <h2>Day Two</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setResult("")}>Reset</button>
        <button
          onClick={() => setResult(getResultDayOnePartOne("R50\nL25\nR75"))}
        >
          Run
        </button>
      </div>
      <pre>{result}</pre>
    </section>
  );
}
