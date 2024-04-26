export interface Service {
  serviceName: string;
  serviceDescription: string;
  servicePrice: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  number: string;
  zipCode: string;
  email: string;
  cpfOrCnpj?: string;
  city: string;
  state: string;
}
