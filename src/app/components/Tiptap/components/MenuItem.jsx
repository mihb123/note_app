import './MenuItem.scss'
import { Button, ButtonBase  } from '@mui/material'
// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import * as Icons from "@remixicon/react";
import { useColorScheme } from '@mui/material/styles';

export default function MenuItem ({
  icon, title, action, isActive} ) {
    const IconComponent = Icons[icon]; 
    const { mode } = useColorScheme();
    const effectiveMode = mode === 'system' ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
    
    if(icon == ""){
      
      return (
      <ButtonBase
      sx={{
        fontSize:12,
        p:"4px",
        m: "2px",
        mt:"4px",
        borderRadius: "4px",
        border: "1px solid rgba(71, 64, 64, 0.979)",
        "&:hover": {
          backgroundColor: "#074584",
          color: "#fff",
        }
      }}
      onClick={action}
      title={title}
    >      
      {title}
      </ButtonBase>
      )}
      
  return (
    <button
      className={`menu-item${isActive && isActive() ? " is-active" : ""} ${effectiveMode === 'dark' ? 'menu-item--dark' : 'menu-item--light'}`}
      onClick={action}
      title={title}
    >
      {icon === "P" ? (
        <span style={{ fontSize: 18 }}>P</span>
      ) : IconComponent ? (
        <IconComponent />
      ) : null}
    </button>
  );
}
