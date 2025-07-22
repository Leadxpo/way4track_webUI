import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 20 },
    title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
    table: { display: "table", width: "auto", marginBottom: 10,borderColor:"#333333",borderWidth:2 },
    row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000", padding: 5 },
    cell: { flex: 1, fontSize: 10 },
    image: { width: 100, height: 100, alignSelf: "center", marginBottom: 30,borderRadius:10 },
});

const ConverterPDF = ({ converterData }) =>{ 
    console.log("rrr :",converterData)
    return(
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Staff Details Report</Text>
            {converterData.staffPhoto && <Image src={converterData.staffPhoto} style={styles.image} />}
            <View style={styles.table}>

                {Object.entries(converterData).map(([key, value], index) => (
                    <View style={styles.row} key={index}>
                        <Text style={[styles.cell,{textTransform:'capitalize'}]}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
                        <Text style={styles.cell}>{value ?? "N/A"}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)};

const ConvertPDF = ({ staff }) => (
    <PDFDownloadLink document={<ConverterPDF converterData={staff} />} fileName={`Staff_${staff.staffId}.pdf`}>
        {({ loading, url, blob, error }) => (
            <a id={`download-pdf-${staff.staffId}`} href={url} download style={{ display: "none" }}>
                {loading ? "Generating PDF..." : ""}
            </a>
        )}
    </PDFDownloadLink>
);

export default ConvertPDF;
