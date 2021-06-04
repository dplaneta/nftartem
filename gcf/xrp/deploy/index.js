/**
 * Google Function to create NFT certificate of physical
 * art ownership in NFTArtem standard on XRP Ledger.
 *
 * -- Google Cloud Functions (https://cloud.google.com/functions/docs/quickstart-nodejs)
 * is a serverless execution environment for building and connecting cloud services.
 *
 * -- A Non-Fungible Token is a unit of data stored on a digital ledger,
 * called a blockchain, that certifies a digital asset to be unique
 * and therefore not interchangeable. NFTs can be used to represent
 * items such as photos, videos, audio, and other types of digital files.
 *
 * -- NFT can be used to represent an ownership of a physical object too.
 *
 * -- XRP Ledger—an open-source, permissionless and decentralized blockchain technology.
 *
 * @link   https://nftartem.com
 * @file   Google Cloud Function to deploy NFT on XRP Ledger
 * @author Dawid Planeta <dawid_p@nftartem.com>
 * @since  0.0.1
 */

const RippleAPI = require('ripple-lib').RippleAPI;
const xAddr = require('xrpl-tagged-address-codec');


/**
 * Update xrp wallet data
 *
 * @param {object} walletData Wallet data to be updated.
 * @param {object} wallet Wallet (address, secret).
 */
async function updateXRPWalletData(xAPI, walletData, wallet) {
    // Calculate Fee.
    const fee = await xAPI.getFee();
    // Get account info.
    const accInfo = await xAPI.getAccountInfo(wallet.address);
    // TX Template for update
    const templateWalletData = {
        "TransactionType": "AccountSet",
        "Account" : wallet.address,
        "Fee": (parseFloat(fee) * 1000000).toFixed(0) + "",
        "Sequence": accInfo.sequence,
        "SetFlag": 5
    }
    //Merge template with wallet data from param.
    const txWallet = {...templateWalletData, ...walletData};
    //Prepare TX for sending to ledger
    const txJSON = JSON.stringify(txWallet);
    // Sign TX.
    const signedTX = xAPI.sign(txJSON, wallet.secret);
    //Submit the signed transaction to the ledger.
    let resp = {}
    await xAPI.submit(signedTX.signedTransaction).then(function(tx){
      resp.tx = txWallet;
      resp.message = tx.resultMessage;
      resp.code = tx.resultCode;
      resp.hash = tx.tx_json.hash;
    });
    return resp;
}

/**
 * Google Cloud Function Responds to HTTP request to deploy XRP NFT.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.deploy = async (req, res) => {
    // Required body attributes.
    const secret = req.body.secret;
    const xrpDomainField = req.body.xrpDomainField;
    const network = req.body.network;
    // initialize the response message and the status.
    let message = null;
    let status = 200;
    // Init xAPI.
    const xAPI = new RippleAPI({ server: network });
    try {
      // Validate XRP account secret.
      if (!xAPI.isValidSecret(secret)) {
        message = "Invalid secret";
        status = 400;
      } else {
        // Derive XRP account address from the XRP secret.
        const keys = xAPI.deriveKeypair(secret);
        const address = xAPI.deriveAddress(keys.publicKey);
        // Connect to the XRP Ledger.
        await xAPI.connect();
        try {
          // Validate if the XRP account is funded (20 XRP).
          await xAPI.getSettings(address);
        } catch (error) {
          if (error.data.error === "actNotFound") {
            status = 400;
            message = {
              error: `Account ${address.toString()} has not been founded. You must fund the nft address w/ 20+ xrp.`
            };
          } else {
            throw error;
          }
        }
        // Prepare wallet details.
        const wallet = {
          address,
          xAddress: xAddr.Encode({ account: address }),
          secret
        };
        // Prepare Wallet data to be updated - NFT as hex value of Domain Field Pointer Information.
        const walletData = { "Domain": xrpDomainField };
        // Update XRP Wallet.
        message = await updateXRPWalletData(xAPI, walletData, wallet);
      }
    } catch (error) {
      // Internal error.
      console.error(error);
      message = {
        error: error.message
      };
      status = 500;
    }
    console.info('status', status);
    console.debug('message', message);
    res && res.status(status).json(message);
};

// To emulate the node.js function call node index.js
/*
exports.deploy({
  query: {},
  body: {
    // testnet: "wss://s.altnet.rippletest.net"
    // devnet: "https://s.devnet.rippletest.net"
    network: "wss://s.devnet.rippletest.net",
    // To test please generate account
    secret: "",
    // Domain Field Pointer Information (DFPI).
    // as NFT https://github.com/XRPLF/XRPL-Standards/discussions/30
    // Validation https://xrpl.org/validator-domain-verifier.html
    xrpDomainField: ""
  }
}, null);
*/