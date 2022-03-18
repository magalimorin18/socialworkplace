import "./Popup.css";
import { useState } from "react";

export const usePopup = () => {
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  const info = {
    visible,
    hide,
  };
  return { show, info };
};

function Popup(props) {
  return (
    <>
      {props.visible && (
        <>
          <div
            className="background"
            onClick={() => {
              props.hide();
            }}
          />
          <div className="popup">
            <p className="text">{props.text}</p>

            <button
              className="button button-join"
              onClick={() => {
                props.action();
                props.hide();
              }}
            >
              Continue
            </button>
            <button
              className="button button-delete"
              onClick={() => {
                props.hide();
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Popup;
