'use client'
import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export default function ColorModeSelect(props) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const Item = styled(MenuItem)({
    padding: "8px",
    margin: "0px 8px"
  })
  return (
    <FormControl size='small'>
      <Select
        value={mode}
        onChange={(event) => setMode(event.target.value)}
        SelectDisplayProps={{
          'data-screenshot': 'toggle-mode',
        }}
        {...props}
      >
        <Item value="system">System</Item>
        <Item value="light">Light</Item>
        <Item value="dark">Dark</Item>
      </Select>
    </FormControl>
  );
}
