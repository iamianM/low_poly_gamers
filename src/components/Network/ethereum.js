import Web3 from "web3";
import Profile from "../../contracts/Profile.json";
import Body from "../../contracts/Body.json";
import Head from "../../contracts/Head.json";
import Face from "../../contracts/Face.json";
import Accessory from "../../contracts/Accessory.json";
import { useState, useEffect } from "react";
// import map from "./build/deployments/map.json";
// const REACT_APP_CANVAS_ADDRESS = map["Canvas"];
const ADDRESSES = {
  profile: "0x87fC32e87e87572128cDeD874cf80e64D40CdfB3",
  body: "0xe3546b6D3dF950d368B34a8E4c8A233A6f361FB1",
  head: "0x6817f4183ec16FD595f4bCA556d54B75aA70fC79",
  face: "0xA3CffA3b741d553ED3922391839d4835B0231801",
  accessory: "0x58064a4eA494665c3bcAc0bcB3252Aa685C2C600",
};

const web3 = new Web3(window.ethereum);
window.ethereum.enable();

const contractAddress = ADDRESSES["profile"];
const contract = new web3.eth.Contract(Profile.abi, contractAddress);

export const getBalance = async (address) => {
  let balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, "ether");
};

export function Profiles() {
  const [values, setValue] = useState([]); // state variable to set account.

  useEffect(() => {
    async function load() {
      const counter = await contract.methods.getCount().call();
      const values = [];
      for (var i = 0; i < counter; i++) {
        const plot = await contract.methods.profiles(i).call();
        values.push(plot);
      }
      setValue(values);
    }

    load();
  }, []);

  return values;
}

export function BodyCount() {
  const [value, setValue] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const value = await contract.methods.bodyCount().call();
      setValue(value);
    }

    load();
  }, []);

  return value;
}

export function HeadCount() {
  const [value, setValue] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const value = await contract.methods.headCount().call();
      setValue(value);
    }

    load();
  }, []);

  return value;
}

export function FaceCount() {
  const [value, setValue] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const value = await contract.methods.faceCount().call();
      setValue(value);
    }

    load();
  }, []);

  return value;
}

export function AccessoryCount() {
  const [value, setValue] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const value = await contract.methods.accessoryCount().call();
      setValue(value);
    }

    load();
  }, []);

  return value;
}

export function GetSVG(skinColor, body, head, face, accessory) {
  const [value, setValue] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const value = await contract.methods.getFinalSvg(
        skinColor,
        body,
        head,
        face,
        accessory
      ).call;
      setValue(value);
    }

    load();
  }, []);

  return value;
}

export function GetProfile(i) {
  const [value, setValue] = useState(); // state variable to set account.

  useEffect(() => {
    async function load() {
      const value = await contract.methods.profiles(i).call();
      setValue(value);
    }

    load();
  }, []);

  return value;
}

export const buyNFT = async () => {
  const { ethereum } = window;
  const gasLimit = await contract.methods
    .mintProfile(1)
    .estimateGas({ from: ethereum.selectedAddress });
  const gasPrice = web3.eth.gasPrice;
  console.log(gasLimit, gasPrice);
  const transactionParams = {
    to: contractAddress,
    from: ethereum.selectedAddress,
    value: web3.utils.toHex(web3.utils.toWei("0.05", "ether")),
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    data: contract.methods.mintProfile(1).encodeABI(),
  };
  return await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParams],
  });
};

export const getToken = async (address) => {
  return await contract.methods.walletOfOwner(address).call();
};

export const getTokenUri = async (tokenId) => {
  return await contract.methods.tokenURI(tokenId).call();
};
