export interface Customer {
  id: string;
  createdDate: Date;
  name: string;
  phoneNumber: string;
  language: string;
  region: string;
  timeZone: string;
  lastActiveDate: Date;
  emailAddress?: string;
  roles: string[];
  stores: any[];
  superAdmin: boolean;
  operator: boolean;
  admin: boolean;
  birthday: boolean;
  fullName: string;
  guest: boolean;
  formattedPhoneNumber: string;
  isActive: boolean;
  isBlocked: boolean;
  isHidden: boolean;
  mixpanelIdentified: boolean;
}

export interface TapPaymentCard {
  userId: string;
  createdDate: string;
  thirdPartyTokenOrCardId: string;
  provider: string;
  lastDigits: string;
  method: string;
  expMo: string;
  expYr: string;
  ccv: any;
  hashKeyValue: string;
}

export interface GenerationHistory {
  category: string;
  id: string;
  revisedPrompt: string;
  type: 'IMAGE';
  url: string;
  userPrompt: string;
}

export type CakeDesign = 0 | 1 | 2 | 3;

export interface CakeAIData {
  category: string;
  prompt: string;
  design: CakeDesign;
}

export interface CakeAI {
  imageUrls: string[];
}

export interface Label {
  [index: string]: string;
}

interface Social {
  facebook: string;
  instagram: string;
  shareImage: string;
}

interface Storebackground {
  url: string;
  type: string;
  thumbnail: string;
}

export interface Currency {
  value: string;
  isPostLabel: boolean;
}

export interface PreviousWork {
  type: 'VIDEO' | 'PHOTO';
  url: string;
}

type DesignComplexity =
  | { [key: string]: number | undefined | null }
  | {
      minPrice?: number;
      maxPrice?: number;
      value?: CakeDesign;
    };

type DesignComplexityType = {
  basic: DesignComplexity;
  good: DesignComplexity;
  amazing: DesignComplexity;
  royal: DesignComplexity;
};

export type PaymentMethod =
  | 'ONLINE'
  | 'APPLE_PAY'
  | 'VISA'
  | 'MADA'
  | 'MASTERCARD'
  | 'AMERICAN_EXPRESS'
  | 'PAY_AT_STORE'
  | 'CASH'
  | 'UNKNOWN';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Vendor {
  name: Label;
  merchant?: string;
  menu?: string;
  id: string;
  about?: Label;
  mainStoreId: string;
  isRecommendationEnabled?: boolean;
  isWaiterAIEnabled?: boolean;
  isItemTaglineRecommendationsEnabled?: boolean;
  createdDate: Date;
  social?: Social;
  background: Storebackground;
  lastUpdated: Date;
  businessName: Label;
  businessLogo: string;
  country?: string;
  timezone?: string;
  currency?: Currency;
  accountId: string;
  textToSpeechLangCode?: string;
  previousCateringWork: PreviousWork[];
  designComplexity?: DesignComplexityType[];
}
