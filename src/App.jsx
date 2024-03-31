import { useState } from 'react'
import './App.css'

import {
  ConnectWallet,
  createMerkleTreeFromAllowList,
  getProofsForAllowListEntry,
  Web3Button,
  useAddress
} from "@thirdweb-dev/react"

import { ethers } from "ethers";

function App() {

  const allowList = [
    {
      "address": "0x", // wallet address
      "maxClaimable": "1000" // amount of token
    },
    {
      "address": "0x",
      "maxClaimable": "1000"
    }
  ]

  const [merkleRoot, setMerkleRoot] = useState(null);
  const address = useAddress();

  const getMerkleRoot = async () => {
    const merkleTree = await createMerkleTreeFromAllowList(allowList);
    setMerkleRoot(merkleTree.getHexRoot());
  }

  getMerkleRoot();

  const getUserProof = async (address) => {
    const merkleTree = await createMerkleTreeFromAllowList(allowList);
    const leaf = {
      "address": address,
      "maxClaimable": "1000"
    };

    console.log("Leaf:", leaf);
    const proof = await getProofsForAllowListEntry(merkleTree, leaf);
    console.log(proof);

    const proofHash = proof[0].toString();
    console.log("Proof:", proofHash);
    return proofHash;
  }

  return (
    <>
      <ConnectWallet />
      <p>Merkle Root: {merkleRoot}</p>

      <Web3Button
        contractAddress="0x4d3000a4a58928987749809C927Dc60E9476C342"
        action={async (contract) => contract.call(
          "claim",
          [
            address,
            ethers.utils.parseEther("1000"),
            [await getUserProof(address)],
            ethers.utils.parseEther("1000")
          ]
        )}
        onError={() => alert("Ineligible for airdrop.")}
        onSuccess={() => alert("Airdrop claimed!")}
      >Claim Airdrop</Web3Button>
    </>
  )
}

export default App
