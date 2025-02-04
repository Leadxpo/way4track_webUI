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

// Styles for the PDF

const poStyles = StyleSheet.create({
  titleBlock: {
    alignItems: 'flex-end', // Align content to the right
    marginBottom: 10,
    paddingTop: 50,
    paddingRight: 30,
  },
  mainTitle: {
    fontSize: 30,
    fontFamily: 'Helvetica',
  },
  poNumber: {
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
  },
  companyDetailsBlock: {
    marginTop: 20,
    marginLeft: 40,
  },
  companyTextNormal: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    marginBottom: 1,
  },
  companyTextBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  textRightAlign: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    textAlign: 'right',
    marginRight: 30,
  },
  textRightAlignBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    marginRight: 30,
  },
  tableBlock: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 30,
    borderBottom: '1px solid black',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4A4A4A', // Dark gray background
    padding: 10,
  },
  tableHeaderText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white', // White background for rows
    padding: 10,
  },
  tableRowText: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    flex: 1,
    textAlign: 'center',
    color: 'black', // Black text for rows
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
});

const mockRows = [
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

export const PurchaseOrderPDF = ({ data }) => (
  <Document>
    <Page>
      <View style={poStyles.titleBlock}>
        <Text style={poStyles.mainTitle}>PURCHASE ORDER</Text>
        <Text style={poStyles.poNumber}># {data.receiptId}</Text>
      </View>

      <View>
        <Image src="/logo-big-bt.png" style={{ width: 250, marginLeft: 30 }} />
      </View>

      <View style={poStyles.companyDetailsBlock}>
        <Text style={poStyles.companyTextBold}>
          SHARON TELEMATICS PRIVATE LIMITED
        </Text>
        <Text style={poStyles.companyTextNormal}>
          Company ID : U74999AP2018PTC108597
        </Text>
        <Text style={poStyles.companyTextNormal}>21-27 Viman Nagar</Text>
        <Text style={poStyles.companyTextNormal}>Near Airport Road</Text>
        <Text style={poStyles.companyTextNormal}>
          Visakhapatnam Andhra Pradesh 530009
        </Text>
        <Text style={poStyles.companyTextNormal}>India</Text>
        <Text style={poStyles.companyTextNormal}>GSTIN 37ABACS4415R1ZV</Text>
      </View>

      <View style={poStyles.companyDetailsBlock}>
        <Text style={poStyles.companyTextNormal}>Vendor Address</Text>
        <Text style={poStyles.companyTextBold}>IKON ENGINEERING CO</Text>
        <Text style={poStyles.companyTextNormal}>21-27 Viman Nagar</Text>
        <Text style={poStyles.companyTextNormal}>Near Airport Road</Text>
        <Text style={poStyles.companyTextNormal}>
          Visakhapatnam Andhra Pradesh 530009
        </Text>
        <Text style={poStyles.companyTextNormal}>India</Text>
        <Text style={poStyles.companyTextNormal}>GSTIN 37ABACS4415R1ZV</Text>
      </View>

      <View style={poStyles.companyDetailsBlock}>
        <Text style={poStyles.companyTextNormal}>Delivery To</Text>
        <Text style={poStyles.companyTextBold}>{data.clientName}</Text>
        <Text style={poStyles.companyTextNormal}>
          Company ID : U74999AP2018PTC108597
        </Text>
        <Text style={poStyles.companyTextNormal}>21-27 Viman Nagar</Text>
        <Text style={poStyles.companyTextNormal}>Near Airport Road</Text>
        <Text style={poStyles.companyTextNormal}>
          Visakhapatnam Andhra Pradesh 530009
        </Text>
        <Text style={poStyles.companyTextNormal}>India</Text>
        <Text style={poStyles.companyTextNormal}>GSTIN 37ABACS4415R1ZV</Text>
        <Text style={poStyles.textRightAlign}>
          Date : {data.generationDate}
        </Text>
      </View>

      <View style={poStyles.tableBlock}>
        {/* Table Header */}
        <View style={poStyles.tableHeader}>
          <Text style={[poStyles.tableHeaderText, poStyles.serialNumberColumn]}>
            #
          </Text>
          <Text style={[poStyles.tableHeaderText, poStyles.secondColumn]}>
            Item & Description
          </Text>
          <Text style={poStyles.tableHeaderText}>HSN/SAC</Text>
          <Text style={poStyles.tableHeaderText}>Qty</Text>
          <Text style={poStyles.tableHeaderText}>Rate</Text>
          <Text style={poStyles.tableHeaderText}>Amount</Text>
        </View>

        {/* Table Rows */}
        {mockRows.map((row, index) => (
          <View style={poStyles.tableRow} key={index}>
            <Text style={poStyles.tableRowText}>{row.column1}</Text>
            <Text style={poStyles.tableRowText}>{row.column2}</Text>
            <Text style={poStyles.tableRowText}>{row.column3}</Text>
            <Text style={poStyles.tableRowText}>{row.column4}</Text>
            <Text style={poStyles.tableRowText}>{row.column5}</Text>
            <Text style={poStyles.tableRowText}>{row.column6}</Text>
          </View>
        ))}
      </View>

      <View style={poStyles.companyDetailsBlock}>
        <Text style={poStyles.textRightAlign}>Sub Total : {data.amount}</Text>
        <Text style={{ marginTop: '10px', ...poStyles.textRightAlignBold }}>
          Total : {data.amount}
        </Text>
      </View>
      <View style={poStyles.companyDetailsBlock}>
        <Text style={poStyles.companyTextNormal}>
          Authorized Signature : ____________________________________
        </Text>
      </View>
    </Page>
  </Document>
);

export function formatString(input) {
  // Convert camelCase to space-separated words
  const camelCaseToSpaces = input.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Convert snake_case to space-separated words
  const snakeCaseToSpaces = camelCaseToSpaces.replace(/_/g, ' ');

  // Capitalize the first letter of each word
  const formattedString = snakeCaseToSpaces
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formattedString;
}

const getPermissions = (roleName) => {
  const permissions = JSON.parse(
    localStorage.getItem('userPermissions') || '[]'
  );

  const rolePermissions = permissions.find((perm) => perm.name === roleName);

  if (rolePermissions) {
    return {
      add: rolePermissions.add || false,
      edit: rolePermissions.edit || false,
      view: rolePermissions.view || false,
      delete: rolePermissions.delete || false,
    };
  }

  return { add: false, edit: false, view: false, delete: false }; // Default if role not found
};
