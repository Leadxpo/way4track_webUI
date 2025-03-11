import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: 'red',
  },
  text: {
    marginBottom: 4,
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    textAlign: 'left',
  },
});

// React PDF Component
const TerminationLetterPDF = ({ employee }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Termination Letter Template</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Employee Name:</Text>{' '}
        <Text>{employee.name}</Text>
        <Text style={styles.label}>Emp ID:</Text> <Text>{employee.id}</Text>
        <Text style={styles.label}>Location:</Text>{' '}
        <Text>{employee.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Designation:</Text>{' '}
        <Text>{employee.designation}</Text>
        <Text style={styles.label}>Department:</Text>{' '}
        <Text>{employee.department}</Text>
        <Text style={styles.label}>Date:</Text> <Text>{employee.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          This is an official notice that your employment with Sharon Telematics
          Pvt Ltd. is terminated effective {employee.date} for the following
          reasons:
        </Text>
        <Text>1. Regular Leaves</Text>
        <Text>2. Irregular Work</Text>
        <Text>3.</Text>
        <Text>4.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          Review of Health Benefits to include health coverage company extends
          to eligible employees.
        </Text>
        <Text style={styles.text}>
          Return of Property: Please list and return any property of the company
          that you have in your possession. In addition, please provide any
          passwords and other information pertaining to accessing company
          systems.
        </Text>
        <Text style={styles.text}>
          Final Paycheck: Your last paycheck will be received within 45 days
          from the date of your termination.
        </Text>
      </View>

      <Text style={styles.text}>
        I wish you the best in finding new employment.
      </Text>

      <View style={styles.signatureSection}>
        <View style={styles.signatureBlock}>
          <Text>Sincerely,</Text>
          <Text>Priya</Text>
          <Text>HR</Text>
          <Text>Sharon Telematics Pvt. Ltd.</Text>
          <Text>Contact: 7995512053</Text>
        </View>
        <View style={styles.signatureBlock}>
          <Text>Signature:</Text>
          <Text>Date:</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default TerminationLetterPDF;
