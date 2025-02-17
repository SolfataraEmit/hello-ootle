import "./App.css";
import { TariConnectButton } from "./connect/TariConnectButton";
import useTariProvider from "./store/provider";
import useAccount from "./store/account";
import tariLogo from "./assets/tari.svg";
import { createCounter } from "./counter";

function App() {
  const { provider } = useTariProvider();
  const { ootleAccount, setOotleAccount } = useAccount();
  const handleOnConnected = async () => {
    await setOotleAccount();
  };
  
  const faucet_template: string = import.meta.env.VITE_FAUCET_TEMPLATE;
  const handleCreateCounter = async () => {
    if (!provider) {
      showSnackbar("Provider is not set", "error");
      return;
    }

    openBackdrop();
    try {
      console.log({counter_template});
      const result = await counter.createCounter(provider, counter_template);
      console.log({ result });
      const response = result.result as { execution_results: { indexed: { value: string}}[]};
      const componentAddress = cbor.convertCborValue(response.execution_results[0].indexed.value);
      console.log({ componentAddress });
      showSnackbar(`Token faucet "${newTokenName}" was created!`, "success");
    } catch (error) {
      console.log(error);
      showSnackbar(`Failed to create faucet "${newTokenName}"`, "error");
    }
    closeBackdrop();
}



  return (
    <>
      <div>
        <a href="https://www.tari.com/" target="_blank">
          <img src={tariLogo} className="logo tari" alt="Tari logo" />
        </a>
      </div>
      <h1>Hello Tari Ootle</h1>
      <TariConnectButton onConnected={handleOnConnected} />
      <div style={{ paddingLeft: "10px" }}>
        {`Provider: ${
          provider?.isConnected() ? provider.providerName : "not connected"
        }`}
      </div>
      <div style={{ paddingLeft: "10px" }}>
        {`Account: ${ootleAccount ? ootleAccount?.address : "not found"}`}
      </div>
    </>
  );
}

export default App;
