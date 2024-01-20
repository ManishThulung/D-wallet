document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("accountList")
    .addEventListener("click", changeAccount);

  document.getElementById("userAddress").addEventListener("click", copyAddress);

  document.getElementById("transferFunds").addEventListener("click", handler);

  document
    .getElementById("header_network")
    .addEventListener("click", getOpenNetwork);

  document
    .getElementById("network_item")
    .addEventListener("click", getSelectedNetword);

  document.getElementById("add_newtork").addEventListener("click", setNetwork);

  document.getElementById("loginAccount").addEventListener("click", loginUser);

  document
    .getElementById("accountCreate")
    .addEventListener("click", createUser);

  document.getElementById("openCreate").addEventListener("click", openCreate);

  document.getElementById("sign_up").addEventListener("click", signUp);

  document.getElementById("login_up").addEventListener("click", login);

  document.getElementById("logout").addEventListener("click", logout);

  document
    .getElementById("open_Transfer")
    .addEventListener("click", openTransfer);

  document.getElementById("goBack").addEventListener("click", goBack);

  document.getElementById("open_Import").addEventListener("click", openImport);

  document.getElementById("open_assets").addEventListener("click", openAssets);

  document
    .getElementById("open_activity")
    .addEventListener("click", openAcitivity);

  document.getElementById("goHomePage").addEventListener("click", goHomePage);

  document
    .getElementById("openAccountImport")
    .addEventListener("click", openImportModel);

  document
    .getElementById("close_import_account")
    .addEventListener("click", closeImportModel);

  document.getElementById("add_new_token").addEventListener("click", addToken);

  document
    .getElementById("add_New_Account")
    .addEventListener("click", addAccount);
});

// state variables
let providerUrl =
  "https://eth-sepolia.g.alchemy.com/v2/1nSULucQaI8BNfSRpzTRxnrwPhe4ziaG";
let provider;
let address;
let privateKey;

// functions
function handler() {
  document.getElementById("transfer_center").style.display = "flex";

  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;

  const testAccountAddress = "0xA73Ea87620F7b6EE9A22224E98ce415dbf7c97b1";
  const testPrivateKey =
    "c9c1c7a53026897881b8a51996a3d01e3f7ef048651427b0a1688f77c48e657a";

  // PROVIDER
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  // Wallet class inherits Signer and can sign transactions and messages using a private key
  //Create a new Wallet instance for privateKey and optionally connected to the provider
  let wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  let a = document.getElementById("link");
  a.href = "some dynamic link";

  wallet
    .sendTransaction(tx)
    .then((res) => {
      console.log("txHash: ", res.hash);

      document.getElementById("transfer_center").style.display = "none";
      const a = document.getElementById("link");

      document.getElementById("link").style.display = "block";
    })
    .catch((err) => {
      console.log("wallet error ", err);
      alert(err);
    });
}

function checkBalance(address) {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  provider.getBalance(address).then((res) => {
    const balanceInEth = ethers.utils.formatEther(res);

    document.getElementById(
      "accountBalance"
    ).innerHTML = `${balanceInEth} SepoliaETH`;

    document.getElementById("userAddress").innerHTML = `${address.slice(
      0,
      15
    )}...`;
  });
}

function getOpenNetwork() {
  document.getElementById("network").style.display = "block";
}

function getSelectedNetword(e) {
  const element = document.getElementById("selected_network");
  element.innerHTML = e.target.innerHTML;

  if (e.target.innerHTML == "Ethereum Mainnet") {
    providerUrl =
      "https://eth-mainnet.g.alchemy.com/v2/Nhrc_je2KdmSOz1mxf_3lUcFp_xpSmS4";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML == "Ethereum Sepolia") {
    providerUrl =
      "https://eth-sepolia.g.alchemy.com/v2/1nSULucQaI8BNfSRpzTRxnrwPhe4ziaG";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML == "Polygon Mainnet") {
    providerUrl = "https://rpc.ankr.com/polygon";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML == "Polygon Mumbai") {
    providerUrl = "https://rpc.ankr.com/polygon";
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML == "Goerli Testnet") {
    providerUrl = "https://rpc.ankr.com/eth_goerli";
    document.getElementById("network").style.display = "none";
  }

  console.log(providerUrl, "provider url");
}

function setNetwork() {
  document.getElementById("network").style.display = "none";
}

function loginUser() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("LoginUser").style.display = "block";
}

function createUser() {
  document.getElementById("createAccount").style.display = "block";
  document.getElementById("LoginUser").style.display = "none";
}

function openCreate() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("create_popUp").style.display = "block";
}

function signUp() {
  const name = document.getElementById("sign_up_name").value;
  const email = document.getElementById("sign_up_email").value;
  const password = document.getElementById("sign_up_password").value;
  const passwordConfirm = document.getElementById(
    "sign_up_passwordConfirm"
  ).value;

  document.getElementById("field").style.display = "none";
  document.getElementById("center").style.display = "block";

  //Returns a new Wallet with a random private key
  const wallet = ethers.Wallet.createRandom();

  if (wallet.address) {
    console.log(wallet);

    // API CALL
    const url = "http://localhost:300/api/v1/user/signup";

    const data = {
      name,
      email,
      password,
      passwordConfirm,
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        document.getElementById("createdAddress").innerHTML = wallet.address;
        document.getElementById("createdPrivateKey").innerHTML =
          wallet.privateKey;
        document.getElementById("createdmnemonic").innerHTML =
          wallet.mnemonic.phrase;
        document.getElementById("center").style.display = "none";
        document.getElementById("accountData").style.display = "block";
        document.getElementById("sign_up").style.display = "none";

        const walletData = {
          address: wallet.address,
          private_key: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        };

        localStorage.setItem("walletData", JSON.stringify(walletData));

        // at last go to home page
        document.getElementById("goHomePage").style.display = "block";
        window.location.reload();
      })
      .catch((err) => {
        console.log("signup err", err);
        alert(err);
      });
  }
}

function login() {
  document.getElementById("login_form").style.display = "none";
  document.getElementById("center").style.display = "block";

  const email = document.getElementById("sign_up_email").value;
  const password = document.getElementById("sign_up_password").value;

  const url = "http://localhost:300/api/v1/user/login";

  const data = {
    email,
    password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      const walletData = {
        address: result.data.user.address,
        private_key: result.data.user.privateKey,
        mnemonic: result.data.user.mnemonic.phrase,
      };

      localStorage.setItem("walletData", JSON.stringify(walletData));

      // at last go to home page
      // document.getElementById("goHomePage").style.display = "block";
      window.location.reload();
    })
    .catch((err) => {
      console.log("login err", err);
      alert(err);
    });
}

function logout() {
  localStorage.removeItem("walletData");
  window.location.reload();
}

function openTransfer() {}

function goBack() {}

function openImport() {}

function openAcitivity() {}

function openAssets() {}

function goHomePage() {}

function openImportModel() {}

function closeImportModel() {}

function addToken() {}

function addAccount() {}

function myFunction() {}

function copyAddress() {}

function changeAccount() {}
