import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';
import { ToWords } from 'to-words';

const toWords = new ToWords();

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  pageBorder: {
    border: '1px solid black',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyDetails: {
    fontSize: 9,
  },
  invoiceTitleContainer: {
    justifyContent: 'center',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    paddingVertical: 5,
  },
  detailsColumnLeft: {
    flex: 1,
    paddingRight: 10,
    borderRight: '1px solid black',
  },
  detailsColumnRight: {
    flex: 1,
    paddingLeft: 10,
  },
  detailsText: {
    marginBottom: 2,
  },
  billTo: {
    marginVertical: 10,
  },
  billToTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  billToName: {
    fontSize: 10,
  },
  billToGST: {
    fontSize: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    borderBottom: '1px solid black',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottom: '1px solid #ddd',
  },
  tableColSN: {
    width: '4%',
    textAlign: 'center',
  },
  tableColDesc: {
    width: '22%',
  },
  tableCol: {
    width: '10%',
    textAlign: 'center',
  },
  tableColTax: {
    width: '8%',
    textAlign: 'center',
  },
  footerBlock: {
    flexDirection: 'row',
    marginTop: 10,
    borderTop: '1px solid black',
    paddingTop: 10,
  },
  footerLeft: {
    flex: 2,
    paddingRight: 10,
  },
  footerRight: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  footerTitle: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  footerText: {
    marginBottom: 3,
  },
  totalDueText: {
    fontSize: 10,
    marginBottom: 4,
  },
  amountDue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signatureBlock: {
    marginTop: 10,
    alignItems: 'center',
  },
  signatureImage: {
    width: 80,
    height: 40,
    marginVertical: 5,
  },
  signatureText: {
    fontSize: 9,
    marginTop: 3,
  },
  termsBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1px solid black',
  },
});

