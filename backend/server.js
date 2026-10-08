import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const walletsPath = path.join(
  __dirname,
  "data",
  "wallets.json"
);

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:4173";

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());


/* HEALTH CHECK */

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    project: "Ether Archive",
  });
});


/* LOAD WALLETS */

function loadWallets() {
  try {
    const data = fs.readFileSync(
      walletsPath,
      "utf8"
    );

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Wallet file error:",
      error
    );

    return [];
  }
}


/* NORMALIZE */

function normalizeWallet(wallet) {
  return wallet.trim().toLowerCase();
}


/* PRESALE CHECK */

app.post(
  "/api/presale/check",
  (req, res) => {

    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({
        eligible: false,
        error: "Wallet address is required.",
      });
    }

    const normalizedWallet =
      normalizeWallet(wallet);

    if (
      !/^0x[a-fA-F0-9]{40}$/.test(
        normalizedWallet
      )
    ) {
      return res.status(400).json({
        eligible: false,
        error:
          "Invalid Ethereum wallet address.",
      });
    }

    const wallets = loadWallets();

    const normalizedWallets =
      wallets.map(normalizeWallet);

    const eligible =
      normalizedWallets.includes(
        normalizedWallet
      );

    return res.json({
      eligible,
    });
  }
);


/* START SERVER */

app.listen(PORT, () => {
  console.log(
    `Ether Archive backend running on http://localhost:${PORT}`
  );
});