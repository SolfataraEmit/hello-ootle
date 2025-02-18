import "./App.css";
import { TariConnectButton } from "./connect/TariConnectButton";
import useTariProvider from "./store/provider";
import useAccount from "./store/account";
import tariLogo from "./assets/tari.svg";
import { createCounter, callIncrease } from "./counter";
import { useState } from "react";

function App() {
  const { provider } = useTariProvider();
  const { ootleAccount, setOotleAccount } = useAccount();
  const [counterComponent, setCounterComponent] = useState<string | null>(null);

  const handleOnConnected = async () => {
    await setOotleAccount();
  };

  const counter_template: string = import.meta.env.VITE_COUNTER_TEMPLATE;

  const handleCreateCounter = async () => {
    if (!provider) {
      console.error("Provider is not set");
      return;
    }

    console.log("here");
    try {
      const result = await createCounter(provider, counter_template);
      console.log(result);
      const componentAddress = result.componentAddress; // Adjust based on actual result structure
     setCounterComponent(componentAddress);
     console.log(`Counter created at: ${componentAddress}`);
    } catch (error) {
      console.error("Failed to create counter", error);
    }
  };

  const handleIncreaseCounter = async () => {
    if (!provider || !counterComponent) {
      console.error("Provider or counter component is not set");
      return;
    }

    try {
      const result = await callIncrease(provider, counterComponent);
      console.log("Counter increased", result);
    } catch (error) {
      console.error("Failed to increase counter", error);
    }
  };

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
      <div style={{ paddingLeft: "10px" }}>
        <button onClick={handleCreateCounter}>Create Counter</button>
        <button onClick={handleIncreaseCounter} disabled={!counterComponent}>
          Increase Counter
        </button>
        <b>{counterComponent}</b>
      </div>
    </>
  );
}

export default App;

/* import "./App.css";
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
 */