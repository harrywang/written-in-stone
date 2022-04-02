import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { AccountContext } from "../context";

/* import contract address and contract owner address */
import { contractAddress } from "../config";

/* import Application Binary Interface (ABI) */
import WrittenInStone from "../artifacts/contracts/WrittenInStone.sol/WrittenInStone.json";

export default function ViewPosts() {
  const account = useContext(AccountContext);
  const [posts, setPosts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();

  let scan_link

  if (account) {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "mumbai") {
      scan_link = "https://mumbai.polygonscan.com/address/" + account
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "polygon") {
        scan_link = "https://polygonscan.com/address/" + account
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "ethereum") {
        scan_link = "https://etherscan.io/address/" + account
    } else {
        scan_link = "https://writteninstone.xyz"
    }
  }

  if (account) {
    useEffect(() => {
      loadPosts(account);
    }, []);
  }

  async function loadPosts(account) {
    let provider;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
      provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "mumbai") {
      provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_URL_MUMBAI
      );
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "polygon") {
      provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_URL_POLYGON
      );
    } else {
      provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_URL_ETHEREUM
      );
    }
    const contract = new ethers.Contract(
      contractAddress,
      WrittenInStone.abi,
      provider
    );
    const data = await contract.connect(account).fetchMyPosts();
    setPosts(JSON.parse(JSON.stringify(data)));
    setLoadingState("loaded");
  }

  async function goCreate() {
    router.push("/create");
  }

  async function goHome() {
    router.push("/");
  }

  if (account && loadingState === "not-loaded") {
    return (
      <div className="relative py-4 flex justify-center">
        <svg
          className="animate-spin h-5 w-5 text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-12 max-w-lg mx-auto">
      <div className="prose prose-indigo max-w-prose">
        {!account && (
          <div className="prose prose-indigo max-w-md mx-auto flex justify-center">
            <button
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              onClick={goHome}
            >
              Go to Home to Connect Wallet
            </button>
          </div>
        )}
        {account && posts.length === 0 && (
          <div>
            <div className="prose prose-indigo max-w-md mx-auto flex justify-center">
              <button
                className="w-half flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={goCreate}
              >
                Carve Your First Message
              </button>
            </div>
            <div>
              <div className="relative py-4 flex justify-center">
                No Messages yet
              </div>
            </div>
          </div>
        )}
        {account && posts.length !== 0 && (
          <div>
          <div className="prose prose-indigo max-w-md mx-auto flex justify-center">
            <button
              className="w-half flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={goCreate}
            >
              Carve More Messages
            </button>
          </div>
          <div>
            <div className="relative py-4 flex justify-center">
            <a href={scan_link} target="_blank" className="text-xs" >View on Blockchain Scan</a>
            </div>
            
          </div>
        </div>
        )}
        {posts.length !== 0 &&
          /* map over the posts array and render post list */
          posts.map((post, index) => (
            <div>
              <div className="relative py-4" key={index}>
                {post[1]}
              </div>

              <div className="relative my-4">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
