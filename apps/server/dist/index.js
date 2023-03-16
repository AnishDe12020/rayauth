var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_dotenv = __toESM(require("dotenv"));
var import_express8 = __toESM(require("express"));

// src/constant.ts
var PORT = Number(process.env.PORT) || 8080;
var HOST = process.env.HOST || "localhost";
var MONGOPASS = process.env.DATABASE_URL || "NOT-FOUND";
var SECERET = process.env.SECERET || "NOT-FOUND";
var TOKEN = process.env.TOKEN || "NOT-FOUND";
var GITID = process.env.GITHUB_ID || "NOTFOUND";
var GITSECRET = process.env.GITHUB_SECRET || "NOTFOUND";
var DSID = process.env.DISCORD_ID || "NOTFOUND";
var DSSECRET = process.env.DISCORD_SECRET || "NOTFOUND";
var GID = process.env.GOOGLE_ID || "NOTFOUND";
var GSECRET = process.env.GOOGLE_SECRET || "NOTFOUND";
var PASS = process.env.PASS || "NOTFOUND";
var EMAIL = process.env.EMAIL || "NOTFOUND";
var DB1 = process.env.DATABASE_URL || "NOTFOUND";
var DB2 = process.env.DB_TWO || "NOTFOUND";
var DB3 = process.env.DB_THREE || "NOTFOUND";
var TESTP = process.env.TEST || "NOTFOUND";
var BASE_URL = process.env.BASE_URL || "https://api.rayauth.com";
var FRONTEND_URL = process.env.FRONTEND_URL || "https://rayauth.com";

// src/index.ts
var import_cors = __toESM(require("cors"));

// src/auth/github.ts
var import_passport = __toESM(require("passport"));
var import_passport_github2 = __toESM(require("passport-github2"));
function initGithub() {
  import_passport.default.serializeUser(function(user, done) {
    done(null, user);
  });
  import_passport.default.deserializeUser(function(user, done) {
    return done(null, user);
  });
  import_passport.default.use(
    new import_passport_github2.default.Strategy(
      {
        clientID: GITID,
        clientSecret: GITSECRET,
        callbackURL: `${BASE_URL}/auth/github/callback`,
        scope: ["user:email"]
      },
      (_, __, profile, done) => {
        done(null, profile);
      }
    )
  );
}

// src/controllers/github/callback.ts
var import_passport2 = __toESM(require("passport"));
var import_express = require("express");

// lib/db.ts
var import_client = require("@prisma/client");
var globalForPrisma = global;
var prisma = globalForPrisma.prisma || new import_client.PrismaClient({
  log: ["query"]
});
if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;

// src/helpers/token.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function createToken(id, email, address) {
  const token = import_jsonwebtoken.default.sign(
    {
      email,
      id,
      address,
      time: Date().toString()
    },
    SECERET
  );
  return token;
}

// src/helpers/email.ts
var import_elasticemail_client_ts_axios = require("@elasticemail/elasticemail-client-ts-axios");
var config = new import_elasticemail_client_ts_axios.Configuration({
  apiKey: process.env.ELASTIC_EMAIL
});
var emailsApi = new import_elasticemail_client_ts_axios.EmailsApi(config);
var sendMail = (email, key) => {
  emailsApi.emailsPost({
    Recipients: [{ Email: email }],
    Content: {
      Body: [
        {
          ContentType: "PlainText",
          Charset: "utf-8",
          Content: `This is your recovery key keep it safe 
 ${key}`
        }
      ],
      From: "RayAuth <contact@rayauth.com>",
      Subject: "Your RayAuth recovery key"
    }
  }).then((response) => {
    console.log("email sent", response.data);
  }).catch((error) => {
    console.error("failed to send email", error);
  });
};

// src/interfaces/key.ts
var import_mongoose = __toESM(require("mongoose"));
var Key = new import_mongoose.default.Schema({
  key: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});
var KeyModel = import_mongoose.default.models.Key || import_mongoose.default.model("Key", Key);

