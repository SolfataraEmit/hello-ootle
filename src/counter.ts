import { TariProvider, TransactionBuilder } from "@tari-project/tarijs";
import * as wallet from "./wallet.ts";

export async function createCounter(
    provider: TariProvider,
    counterTemplate: string,
  ) {
    console.log("Getting account");
    const account = await provider.getAccount();
    console.log("here2");
    const builder = new TransactionBuilder().callFunction(
      {
        templateAddress: counterTemplate,
        functionName: "new",
      },
      []
    );
    console.log("here3");
    const result = await wallet.submitTransactionAndWaitForResult({
      provider,
      account,
      builder,
      requiredSubstates: [{ substate_id: account.address }],
    });
    console.log("here4");
    return result;
  }

  export async function callIncrease( //Necessary function (rick)
  provider: TariProvider,
  counterComponent: string,
) {
  const account = await provider.getAccount();
  const builder = new TransactionBuilder().callMethod(
    {
      componentAddress: counterComponent,
      methodName: "increase",
    },
    [] //pass the parameters
  );
  
  const result = await wallet.submitTransactionAndWaitForResult({
    provider,
    account,
    builder,
    requiredSubstates: [
      { substate_id: account.address },
      { substate_id: counterComponent },
    ],
  });
  return result;
}