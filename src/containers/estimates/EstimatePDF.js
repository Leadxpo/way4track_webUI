import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  table: { display: "flex", flexDirection: "column", marginTop: 10 },
  row: { flexDirection: "row", borderBottom: "1px solid #ccc", padding: 5 },
  cell: { flex: 1, fontSize: 10 },
});

// PDF Component
const EstimatePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Estimate Details</Text>
        <Text style={styles.text}>Client: {data.clientName}</Text>
        <Text style={styles.text}>Client GST: {data.clientGST}</Text>
        <Text style={styles.text}>Estimate Date: {data.estimateDate}</Text>
        <Text style={styles.text}>Expire Date: {data.expireDate}</Text>
        <Text style={styles.text}>Total Amount: ₹{data.totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Products/Services</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Product</Text>
            <Text style={styles.cell}>Qty</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Total</Text>
            <Text style={styles.cell}>HSN Code</Text>
          </View>
          {data.productDetails.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.productName}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>₹{item.costPerUnit.toFixed(2)}</Text>
              <Text style={styles.cell}>₹{item.totalCost.toFixed(2)}</Text>
              <Text style={styles.cell}>{item.hsnCode || 'N/A'}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default EstimatePDF;