// src/helpers/save3keys.ts
var import_mongoose2 = require("mongoose");
var saveToMongoKeyOne = async (key, email) => {
  const mongo1 = await (0, import_mongoose2.connect)(DB1);
  const newKey = new KeyModel({ email, key });
  await newKey.save();
  await mongo1.disconnect();
};
var saveToMongoKeyTwo = async (key, email) => {
  const mongo2 = await (0, import_mongoose2.connect)(DB2);
  const newKey = new KeyModel({ email, key });
  await newKey.save();
  await mongo2.disconnect();
};
var saveToMongoKeyThree = async (key, email) => {
  const mongo3 = await (0, import_mongoose2.connect)(DB3);
  const newKey = new KeyModel({ email, key });
  await newKey.save();
  await mongo3.disconnect();
};
async function saveKeys(keys, email) {
  await saveToMongoKeyOne(keys[0], email);
  console.log("saved to mongo 1");
  await saveToMongoKeyTwo(keys[1], email);
  console.log("saved to mongo 2");
  await saveToMongoKeyThree(keys[2], email);
  console.log("saved to mongo 3");
}

// src/helpers/slice.ts
var secret = __toESM(require("secrets.js-grempe"));
function sliceKey(key) {
  const shares = secret.share(key, 3, 2);
  return shares;
}
function combineKey(keys) {
  const shares = secret.combine(keys);
  return shares;
}

// src/helpers/setupKey.ts
var import_hex_array = __toESM(require("hex-array"));
var import_web3 = require("@solana/web3.js");
async function setupKey(email) {
  const { publicKey, secretKey } = import_web3.Keypair.generate();
  const key = import_hex_array.default.toString(secretKey);
  const [deviceShare2, emailShare, authShare] = sliceKey(key);
  const keys = sliceKey(authShare);
  await saveKeys(keys, email);
  sendMail(email, emailShare);
  return [deviceShare2, publicKey.toString()];
}

// src/helpers/handleProviderCallback.ts
var import_store = __toESM(require("store"));
var handleProviderCallback = async (res, email, name, avatarUrl) => {
  var _a;
  const callback2 = (_a = import_store.default.get("data")) == null ? void 0 : _a.callback;
  import_store.default.clearAll();
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  const redirectUrl = new URL(`${FRONTEND_URL}/callback`);
  if (callback2) {
    redirectUrl.searchParams.append("callback", callback2);
  }
  if (user) {
    console.log("user already exists");
    const token2 = createToken(user.id, user.email, user.address);
    res.cookie("jwt-rayauth", token2, {
      maxAge: 1e3 * 60 * 60 * 24 * 7,
      secure: true,
      domain: "rayauth.com",
      sameSite: "none"
    });
    redirectUrl.searchParams.append("jwt", token2);
    res.redirect(redirectUrl.toString());
    return;
  }
  const [deviceShare2, publicKey] = await setupKey(email);
  const newUser = await prisma.user.create({
    data: {
      email,
      address: publicKey,
      name,
      avatar: avatarUrl
    }
  });
  const token = createToken(newUser.id, newUser.email, newUser.address);
  res.cookie("jwt-rayauth", token, {
    maxAge: 1e3 * 60 * 60 * 24 * 7,
    secure: true,
    domain: "rayauth.com",
    sameSite: "none"
  });
  redirectUrl.searchParams.append("jwt", token);
  redirectUrl.searchParams.append("share", deviceShare2);
  res.redirect(redirectUrl.toString());
};

// src/controllers/github/callback.ts
var callback = (0, import_express.Router)();
callback.get(
  "/auth/github/callback",
  import_passport2.default.authenticate("github", { failureRedirect: "/login" }),
  async function(req, res) {
    const rawUser = req.user;
    handleProviderCallback(
      res,
      rawUser.emails[0].value,
      rawUser.displayName,
      rawUser.photos[0].value
    );
  }
);
var callback_default = callback;

// src/index.ts
var secrets2 = __toESM(require("secrets.js-grempe"));

// src/controllers/github/login.ts
var import_passport3 = __toESM(require("passport"));
var import_express2 = require("express");
var login = (0, import_express2.Router)();
login.get(
  "/auth/github",
  import_passport3.default.authenticate("github", { scope: ["user:email"] })
);
var login_default = login;

// src/auth/discord.ts
var import_passport4 = __toESM(require("passport"));
var import_passport_discord = __toESM(require("passport-discord"));
function initdiscord() {
  import_passport4.default.serializeUser(function(user, done) {
    done(null, user);
  });
  import_passport4.default.deserializeUser(function(user, done) {
    return done(null, user);
  });
  import_passport4.default.use(
    new import_passport_discord.default.Strategy(
      {
        clientID: DSID,
        clientSecret: DSSECRET,
        // callbackURL: "ASA",
        scope: ["email", "identify"]
      },
      (__, _, profile, done) => {
        done(null, profile);
      }
    )
  );
}

