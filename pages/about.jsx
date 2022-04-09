export default function About() {
    return (
      <div className="mx-auto max-w-lg justify relative py-12 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="prose prose-indigo  mx-auto">
            <p className="prose prose-indigo text-gray-500 leading-8">
              This is a simple product out of my learning journey of Web3. 
              A special shout-out to <a href="https://twitter.com/dabit3">Nader Dabit</a> for his great <a href="https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13">Web3 tutorials</a>, 
              which helped me a lot and inspired this product.
            </p>

            <p className="prose prose-indigo text-gray-500 leading-8">
              This project is fully <a href="https://github.com/harrywang/written-in-stone">open-sourced</a>. You can read the documentations <a href="http://harrywang.me/written-in-stone/">here</a>.
            </p>

            <p className="prose prose-indigo text-gray-500 leading-8">
              The contract is deployed on <a href="https://polygonscan.com/address/0xa8578e0e64bbf0c27bf8a0dd3211889d34c31faf">Polygon</a>. You need to connect to the Polygon Mainnet and buy some MATIC to pay the gas fee to record your messages, which is about $0.01 per message when MATIC is ~$1.7 (<a href="https://medium.com/prepo/setting-up-metamask-and-getting-eth-matic-on-polygon-step-by-step-guide-fd55147a0f05">how-to</a>). 
            </p>
          </div>
        </div>
      </div>
    )
  }
  