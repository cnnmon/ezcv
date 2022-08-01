import React from "react";
import { getEmptySection, COLORS } from "../../constants";
import { Button } from "../index";

const styles = {
  container: {
    display: "flex",
    border: "1.5px solid black",
    height: 90,
    overflowX: "scroll",
    padding: 10,
    backgroundColor: COLORS.red,
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
};

export default function ListMenu({ items, onClick = () => null,  }) {
  const getContent = ({ name, getIcon }) => (
    <>
      <div style={styles.icon}>
        {getIcon()}
      </div>
      {name}
    </>
  )

  const getButtonStyle = (item) => ({
    margin: "7px 0px 7px 10px",
    width: 120,
    minWidth: 120,
    backgroundColor: "color" in item ? item.color : COLORS.yellow,
  });

  return (
    <div style={styles.container}>
      {items.map((e, index) =>
        <Button
          content={getContent(e)}
          onClick={() => onClick(e)}
          isPrimary={e.name === getEmptySection().name}
          style={getButtonStyle(e)}
          key={index}
        />
      )}
    </div>
  )
}
