export type ContactState = {
  ok: boolean;
  message: string;
};

export const contactInitialState: ContactState = { ok: false, message: "" };
