import React from "react";
import jsPDF from "jspdf";
import { BsDownload } from "react-icons/bs";
interface CartItem {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}
interface FormValues {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  country?: string;
  streetAddress?: string;
  streetAddress2?: string;
  townCity?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  emailAddress?: string;
  orderNotes?: string;
  shipping?: string;
  paymentMethod?: string;
}
interface Order {
  id: string;
  order: CartItem[];
  totalAmount: string;
  address: FormValues;
  date: string;
  deliverydate: string;
  estimatedDeliveryDate: string;
}

const PDF: React.FC<{ ordersData: Order }> = ({ ordersData }) => {
  const handleDownload = () => {
    const pdf = generateInvoicePDF();
    pdf.save("invoice.pdf");
  };

  const generateInvoicePDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(12);
    pdf.text("Invoice", 10, 10);

    let yOffset = 30;

    pdf.text(`Order ID: ${ordersData?.id}`, 10, yOffset);
    pdf.text(`Order ID: ${ordersData?.totalAmount}`, 10, yOffset);
    ordersData.order.forEach((item: any) => {
      pdf.text(`Product: ${item?.title}`, 10, yOffset + 10);
      pdf.text(`Price: ${item?.price}`, 10, yOffset + 20);
      pdf.text(`Quantity: ${item?.quantity}`, 10, yOffset + 30);
      yOffset += 40;
    });

        pdf.text(`Total: ${ordersData?.totalAmount}`, 10, yOffset);

   
    pdf.setFontSize(14);
    const addressYOffset = yOffset + 10; 
    pdf.text(`Billing Address:`, 10, addressYOffset);
    pdf.setFontSize(12);
    pdf.text(
      `${ordersData?.address?.firstName} ${ordersData?.address?.lastName}`,
      10,
      addressYOffset + 10
    );
    pdf.text(
      `${ordersData?.address?.streetAddress} ${ordersData?.address?.streetAddress2}`,
      10,
      addressYOffset + 20
    );
    pdf.text(
      `${ordersData?.address?.townCity}, ${ordersData?.address?.state}, ${ordersData?.address?.country}`,
      10,
      addressYOffset + 30
    );

    yOffset = addressYOffset + 40; 

    return pdf;
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 p-2 bg-black text-white font-semibold h-8 border rounded-lg hover:text-yellow-500"
      >
        <BsDownload className="text-lg" /> DOWNLOAD INVOICE
      </button>
    </div>
  );
};

export default PDF;
