import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { AccountContext } from "../context";

/* import contract address */
import { contractAddress } from "../config";

import WrittenInStone from "../artifacts/contracts/WrittenInStone.sol/WrittenInStone.json";

const initialState = { content: "" };

function CreatePost() {
  const account = useContext(AccountContext);
  /* configure initial state to be used in the component */
  const [post, setPost] = useState(initialState);
  const [processingState, setProcessingState] = useState("not-processed");
  const { content } = post;
  const router = useRouter();

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }

  async function createNewPost() {
    if (!content) return;
    await savePost();
    router.push(`/view`);
  }

  async function savePost() {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        WrittenInStone.abi,
        signer
      );

      try {
        const tx = await contract.createPost(post.content);
        setProcessingState("processing");
        console.log("tx: ", tx);
        /* wait for transaction to be confirmed before rerouting */
        await provider.waitForTransaction(tx.hash);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function navigate() {
    router.push("/");
  }

  return (
    <div className="bg-white px-4 py-12">
      <div className="max-w-md mx-auto">
        {!account && (
          <div className="prose prose-indigo max-w-md mx-auto flex justify-center">
            <button
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              onClick={navigate}
            >
              Go to Home to Connect Wallet
            </button>
          </div>
        )}

        {account && processingState === "not-processed" && (
          <form action="#" className="relative">
            <div className="border border-gray-300 rounded-md overflow-hidden ">
              <label htmlFor="comment" className="sr-only">
                Enter your message
              </label>
              <textarea
                rows={8}
                name="content"
                id="content"
                onChange={onChange}
                className="block w-full px-3 py-3 border-0 focus:outline-none resize-none"
                placeholder="Enter your message..."
                value={post.content}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
              <div className="flex items-center space-x-5">
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={createNewPost}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Carve
                </button>
              </div>
            </div>
          </form>
        )}
        {account && processingState === "processing" && (
          <div>
            <div className="prose prose-indigo max-w-md mx-auto flex justify-center">
              <div class="relative py-4 flex justify-center text-indigo-600">
                Carving the message, please wait...
              </div>
            </div>
            <div>
              <div class="relative py-4 flex justify-center">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
