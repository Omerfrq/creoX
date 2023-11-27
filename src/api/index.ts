import axios from 'axios';
import {
  CakeAI,
  Customer,
  GenerationHistory,
  TapPaymentCard,
  Vendor,
} from '../types/helpers';

const AxiosErrorValidate = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    throw err.response?.data;
  } else {
    throw err;
  }
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const WELCOME_MSG_URL = process.env.NEXT_PUBLIC_PAYFORT_PAYMENT_HANDLER_API_URL;

export class Api {
  generateVerifyUserCode = async (
    emailAddress?: string,
    phoneNumber?: string,
    lang?: string
  ) => {
    try {
      const res = await axios.get(`${API_URL}/users/code/send`, {
        params: {
          emailAddress,
          phoneNumber,
          lang,
        },
      });
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  fetchVendors = async () => {
    try {
      const res = await axios.get<Vendor[]>(`${API_URL}/vendros`);
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  createOrder = async (order: any) => {
    try {
      const res = await axios.post(`${API_URL}/v2/orders`, order);

      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  fetchPaymentMethods = async (
    customerId: string
  ): Promise<TapPaymentCard[] | undefined> => {
    try {
      const res = await axios.get(`${API_URL}/users/${customerId}/payments`);
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  text2ImageV2 = async (
    payload: { keywords: string[]; category: 'TSHIRT' },
    signal?: AbortSignal
  ): Promise<CakeAI | undefined> => {
    try {
      return fetch(`${WELCOME_MSG_URL}/generate-images2`, {
        method: 'post',
        signal,
        body: JSON.stringify(payload),
      }).then((r) => r.json());
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  createUser = async (payload: {
    user: { firstName: string; phoneNumber: string; lastName: string };
  }) => {
    try {
      const res = await axios.post<Customer>(`${API_URL}/users`, payload, {
        headers: {
          Authorization:
            'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=',
        },
      });
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  createPaymentMethod = async (payload: {
    customerId?: string;
    tokenId?: string;
    cardId?: string;
    amount: number;
    redirectUrl: string;
    provider: 'TAP';
  }) => {
    try {
      const res = await axios.post(`${API_URL}/payments/third-party`, payload);
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  createUserToken = async (payload: {
    username?: string;
    grant_type?: 'password';
    password: string;
  }) => {
    try {
      const res = await axios.post<{
        access_token: string;
        token_type: 'bearer';
        refresh_token: string;
        expires_in: number;
        scope: 'read  write';
      }>(`${API_URL}/oauth/token`, payload);
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  getHistory = async (userId?: string) => {
    try {
      const res = await axios.get<{ history: GenerationHistory[] }>(
        `https://applepay.juicycarrot.co/generate-history`,
        {
          params: {
            userId,
          },
        }
      );
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };

  verifyUserCode = async (payload: { code: string; phoneNumber: string }) => {
    try {
      const res = await axios.post<{
        isNew?: boolean;
        user?: Customer;
        verified: boolean;
      }>(`${API_URL}/v2/users/code/verify`, payload);
      return res.data;
    } catch (err) {
      AxiosErrorValidate(err);
    }
  };
}

const ApiInstance = new Api();

export default ApiInstance;
