import './MenuItem.scss'
import { Button, ButtonBase  } from '@mui/material'
// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import * as Icons from "@remixicon/react";

export default function MenuItem ({
  icon, title, action, isActive} ) {
    const IconComponent = Icons[icon]; 
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
      className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
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