// src/controllers/discord/login.ts
var import_passport5 = __toESM(require("passport"));
var import_express3 = require("express");
var dlogin = (0, import_express3.Router)();
dlogin.get(
  "/auth/discord",
  import_passport5.default.authenticate("discord", { scope: ["email", "identify"] })
);
var login_default2 = dlogin;

// src/index.ts
var import_hex_array3 = __toESM(require("hex-array"));
var import_web35 = require("@solana/web3.js");

// src/controllers/discord/callback.ts
var import_passport6 = __toESM(require("passport"));
var import_express4 = require("express");
var dcallback = (0, import_express4.Router)();
dcallback.get(
  "/auth/discord/callback",
  import_passport6.default.authenticate("discord", { failureRedirect: "/login" }),
  async function(req, res) {
    const rawUser = req.user;
    handleProviderCallback(
      res,
      rawUser.email,
      rawUser.username,
      rawUser.avatar
    );
  }
);
var callback_default2 = dcallback;

// src/auth/google.ts
var import_passport7 = __toESM(require("passport"));
var import_passport_google_oauth20 = __toESM(require("passport-google-oauth20"));
function initgoogle() {
  import_passport7.default.serializeUser(function(user, done) {
    done(null, user);
  });
  import_passport7.default.deserializeUser(function(user, done) {
    return done(null, user);
  });
  import_passport7.default.use(
    new import_passport_google_oauth20.default.Strategy(
      {
        clientID: GID,
        clientSecret: GSECRET,
        callbackURL: `${BASE_URL}/auth/google/callback`,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email"
        ]
      },
      async (_, __, profile, done) => {
        done(null, profile);
      }
    )
  );
}

// src/controllers/google/login.ts
var import_passport8 = __toESM(require("passport"));
var import_express5 = require("express");
var glogin = (0, import_express5.Router)();
glogin.get(
  "/auth/google",
  import_passport8.default.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
var login_default3 = glogin;

// src/controllers/google/callback.ts
var import_passport9 = __toESM(require("passport"));
var import_express6 = require("express");
var gcallback = (0, import_express6.Router)();
gcallback.get(
  "/auth/google/callback",
  import_passport9.default.authenticate("google", { failureRedirect: "/login" }),
  async function(req, res) {
    const rawUser = req.user;
    handleProviderCallback(
      res,
      rawUser.emails[0].value,
      rawUser.displayName,
      rawUser.photos[0].value
    );
  }
);
var callback_default3 = gcallback;

// src/controllers/projects/index.ts
var import_web32 = require("@solana/web3.js");
var import_bs58 = __toESM(require("bs58"));
var import_crypto = require("crypto");
var import_express7 = require("express");
var router = (0, import_express7.Router)();
router.get("/", async (_req, res) => {
  const projects = await prisma.project.findMany();
  return res.json({ projects });
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid id" });
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  });
  return res.json({ project });
});
router.post("/", async (req, res) => {
  const { name, slug, ownerId } = req.body;
  if (!name || !slug || !ownerId) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const tankKeypair = import_web32.Keypair.generate();
  try {
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        owner: {
          connect: {
            id: ownerId
          }
        },
        address: tankKeypair.publicKey.toBase58()
      }
    });
    await prisma.clientSecret.create({
      data: {
        key: (0, import_crypto.randomUUID)(),
        project: {
          connect: {
            id: project.id
          }
        },
        CreatedBy: {
          connect: {
            id: ownerId
          }
        }
      }
    });
    await prisma.gasTank.create({
      data: {
        address: tankKeypair.publicKey.toBase58(),
        privateKey: import_bs58.default.encode(tankKeypair.secretKey),
        project: {
          connect: {
            id: project.id
          }
        }
      }
    });
    return res.json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid id" });
  const { name, slug } = req.body;
  if (!name || !slug) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const project = await prisma.project.update({
    where: {
      id
    },
    data: {
      name,
      slug
    }
  });
  return res.json({ project });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid id" });
  const project = await prisma.project.delete({
    where: {
      id
    }
  });
  return res.json({ project });
});
router.get("/:id/client-secret", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid id" });
  const clientSecret = await prisma.clientSecret.findUnique({
    where: {
      projectId: id
    }
  });
  return res.json({ clientSecret });
});
router.post("/:id/rotate-client-secret", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid id" });
  await prisma.clientSecret.update({
    where: {
      projectId: id
    },
    data: {
      key: (0, import_crypto.randomUUID)()
    }
  });
  return res.json({ success: true });
});
var projects_default = router;

