export interface Content {
    content: Invoice[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    sort: Sort;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  }
  export interface Invoice {
    id: string;
    number: string;
    status: string;
    errors: String[];
    createdDate:Date;
    lastModifiedDate:Date;
    dueDate: string;
    invoiceDate: string;
    subtotal: number;
    discount: number;
    total: number;
    currency: string;
    image: Image;
    vendor: Vendor;
    lines: Line[];
    vat: number;
  }

  export interface Image {
    type: number;
    data: string;
  }

  export interface Vendor {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    vatNumber: string;
  }
  export interface Line {
    id: string;
    description: string;
    unitPrice: number;
    quantity: number;
    vat: number;
    amount: number;
  }
  export interface Pageable {
    sort: Sort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }
  export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }
  
  export interface Statistics {
    count:number;
    currentMonth:Month;
    beforeCurrentMonth1:Month;
    beforeCurrentMonth2:Month;
    totalPrice:number;
  }

  export interface Month{
    total:number;
    totalPrice:number;
  }

  export interface Login {
    username: string;
    password: string;
  }

  export interface UserTokenDTO {
    id: string;
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    enabled: boolean;
    token: TokenDto;
  }

  export interface TokenDto {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  }

  export interface Tenant {
    name: string;
    country: string;
    maxEmployees: number;
  }

  export interface TenantRegister {
    name: string;
    country: string;
    maxEmployees: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    customerId?: string;
    subscriptionId?: string;
    plan?: string;
    stripeToken?: string;
  }

  export interface UserAdmin {
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    enabled: boolean;
    authorities: Array<AuthorityUser>;
  }

  export interface Authority{
    username:string;
    authorities: Array<String>;
  }

  export interface FTP{
    username: string;
    password: string;
    port:number;
    host: string;
    folder: string;
  }

  export interface User {
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    authorities: Array<AuthorityUser>;
  }

  export interface AuthorityUser{
    authority: String;
  }

  export interface UserInfoChanger {
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    authorities: Array<AuthorityUser>;
  }

  export interface RegisterUser {
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    password: string;
    authorities: Array<AuthorityUser>;
  }