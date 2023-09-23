// CreateMenu Component with MUI Dialog box

import { useAppDispatch } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultNewMenuCategory = {
  name: "",
  isAvailable: true,
};

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newMenuCategory, setNewMenuCategory] =
    useState<CreateMenuCategoryPayload>(defaultNewMenuCategory);

  //Create menu category function
  const handleCreateMenuCategory = async () => {
    //update menus
    dispatch(createMenuCategory(newMenuCategory));
    setNewMenuCategory(defaultNewMenuCategory);

    //close dialog box
    setOpen(false);
  };

  //use function on change name
  const handleNameUpdate = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMenuCategory({
      isAvailable: newMenuCategory.isAvailable,
      name: evt.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create menu category</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            defaultValue={newMenuCategory.name}
            sx={{ width: 300, mb: 2 }}
            placeholder="Name"
            onChange={handleNameUpdate}
          />
          <FormControlLabel
            control={
              <Switch
                defaultChecked={newMenuCategory.isAvailable}
                onChange={(evt, value) =>
                  setNewMenuCategory({
                    name: newMenuCategory.name,
                    isAvailable: value,
                  })
                }
              />
            }
            label="Available"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleCreateMenuCategory}
            >
              Create
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMenuCategory;
