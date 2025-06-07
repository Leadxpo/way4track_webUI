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

const estStyles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,

    fontFamily: 'Helvetica',
    border: '1px solid black',
  },
  pageBorder: {
    border: '1px solid black',
    padding: 10,
    // height: '80%',
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 10,
    marginLeft: -10,
    marginRight: -10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  logo: {
    width: 150,
    height: 50,
    marginRight: 10,
  },
  companyName: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  companyNameBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  companyDetails: {
    fontSize: 8,
    marginTop: 5,
  },
  quotationContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  quotationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottom: '1px solid black',
    marginLeft: -10,
    marginRight: -10,
  },
  detailsColumn: {
    width: '50%',
    paddingRight: 10,
    marginTop: -10,
  },
  detailsTextBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 10,
  },
  detailsText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    width: '50%',
    textAlign: 'left',
  },
  detailsTextBold: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    width: '50%',
    textAlign: 'left',
    paddingLeft: 10,
  },
  billToBlock: {
    borderBottom: '1px solid black',
    marginLeft: -10,
    marginRight: -10,
  },
  billToText1: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    paddingTop: 2,
    paddingLeft: 5,
    backgroundColor: '#ddd',
    borderBottom: '1px solid black',
  },
  billToText2: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginTop: 5,
    marginBottom: 2,
    paddingLeft: 5,
  },
  billToText3: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    marginTop: 2,
    marginBottom: 5,
    paddingLeft: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  value: {
    textAlign: 'right',
  },
  tableBlock: {
    marginLeft: -10,
    marginRight: -10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
    borderBottom: '1px solid black',
  },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderBottom: '1px solid black',
  },
  tableRowText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    flex: 1,
    textAlign: 'center',
    color: 'black',
    borderRight: '1px solid black',
    marginTop: -10,
    marginBottom: -10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tableRowAmtText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    flex: 1,
    textAlign: 'center',
    color: 'black',
    marginTop: -10,
    marginBottom: -10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  serialNumberColumn: {
    flex: 0.5,
  },
  secondColumn: {
    flex: 2,
  },
  otherColumns: {
    flex: 1,
  },
  subColumnContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  subColumnHeader: {
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    paddingBottom: 2,
  },
  subColumnTextContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  subColumnTextItem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
    marginTop: -10,
    marginBottom: -10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  subColumnTextRowItem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
    marginTop: -10,
    marginBottom: -10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRight: '1px solid black',
  },
  totalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: -2,
    padding: 5,
  },
  totalBlockLeft: {
    flex: 1,paddingBottom:20
  },
  totalBlockLeftText1: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  totalBlockLeftText2: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    paddingTop: 5,
    marginBottom: 5,
  },
  totalBlockLeftText3: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    fontStyle: 'italic',
  },
  totalBlockRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderLeft: '2px solid black',
    // borderBottom: '1px solid black',
    paddingLeft: 10,
  },

  totalBlockRightText: {
    marginTop:10,
    fontSize: 10,
    fontFamily: 'Helvetica',
    width: '50%',
    textAlign: 'right',
  },
  totalBlockRightTextBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    width: '50%',
    textAlign: 'right',
    marginTop:10
  },
  signatureBlock: {
    marginTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  signatureText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  signatureTextBottom: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    marginTop: 20,
  },
  amountBlock: {
    borderBottom: '1px solid black',
    marginLeft: -10,
    marginRight: -15,
    paddingRight: 10,
  },
});

