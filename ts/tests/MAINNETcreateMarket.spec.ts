import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { assert } from "chai";
import { Coin, Dex, DexMarket, FileKeypair } from "../src";
import bs58 from "bs58";

describe("Serum Mainnet Tools", () => {
  const connection = new Connection("https://solana-api.projectserum.com/", "confirmed");
  const owner = FileKeypair.loadOrGenerate("./tests/keys/mainnet.json");

  console.log("[MAINNET] owner publicKey", owner.keypair.publicKey.toBase58());
  console.log("[MAINNET] owner secretKey", bs58.encode(owner.keypair.secretKey));

  const dexAddress = new PublicKey(
    "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
  );

  const cmpnAddress = new PublicKey(
    "9tQhCmFtCh56qqf9szLQ8dNjYcd4TTv6MWPpw6MqLubu",
  );

  const usdcAddress = new PublicKey(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  );

  const dex = new Dex(dexAddress, connection);
  let dexMarket: DexMarket;

  let baseCoin: Coin;
  let quoteCoin: Coin;

  it("LOADS A DEX MARKET", async () => {
    const marketAddress = new PublicKey("8EapfK6wCoRy5sFXZX9gudi8j3m5nLZcuDgxDGWVLgSd")
    baseCoin = await Coin.load(connection, "CMPN", cmpnAddress, null, null)
    quoteCoin = await Coin.load(connection, "USDC", usdcAddress, null, null)
    dexMarket = await DexMarket.load(connection, dexAddress, marketAddress, baseCoin, quoteCoin);
    assert.isDefined(dexMarket);
  });

  // disable
  it.skip("INITS A DEX MARKET ON MAINNET", async () => {
    baseCoin = await Coin.load(connection, "CMPN", cmpnAddress, null, null)
    quoteCoin = await Coin.load(connection, "USDC", usdcAddress, null, null)
    dexMarket = await dex.initDexMarket(owner.keypair, baseCoin, quoteCoin, {
      lotSize: 1,
      tickSize: 0.00001,

    });

    console.log("[MAINNET] dexMarket address:", dexMarket.address.toBase58());

    assert.equal(
      dexMarket.address.toBase58(),
      dexMarket.serumMarket.address.toBase58(),
    );
  });
});
