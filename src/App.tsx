import "./App.css";
import { ButtonGroup } from "./components/ButtonGroup";
import { DialogProvider } from "./components/DialogProvider";

function App() {

  return (
    <>
    <DialogProvider>
      <div className="">
        <ButtonGroup />
      </div>
      </DialogProvider>
    </>
  );
}

export default App;
