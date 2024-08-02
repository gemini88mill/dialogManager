import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Dialog } from "./Dialog";

const DialogContext = createContext<{
  appendDialog: (dialog: DialogType) => void;
  removeDialog: (id: string) => void;
} | undefined>(undefined);

interface DialogType {
  title: string;
  content: React.ReactNode;
  id: string;
  linkedId: string;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider = ({children}: DialogProviderProps) => {
  const [dialogStack, setDialogStack] = useState<DialogType[]>([]);

  const appendDialog = useCallback((dialog: DialogType) => {
    // Add dialog to the stack if dialog has a linkedId, add to stack above the linked dialog
    if (dialog.linkedId) {
      const linkedIndex = dialogStack.findIndex((d) => d.id === dialog.linkedId);
      const newDialogStack = [...dialogStack];
      newDialogStack.splice(linkedIndex, 0, dialog);
      setDialogStack(newDialogStack);
    } else {
      setDialogStack([...dialogStack, dialog]);
    }
  }, [dialogStack]);

  const removeDialog = useCallback((id: string) => {
    setDialogStack(dialogStack.filter((d) => d.id !== id));
  }, [dialogStack]);

  const value = useMemo(() => ({ appendDialog, removeDialog }), [appendDialog, removeDialog]);
  
  return (
    <DialogContext.Provider value={value}>
      {children}
      {dialogStack.map((dialog) => (
        <Dialog openModal={true} closeModal={() => removeDialog(dialog.id)} key={dialog.id}>
          {dialog.content}
        </Dialog>
      ))}
    </DialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDialogStack = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogStack must be used within a DialogProvider");
  }
  return context;
};