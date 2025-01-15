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
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  halfPage: {
    height: '50%', // Half of the page height
    borderBottom: '1px solid black',
  },
  topHalf: {
    flexDirection: 'row',
    height: '100%',
  },
  leftHalf: {
    width: '50%',
    borderRight: '1px solid black',
    paddingTop: 5,
  },
  rightHalf: {
    width: '50%',
    padding: 5,
  },
  consigneeDetails: {
    height: '33.33%', // Dividing left half into 3 parts
    borderBottom: '1px solid black',
    paddingLeft: 5,
    marginTop: 5,
    alignItems: 'left',
  },
  companyDetails: {
    height: '33.33%', // Dividing left half into 3 parts
    borderBottomWidth: 1, // Use borderBottomWidth instead of shorthand
    borderBottomColor: 'black', // Explicitly set border color
    flexDirection: 'row',
    alignItems: 'flex-start', // Align content to the top
    justifyContent: 'flex-start', // Align items to the left
    padding: 0, // Remove padding
    margin: 0, // Ensure no extra space
    width: '100%', // Ensure the container spans the full width
  },
  buyerDetails: {
    height: '33.33%', // Dividing left half into 3 parts

    paddingLeft: 5,
    marginTop: 5,
    alignItems: 'left',
  },
  companyText: {
    fontSize: '8px',
    marginTop: 2,
    marginBottom: 2, // Manual spacing between lines
    fontFamily: 'Helvetica', // Ensure the font family supports weight variations
  },
  companyTitle: {
    fontSize: '8px',
    marginTop: 2,
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold', // Use bold variant for specific text
  },
  boldText: {
    fontSize: '10px',
    marginTop: 2,
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold',
  },
  normalText: {
    fontSize: '8px',
    marginTop: 2,
    marginBottom: 2,
    fontFamily: 'Helvetica',
  },
  bottomHalf: {
    height: '50%',
    padding: 5,
  },
  header: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  pageBorder: {
    border: '1px solid black',
  },
  gstText: {
    fontSize: '10px',
    marginTop: 12,
    marginBottom: 2,
    fontFamily: 'Helvetica',
  },
  rightTopHalf: {
    height: '60%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rightBottomHalf: {
    height: '40%',
  },
  gridItemLeft: {
    width: '50%',
    height: '40',
    marginLeft: -5,
    marginRight: 5,
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
  },
  gridItemRight: {
    width: '50%',
    height: '40',
    marginRight: -10,
    marginLeft: -5,
    borderBottom: '1px solid black',
  },
  gridText: {
    padding: 5,
    fontSize: '8px',
    fontFamily: 'Helvetica',
  },
  rightBottomHalfText: {
    paddingTop: 25,
    fontSize: '8px',
    fontFamily: 'Helvetica',
  },
  tableBlock: {},
  tableBlock2: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',

    padding: 10,
    borderBottom: '1px solid black',
  },
  tableHeader2: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: '1px solid black',
    borderTop: '1px solid black',
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
  halfPage2: {
    height: '42%', // Half of the page height
    borderBottom: '1px solid black',
  },
  bottomHalf2: {
    height: '58%',
    padding: 5,
  },
  page2Description: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  page2DescriptionLeft: {
    width: '50%',
    padding: 5,
  },
  page2DescriptionRight: {
    width: '50%',
    padding: 5,
  },
  boldTextPage2: {
    fontSize: '8px',
    marginTop: 2,
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold',
  },
  signatureBlock: {},
  signatureText1: {
    textAlign: 'center',
    fontSize: '8px',
    fontFamily: 'Helvetica-Bold',
    paddingTop: 5,
  },
  signatureText2: {
    fontSize: '8px',
    fontFamily: 'Helvetica',
    marginTop: 30,
    textAlign: 'right',
  },
});

