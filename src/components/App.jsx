import React from "react";
import Login from "./Login.jsx";

import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "../client_secret.js";

const SHEET_ID = "15CWgsB3aTdEcY_dR7pnCOR70SxQP7LljEwGTxfaQOZo";
const doc = new GoogleSpreadsheet(SHEET_ID);

async function accessSheets() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log("Doc", doc.title);

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
}

export default function App() {
  console.log("test");
  accessSheets();

  return (
    <div>
      <Login />
    </div>
  );
}
