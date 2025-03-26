import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, backgroundColor: "#f9fafb" },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginBottom: 6,
  },
  title: { fontSize: 14, fontWeight: "bold" },
  section: { marginBottom: 6 },
  text: { fontSize: 12, marginBottom: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "48%", marginBottom: 4 },
  bold: { fontWeight: "bold" },
});

const StaffDetailsPDF = ({ staff }) => {
  // Debugging: Log staff data to verify structure
  console.log("Staff Data:", staff);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.card}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Staff Details</Text>
          </View>
          {/* <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text>
                <Text style={styles.bold}>Name:</Text> {staff?.name ?? "N/A"}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text>
                <Text style={styles.bold}>Designation:</Text> {staff?.designation ?? "N/A"}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text>
                <Text style={styles.bold}>Department:</Text> {staff?.department ?? "N/A"}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text>
                <Text style={styles.bold}>Experience:</Text> {staff?.experience ?? "N/A"} years
              </Text>
            </View>
          </View> */}
        </View>

        {/* Personnel Details */}
        <View style={styles.card}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Personnel Details</Text>
          </View>
          <View style={styles.grid}>
            {staff?.personnelDetails
              ? Object.entries(staff.personnelDetails).map(([key, value]) => (
                  <View key={key} style={styles.gridItem}>
                    <Text>
                      <Text style={styles.bold}>{key.replace(/([A-Z])/g, " $1").trim()}:</Text> {value ?? "N/A"}
                    </Text>
                  </View>
                ))
              : <Text>No personnel details available.</Text>}
          </View>
        </View>

        {/* Education Details */}
        <View style={styles.card}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Education Details</Text>
          </View>
          {staff?.educationDetails?.qualifications?.length > 0 ? (
            staff.educationDetails.qualifications.map((qual, index) => (
              <Text key={index} style={styles.text}>
                <Text style={styles.bold}>Qualification:</Text> {qual.qualificationName ?? "N/A"}, 
                <Text style={styles.bold}> Marks/CGPA:</Text> {qual.marksOrCgpa ?? "N/A"}
              </Text>
            ))
          ) : (
            <Text>No qualifications available.</Text>
          )}
        </View>

        {/* Bank Details */}
        <View style={styles.card}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Bank Details</Text>
          </View>
          {staff?.bankDetails
            ? Object.entries(staff.bankDetails).map(([key, value]) => (
                <Text key={key} style={styles.text}>
                  <Text style={styles.bold}>{key.replace(/([A-Z])/g, " $1").trim()}:</Text> {value ?? "N/A"}
                </Text>
              ))
            : <Text>No bank details available.</Text>}
        </View>

        {/* Employer Details */}
        <View style={styles.card}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Employer Details</Text>
          </View>
          {staff?.employerDetails
            ? Object.entries(staff.employerDetails).map(([key, value]) => (
                <Text key={key} style={styles.text}>
                  <Text style={styles.bold}>{key.replace(/([A-Z])/g, " $1").trim()}:</Text> {value ?? "N/A"}
                </Text>
              ))
            : <Text>No employer details available.</Text>}
        </View>
      </Page>
    </Document>
  );
};

export default StaffDetailsPDF;