// React Component to Generate PDF
export const TaxInvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Tax Invoice</Text>
      <View style={styles.pageBorder}>
        {/* Top Half */}
        <View style={styles.halfPage}>
          <View style={styles.topHalf}>
            {/* Left Section */}
            <View style={styles.leftHalf}>
              {/* 3 Divisions in the Left Half */}
              <View style={styles.companyDetails}>
                <Image
                  src="/logo-black-text.png"
                  style={{ width: '70px', marginRight: 10 }}
                />
                <View>
                  <Text style={styles.companyTitle}>
                    SHARON TELEMATICS PRIVATE LIMITED VIZAG
                  </Text>
                  <Text style={styles.companyText}>21-27 Viman Nagar</Text>
                  <Text style={styles.companyText}>Near Airport Road</Text>
                  <Text style={styles.companyText}>Vishakapatnam</Text>
                  <Text style={styles.companyText}>
                    GSTIN/UIN: 37ABACS4415R1ZV
                  </Text>
                  <Text style={styles.companyText}>
                    State Name : Andhra Pradesh, Code : 37
                  </Text>
                  <Text style={styles.companyText}>
                    Contact : +91-9110729757
                  </Text>
                  <Text style={styles.companyText}>
                    E-Mail : varshini.saragadam@sharontelematics.com
                  </Text>
                </View>
              </View>

              <View style={styles.consigneeDetails}>
                <Text style={styles.normalText}>Consignee (Ship to)</Text>
                <Text style={styles.boldText}>{data.consigneeName}</Text>
                <Text style={styles.gstText}>GSTIN/UIN {data.gstin}</Text>
                <Text style={styles.normalText}>
                  State Address: {data.stateAddress}, Code: {data.stateCode}
                </Text>
              </View>
              <View style={styles.buyerDetails}>
                <Text style={styles.normalText}>Buyer (Bill to)</Text>
                <Text style={styles.boldText}>{data.consigneeName}</Text>
                <Text style={styles.gstText}>GSTIN/UIN {data.gstin}</Text>
                <Text style={styles.normalText}>
                  State Address: {data.stateAddress}, Code: {data.stateCode}
                </Text>
                <Text style={styles.normalText}>
                  Place of Supply:{data.supplyPlace}
                </Text>
              </View>
            </View>

            {/* Right Section */}
            <View style={styles.rightHalf}>
              <View style={styles.rightTopHalf}>
                {/* 6x2 Grid */}
                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Invoice No</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Dated</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Delivery Note</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Mode/Terms of Payment</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Reference No. & Date.</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Other References</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Buyers Order No</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Dated</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Dispatch Doc No.</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Delivery Note Date</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Dispatched Through</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Destination</Text>
                </View>
              </View>
              <View style={styles.rightBottomHalf}>
                <Text style={styles.rightBottomHalfText}>
                  Terms of Delivery
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Half */}
        <View style={styles.bottomHalf}>
          <View style={styles.tableBlock}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.serialNumberColumn]}>
                Sl No.
              </Text>
              <Text style={[styles.tableHeaderText, styles.secondColumn]}>
                Description of Goods
              </Text>
              <Text style={styles.tableHeaderText}>HSN/SAC</Text>
              <Text style={styles.tableHeaderText}>Qty</Text>
              <Text style={styles.tableHeaderText}>Rate</Text>
              <Text style={styles.tableHeaderText}>Per</Text>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>

            {/* Table Rows */}
            {estMockRows.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={[styles.tableRowText, styles.serialNumberColumn]}>
                  {row.column1}
                </Text>
                <Text style={[styles.tableRowText, styles.secondColumn]}>
                  {row.column2}
                </Text>
                <Text style={styles.tableRowText}>{row.column3}</Text>
                <Text style={styles.tableRowText}>{row.column4}</Text>
                <Text style={styles.tableRowText}>{row.column5}</Text>
                <Text style={styles.tableRowText}>{row.column5}</Text>
                <Text style={styles.tableRowAmtText}>{row.column6}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: '10',
              marginRight: '20',
            }}
          >
            <Text style={styles.boldText}>CGST : 5491.52</Text>
            <Text style={styles.boldText}>CGST : 5491.52</Text>
            <Text style={styles.boldText}>Rounding Off : 0.02</Text>
          </View>

          <Text
            style={{
              marginTop: '20',
              marginRight: '20',
              fontSize: '10',
              textAlign: 'right',
            }}
          >
            continued ...
          </Text>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Tax Invoice</Text>
      <View style={styles.pageBorder}>
        {/* Top Half */}
        <View style={styles.halfPage2}>
          <View style={styles.topHalf}>
            {/* Left Section */}
            <View style={styles.leftHalf}>
              {/* 3 Divisions in the Left Half */}
              <View style={styles.companyDetails}>
                <Image
                  src="/logo-black-text.png"
                  style={{ width: '70px', marginRight: 10 }}
                />
                <View>
                  <Text style={styles.companyTitle}>
                    SHARON TELEMATICS PRIVATE LIMITED VIZAG
                  </Text>
                  <Text style={styles.companyText}>21-27 Viman Nagar</Text>
                  <Text style={styles.companyText}>Near Airport Road</Text>
                  <Text style={styles.companyText}>Vishakapatnam</Text>
                  <Text style={styles.companyText}>
                    GSTIN/UIN: 37ABACS4415R1ZV
                  </Text>
                  <Text style={styles.companyText}>
                    State Name : Andhra Pradesh, Code : 37
                  </Text>
                  <Text style={styles.companyText}>
                    Contact : +91-9110729757
                  </Text>
                  <Text style={styles.companyText}>
                    E-Mail : varshini.saragadam@sharontelematics.com
                  </Text>
                </View>
              </View>

              <View style={styles.consigneeDetails}>
                <Text style={styles.normalText}>Consignee (Ship to)</Text>
                <Text style={styles.boldText}>{data.consigneeName}</Text>
                <Text style={styles.gstText}>GSTIN/UIN {data.gstin}</Text>
                <Text style={styles.normalText}>
                  State Address: {data.stateAddress}, Code: {data.stateCode}
                </Text>
              </View>
              <View style={styles.buyerDetails}>
                <Text style={styles.normalText}>Buyer (Bill to)</Text>
                <Text style={styles.boldText}>{data.consigneeName}</Text>
                <Text style={styles.gstText}>GSTIN/UIN {data.gstin}</Text>
                <Text style={styles.normalText}>
                  State Address: {data.stateAddress}, Code: {data.stateCode}
                </Text>
                <Text style={styles.normalText}>
                  Place of Supply:{data.supplyPlace}
                </Text>
              </View>
            </View>

            {/* Right Section */}
            <View style={styles.rightHalf}>
              <View style={styles.rightTopHalf}>
                {/* 6x2 Grid */}
                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Invoice No</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Dated</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Delivery Note</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Mode/Terms of Payment</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Reference No. & Date.</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Other References</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Buyers Order No</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Dated</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Dispatch Doc No.</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Delivery Note Date</Text>
                </View>

                <View style={styles.gridItemLeft}>
                  <Text style={styles.gridText}>Dispatched Through</Text>
                </View>
                <View style={styles.gridItemRight}>
                  <Text style={styles.gridText}>Destination</Text>
                </View>
              </View>
              <View style={styles.rightBottomHalf}>
                <Text style={styles.rightBottomHalfText}>
                  Terms of Delivery
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Half */}
        <View style={styles.bottomHalf2}>
          <View style={styles.tableBlock}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.serialNumberColumn]}>
                Sl No.
              </Text>
              <Text style={[styles.tableHeaderText, styles.secondColumn]}>
                Description of Goods
              </Text>
              <Text style={styles.tableHeaderText}>HSN/SAC</Text>
              <Text style={styles.tableHeaderText}>Qty</Text>
              <Text style={styles.tableHeaderText}>Rate</Text>
              <Text style={styles.tableHeaderText}>Per</Text>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>

            {/* Table Rows */}
            {estMockRows.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={[styles.tableRowText, styles.serialNumberColumn]}>
                  {row.column1}
                </Text>
                <Text style={[styles.tableRowText, styles.secondColumn]}>
                  {row.column2}
                </Text>
                <Text style={styles.tableRowText}>{row.column3}</Text>
                <Text style={styles.tableRowText}>{row.column4}</Text>
                <Text style={styles.tableRowText}>{row.column5}</Text>
                <Text style={styles.tableRowText}>{row.column5}</Text>
                <Text style={styles.tableRowAmtText}>{row.column6}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: '10',
              marginRight: '20',
            }}
          >
            <Text style={styles.boldText}>Total : 72,000.00</Text>
          </View>
          <Text style={styles.normalText}>Amount Chargeable (in words)</Text>
          <Text style={styles.boldText}>INR Seventy Two Thousand Only</Text>
          <View style={styles.tableBlock2}>
            {/* Table Header */}
            <View style={styles.tableHeader2}>
              <Text style={styles.tableHeaderText}>Taxable Value</Text>
              <View style={styles.subColumnContainer}>
                <Text style={styles.subColumnHeader}>CGST</Text>
                <View style={styles.subColumnTextContainer}>
                  <Text style={styles.subColumnTextItem}>%</Text>
                  <Text style={styles.subColumnTextItem}>Amt</Text>
                </View>
              </View>
              <View style={styles.subColumnContainer}>
                <Text style={styles.subColumnHeader}>SGST</Text>
                <View style={styles.subColumnTextContainer}>
                  <Text style={styles.subColumnTextItem}>%</Text>
                  <Text style={styles.subColumnTextItem}>Amt</Text>
                </View>
              </View>
              <Text style={styles.tableHeaderText}>Total Tax Amount</Text>
            </View>

            {/* Table Rows */}
            {estMockRows.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableRowText}>{row.column5}</Text>
                <View style={styles.subColumnTextContainer}>
                  <Text style={styles.subColumnTextRowItem}>
                    {row.cgstPercent}
                  </Text>
                  <Text style={styles.subColumnTextRowItem}>{row.cgstAmt}</Text>
                </View>
                <View style={styles.subColumnTextContainer}>
                  <Text style={styles.subColumnTextRowItem}>
                    {row.sgstPercent}
                  </Text>
                  <Text style={styles.subColumnTextRowItem}>{row.sgstAmt}</Text>
                </View>
                <Text style={styles.tableRowAmtText}>{row.column6}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>Total: 61,000.00</Text>
              <View style={styles.subColumnTextContainer}>
                <Text style={styles.subColumnTextRowItem}></Text>
                <Text style={styles.subColumnTextRowItem}>5,491.52</Text>
              </View>
              <View style={styles.subColumnTextContainer}>
                <Text style={styles.subColumnTextRowItem}></Text>
                <Text style={styles.subColumnTextRowItem}>5,491.52</Text>
              </View>
              <Text style={styles.tableRowAmtText}>10,983.04</Text>
            </View>
          </View>

          <View
            style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}
          >
            <Text style={styles.normalText}>Tax Amount (in words) : </Text>
            <Text style={styles.boldText}>
              INR Ten Thousand Nine Hundred Eighty Three and Four paise Only
            </Text>
          </View>
          <View style={styles.page2Description}>
            <View style={styles.page2DescriptionLeft}>
              <Text style={styles.normalText}>Declaration : </Text>
              <Text style={styles.normalText}>
                We declare that this invoice shows the actual price of the goods
                described and that all particulars are true and correct.Terms
                and Conditions{' '}
              </Text>
              <Text style={styles.normalText}>
                Payment due in 30 days; 1.5% monthly late fee applies.
              </Text>
              <Text style={styles.normalText}>
                Pay via bank transfer, credit card, reference invoice number.
              </Text>
            </View>
            <View style={styles.page2DescriptionRight}>
              <Text style={styles.normalText}>Company's Bank Details : </Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.normalText}>A/c Holder’s Name : </Text>
                <Text style={styles.boldTextPage2}>
                  SHARON TELEMATICS PRIVATE LIMITED VIZAG
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.normalText}>Bank Name : </Text>
                <Text style={styles.boldTextPage2}>ICICI Bank Ltd</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.normalText}>A/c No : </Text>
                <Text style={styles.boldTextPage2}>131905001314</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.normalText}>Branch & IFS Code : </Text>
                <Text style={styles.boldTextPage2}>
                  BUTCHIRAJU PALAM-5300027 & ICIC0001319
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.normalText}>SWIFT Code : </Text>
                <Text style={styles.boldTextPage2}></Text>
              </View>
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureText1}>
                  for SHARON TELEMATICS PRIVATE LIMITED VIZAG
                </Text>
                <Text style={styles.signatureText2}>Authorised Signatory</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
