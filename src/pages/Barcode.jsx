import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [barcodeInputValue, updateBarcodeInputValue] = useState("");
  const barcodeAutoFocus = () => {
    document.getElementById("SearchbyScanning").focus();
  };
  const onChangeBarcode = (event) => {
    updateBarcodeInputValue(event.target.value);
  };
  const handleSearch = () => {
    alert(barcodeInputValue);
    updateBarcodeInputValue("");
    document.getElementById("SearchbyScanning").focus();
  };
  return (
    <div className="App">
      <h1>Barcode Scanner</h1>
      <input
        autoFocus={true}
        placeholder="Start Scanning"
        id="SearchbyScanning"
        className="SearchInput"
        value={barcodeInputValue}
        onChange={onChangeBarcode}
        onBlur={barcodeAutoFocus}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
export default App;