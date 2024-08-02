import { useDialogStack } from "./DialogProvider";

export const ButtonGroup = () => {
  const {appendDialog, removeDialog} = useDialogStack();

  return (
    <div className="buttonGroup">
      <button onClick={(e) => {
        appendDialog({
          title: "Simple Dialog",
          content: `This is dialog 1 ${new Date().getTime().toString()}`,
          id: new Date().getTime().toString(),
          linkedId: ""
        });
        e.preventDefault();
      }}>show</button>
    </div>
  );
};