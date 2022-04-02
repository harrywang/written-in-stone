import { useContext} from "react";
import { useRouter } from "next/router";
import { AccountContext } from "../context";

export default function Home(props) {
  const account = useContext(AccountContext);

  const router = useRouter();

  async function navigate() {
    router.push("/view");
  }

  return (
    <div>
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-16">
        <div className="max-w-7xl mx-auto pb-8 px-4 overflow-hidden sm:px-6 lg:px-8 flex justify-center">
          <span className="sr-only">Written In Stone</span>
          <img className="h-8 w-auto sm:h-10" src="stone.svg" alt="" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-indigo-600 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Written In Stone</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-md md:mt-5 md:text-lg md:max-w-3xl">
            Record Permanent Uncensorable Messages on Blockchain
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div >
              {!account && (
                <button
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  onClick={props.connect}
                >
                  Connect Wallet to Carve
                </button>
              )}
              {account && (
                  <button
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    onClick={navigate}
                  >
                    View Your Messages
                  </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
