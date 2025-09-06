import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Fix Windows path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correctly resolve serviceAccountKey.json
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

// Read and parse the service account JSON
if (!fs.existsSync(serviceAccountPath)) {
  console.error("serviceAccountKey.json not found at", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

// Export named adminAuth for use in controllers
export const adminAuth = getAuth();
