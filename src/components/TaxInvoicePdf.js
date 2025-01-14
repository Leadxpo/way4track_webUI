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
        <View style={styles.bottomHalf}></View>
      </View>
    </Page>
  </Document>
);
