export type PostOffice = {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
};

export type PostOfficeApiResponse = {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
};
