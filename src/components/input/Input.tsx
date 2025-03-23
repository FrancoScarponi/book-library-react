import React from "react";
import styles from "./input.module.css"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Input: React.FC<Props> = ({ placeholder, label, ...props }) => {
  return (
    <div className={styles.inputContainer}>
        {label && <label>{label}</label>}
      <input placeholder={placeholder} {...props}></input>
    </div>
  );
};
