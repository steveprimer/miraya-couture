import { Product } from "@/types";
import { PRODUCTS } from "./products";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Refunded";
  shippingAddress: {
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

export interface AdminCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  status: "Active" | "Archived";
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  city: string;
}

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "MRY-9842",
    customerName: "Ananya Birla",
    customerEmail: "ananya.birla@luxury.in",
    customerPhone: "+91 98201 54321",
    items: [
      {
        productId: "greta-pants-set",
        productName: "Greta Pants set",
        size: "S",
        quantity: 1,
        price: 325000,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    totalAmount: 325000,
    status: "Delivered",
    paymentStatus: "Paid",
    shippingAddress: {
      addressLine: "74 Altamount Road, Cumballa Hill",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400026",
      country: "India",
    },
    createdAt: "2026-08-18T14:32:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "MRY-9841",
    customerName: "Natasha Poonawalla",
    customerEmail: "natasha.p@serum.in",
    customerPhone: "+91 98111 22334",
    items: [
      {
        productId: "esme-lehenga-set",
        productName: "Esme Lehenga Set",
        size: "M",
        quantity: 1,
        price: 575000,
        image: "/images/esme_lehenga.jpg",
      },
    ],
    totalAmount: 575000,
    status: "Processing",
    paymentStatus: "Paid",
    shippingAddress: {
      addressLine: "Villa Bella, Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      postalCode: "411001",
      country: "India",
    },
    createdAt: "2026-08-17T09:15:00Z",
  },
  {
    id: "ord-3",
    orderNumber: "MRY-9840",
    customerName: "Rhea Kapoor",
    customerEmail: "rhea.kapoor@studios.in",
    customerPhone: "+91 98200 99887",
    items: [
      {
        productId: "emma-lehenga-set",
        productName: "Emma Lehenga Set",
        size: "Customize",
        quantity: 1,
        price: 495000,
        image: "/images/emma_runway.jpg",
      },
    ],
    totalAmount: 495000,
    status: "Shipped",
    paymentStatus: "Paid",
    shippingAddress: {
      addressLine: "Juhu Tara Road",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400049",
      country: "India",
    },
    createdAt: "2026-08-15T11:45:00Z",
  },
  {
    id: "ord-4",
    orderNumber: "MRY-9839",
    customerName: "Radhika Merchant",
    customerEmail: "radhika.m@encore.in",
    customerPhone: "+91 98333 44556",
    items: [
      {
        productId: "aurelia-gown",
        productName: "Aurelia Gown",
        size: "S",
        quantity: 1,
        price: 245000,
        image: "/images/aurelia_gown.webp",
      },
    ],
    totalAmount: 245000,
    status: "Pending",
    paymentStatus: "Pending",
    shippingAddress: {
      addressLine: "Antilia, Altamount Road",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400026",
      country: "India",
    },
    createdAt: "2026-08-19T16:20:00Z",
  },
  {
    id: "ord-5",
    orderNumber: "MRY-9838",
    customerName: "Tara Sutaria",
    customerEmail: "tara.sutaria@talents.in",
    customerPhone: "+91 98450 12345",
    items: [
      {
        productId: "amelia-lehenga-set",
        productName: "Amelia Lehenga Set",
        size: "S",
        quantity: 1,
        price: 465000,
        image: "/images/amelia_lehenga.jpg",
      },
    ],
    totalAmount: 465000,
    status: "Delivered",
    paymentStatus: "Paid",
    shippingAddress: {
      addressLine: "Pali Hill, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400050",
      country: "India",
    },
    createdAt: "2026-08-12T13:10:00Z",
  },
];

export const INITIAL_COLLECTIONS: AdminCollection[] = [
  {
    id: "col-1",
    name: "Reframed Collection",
    slug: "reframed",
    description: "Architectural silhouettes meeting timeless zardozi motifs and rich silk organza.",
    image: "/images/hero_reframed.jpg",
    productCount: 5,
    status: "Active",
    createdAt: "2026-08-01T00:00:00Z",
  },
  {
    id: "col-2",
    name: "Capsule Collection",
    slug: "capsule",
    description: "Curated statement couture exploring embroidery as a language and record.",
    image: "/images/esme_lehenga.jpg",
    productCount: 3,
    status: "Active",
    createdAt: "2026-07-15T00:00:00Z",
  },
  {
    id: "col-3",
    name: "From The Runway",
    slug: "runway",
    description: "Resonance couture showcase blending botanical forms and urban architecture.",
    image: "/images/runway_atmosphere.jpg",
    productCount: 3,
    status: "Active",
    createdAt: "2026-08-10T00:00:00Z",
  },
  {
    id: "col-4",
    name: "Everblooming Embroidery",
    slug: "everblooming",
    description: "Ethereal pastel lehengas with multi-dimensional hand-embroidered flowers.",
    image: "/images/edel_lehenga.jpg",
    productCount: 5,
    status: "Active",
    createdAt: "2026-06-20T00:00:00Z",
  },
  {
    id: "col-5",
    name: "A Wildscape Installation",
    slug: "wildscape",
    description: "The Banjara Hills design exhibition marrying set design and modern couture.",
    image: "/images/aurelia_gown.webp",
    productCount: 2,
    status: "Active",
    createdAt: "2026-05-10T00:00:00Z",
  },
];

export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Ananya Birla",
    email: "ananya.birla@luxury.in",
    phone: "+91 98201 54321",
    totalOrders: 3,
    totalSpent: 1250000,
    lastOrderDate: "2026-08-18",
    city: "Mumbai",
  },
  {
    id: "cust-2",
    name: "Natasha Poonawalla",
    email: "natasha.p@serum.in",
    phone: "+91 98111 22334",
    totalOrders: 5,
    totalSpent: 2890000,
    lastOrderDate: "2026-08-17",
    city: "Pune",
  },
  {
    id: "cust-3",
    name: "Rhea Kapoor",
    email: "rhea.kapoor@studios.in",
    phone: "+91 98200 99887",
    totalOrders: 2,
    totalSpent: 960000,
    lastOrderDate: "2026-08-15",
    city: "Mumbai",
  },
  {
    id: "cust-4",
    name: "Radhika Merchant",
    email: "radhika.m@encore.in",
    phone: "+91 98333 44556",
    totalOrders: 4,
    totalSpent: 1840000,
    lastOrderDate: "2026-08-19",
    city: "Mumbai",
  },
  {
    id: "cust-5",
    name: "Tara Sutaria",
    email: "tara.sutaria@talents.in",
    phone: "+91 98450 12345",
    totalOrders: 2,
    totalSpent: 890000,
    lastOrderDate: "2026-08-12",
    city: "Mumbai",
  },
];
