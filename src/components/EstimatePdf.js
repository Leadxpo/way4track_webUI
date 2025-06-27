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
const estMockRows = [
  {
    column1: '1',
    column2: 'Product 1',
    column3: '1234',
    column4: '10',
    column5: '1000',
    cgstPercent: '9%',
    cgstAmt: '90',
    sgstPercent: '9%',
    sgstAmt: '90',
    column6: '10000',
  },
];

const estStyles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingLeft: 40,
    paddingRight: 30,
    paddingBottom: 50,
    fontFamily: 'Helvetica',
    border: '1px solid black',
  },
  pageBorder: {
    border: '1px solid black', // Adds a border around the entire page
    padding: 10, // Adds padding inside the border
    height: '100%', // Ensures the border spans the full height
    width: '100%', // Ensures the border spans the full width
    boxSizing: 'border-box', // Prevents content from overflowing outside the border
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
    backgroundColor: 'white', // White background for rows
    padding: 10,
    borderBottom: '1px solid black',
  },
  tableRowText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    flex: 1,
    textAlign: 'center',
    color: 'black', // Black text for rows
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
    color: 'black', // Black text for rows

    marginTop: -10,
    marginBottom: -10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  serialNumberColumn: {
    flex: 0.5, // Less width for the first column (serial number)
  },
  secondColumn: {
    flex: 2, // More width for the second column
  },
  otherColumns: {
    flex: 1, // Equal width for the other columns
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
    flex: 1,
  },
  totalBlockLeftText1: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  totalBlockLeftText2: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    paddingTop: 15,
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
    borderLeft: '1px solid black',
    borderBottom: '1px solid black',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  totalBlockRightText: {
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
  },
  signatureBlock: {
    marginTop: 5,
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
    marginTop: 40,
  },
  amountBlock: {
    borderBottom: '1px solid black',
    marginLeft: -10,
    marginRight: -15,
    paddingRight: 10,
  },
});