// src/controllers/gasless/index.ts
var import_web33 = require("@solana/web3.js");
var import_bs583 = __toESM(require("bs58"));

// src/helpers/validateTransaction.ts
var import_bs582 = __toESM(require("bs58"));
async function validateTransaction(connection2, transaction, feePayer, maxSignatures, lamportsPerSignature) {
  var _a;
  if (!((_a = transaction.feePayer) == null ? void 0 : _a.equals(feePayer.publicKey)))
    throw new Error("invalid fee payer");
  if (!transaction.recentBlockhash)
    throw new Error("missing recent blockhash");
  const feeCalculator = await connection2.getFeeCalculatorForBlockhash(
    transaction.recentBlockhash
  );
  if (!feeCalculator.value)
    throw new Error("blockhash not found");
  if (feeCalculator.value.lamportsPerSignature > lamportsPerSignature)
    throw new Error("fee too high");
  if (!transaction.signatures.length)
    throw new Error("no signatures");
  if (transaction.signatures.length > maxSignatures)
    throw new Error("too many signatures");
  const [primary, ...secondary] = transaction.signatures;
  if (!primary.publicKey.equals(feePayer.publicKey))
    throw new Error("invalid fee payer pubkey");
  if (primary.signature)
    throw new Error("invalid fee payer signature");
  for (const signature of secondary) {
    if (!signature.publicKey)
      throw new Error("missing public key");
    if (!signature.signature)
      throw new Error("missing signature");
  }
  transaction.partialSign(feePayer);
  const rawTransaction = transaction.serialize();
  return { signature: import_bs582.default.encode(transaction.signature), rawTransaction };
}

// src/controllers/gasless/index.ts
var connection = new import_web33.Connection(
  //   "https://api.mainnet-beta.solana.com/",
  "https://api.devnet.solana.com/",
  { commitment: "confirmed" }
);
var handleGasless = async (req, res) => {
  var _a;
  const feePayerPrivateKey = process.env.PRIVATE_KEY;
  if (!feePayerPrivateKey) {
    res.status(500).send({ status: "error", message: "no private key" });
    return;
  }
  const feePayer = import_web33.Keypair.fromSecretKey(import_bs583.default.decode(feePayerPrivateKey));
  console.log("feepayer", feePayer.publicKey.toBase58());
  const serialized = (_a = req.body) == null ? void 0 : _a.transaction;
  if (typeof serialized !== "string") {
    res.status(400).send({ status: "error", message: "request should contain transaction" });
    return;
  }
  let transaction;
  try {
    transaction = import_web33.Transaction.from(import_bs583.default.decode(serialized));
  } catch (e) {
    res.status(400).send({ status: "error", message: "can't decode transaction" });
    return;
  }
  console.log("transaction", transaction);
  let signature;
  try {
    signature = (await validateTransaction(connection, transaction, feePayer, 4, 5e3)).signature;
  } catch (e) {
    console.error(e);
    res.status(400).send({ status: "error", message: "bad transaction" });
    return;
  }
  try {
    await connection.simulateTransaction(transaction);
  } catch (e) {
    res.status(400).send({ status: "error", message: "simulation failed" });
    return;
  }
  transaction.addSignature(
    feePayer.publicKey,
    Buffer.from(import_bs583.default.decode(signature))
  );
  console.log("txBefore", transaction);
  const txid = await (0, import_web33.sendAndConfirmRawTransaction)(
    connection,
    transaction.serialize(),
    { commitment: "confirmed" }
  );
  res.status(200).json({ status: "ok", txid });
};
var gasless_default = handleGasless;

// src/index.ts
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/middleware/query.ts
var import_store2 = __toESM(require("store"));
function setQuery() {
  return async (req, _, next) => {
    var { id, cb } = req.query;
    console.log(id, cb);
    if ((id == null ? void 0 : id.toString().toUpperCase()) == "TEST")
      id = TESTP;
    if (!cb) {
      next();
      return;
    }
    const project = await prisma.project.findUnique({
      where: {
        id: id == null ? void 0 : id.toString()
      }
    });
    if (!project) {
      cb = `${FRONTEND_URL}/error`;
    }
    console.log(project == null ? void 0 : project.callbackUrls);
    import_store2.default.set("data", {
      callback: cb.toString(),
      clientId: id == null ? void 0 : id.toString()
    });
    console.log(import_store2.default.get("data"));
    next();
  };
}

