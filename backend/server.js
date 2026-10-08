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

const localWalletsPath = path.join(
  __dirname,
  "data",
  "wallets.json"
);

const renderWalletPaths = [
  "/etc/secrets/wallets-1.txt",
  "/etc/secrets/wallets-2.txt",
];

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    project: "Ether Archive",
  });
});

function normalizeWallet(wallet) {
  return wallet.trim().toLowerCase();
}

function loadWallets() {
  // Render Secret Files
  const existingRenderFiles = renderWalletPaths.filter(
    (filePath) => fs.existsSync(filePath)
  );

  if (existingRenderFiles.length > 0) {
    try {
      const wallets = existingRenderFiles.flatMap(
        (filePath) => {
          const data = fs.readFileSync(
            filePath,
            "utf8"
          );

          return data
            .split(/\r?\n/)
            .map(normalizeWallet)
            .filter(Boolean);
        }
      );

      console.log(
        `Loaded ${wallets.length} wallets from Render Secret Files.`
      );

      return wallets;
    } catch (error) {
      console.error(
        "Render wallet files error:",
        error
      );

      return [];
    }
  }

  // Local development
  try {
    const data = fs.readFileSync(
      localWalletsPath,
      "utf8"
    );

    const wallets = JSON.parse(data);

    const normalizedWallets =
      wallets.map(normalizeWallet);

    console.log(
      `Loaded ${normalizedWallets.length} wallets from local file.`
    );

    return normalizedWallets;
  } catch (error) {
    console.error(
      "Local wallet file error:",
      error
    );

    return [];
  }
}

app.get("/api/debug/wallets", (req, res) => {
  const fileStatus = renderWalletPaths.map((filePath) => ({
    path: filePath,
    exists: fs.existsSync(filePath),
    size: fs.existsSync(filePath)
      ? fs.statSync(filePath).size
      : 0,
  }));

  const wallets = loadWallets();

  res.json({
    fileStatus,
    walletCount: wallets.length,
    testWallet: wallets.includes(
      "0xc3bd04aac2fb2ba58efd7eb673e544e0b80de770"
    ),
  });
});

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

    const eligible =
      wallets.includes(normalizedWallet);

    return res.json({
      eligible,
    });
  }
);

app.listen(PORT, () => {
  console.log(
    `Ether Archive backend running on port ${PORT}`
  );

  console.log(
    "Render wallet file 1:",
    fs.existsSync("/etc/secrets/wallets-1.txt")
  );

  console.log(
    "Render wallet file 2:",
    fs.existsSync("/etc/secrets/wallets-2.txt")
  );
});