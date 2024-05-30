type Student = {
  [key: string]: string | number | Date;
  name: string;
  fatherName: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  joiningDate: string;
};

interface StudentInterfaceForApi extends Student {
  userId: string;
}

interface StudentInterfaceForDb extends Student {
  _id: string;
  userId: string;
}
