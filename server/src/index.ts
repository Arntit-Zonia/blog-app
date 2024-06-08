import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectToDatabase from "./db/mongoose";

connectToDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
