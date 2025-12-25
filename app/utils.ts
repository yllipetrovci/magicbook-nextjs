export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function cleanBase64(dataUrl: string): string {
    return dataUrl.replace(/^data:(image\/\w+);base64,/, "");
}


export function convertAmountFromLowestUnit(amount: string, currency: string) {
  switch (currency) {
    case 'JPY':
    case 'KRW':
      return parseFloat(amount);
    default:
      return parseFloat(amount) / 100;
  }
}

export function parseMoney(amount: string = '0', currency: string = 'USD') {
  const parsedAmount = convertAmountFromLowestUnit(amount, currency);
  return formatMoney(parsedAmount, currency);
}

export function formatMoney(amount: number = 0, currency: string = 'USD') {
  const language = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  return new Intl.NumberFormat(language ?? 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function parseBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }

  if (typeof value === "number") {
    return value === 1;
  }

  return false;
}



// 



import { CheckoutEventsTimePeriod } from '@paddle/paddle-js';

export function parseSDKResponse<T>(response: T): T {
  return JSON.parse(JSON.stringify(response));
}

export const ErrorMessage = 'Something went wrong, please try again later';

export function getErrorMessage() {
  return { error: ErrorMessage, data: [], hasMore: false, totalRecords: 0 };
}

export function getPaymentReason(origin: string) {
  if (origin === 'web' || origin === 'subscription_charge') {
    return 'New';
  } else {
    return 'Renewal of ';
  }
}

const BillingCycleMap = {
  day: 'daily',
  week: 'weekly',
  month: 'monthly',
  year: 'yearly',
};

const CustomBillingCycleMap = {
  day: 'days',
  week: 'weeks',
  month: 'months',
  year: 'years',
};

export function formatBillingCycle({ frequency, interval }: CheckoutEventsTimePeriod) {
  if (frequency === 1) {
    return BillingCycleMap[interval];
  } else {
    return `every ${frequency} ${CustomBillingCycleMap[interval]}`;
  }
}


