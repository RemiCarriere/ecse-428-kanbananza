import React, { useState, useEffect } from "react";
import { column } from "../../../types/column";

const Column = () => {
  // will probably require props
  const [columnData, setColumnData] = useState<column | undefined>(undefined); // initialize the variable to empty string

  return (
    <>
      <div>
        <strong>placeholder for column name</strong>
      </div>
    </>
  );
};

export default Column;