export const InvoicePDF = ({ data }) => {
  console.log("rrr:",data)
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  let totalCost = 0;
  let totalCGST = 0;
  let totalSGST = 0;

  const cgstRate = data.cgstPercentage/100;
  const sgstRate = data.scstPercentage/100;

  data.productDetails?.forEach(item => {
    totalCost += item.totalCost;
    totalCGST += item.totalCost * cgstRate;
    totalSGST += item.totalCost * sgstRate;
  });
  const totalAmount = (parseInt(totalCost) + parseInt(totalCGST) + parseInt(totalSGST))
  const accountDetails = data.branchDetails?.accounts?.find(
    (account) => {
      console.log("ttt :", Number(account.id) + " === " + Number(data.accountId))
      return (Number(account.id) === Number(data.accountId))
    }
  ) || {};


  return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.pageBorder}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image src="/logo.png" style={styles.logo} />
                <View>
                  <Text style={styles.companyName}>SHARON TELEMATICS PRIVATE LIMITED</Text>
                  <Text style={styles.companyDetails}>Company ID: {data.branchDetails.CIN}</Text>
                  <Text style={styles.companyDetails}>{data.branchDetails.address}</Text>
                  <Text style={styles.companyDetails}>{data.branchDetails.addressLine2}</Text>
                  <Text style={styles.companyDetails}>{data.branchDetails.branchAddress}</Text>
                  <Text style={styles.companyDetails}>GSTIN: {data.branchDetails.GST}</Text>
                </View>
              </View>
    
              <View style={styles.invoiceTitleContainer}>
                <Text style={styles.invoiceTitle}>Invoice</Text>
              </View>
            </View>
    
            {/* Details Row */}
            <View style={styles.detailsRow}>
              <View style={styles.detailsColumnLeft}>
                <Text style={styles.detailsText}>Invoice No.: {data.invoiceId}</Text>
                <Text style={styles.detailsText}>Pro Forma Invoice Date: {formatDate(data.estimateDate)}</Text>
              </View>
              <View style={styles.detailsColumnRight}>
                <Text style={styles.detailsText}>Place of Supply: {data.shippingAddress}</Text>
              </View>
            </View>
    
            {/* Bill To */}
            <View style={styles.billTo}>
              <Text style={styles.billToTitle}>Bill To</Text>
              <Text style={styles.billToName}>{data.clientName}</Text>
              <Text style={styles.billToGST}>{data.clientGST}</Text>
            </View>
    
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableColSN}>#</Text>
              <Text style={styles.tableColDesc}>Item & Description</Text>
              <Text style={styles.tableCol}>HSN/SAC</Text>
              <Text style={styles.tableCol}>Qty</Text>
              <Text style={styles.tableCol}>Rate</Text>
              <Text style={styles.tableColTax}>CGST%</Text>
              <Text style={styles.tableColTax}>CGST Amt</Text>
              <Text style={styles.tableColTax}>SGST%</Text>
              <Text style={styles.tableColTax}>SGST Amt</Text>
              <Text style={styles.tableCol}>Amount</Text>
            </View>
    
            {/* Table Rows */}
            {data?.productDetails?.map((item, index) => {
              const cgst = (item.totalCost * parseFloat(data.cgstPercentage)) / 100;
              const sgst = (item.totalCost * parseFloat(data.scstPercentage)) / 100;
              const total = item.totalCost + cgst + sgst;
    
              return (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableColSN}>{index + 1}</Text>
                  <Text style={styles.tableColDesc}>{item.productName}{"\n"}{item.description}</Text>
                  <Text style={styles.tableCol}>{item.hsnCode}</Text>
                  <Text style={styles.tableCol}>{item.quantity}</Text>
                  <Text style={styles.tableCol}>{item.costPerUnit}</Text>
                  <Text style={styles.tableColTax}>{data.cgstPercentage}%</Text>
                  <Text style={styles.tableColTax}>{cgst.toFixed(2)}</Text>
                  <Text style={styles.tableColTax}>{data.scstPercentage}%</Text>
                  <Text style={styles.tableColTax}>{sgst.toFixed(2)}</Text>
                  <Text style={styles.tableCol}>{total.toFixed(2)}</Text>
                </View>
              );
            })}
    
            {/* Totals Row */}
            <View style={styles.tableRow}>
              <Text style={styles.tableColSN}></Text>
              <Text style={styles.tableColDesc}>Totals</Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}>{data.quantity}</Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableColTax}>{data.cgstPercentage}%</Text>
              <Text style={styles.tableColTax}>
                {(data.totalAmount * parseFloat(data.cgstPercentage) / 100).toFixed(2)}
              </Text>
              <Text style={styles.tableColTax}>{data.scstPercentage}%</Text>
              <Text style={styles.tableColTax}>
                {(data.totalAmount * parseFloat(data.scstPercentage) / 100).toFixed(2)}
              </Text>
              <Text style={styles.tableCol}>{totalAmount.toFixed(2)}</Text>
            </View>
    
            {/* Total in Words + Bank Details */}
            <View style={styles.footerBlock}>
              <View style={styles.footerLeft}>
                <Text style={styles.footerTitle}>Total In Words</Text>
                <Text style={styles.footerText}>
                {toWords.convert(totalAmount, { currency: false })}
                </Text>
    
                <Text style={styles.footerTitle}>Notes</Text>
                <Text style={styles.footerText}>Looking forward</Text>
    
                <Text style={styles.footerTitle}>Bank Details:</Text>
                <Text style={styles.footerText}>
                  Payment To: Sharon Telematics Pvt Ltd., Visakhapatnam
                </Text>
                <Text style={styles.footerText}>
                  Payment Mode: By Cash / NEFT / RTGS / Cheque
                </Text>
                <Text style={styles.footerText}>
                  A/c No: {accountDetails?.accountNumber || 'N/A'}
                </Text>
                <Text style={styles.footerText}>
                  Bank: {accountDetails?.name || 'N/A'}, {accountDetails?.address || 'N/A'}
                </Text>
                <Text style={styles.footerText}>
                  IFSC: {accountDetails?.ifscCode || 'N/A'}
                </Text>
              </View>
    
              <View style={styles.footerRight}>
                <Text style={styles.totalDueText}>Total: {totalAmount.toFixed(2)} Rs</Text>
                <Text style={styles.amountDue}>Amount Due: {totalAmount.toFixed(2)} RS</Text>
    
                <View style={styles.signatureBlock}>
                  <Text>For SHARON TELEMATICS PVT LTD</Text>
                  <Image src="/signature.png" style={styles.signatureImage} />
                  <Text style={styles.signatureText}>Authorised Signatory</Text>
                </View>
              </View>
            </View>
    
            {/* Terms */}
            <View style={styles.termsBlock}>
              <Text style={styles.footerTitle}>Terms & Conditions</Text>
              <Text style={styles.footerText}>{data.description}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
    };