// src/controllers/user/getUser.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
function userController() {
  return async (req, res) => {
    var _a;
    const auth = (_a = req.headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
    if (!auth || auth == void 0) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log("auth", auth);
    var data = import_jsonwebtoken2.default.verify(auth || "", SECERET);
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log(data);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    res.status(200).json(user);
  };
}

// src/index.ts
var import_mongoose4 = require("mongoose");

// src/controllers/user/deviceKey.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));

// src/helpers/getAuthKey.ts
var import_mongoose3 = require("mongoose");
var getMongoKeyOne = async (email) => {
  const mongo1 = await (0, import_mongoose3.connect)(DB1);
  const share2 = await KeyModel.findOne({ email });
  await mongo1.disconnect();
  return share2.key;
};
var getMongoKeyTwo = async (email) => {
  const mongo2 = await (0, import_mongoose3.connect)(DB2);
  const share2 = await KeyModel.findOne({ email });
  await mongo2.disconnect();
  return share2.key;
};
var getMongoKeyThree = async (email) => {
  const mongo3 = await (0, import_mongoose3.connect)(DB3);
  const share2 = await KeyModel.findOne({ email });
  await mongo3.disconnect();
  return share2.key;
};
var getCombinedKey = async (email) => {
  const key1 = await getMongoKeyOne(email);
  const key2 = await getMongoKeyTwo(email);
  const key3 = await getMongoKeyThree(email);
  const keys = [key1, key2, key3];
  const authShare = combineKey(keys);
  return authShare;
};

// src/controllers/user/deviceKey.ts
function deviceShare() {
  return async (req, res) => {
    var _a, _b;
    const auth = (_a = req.headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
    console.log("auth", auth);
    if (!auth || auth == void 0) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    var data = import_jsonwebtoken3.default.verify(auth || "", SECERET);
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    console.log("bodu", req.query);
    const key = (_b = req.query.key) == null ? void 0 : _b.toString();
    ;
    console.log("key", key);
    if (!key) {
      res.status(404).json("No key provided for a new device share");
      res.end();
      return;
    }
    const key2 = await getCombinedKey(user.email);
    const construct = combineKey([key, key2]);
    const newShares = sliceKey(construct);
    res.status(200).json({
      key: newShares[0],
      msg: "New Device key reconstructed and recovered"
    }).end();
  };
}

// src/controllers/user/constructKey.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
var import_secrets = __toESM(require("secrets.js-grempe"));
var import_hex_array2 = __toESM(require("hex-array"));
var import_web34 = require("@solana/web3.js");
function getPrivateKey() {
  return async (req, res) => {
    var _a, _b;
    const auth = (_a = req.headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
    const deviceKey = (_b = req.headers.authorizationbasic) == null ? void 0 : _b.toString().replace("Basic ", "");
    console.log(req.headers);
    console.log(deviceKey);
    console.log("running");
    console.log("devicekey", deviceKey == null ? void 0 : deviceKey.toString());
    if (!auth || auth == void 0) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    var data = import_jsonwebtoken4.default.verify(auth || "", SECERET);
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    if (!deviceKey || deviceKey == void 0) {
      res.status(400).json("No device key was provided");
      res.end();
      return;
    }
    console.log(user.email);
    const shareTwo = await getCombinedKey(user.email);
    const combine3 = import_secrets.default.combine([deviceKey || "", shareTwo]);
    const newkey = import_hex_array2.default.fromString(combine3);
    console.log("new", newkey);
    const secret2 = import_web34.Keypair.fromSecretKey(newkey);
    console.log(secret2);
    res.status(200).json({
      key: combine3,
      msg: "The private key has been combined"
    }).end();
  };
}

// src/controllers/keys/index.ts
var import_jsonwebtoken5 = __toESM(require("jsonwebtoken"));
function createSessionKey() {
  return async (req, res) => {
    var _a;
    const auth = (_a = req.headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
    const { key, userId, expiresAt } = req.body;
    if (!key || !userId || !expiresAt) {
      res.status(404).json({
        msg: "Not a proper request"
      });
      return;
    }
    if (!auth || auth == void 0) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log("auth", auth);
    var data = import_jsonwebtoken5.default.verify(auth || "", SECERET);
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log(data);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    const sessionKey = await prisma.sessionKey.create({
      data: {
        key,
        user: {
          connect: {
            id: userId
          }
        },
        userId,
        expiresAt
      }
    });
    res.status(200).json(sessionKey);
  };
}
function getSessionKey() {
  return async (req, res) => {
    var _a;
    const auth = (_a = req.headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
    if (!auth || auth == void 0) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log("auth", auth);
    var data = import_jsonwebtoken5.default.verify(auth || "", SECERET);
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log(data);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      },
      include: {
        sessionKeys: true
      }
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    res.status(200).json(user.sessionKeys);
  };
}
function updateSessionKey() {
  return async (req, res) => {
    var _a;
    const auth = (_a = req.headers.authorization) == null ? void 0 : _a.replace("Bearer ", "");
    if (!auth || auth == void 0) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log("auth", auth);
    var data = import_jsonwebtoken5.default.verify(auth || "", SECERET);
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log(data);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    const sessionKey = await prisma.sessionKey.findUnique({
      where: {
        key: req.body.key
      }
    });
    if (!sessionKey) {
      res.status(404).json({
        msg: "No key found with this key id"
      });
      return;
    }
    const result = await prisma.sessionKey.update({
      where: {
        key: req.body.key
      },
      data: {
        revoked: true
      }
    });
    res.status(200).json(result);
  };
}

// src/index.ts
import_dotenv.default.config();
var app = (0, import_express8.default)();
console.log("base url: ", BASE_URL);
console.log("frontend url: ", FRONTEND_URL);
initGithub();
initdiscord();
initgoogle();
app.use(
  (0, import_cors.default)({
    credentials: true,
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use(setQuery());
app.use((0, import_cookie_parser.default)());
app.use(import_express8.default.json());
app.use(login_default);
app.use(callback_default);
app.use(login_default2);
app.use(callback_default2);
app.use(login_default3);
app.use(callback_default3);
app.get("/user", userController());
app.get("/user/session-key", getSessionKey());
app.post("user/session-key", createSessionKey());
app.patch("/user/session-key/revoke", updateSessionKey());
app.use("/projects", projects_default);
app.use("/gasless", gasless_default);
app.get("/user/device-share", deviceShare());
app.get("/", (req, res) => {
  console.log(req.body);
  console.log("req sent");
  res.send("Hello");
});
app.get("/key", async (req, res) => {
  const shareOne = "802cd2da65a667eb916dbf9f2b367b074171b3710aee610a5dc8945dbea8e4fe934a5becae824a517a2da2ad71859fa39fa1555f26b280d2b74bf179c680f78f50c8d02f9324184f02bb5e3a402ee3aa989";
  const shareTwo = await getCombinedKey("apoorvcodes381@gmail.com");
  const combine3 = secrets2.combine([shareOne, shareTwo]);
  const newkey = import_hex_array3.default.fromString(combine3);
  console.log("new", newkey);
  const secret2 = import_web35.Keypair.fromSecretKey(newkey);
  console.log(secret2);
  console.log(req.url);
  res.send("ok");
});
app.get("/delete-user/:email", async (req, res) => {
  const emailId = req.params.email;
  const mongo1 = await (0, import_mongoose4.connect)(DB1);
  await KeyModel.deleteOne({ email: emailId });
  await mongo1.disconnect();
  const mongo2 = await (0, import_mongoose4.connect)(DB2);
  await KeyModel.deleteOne({ email: emailId });
  await mongo2.disconnect();
  const mongo3 = await (0, import_mongoose4.connect)(DB3);
  await KeyModel.deleteOne({ email: emailId });
  await mongo3.disconnect();
  const user = await prisma.user.findUnique({
    where: {
      email: emailId
    }
  });
  if (user) {
    await prisma.user.delete({
      where: {
        email: emailId
      }
    });
  }
  res.json("User deleted");
});
app.get("/private-key", getPrivateKey());
app.listen(Number(PORT), HOST, () => {
  console.log("Server up and running;");
  console.log(process.env.PORT);
  console.log(process.env.ELASTIC_EMAIL);
});
module.exports = app;
