import { useState } from "react";
import { getResultDayOnePartOne } from "./day-one-utils";
import { inputPartOne } from "./inputPartOne";

export default function DayOne() {
  const [result, setResult] = useState("");
  return (
    <section>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setResult(getResultDayOnePartOne())}>
          Toggle Example Results
        </button>
        <button onClick={() => setResult(getResultDayOnePartOne(inputPartOne))}>
          Toggle Part One Results
        </button>
        <button onClick={() => setResult("")}>Reset</button>
      </div>
      <pre>{result}</pre>
    </section>
  );
}
