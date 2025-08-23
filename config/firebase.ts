import admin from "firebase-admin";

// Preparar les credencials de Firebase
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  // Gestionar millor el format de la clau privada
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(
        /\n/g,
        "\n"
      )
    : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Validació de les variables d'entorn crítiques
if (!serviceAccount.project_id || !serviceAccount.client_email) {
  throw new Error(
    "Missing required Firebase env variables: project_id or client_email"
  );
}

// Validació especial per a la clau privada
if (!serviceAccount.private_key) {
  console.error("WARNING: Missing FIREBASE_PRIVATE_KEY environment variable");
  throw new Error("Missing FIREBASE_PRIVATE_KEY environment variable");
}
// Inicialitzar Firebase amb millor gestió d'errors
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  console.log("Firebase inicialitzat correctament");
} catch (error) {
  console.error("Error inicialitzant Firebase:", error);
  throw error; // Re-throw per aturar l'aplicació si Firebase no s'inicialitza correctament
}

// Exportar serveis de Firebase
export const auth = admin.auth();
export const db = admin.firestore();