export const InvoicePDF = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();
    console.log("rrr :", data)
    return `${day}-${month}-${year}`;
  };
  const accountDetails = data.branchDetails?.accounts?.find(
    (account) => {
      console.log("ttt :", Number(account.id) + " === " + Number(data.accountId))
      return (Number(account.id) === Number(data.accountId))
    }
  ) || {};


  return (
    <Document>
      <Page size="A4" style={estStyles.page}>
        <View style={estStyles.pageBorder}>
          {/* Header */}
          <View style={estStyles.header}>
            {/* Left Section: Logo and Company Details */}
            <View style={estStyles.logoContainer}>
              <Image src="/logo.png" style={estStyles.logo} />
              <View>
                <Text style={estStyles.companyNameBold}>
                  SHARON TELEMATICS PRIVATE LIMITED
                </Text>
                <Text style={estStyles.companyDetails}>
                  Company ID: {data.branchDetails.CIN}
                </Text>
                <Text style={estStyles.companyDetails}>
                  {data.branchDetails.addressLine1}
                </Text>
                <Text style={estStyles.companyDetails}>
                  {data.branchDetails.addressLine2}
                </Text>
                <Text style={estStyles.companyDetails}>
                  {data.branchDetails.branchAddress}
                </Text>
                {/* <Text style={estStyles.companyDetails}>India</Text> */}
                <Text style={estStyles.companyDetails}>
                  GSTIN: {data.branchDetails.GST}
                </Text>
              </View>
            </View>

            {/* Right Section: Quotation */}
            <View style={estStyles.quotationContainer}>
              <Text style={estStyles.quotationTitle}>Invoice</Text>
            </View>
          </View>

          {/* Details Row */}
          <View style={estStyles.detailsRow}>
            <View
              style={{
                borderRight: '1px solid black',
                ...estStyles.detailsColumn,
              }}>
              <View style={estStyles.detailsTextBlock}>
                <Text style={estStyles.detailsText}>
                  Pro Forma Invoice Date
                </Text>
                <Text style={estStyles.detailsTextBold}>
                  :{formatDate(data.estimateDate)}
                </Text>
              </View>
            </View>
            <View style={estStyles.detailsColumn}>
              <View style={estStyles.detailsTextBlock}>
                <Text style={estStyles.detailsText}>Place of Supply</Text>
                <Text style={estStyles.detailsTextBold}>
                  :{data.shippingAddress}
                </Text>
              </View>
            </View>
          </View>

          <View style={estStyles.billToBlock}>
            <Text style={estStyles.billToText1}>Bill To</Text>
            <Text style={estStyles.billToText2}>{data.clientName}</Text>
            <Text style={estStyles.billToText3}>{data.clientGST}</Text>
          </View>

          <View style={estStyles.tableBlock}>
            {/* Table Header */}
            <View style={estStyles.tableHeader}>
              <Text
                style={[
                  estStyles.tableHeaderText,
                  estStyles.serialNumberColumn,
                ]}
              >
                #
              </Text>
              <Text style={[estStyles.tableHeaderText, estStyles.secondColumn]}>
                Item & Description
              </Text>
              <Text style={estStyles.tableHeaderText}>HSN/SAC</Text>
              <Text style={estStyles.tableHeaderText}>Qty</Text>
              <Text style={estStyles.tableHeaderText}>Rate</Text>
              <View style={estStyles.subColumnContainer}>
                <Text style={estStyles.subColumnHeader}>CGST</Text>
                <View style={estStyles.subColumnTextContainer}>
                  <Text style={estStyles.subColumnTextItem}>%</Text>
                  <Text style={estStyles.subColumnTextItem}>Amt</Text>
                </View>
              </View>
              <View style={estStyles.subColumnContainer}>
                <Text style={estStyles.subColumnHeader}>SGST</Text>
                <View style={estStyles.subColumnTextContainer}>
                  <Text style={estStyles.subColumnTextItem}>%</Text>
                  <Text style={estStyles.subColumnTextItem}>Amt</Text>
                </View>
              </View>
              <Text style={estStyles.tableHeaderText}>Amount</Text>
            </View>

            {/* Table Rows */}
            {data &&
              data.productDetails &&
              data.productDetails.map((row, index) => (
                <View style={estStyles.tableRow} key={index}>
                  <Text
                    style={[
                      estStyles.tableRowText,
                      estStyles.serialNumberColumn,
                    ]}
                  >
                    {index + 1}
                  </Text>
                  <Text
                    style={[estStyles.tableRowText, estStyles.secondColumn]}
                  >
                    {row.productName}1
                  </Text>
                  <Text style={estStyles.tableRowText}>{row.hsnCode}</Text>
                  <Text style={estStyles.tableRowText}>{row.quantity}</Text>
                  <Text style={estStyles.tableRowText}>{row.costPerUnit}</Text>
                  <View style={estStyles.subColumnTextContainer}>
                    <Text style={estStyles.subColumnTextRowItem}>{data.cgstPercentage}%</Text>
                    <Text style={estStyles.subColumnTextRowItem}>
                      {row.totalCost *(parseInt(data.cgstPercentage)/100)}
                    </Text>
                  </View>
                  <View style={estStyles.subColumnTextContainer}>
                    <Text style={estStyles.subColumnTextRowItem}>{data.scstPercentage}%</Text>
                    <Text style={estStyles.subColumnTextRowItem}>
                      {row.totalCost *(parseInt(data.scstPercentage)/100)}
                    </Text>
                  </View>
                  <Text style={estStyles.tableRowAmtText}>
                    {(
                      row.totalCost +
                      (row.totalCost *(parseInt(data.cgstPercentage)/100)) +
                      (row.totalCost *(parseInt(data.scstPercentage)/100))
                    ).toFixed(2)}
                  </Text>
                </View>
              ))}
          </View>

          <View style={estStyles.totalBlock}>
            {/* Left Side: Totals and Bank Details */}
            <View style={estStyles.totalBlockLeft}>
              <Text style={estStyles.totalBlockLeftText1}>
                Items in Total {data.quantity}
              </Text>
              <Text style={estStyles.totalBlockLeftText2}>Total In Words</Text>
              <Text style={estStyles.totalBlockLeftText3}>
                {toWords.convert(data.totalAmount+(data.totalAmount *(parseInt(data.cgstPercentage)/100) )+
                     ( data.totalAmount * (parseInt(data.cgstPercentage)/100)) || 0, { currency: false })}
              </Text>
              <Text style={estStyles.totalBlockLeftText2}>Notes</Text>
              <Text style={estStyles.totalBlockLeftText2}>Looking forward</Text>
              <Text style={estStyles.totalBlockLeftText2}></Text>
              <Text style={estStyles.totalBlockLeftText1}>Bank Details:</Text>
              <Text style={estStyles.totalBlockLeftText1}>
                Payment To: Sharon Telematics Pvt Ltd., Visakhapatnam
              </Text>
              <Text style={estStyles.totalBlockLeftText1}>
                Payment Mode: By Cash / NEFT / RTGS / Cheque
              </Text>
              <Text style={estStyles.totalBlockLeftText1}>
                A/c No:{' '}
                {accountDetails?.accountNumber || 'Account Number Unavailable'}
              </Text>
              <Text style={estStyles.totalBlockLeftText1}>
                Bank: {accountDetails.name || 'Account Name Unavailable'}.,{' '}
                {accountDetails.address || 'Account Address Unavailable'}
              </Text>
              <Text style={estStyles.totalBlockLeftText1}>
                IFSC: {accountDetails.ifscCode || 'Account IFSC Unavailable'}
              </Text>
            </View>

            {/* Right Side: Signature and Totals */} 
            <View style={estStyles.totalBlockRight}>
              <Text style={estStyles.totalBlockRightText}>
                Total {data.totalAmount+(data.totalAmount *(parseInt(data.cgstPercentage)/100) )+
                     ( data.totalAmount * (parseInt(data.cgstPercentage)/100))||0}
              </Text>
              <Text style={estStyles.totalBlockRightTextBold}>
                Amount Due {data.totalAmount+(data.totalAmount *(parseInt(data.cgstPercentage)/100) )+
                     ( data.totalAmount * (parseInt(data.cgstPercentage)/100))||0}
              </Text>
              <View style={estStyles.signatureBlock}>
                <Text style={estStyles.signatureText}>
                  For SHARON TELEMATICS PVT LTD
                </Text>
                <Image src="/signature.png" style={{
                  alignSelf: 'center',
                  height: 60, justifyContent: 'center',
                  marginRight: 10,
                }} />
                <Text style={estStyles.signatureTextBottom}>
                  Authorised Signatory
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={estStyles.page}>
      <View>
            <Text style={estStyles.totalBlockLeftText2}>
              Terms & Conditions
            </Text>
            <Text style={estStyles.totalBlockLeftText2}>
              {data.description}
            </Text>
          </View>
      </Page>

    </Document>
  );
};
