import React from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import Button from "../../../components/Button";
import InventoryTableView from "./InventoryTableView";

const Inventory = () => {
  return (
    <div className="flex flex-col w-full items-start">
      <Breadcrumb
        parentText="Shopping"
        parentLink="/shopping"
        childText="Manage Inventory"
        childLink="/shopping/inventory"
      />
      <div className="flex justify-between w-full">
        <h2 className="text-xl">Manage Inventory</h2>
        <Button
          text="View recently added"
          secondary
          roundedFull
          preTagText="50"
        />
      </div>
      <InventoryTableView />
    </div>
  );
};

export default Inventory;