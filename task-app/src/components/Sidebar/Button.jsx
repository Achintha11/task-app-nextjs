"use client";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import { useSelector } from "react-redux";

const Button = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color,
}) => {
  const { theme } = useSelector((store) => store.theme);

  return (
    <ButtonStyled
      type={type}
      style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
        color: color || theme.colorGrey2,
      }}
      theme={theme}
      onClick={click}
    >
      {icon && <span className="icon">{icon}</span>}
      <span className="name">{name}</span>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  cursor: pointer;
  transition: all 0.55s ease-in-out;
  background: ${(props) => props.background || "transparent"};
  padding: ${(props) => props.padding || "0.5rem 1rem"};
  border-radius: ${(props) => props.borderRadius || "0.5rem"};
  font-weight: ${(props) => props.fontWeight || "500"};
  font-size: ${(props) => props.fontSize || "1rem"};
  border: ${(props) => props.border || "none"};
  color: ${(props) => props.color || props.theme.colorGrey2};

  .icon {
    margin-right: 1rem; /* Adjust space between icon and name */
    color: ${(props) => props.theme.colorGrey3};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  .name {
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    .icon {
      color: ${(props) => props.theme.colorGrey0};
    }
    .name {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

Button.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.string,
  background: PropTypes.string,
  padding: PropTypes.string,
  borderRad: PropTypes.string,
  fw: PropTypes.string,
  fs: PropTypes.string,
  click: PropTypes.func,
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  border: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
