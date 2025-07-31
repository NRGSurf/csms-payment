declare module "braintree-web-drop-in" {
  export interface Dropin {
    requestPaymentMethod(): Promise<{ nonce: string }>;
    teardown(): Promise<void>;
  }

  interface DropinOptions {
    authorization: string;
    container: HTMLElement;
  }

  const dropin: {
    create(options: DropinOptions): Promise<Dropin>;
  };

  export default dropin;
}
