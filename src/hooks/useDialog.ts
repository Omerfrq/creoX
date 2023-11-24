import { useState } from 'react';

export const useDialog = ({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) => {
  const [openDialog, setOpenDialog] = useState(defaultOpen);

  const handleOpen = () => setOpenDialog(true);

  const handleClose = () => setOpenDialog(false);

  return {
    openDialog,
    handleClose,
    handleOpen,
  };
};
