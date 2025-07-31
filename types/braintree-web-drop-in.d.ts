declare module "braintree-web-drop-in" {
  import { ComponentType } from "react";

  export interface Dropin {
    requestPaymentMethod(): Promise<{ nonce: string }>;
    teardown(): Promise<void>;
  }

  interface DropinOptions {
    authorization: string;
    container: HTMLElement;
  }

  export default {
    create: (options: DropinOptions) => Promise<Dropin>;
  };
}
