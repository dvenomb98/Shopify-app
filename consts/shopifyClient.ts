import Client from 'shopify-buy';

export const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_KEY!,
  apiVersion: "2023-01"
});


export const parseShopifyResponse = (response: any) =>  JSON.parse(JSON.stringify(response));