export const EstimatePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={estStyles.page}>
      <View style={estStyles.pageBorder}>
        {/* Header */}
        <View style={estStyles.header}>
          {/* Left Section: Logo and Company Details */}
          <View style={estStyles.logoContainer}>
            <Image src="/logo-big-bt.png" style={estStyles.logo} />
            <View>
              <Text style={estStyles.companyNameBold}>
                SHARON TELEMATICS PRIVATE LIMITED
              </Text>
              <Text style={estStyles.companyDetails}>
                Company ID: U74999AP2018PTC108597
              </Text>
              <Text style={estStyles.companyDetails}>21-27 Viman Nagar</Text>
              <Text style={estStyles.companyDetails}>Near Airport Road</Text>
              <Text style={estStyles.companyDetails}>
                Visakhapatnam, Andhra Pradesh, 530009
              </Text>
              <Text style={estStyles.companyDetails}>India</Text>
              <Text style={estStyles.companyDetails}>
                GSTIN: 37ABACS4415R1ZV
              </Text>
            </View>
          </View>

          {/* Right Section: Quotation */}
          <View style={estStyles.quotationContainer}>
            <Text style={estStyles.quotationTitle}>Quotation</Text>
          </View>
        </View>

        {/* Details Row */}
        <View style={estStyles.detailsRow}>
          <View
            style={{
              borderRight: '1px solid black',
              ...estStyles.detailsColumn,
            }}
          >
            <View style={estStyles.detailsTextBlock}>
              <Text style={estStyles.detailsText}>#</Text>
              <Text style={estStyles.detailsTextBold}>
                :{data.estimateId}
              </Text>
            </View>
            <View style={estStyles.detailsTextBlock}>
              <Text style={estStyles.detailsText}>Pro Forma Invoice Date</Text>
              <Text style={estStyles.detailsTextBold}>
                :{data.estimateDate}
              </Text>
            </View>
          </View>
          <View style={estStyles.detailsColumn}>
            <View style={estStyles.detailsTextBlock}>
              <Text style={estStyles.detailsText}>Place of Supply</Text>
              <Text style={estStyles.detailsTextBold}>
                :Andhra Pradesh (37)
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
              style={[estStyles.tableHeaderText, estStyles.serialNumberColumn]}
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
                  style={[estStyles.tableRowText, estStyles.serialNumberColumn]}
                >
                  {index + 1}
                </Text>
                <Text style={[estStyles.tableRowText, estStyles.secondColumn]}>
                  {row.productName}  {"\n"} {row.description}
                </Text>
                <Text style={estStyles.tableRowText}>{row.hsnCode}</Text>
                <Text style={estStyles.tableRowText}>{row.quantity}</Text>
                <Text style={estStyles.tableRowText}>
                  {row.amount / row.quantity}
                </Text>
                <View style={estStyles.subColumnTextContainer}>
                  <Text style={estStyles.subColumnTextRowItem}>9%</Text>
                  <Text style={estStyles.subColumnTextRowItem}>
                    {(row.amount * 0.09).toFixed(2)}
                  </Text>
                </View>
                <View style={estStyles.subColumnTextContainer}>
                  <Text style={estStyles.subColumnTextRowItem}>9%</Text>
                  <Text style={estStyles.subColumnTextRowItem}>
                    {(row.amount * 0.09).toFixed(2)}
                  </Text>
                </View>
                <Text style={estStyles.tableRowAmtText}>
                  {row.amount +
                    (row.amount * 0.09).toFixed(2) +
                    (row.amount * 0.09).toFixed(2)}
                </Text>
              </View>
            ))}
        </View>

        <View style={estStyles.totalBlock}>
          <View style={estStyles.totalBlockLeft}>
            <Text style={estStyles.totalBlockLeftText1}>
              Items in Total {data.quantity}
            </Text>
            <Text style={estStyles.totalBlockLeftText2}>Total In Words</Text>
            <Text style={estStyles.totalBlockLeftText3}>
              {toWords.convert(data.totalAmount || 0, { currency: false })}
            </Text>
            <Text style={estStyles.totalBlockLeftText2}>Notes</Text>
            <Text style={estStyles.totalBlockLeftText2}>Looking forward</Text>
            <Text style={estStyles.totalBlockLeftText2}>
              Terms & Conditions
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>Bank Details:</Text>
            <Text style={estStyles.totalBlockLeftText1}>
              Payment To: Sharon Telematics Pvt Ltd., Visakhapatnam
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>
              Payment Mode: By Cash / NEFT / RTGS / Cheque
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>
              - A/c No: 131905001314
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>
              - Bank Name: ICICI Bank
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>
              - Branch Name: BUTCHIRAJU PALAM
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>
              - Bank Address BUTCHIRAJU PALAM - 5300027
            </Text>
            <Text style={estStyles.totalBlockLeftText1}>
              - IFSC Code: ICIC0001319
            </Text>
          </View>
          <View style={estStyles.totalBlockRight}>
            <View style={estStyles.amountBlock}>
              <View style={estStyles.detailsTextBlock}>
                <Text style={estStyles.totalBlockRightText}>
                  Total Taxable Amount:
                </Text>
                <Text style={estStyles.totalBlockRightText}>
                  {data.totalAmount}
                </Text>
              </View>
              <View style={estStyles.detailsTextBlock}>
                <Text style={estStyles.totalBlockRightText}>CGST9 (9%)</Text>
                <Text style={estStyles.totalBlockRightText}>
                  {(data.totalAmount * 0.09).toFixed(2)}
                </Text>
              </View>
              <View style={estStyles.detailsTextBlock}>
                <Text style={estStyles.totalBlockRightText}>SGST9 (9%)</Text>
                <Text style={estStyles.totalBlockRightText}>
                  {(data.totalAmount * 0.09).toFixed(2)}
                </Text>
              </View>
              <View style={estStyles.detailsTextBlock}>
                <Text style={estStyles.totalBlockRightTextBold}>Total</Text>
                <Text style={estStyles.totalBlockRightTextBold}>
                  ₹
                  {data.totalAmount +
                    (data.totalAmount * 0.09).toFixed(2) +
                    (data.totalAmount * 0.09).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={estStyles.signatureBlock}>
              <Text style={estStyles.signatureText}>Sunil G</Text>
              <Text style={estStyles.signatureTextBottom}>
                Authorized Signature
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
