import { execs } from "../data/data";
import ExecCard from "../screens/ExecScreen";

function ExecScreen() {
  return (
    <div>
      <ExecCard execs={execs} />
    </div>
  );
}

export default ExecScreen;
