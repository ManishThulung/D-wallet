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

function openTransfer() {
  document.getElementById("transfer_from").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function goBack() {
  document.getElementById("transfer_from").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImport() {
  document.getElementById("import_token").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function importGoback() {
  document.getElementById("import_token").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openAcitivity() {
  document.getElementById("activity").style.display = "block";
  document.getElementById("assets").style.display = "none";
}

function openAssets() {
  document.getElementById("activity").style.display = "none";
  document.getElementById("assets").style.display = "block";
}

function goHomePage() {
  document.getElementById("create_popUp").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImportModel() {
  document.getElementById("import_account").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function closeImportModel() {
  document.getElementById("import_account").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function addToken() {
  const address = document.getElementById("toekn_address").value;
  const name = document.getElementById("toekn_name").value;
  const symbol = document.getElementById("toekn_symbol").value;

  // API CALL
  const url = "http://localhost:300/api/v1/tokens/create-token";

  const data = {
    name,
    address,
    symbol,
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

      window.location.reload();
    })
    .catch((err) => {
      console.log("create token err", err);
      alert(err);
    });
}

function addAccount() {
  const privateKey = document.getElementById("add_account_private_key").value;

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  let wallet = new ethers.Wallet(privateKey, provider);

  console.log(wallet);

  const url = "http://localhost:3000/api/v1/account/creat-account";

  const data = {
    privateKey,
    address: wallet.address,
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

      // window.location.reload();
    })
    .catch((err) => {
      console.log("add account err", err);
      alert(err);
    });
}

function myFunction() {
  const data = localStorage.getItem("walletData");
  const parsedData = JSON.parse(data);

  if (parsedData.address) {
    document.getElementById("LoginUser").style.display = "none";
    document.getElementById("home").style.display = "block";

    privateKey = parsedData.private_key;
    address = parsedData.address;

    checkBalance(parsedData.address);
  }

  const tokenRender = document.querySelector(".assets");
  const accountRender = document.querySelector(".accountList");

  const url1 = "http://localhost:3000/api/v1/tokens/all-token";

  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let elements = "";

      data?.data?.tokens?.map(
        (token) =>
          (elements += `
      <div class="assets_item>
      <img
      class="assets_item_img"
      src="./assets/theblockchaincoders.png"
      alt=""
      />

      <span>${token.address.slice(0, 15)}...</span>
      <span>${token.symbol}</span>

      </div>
      `)
      );

      tokenRender.innerHTML = elements;
    })
    .catch((err) => {
      console.log("my func", err);
      alert(err);
    });

  const url2 = "http://localhost:3000/api/v1/accounts/all-account";
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let accounts = "";

      data?.data?.accounts?.map(
        (account, i) =>
          (accounts += `
      <div class="lists>
      <p>${i + 1}</p>
      <p class"accountValue" data-address=${account.address} data-privateKey=${
            account.privateKey
          }>${account.address.slice(0, 15)}...</p>
      </div>
      `)
      );

      accountRender.innerHTML = accounts;
    })
    .catch((err) => {
      console.log("my func", err);
      alert(err);
    });
}

function copyAddress() {
  navigator.clipboard.writeText(address);
}

function changeAccount() {
  const data = document.querySelector(".accountValue");
  const address = data.getAttribute("data-address");
  const privateKey = data.getAttribute("data-privateKey");
  console.log(address, "address");
  console.log(privateKey, "privateKey");

  const userWallet = {
    address,
    private_key: privateKey,
    mnemonic: "Changed",
  };

  localStorage.setItem("walletData", JSON.stringify(userWallet));

  window.location.reload();
}

// whenever the extension is open load this funcation first time
window.onload = myFunction;
