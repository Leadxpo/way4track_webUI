import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { FaDownload, FaChevronDown } from 'react-icons/fa';
import StaffDropdown from "../../components/staffDropdownId";
import ApiService from "../../services/ApiService";
import { toWords } from 'number-to-words';

const Letters = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    staffId: "",
    branch: "",
    reportingTo: "",
    salary: "",
    terminationDate: null,
    address: "",
    staffPhoneNo: "",
    staffEmail: "",
    department: "",
    paySlipMonthYear: "",
    resignationDate: null,
    experienceData: null,
    description: "",
    joiningDate: "",
    paySlipYear: "",
    paySlipMonth: "",
    greetingTo: "",
    greetingDesignation: "",
    greetingEmail: "",
    greetingPhoneNo: ""
  });
  const [staffDetails, setStaffDetails] = useState(null);
  const [letterType, setLetterType] = useState("offer");

  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const getPayrollData = async () => {
      const data = await employeePayroll(formData);
      setEmployeeData(prev => prev = data);
      console.log("employeeDataaaaa : ", employeeData)
    };
    getPayrollData();
  }, [formData.paySlipMonthYear]);


  const getIndiaDate = () => {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (staffDetails) {
      setFormData((prev) => ({
        ...prev,
        staffId: staffDetails.staffId || "",
        name: staffDetails.name || "",
        staffPhoneNo: staffDetails.phoneNumber || "",
        staffEmail: staffDetails.email || "",
        branch: staffDetails.branch || "",
        designation: staffDetails.designation || "",
        salary: staffDetails.monthlySalary || "",
        joiningDate: staffDetails.joiningDate || null,
        address: staffDetails.address || "",
        department: staffDetails.department || "",
        resignationDate: staffDetails.resignationDate || null,
        terminationDate: staffDetails.terminationDate || null,
        description: staffDetails.description || "",
      }));
    }
  }, [staffDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    // Ensure value is defined before splitting
    if (value) {
      const [year, month] = value.split("-"); // Splits "YYYY-MM" into ["YYYY", "MM"]

      setFormData((prevState) => ({
        ...prevState,
        [name]: value, // Store full YYYY-MM value
        paySlipYear: year, // Store extracted year separately
        paySlipMonth: month, // Store extracted month separately
      }));
    }
  };

  const styles = StyleSheet.create({
    page: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      fontSize: 12,
      fontFamily: "Helvetica",
    },
    header: {
      textAlign: "center",
      fontSize: 12,
      marginBottom: 10, fontFamily: "Times-Roman",
      fontWeight: "ultrabold",
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 5,
      marginBottom: 5,
    },
    section: {
      marginBottom: 10,
    },
    label: {
      fontWeight: "extrabold", textDecoration: "underline",
      fontSize: 13, fontFamily: "Times-Roman",
      marginBottom: 10, marginTop: 5
    },
    payslipLabel: {
      fontWeight: "extrabold",
      fontSize: 13, fontFamily: "Times-Roman",
      marginVertical: 5
    },
    text: {
      fontSize: 11, fontFamily: "Times-Roman",
      marginLeft: 20, lineHeight: 1.3,
      textAlign: "justify", letterSpacing: 0.5
    },
    headText: {
      fontSize: 11, fontFamily: "Times-Roman", lineHeight: 1.2,
      textAlign: "justify", marginVertical: 4,
    },
    greetingText: {
      fontSize: 10, fontFamily: "Times-Roman",
      textAlign: "justify",
    },
    profileContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: 15,
    },
    profileImage: {
      width: 150,
      height: 50,
      borderRadius: 15,
      marginRight: 10,
    },
    signatureSection: {
      paddingTop: 10,
    },
    signatureBlock: {
      marginTop: 10,
    },
    logo: {
      width: 120,
      height: 100,
    },
    companyDetails: {
      fontSize: 10,
      textAlign: 'right', lineHeight: 1.5
    },
    footerText: {
      marginBottom: 2, alignSelf: 'center', fontSize: 8, justifyContent: "center"
    },
    normalText: { letterSpacing: 2, lineHeight: 10, fontFamily: "Times-Roman" },
    title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, fontFamily: "Times-Roman" },
    payslipSection: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    column: { width: '50%' },
    paysliptext: { marginBottom: 5, fontFamily: "Times-Roman", lineHeight: 1 },
    table: { width: '100%', borderWidth: 1 ,marginTop:20},
    row: { flexDirection: 'row', },
    mainRow: { flexDirection: 'row', border: 1 },
    cell: { flex: 1, textAlign: 'left', paddingVertical: 3, paddingHorizontal: 5, fontFamily: "Times-Roman" },
    lastcell: { textAlign: 'left', paddingVertical: 3, paddingHorizontal: 5, fontFamily: "Times-Roman" },
    footer: { marginTop: 10, position: 'absolute', bottom: 5, left: 0, right: 0, textAlign: 'center', fontSize: 10, fontStyle: 'italic', fontFamily: "Times-Roman" }
  });

  const OfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>
              We are pleased to extend an offer of employment for the designation of {employee?.designation} at Sharon Telematics Pvt Ltd.
            </Text>
            <View style={styles.section}>
              <Text style={styles.label}>Designation Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: {employee?.designation}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department: {employee?.department}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: {employee?.reportingTo}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA + Incentives</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Hike: Performance-based increments annually</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Life insurance coverage. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Paid time off sick leave, and public holidays. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Professional development and training opportunities.  </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Employee wellness programs.  </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs. </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Engage with customers and recommend products</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Maintain a high level of product knowledge</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Meet or exceed sales targets</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Build and maintain strong customer relationships</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Accurately record all sales activities</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sales Targets:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}> Meet or exceed individual sales targets set by the company.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Actively seek out new sales opportunities through cold calling, networking, and in-person meetings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Track and report on your sales performance, including leads generated, conversions, and revenue.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Relationship Building:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Build and maintain strong, long-lasting customer relationships to drive repeat business.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Follow up with existing customers to ensure satisfaction and promote additional products or services.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}> Attend industry events, trade shows, and networking opportunities to develop new sales leads.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Sales Administration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}> Accurately record all sales activities, customer interactions, and transactions in the CRM system. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}> Prepare and submit regular sales reports to your manager.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Collaborate with other team members and departments to ensure smooth sales operations and customer satisfaction.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Sales Administration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}> Accurately record all sales activities, customer interactions, and transactions in the CRM system. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}> Prepare and submit regular sales reports to your manager.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Collaborate with other team members and departments to ensure smooth sales operations and customer satisfaction.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Market Research:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Stay informed about market trends, competitors, and industry developments. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide feedback to the sales team and management on customer preferences, market conditions, and product needs.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Team Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in sales meetings, training sessions, and team-building activities. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Share best practices and strategies with colleagues to help the team achieve its collective goals.</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>•    This offer is contingent upon the successful completion of a background check and reference check. </Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>•    As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>•    Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company "</Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>•    can terminate the employment relationship after the bond period, with or without cause and with or without notice."</Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>•    During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and on boarding costs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>


            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const AccountantOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>
            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View>
                <Text style={styles.headText}>Dear {employee?.name}</Text>
                <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Accountant. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
              </View>

            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Accountant</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department: Finance</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Performance-Based Hike: Salary increments will be based on your annual performance review</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Paid time off, sick leave, and public holidays.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Professional development opportunities, including training and certifications.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Employee wellness programs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required during peak periods, such as year-end financial close.</Text>
              </View>
            </View>


            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Accountant:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Financial Records Management</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Oversee and maintain accurate financial records, including general ledger entries, accounts payable, accounts receivable, and financial statements.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure timely and accurate preparation of monthly, quarterly, and annual financial reports in compliance with accounting standards and company policies.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Coordinate and manage budgeting and forecasting processes, providing insights and recommendations to support financial planning and decision-making.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Tax Compliance:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Manage and ensure the accuracy of tax filings, including income tax, GST, and other applicable taxes.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Stay updated on changes in tax regulations and advise management on compliance requirements and potential impacts.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Audit Support:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Lead the coordination with external auditors during annual audits and ensure the timely provision of required documentation.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Conduct internal audits to assess the accuracy and compliance of financial records and processes.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Financial Analysis:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Analyze financial data to identify trends, variances, and areas for improvement.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and present detailed financial analysis reports to senior management, including recommendations for enhancing financial performance.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Process Improvement:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Identify and implement best practices and process improvements in financial management and payroll operations.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Utilize the latest tools and technologies to enhance efficiency and accuracy in accounting and payroll functions.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Bank Reconciliation:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Perform regular bank reconciliations to verify the accuracy of financial transactions and statements.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reconcile payroll-related accounts and resolve any discrepancies in payroll data.</Text>
              </View>
            </View>


            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check. </Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and on boarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no Leaves and no permissions for 3 months from the Joining date.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const DigitalManagerOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();

    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Accountant. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Digital Marketing</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department: Marketing</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Hike: Your salary will be subject to performance-based increments, evaluated annually.</Text>
              </View>

              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>     <Text style={[styles.headText, { width: "92%" }]}>Benefits: You will be eligible for our standard benefits package, which currently includes health insurance, paid time off, and other benefits. More details will be provided upon your joining.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required as per business needs.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Digital Marketing Strategy</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and implement comprehensive digital marketing strategies to increase brand awareness, drive traffic, and generate leads.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Monitor and analyze the performance of digital marketing campaigns, making data-driven decisions to optimize results.</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Content Marketing:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Create and manage content for various digital platforms, including the company website, blog, social media, and email marketing.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Collaborate with the design and content teams to produce engaging and SEO-friendly content.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Social Media Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Manage and grow the company’s social media presence across platforms like Facebook, Twitter, LinkedIn, Instagram, and others.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and schedule posts, monitor engagement, and respond to customer inquiries on social media.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Analytics and Reporting:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Use tools like Google Analytics, Google Search Console, and social media analytics to track the performance of digital marketing initiatives.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and present detailed reports on campaign performance, ROI, and recommendations for improvement.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const FieldSalesManagerOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Field Sales Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Field Sales Manager</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department: Marketing</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Commission: You will be eligible for a sales commission based on your performance and achievement of sales targets.</Text>
              </View>
              <Text style={styles.label}>Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Life insurance coverage.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Paid time off sick leave, and public holidays.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Professional development and training opportunities.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Employee wellness programs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs.</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Sales and Customer Interaction</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Engage with customers to understand their needs and recommend suitable products and services.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide detailed information about the products and services offered by the company.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Handle customer inquiries, resolve complaints, and ensure a positive customer experience.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Maintain a high level of product knowledge to effectively communicate features and benefits to customers.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sales Targets:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Meet or exceed individual sales targets set by the company.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Actively seek out new sales opportunities through cold calling, networking, and in-person meetings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Track and report on your sales performance, including leads generated, conversions, and revenue.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Relationship Building:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Build and maintain strong, long-lasting customer relationships to drive repeat business.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Follow up with existing customers to ensure satisfaction and promote additional products or services.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Attend industry events, trade shows, and networking opportunities to develop new sales leads.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sales Administration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Accurately record all sales activities, customer interactions, and transactions in the CRM system.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and submit regular sales reports to your manager.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Collaborate with other team members and departments to ensure smooth sales operations and customer satisfaction.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Market Research:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Stay informed about market trends, competitors, and industry developments.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide feedback to the sales team and management on customer preferences, market conditions, and product needs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Team Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in sales meetings, training sessions, and team-building activities.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Share best practices and strategies with colleagues to help the team achieve its collective goals.</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const OperationAssociateOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Operation Associate. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Operation Associate</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:Operational Support</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Rotational Shifts from Monday to Saturday:</Text>
              </View>
              <Text style={styles.text}>SHIFT 1 - 8:00 AM to 5:00 PM</Text>
              <Text style={styles.text}>SHIFT 2 - 3:00 PM to 12:00 AM</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Employees working in Shift 1 will have Fridays & Sunday as their Week Off, while Sunday will be a working day with timings from 9:00 AM to 6:00 PM.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Overtime may be required as per business needs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Applications:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Act as a liaison with the business community in all aspects of report, data feed, and application development.</Text>
              </View>

            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Complaints:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Evaluates and resolves complaints.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Verify complaint type and update if necessary.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Perform follow-up activities to obtain additional information.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Report assessments.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Process complaints according to policies and standard operating procedures.</Text>
            </View>

            <View>
              <Text style={styles.label}>System Maintenance:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Perform regular system updates, patches, and backups to ensure data security and system integrity.</Text>
              </View>

              <Text style={styles.label}>Troubleshooting:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide timely support to the front-end team for dealers on any back-end related issues.</Text>
              </View>

              <Text style={styles.label}>Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Work closely with the front-end team, developers, and other technical staff to ensure seamless system operations.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>


            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>
        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  };

  const OperationalManagerOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Operational Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Operational Manager</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:Operations</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Performance-Based Bonuses: Eligibility for performance-based bonuses contingent upon achieving operational targets and goals.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Comprehensive Life insurance coverage for you.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Paid time off including sick leave, and public holidays.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Professional development opportunities, including training programs and workshops.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Employee wellness programs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs.</Text>
              </View>
            </View>


            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Operational Oversight:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Oversee and manage daily operations across all branches to ensure efficient and effective functioning.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and implement operational policies and procedures to enhance branch performance and standardize practices.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Monitor and evaluate branch performance metrics, providing actionable feedback and support to branch managers.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Conduct regular site visits to branches for operational assessments, addressing issues, and ensuring adherence to company standards and policies.</Text>
              </View>
            </View>

            <View>
              <Text style={styles.label}>Team Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Lead, mentor, and manage branch managers and operational staff, setting clear performance goals and expectations.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Implement training and development programs to improve team skills, knowledge, and performance across all branches.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Facilitate effective communication and collaboration between branches and the central office.</Text>
              </View>

              <Text style={styles.label}>Process Improvement:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Identify and implement process improvements across all branches to optimize efficiency and service quality.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and oversee standardized operating procedures and best practices to ensure consistent service delivery and operational excellence.</Text>
              </View>

              <Text style={styles.label}>Budget and Resource Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and manage branch budgets, ensuring cost-effective operations and resource allocation.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Oversee procurement and inventory management to ensure timely and cost-effective acquisition of necessary equipment and supplies.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Monitor and control expenses to stay within budgetary limits while meeting operational needs.</Text>
              </View>

              <Text style={styles.label}>Project Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Lead and manage operational projects such as branch expansions, relocations, or system upgrades, ensuring projects are completed on time and within budget.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Coordinate with other departments and external vendors to achieve project goals and address any arising issues.</Text>
              </View>
            </View>


            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Reporting and Analysis:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and present comprehensive reports on branch performance, including financials, key metrics, and progress towards strategic goals.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Analyze operational data to identify trends, areas for improvement, and opportunities for growth.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide strategic recommendations to senior management based on performance analysis and market conditions.</Text>
            </View>

            <Text style={styles.label}>Compliance and Risk Management:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure all branches comply with company policies, industry regulations, and legal requirements.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and implement risk management strategies to mitigate operational risks and safeguard the company’s assets and reputation.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Address and resolve any compliance or operational issues in a timely manner.</Text>
            </View>
            <Text style={styles.label}>Customer Relations:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Oversee customer service operations across branches to ensure high levels of customer satisfaction.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Address and resolve any customer complaints or issues that arise, ensuring timely and effective solutions.</Text>
            </View>
            <View>
              <Text style={styles.label}>Strategic Planning:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Contribute to strategic planning and goal-setting for branch operations, aligning branch activities with overall company objectives.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Support the implementation of company-wide initiatives and strategies at the branch level.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>
        {/* Page 4 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const SalesManagerOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Sales Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Sales Manager</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:Sales</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Hike: Your salary will be subject to performance-based increments, evaluated annually.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Benefits: You will be eligible for our standard benefits package, which currently includes health insurance, retirement plan, paid time off, and other benefits. More details will be provided upon your joining.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime and travel may be required as per business needs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Sales Strategy and Planning:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Direct all operational aspects including distribution operations, customer service, human resources, administration, and sales.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and implement effective sales strategies to achieve company sales goals and revenue targets.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Analyze market trends and customer needs to identify new business opportunities.</Text>
              </View>

            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Team Management:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Lead, mentor, and motivate the sales team to ensure high performance and team cohesion.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Conduct regular sales training and development sessions to improve team skills and productivity.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Bring out the best of the branch’s personnel by providing training, coaching, development, and motivation.</Text>
            </View>

            <View>
              <Text style={styles.label}>Client Relationship Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Build and maintain strong relationships with key clients and stakeholders.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure client satisfaction by providing excellent customer service and addressing any concerns promptly.</Text>
              </View>

              <Text style={styles.label}>Sales Reporting and Analysis:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and present detailed sales reports, forecasts, and performance metrics to senior management.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Use data-driven insights to optimize sales processes and strategies.</Text>
              </View>

              <Text style={styles.label}>Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Work closely with other departments, such as Marketing, Product Development, and Customer Support, to align sales strategies with company objectives.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in cross-functional meetings and contribute to company-wide initiatives.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const BranchManagerOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Branch Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title:Branch Manager</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:Manager</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Hike: Your salary will be subject to performance-based increments, evaluated annually.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Benefits: You will be eligible for our standard benefits package, which currently includes health insurance, retirement plan, paid time off, and other benefits. More details will be provided upon your joining.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime and travel may be required as per business needs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Sales Strategy and Planning:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Direct all operational aspects including distribution operations, customer service, human resources, administration, and sales.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Develop and implement effective sales strategies to achieve company sales goals and revenue targets.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Analyze market trends and customer needs to identify new business opportunities.</Text>
              </View>

            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Team Management:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Lead, mentor, and motivate the sales team to ensure high performance and team cohesion.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Conduct regular sales training and development sessions to improve team skills and productivity.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Bring out the best of the branch’s personnel by providing training, coaching, development, and motivation.</Text>
            </View>
            <View>
              <Text style={styles.label}>Client Relationship Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Build and maintain strong relationships with key clients and stakeholders.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure client satisfaction by providing excellent customer service and addressing any concerns promptly.</Text>
              </View>

              <Text style={styles.label}>Sales Reporting and Analysis:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and present detailed sales reports, forecasts, and performance metrics to senior management.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Use data-driven insights to optimize sales processes and strategies.</Text>
              </View>

              <Text style={styles.label}>Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Work closely with other departments, such as Marketing, Product Development, and Customer Support, to align sales strategies with company objectives.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in cross-functional meetings and contribute to company-wide initiatives.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  };

  const TechSupportOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Tech Back-End Support Executive. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Tech Back-End Support Executive</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:IT/Technical Support</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required as per business needs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>System Maintenance:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Monitor and maintain the health and performance of the company’s back-end systems and servers.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Perform regular system updates, patches, and backups to ensure data security and system integrity.</Text>
              </View>

              <Text style={styles.label}>Troubleshooting:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Diagnose and resolve technical issues related to server performance, software bugs, and connectivity problems.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide timely support to the front-end team and other departments for any back-end related issues.</Text>
              </View>


            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Database Management:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Manage, update, and optimize databases to ensure efficient data storage and retrieval.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Implement data backup and recovery solutions to protect against data loss.</Text>
            </View>
            <View>
              <Text style={styles.label}>Technical Support:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Assist the development team in deploying and integrating new software and system features.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide technical documentation and training to team members as needed.</Text>
              </View>

              <Text style={styles.label}>Security:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Monitor system security and implement necessary measures to protect against unauthorized access and cyber threats.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Conduct regular security audits and vulnerability assessments.</Text>
              </View>

              <Text style={styles.label}>Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Work closely with the front-end team, developers, and other technical staff to ensure seamless system operations.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in cross-functional projects and contribute to the overall IT strategy of the company.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>


            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document >
    )
  };

  const TechnicianOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Tech Back-End Support Executive. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: Tech Back-End Support Executive</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:IT/Technical Support</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required as per business needs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Installation, Maintenance, and Rectification:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Install, maintain, and rectify the equipment and systems as per company standards and client requirements.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Perform routine maintenance checks and troubleshoot issues to ensure optimal operation.</Text>
              </View>

              <Text style={styles.label}>Technical Support:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide technical support and assistance to clients and team members.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Respond to service calls and resolve technical problems in a timely manner.</Text>
              </View>


            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Compliance:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure all work complies with relevant safety standards and regulations.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Maintain accurate records of maintenance and repair activities.</Text>
            </View>

            <Text style={styles.label}>Training and Development:</Text>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in training sessions to stay updated with the latest technologies and industry best practices.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

              <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Assist in training junior technicians and new hires.</Text>
            </View>

            <View>
              <Text style={styles.label}>Inventory Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Manage and maintain inventory of tools, equipment, and spare parts.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure proper documentation and tracking of inventory usage.</Text>
              </View>

              <Text style={styles.label}>Documentation:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Prepare and maintain detailed reports and documentation of all technical work performed.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Document client interactions and service outcomes for future reference.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document >
    )
  };

  const TeleAssociateOfferLetter = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.headText}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.headText}>Dear {employee?.name},</Text>
            <Text style={styles.headText}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Tele Associate. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Job Title: tele Calling Assoiates</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Department:Sale and Marketing</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Start Date: {employee?.joiningDate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Paid time off, sick leave, and public holidays.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Opportunities for professional development, including training and certifications.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Employee wellness programs.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs.</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 2 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Outbound Calls:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Make outbound calls to potential and existing customers to promote products and services.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Provide accurate information about products, services, and promotions to prospective customers.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Follow up on leads and customer inquiries to drive sales opportunities.</Text>
              </View>

            </View>

            <View>
              <Text style={styles.label}>Customer Interaction:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Establish and maintain positive relationships with customers through effective communication.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Address customer queries, resolve issues, and provide excellent service.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Conduct surveys or gather feedback to understand customer needs and improve services.</Text>
              </View>

              <Text style={styles.label}>Sales Goals:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Meet or exceed individual and team sales targets set by the company.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Track and report on sales performance, including calls made, leads generated, and conversions.</Text>
              </View>

              <Text style={styles.label}>Data Management:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Accurately record and maintain customer information and interactions in the CRM system.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Ensure confidentiality and security of customer data.</Text>
              </View>

              <Text style={styles.label}>Team Collaboration:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Work closely with the sales team to achieve collective goals.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Participate in team meetings and contribute ideas for improving processes and sales strategies.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>This offer is contingent upon the successful completion of a background check and reference check.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              </View>
              <View style={{ flexDirection: "row" }}>

                <Text style={styles.text}>•     </Text>   <Text style={[styles.headText, { width: "92%" }]}>There are no leaves and no permissions for 3 months from the joining date.</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>


        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.headText}>To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.headText}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            <Text style={[styles.greetingText, { marginTop: 10, marginBottom: 5, fontWeight: 'bold' }]}>Sincerely,</Text>
            <Text style={styles.greetingText}>{employee.greetingTo}</Text>
            <Text style={styles.greetingText}>{employee.greetingDesignation}</Text>
            <Text style={styles.greetingText}>{employee.greetingPhoneNo} </Text>
            <Text style={styles.greetingText}>{employee.greetingEmail} </Text>
            <Text style={styles.greetingText}>Sharon Telematics Pvt Ltd</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance Offer:</Text>
              <Text style={styles.headText}>I accept this offer of employement with Sharon Telematics Pvt Ltd as outline in this letter. </Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.headText}>Signature: ___________________________</Text>
                <Text style={styles.headText}>Date: ___________________________</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document >
    )
  };

  const TerminationLetter = ({ employee }) => {
    const todayData = getIndiaDate();

    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>Termination Letter</Text>

            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.text}>{employee?.name},</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.branch}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={styles.text}>{employee.designation}</Text>
                <Text style={styles.text}>{employee.department}</Text>
                <Text style={styles.text}>{todayData.split("T")[0]}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>
                This is an official notice that your employment with Sharon Telematics
                Pvt Ltd. is terminated effective {employee.date} for the following
              </Text>

              <Text style={styles.text}> Reasons:</Text>
              <Text style={styles.text}>{employee.description}</Text>
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
                <Text style={styles.text}>Sincerely,</Text>
                <Text style={styles.text}>{employee.greetingTo}</Text>
                <Text style={styles.text}>{employee.greetingDesignation}</Text>
                <Text style={styles.text}>Sharon Telematics Pvt. Ltd.</Text>
                <Text style={styles.text}>Contact: {employee.greetingPhoneNo}</Text>
              </View>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature:</Text>
                <Text style={styles.text}>Date:</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const RelievingLetterPDF = ({ employee }) => {
    const todayData = getIndiaDate();
    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.title}>Relieving Letter</Text>

            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.text}>{employee?.name},</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.branch}</Text>
                <Text style={styles.text}>{employee.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>{employee.designation}</Text>
              <Text style={styles.text}>{employee.department}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>Sub: Relieving Letter</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>Dear {employee.name},</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>
                I am writing to acknowledge receipt of your resignation letter with immediate effect, which you submitted on {employee.resignationDate}. We accept your decision to resign and would like to express our appreciation for your contributions.
              </Text>
              <Text style={styles.text}>
                Your last working day will be {employee.lastWorkingDay}, and we kindly request that you complete any pending tasks and assist in transitioning your responsibilities during this time. We understand that leaving on such short notice requires adjustments, and we will do our best to ensure a smooth handover.
              </Text>
              <Text style={styles.text}>
                Regarding your benefits and dues, we will initiate the necessary processes to settle any outstanding payments, including your final paycheck, accumulated vacation days, and any other eligible benefits. If you have any specific questions or concerns regarding this matter, please do not hesitate to contact our HR Department at {employee.greetingPhoneNo}.
              </Text>
              <Text style={styles.text}>
                Once again, we would like to express our gratitude for your hard work and dedication to the company. We wish you all the best in your future endeavors.
              </Text>
              <Text style={styles.text}>{employee.description}</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Sincerely,</Text>
                <Text style={styles.text}>{employee.greetingTo}</Text>
                <Text style={styles.text}>{employee.greetingDesignation}</Text>
                <Text style={styles.text}>Sharon Telematics Pvt. Ltd.</Text>
                <Text style={styles.text}>Contact: {employee.greetingPhoneNo}</Text>
              </View>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature:</Text>
                <Text style={styles.text}>Date:</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const ResignationLetterPDF = ({ employee }) => {
    const todayData = getIndiaDate();

    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            {/* Title */}
            <Text style={styles.header}>Resignation Letter</Text>

            {/* Profile Section */}
            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: 200 }}>
                <Text style={styles.text}>{employee?.name},</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.branch}</Text>
                <Text style={styles.text}>{employee.address}</Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}> {getIndiaDate()}</Text>
              </View>
            </View>

            {/* Employee Details */}
            <View style={styles.section}>
              <Text style={styles.text}>Company Name: SharlonTelematrice</Text>
              <Text style={styles.text}>Company Address: Visakhaptnam</Text>
            </View>

            {/* Letter Content */}
            <View style={styles.section}>
              <Text style={styles.text}>Dear Sir/Madam,</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>
                I am writing this letter to officially resign from my position at {employee.companyName} as of {employee.resignationDate}.
              </Text>
              <Text style={styles.text}>
                Working at SharlonTelematrice as a {employee.designation} has been a fulfilling experience. However, I have chosen to leave due to {employee.resignationReason}. My last working day will be {employee.lastWorkingDay}.
              </Text>
              <Text style={styles.text}>
                I deeply appreciate the support and opportunities I have received during my tenure at SharlonTelematrice. I will always value my experiences and the knowledge gained here.
              </Text>
              <Text style={styles.text}>
                {employee.description}
              </Text>
            </View>

            {/* Signature Section */}
            <View style={styles.signatureSection}>
              <Text style={styles.text}>Sincerely,</Text>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>{employee.name}</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.staffPhoneNo}</Text>
                <Text style={styles.text}>{employee.staffEmail}</Text>
              </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Sharon Telematics Private Limited</Text>
              <Text style={styles.footerText}>Registered Office: Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009</Text>
              <Text style={styles.footerText}>CIN: U74999AP2021PTC118557 | PAN: AAVCS8794B</Text>
              <Text style={styles.footerText}>Email: info@sharontelematics.com | Website: www.sharontelematics.com</Text>
            </View>
          </View>
        </Page>

      </Document>
    )
  };

  const employeePayroll = async (formdata) => {

    try {
      const response = await ApiService.post(
        "/PAYROLL/getPayRollStaffDetails",
        {
          staffId: staffDetails.staffId,
          month: formdata.paySlipMonth,
          year: formdata.paySlipYear,
        }
      );
      if (response.status) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      //alert('Failed to fetch staff details.');
    }
  };

  const PayrollLetterPDF = ({ employee }) => {

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[employeeData?.month - 1];
    const payslipTitle = `Payslip for the month of ${monthName} ${employeeData?.year}`;
    // Show loading message while fetching data
    if (!employeeData) return <Text>Loading payroll data...</Text>;
    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ padding: 20, height: "100%", borderRadius: 5 }}>

            {/* Company Header */}
            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              {payslipTitle}
            </Text>

            {/* Employee Details */}
            <View style={[styles.payslipSection, { borderWidth: 2, borderColor: "#333333" }]}>
              <View style={[styles.column, { borderRightWidth: 2, borderColor: "#333333" }]}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Employee ID:</Text> <Text>{employeeData.staffId}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Name:</Text> <Text style={{width:110}}>{employeeData.staffName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Designation:</Text> <Text>{employeeData.designation}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Days Worked:</Text> <Text>{employeeData.presentDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Leave Days:</Text> <Text>{employeeData.leaveDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Late Days:</Text> <Text>{employeeData.lateDays}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Month Days:</Text> <Text>{employeeData.monthDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Total OT Hours:</Text> <Text>{employeeData.totalOTHours} hrs</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: "space-between",  paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Per Day Salary:</Text> <Text>₹{employeeData.perDaySalary}</Text>
                </View> */}
                {/* <View style={{ flexDirection: 'row', justifyContent: "space-between",  paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Per Hour Salary:</Text> <Text>₹{employeeData.perHourSalary}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>Bank Account No:</Text> <Text>N/A</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>PAN:</Text> <Text>N/A</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 0 }}>
                  <Text style={styles.payslipLabel}>UAN:</Text> <Text>N/A</Text>
                </View>
              </View>
            </View>

            {/* Earnings & Deductions Table */}

            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cell}>Earnings</Text>
                <Text style={[styles.cell, { borderRight: 2 }]}>Amount (₹)</Text>
                <Text style={styles.cell}>Deductions</Text>
                <Text style={styles.cell}>Amount (₹)</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell}>Actual Salary</Text>
                <Text style={[styles.cell, { borderRight: 2 }]}>{employeeData.actualSalary}</Text>
                <Text style={styles.cell}>ESI Employee</Text>
                <Text style={styles.cell}>{employeeData.ESIC_Employee}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell}>OT Amount</Text>
                <Text style={[styles.cell, { borderRight: 2 }]}>{employeeData.OTAmount}</Text>
                <Text style={styles.cell}>ESI </Text>
                <Text style={styles.cell}>{employeeData.ESIC_Employer}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell}>Food Allowance</Text>
                <Text style={[styles.cell, { borderRight: 2 }]}>{employeeData.foodAllowance}</Text>
                <Text style={styles.cell}>PF(Employee)</Text>
                <Text style={styles.cell}>{employeeData.PF_Employee}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell}>Incentives</Text>
                <Text style={[styles.cell, { borderRight: 2 }]}>{employeeData.incentives}</Text>
                <Text style={styles.cell}>PF (Employer 1)</Text>
                <Text style={styles.cell}>{employeeData.PF_Employer1}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell}>Leave Encashment</Text>
                <Text style={[styles.cell, { borderRight: 2 }]}>{employeeData.leaveEncashment}</Text>
                <Text style={styles.cell}>Professional Tax</Text>
                <Text style={styles.cell}>{employeeData.professionalTax}</Text>
              </View>
              <View style={styles.mainRow}>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>Total Earnings</Text>
                <Text style={[styles.cell, { borderRight: 2, fontWeight: 'bold' }]}>{employeeData.grossSalary}</Text>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>Total Deductions</Text>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>{employeeData.lateDeductions}</Text>
              </View>
              <View style={[styles.mainRow,{padding:10}]}>
                <Text style={[styles.lastcell, {flex:3, fontWeight: 'bold' }]}> Net Pay ( {toWords(employeeData.netSalary)} )</Text>
                <Text style={[styles.lastcell, {flex:1, fontWeight: 'bold' }]}>  Rs {employeeData.netSalary}</Text>
                {/* <Text style={[styles.cell, { fontWeight: 'bold'}]}> </Text> */}
              </View>
            </View>

            {/* Signature */}
            {/* <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text>Employee's Signature</Text>
              </View>
              <View>
                <Text>Authorized Signature</Text>
              </View>
            </View> */}
            <Text style={[styles.footer, { fontWeight: 'bold', marginVertical: 10, fontSize: 14 }]}>This is a system-generated payslip and does not require a signature.</Text>
          </View>
        </Page>

      </Document>
    )
  };

  const letterComponents = {
    offer: {
      component: <OfferLetter employee={formData} />,
      fileName: "offer_letter.pdf",
      label: "Download Offer Letter",
    },

    branchManagerOfferLetter: {
      component: <BranchManagerOfferLetter employee={formData} />,
      fileName: "branchManagerOffer_letter.pdf",
      label: "Download Branch Manager Offer Letterr",
    },

    accountantOfferLetter: {
      component: < AccountantOfferLetter employee={formData} />,
      fileName: " AccountantOffer_letter.pdf",
      label: "Download Accountant Offer Letter",
    },

    digitalManagerOfferLetter: {
      component: < DigitalManagerOfferLetter employee={formData} />,
      fileName: " DigitalManagerOffer_letter.pdf",
      label: "Download DigitalManager Offer Letter",
    },

    FieldSalesManagerOfferLetter: {
      component: < FieldSalesManagerOfferLetter employee={formData} />,
      fileName: " FieldSalesManagerOffer_letter.pdf",
      label: "Download FieldSalesManager Offer Letter",
    },

    OperationAssociateOfferLetter: {
      component: < OperationAssociateOfferLetter employee={formData} />,
      fileName: " OperationAssociateOffer_letter.pdf",
      label: "Download Operation Associate Offer Letter",
    },


    OperationalManagerOfferLetter: {
      component: < OperationalManagerOfferLetter employee={formData} />,
      fileName: " OperationalManagerOffer_letter.pdf",
      label: "Download Operational Manager Offer Letter",
    },

    SalesManagerOfferLetter: {
      component: < SalesManagerOfferLetter employee={formData} />,
      fileName: " SalesManagerOffer_letter.pdf",
      label: "Download Sales Manager Offer Letter",
    },

    TechSupportOfferLetter: {
      component: < TechSupportOfferLetter employee={formData} />,
      fileName: " TechSupportOffer_letter.pdf",
      label: "Download TechSupport Offer Letter",
    },

    TechnicianOfferLetter: {
      component: < TechnicianOfferLetter employee={formData} />,
      fileName: " TechnicianOffer_letter.pdf",
      label: "Download Technician Offer Letter",
    },

    TeleAssociateOfferLetter: {
      component: <  TeleAssociateOfferLetter employee={formData} />,
      fileName: "  TeleAssociateOffer_letter.pdf",
      label: "Download  Tele Associate Offer Letter",
    },

    termination: {
      component: <TerminationLetter employee={formData} />,
      fileName: "termination_letter.pdf",
      label: "Download Termination Letter",
    },
    relieving: {
      component: <RelievingLetterPDF employee={formData} />,
      fileName: "relieving_letter.pdf",
      label: "Download Relieving Letter",
    },
    resignation: {
      component: <ResignationLetterPDF employee={formData} />,
      fileName: "resignation_letter.pdf",
      label: "Download Resignation Letter",
    },
    payroll: {
      component: <PayrollLetterPDF employee={formData} />,
      fileName: "payroll_letter.pdf",
      label: "Download PaySlip",
    },
  };

  const { component, fileName, label } = letterComponents[letterType] || letterComponents["payroll"];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", width: "100%" }}>

      <div style={{ flex: 1 }}>
        <h1>Letter Generator</h1>

        <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
          <select onChange={(e) => setLetterType(e.target.value)}>
            <option value="offer">HR Offer Letter</option>
            <option value={"branchManagerOfferLetter"}>branchManagerOfferLetter</option>
            <option value={"accountantOfferLetter"}>accountantOfferLetter</option>
            <option value={"digitalManagerOfferLetter"}>digitalManagerOfferLetter</option>
            <option value={"FieldSalesManagerOfferLetter"}>FieldSalesManagerOfferLetter</option>
            <option value={"OperationAssociateOfferLetter"}>OperationAssociateOfferLetter</option>
            <option value={"OperationalManagerOfferLetter"}>OperationalManagerOfferLetter</option>
            <option value={"SalesManagerOfferLetter"}>SalesManagerOfferLetter</option>
            <option value={"TechSupportOfferLetter"}>TechSupportOfferLetter</option>
            <option value={"TechnicianOfferLetter"}>TechnicianOfferLetter</option>
            <option value={"TeleAssociateOfferLetter"}>TeleAssociateOfferLetter</option>
            <option value="termination">Termination Letter</option>
            <option value="relieving">Relieving Letter</option>
            <option value="resignation">Resignation Letter</option>
            <option value="paySlip">PaySlip </option>
          </select>
          <FaDownload
            className="text-xl text-red-500"
          />
        </div>

        <StaffDropdown setStaffDetails={setStaffDetails} />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
          onChange={handleChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
          value={formData.designation}
          onChange={handleChange}
        />

        {letterType === "offer" && (
          <div>
            <input
              type="text"
              name="reportingTo"
              placeholder="Reporting To"
              value={formData.reportingTo}
              className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
              onChange={handleChange}
            />

            <input
              type="text"
              name="salary"
              placeholder="Salary"
              className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        )}

        {letterType === "termination" && (
          <div>
            <input
              type="date"
              name="terminationDate"
              placeholder="Termination Date"
              value={formData.terminationDate}
              className="flex justify-between items-center shadow-lg w-full rounded-md p-4 my-8 border border-gray-200"
              onChange={handleChange}
            />
          </div>
        )}

        {letterType === "relieving" && (
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="flex justify-between items-center shadow-lg w-full rounded-md p-4 my-8 border border-gray-200"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        )}

        {letterType === "paySlip" && (
          <div>
            <input
              type="month"
              name="paySlipMonthYear"
              placeholder="Month"
              value={formData.paySlipMonthYear}
              className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
              onChange={handleDateChange}
            />
          </div>
        )}

        {(letterType === "resignation" || letterType === "relieving" || letterType === "termination") && (
          <div>
            <input
              type="date"
              name="resignationDate"
              placeholder="Resignation Date"
              value={formData.resignationDate}
              className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
              onChange={handleChange}
            />
            <input
              type="number"
              name="experienceData"
              placeholder="Experience (Years)"
              value={formData.experienceData}
              className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
              onChange={handleChange}
            />
          </div>
        )}

        <input
          type="date"
          name="joiningDate"
          className="flex justify-between items-center w-full shadow-lg rounded-md p-4 my-8 border border-gray-200"
          value={formData.joiningDate}
          onChange={handleChange}
        />

        <input
          type="text"
          name="greetingTo"
          placeholder="Greeting To"
          className="flex justify-between items-center shadow-lg w-full rounded-md p-4 my-8 border border-gray-200"
          value={formData.greetingTo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="greetingDesignation"
          placeholder="Greeting Designation"
          className="flex justify-between items-center shadow-lg w-full rounded-md p-4 my-8 border border-gray-200"
          value={formData.greetingDesignation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="greetingEmail"
          placeholder="Greeting Email"
          className="flex justify-between items-center shadow-lg w-full rounded-md p-4 my-8 border border-gray-200"
          value={formData.greetingEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="greetingPhoneNo"
          placeholder="Greeting PhoneNo"
          className="flex justify-between items-center shadow-lg w-full rounded-md p-4 my-8 border border-gray-200"
          value={formData.greetingPhoneNo}
          onChange={handleChange}
        />

        {/* <PDFDownloadLink
        className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"
        document={component}
        fileName={fileName}
      >
        {label}
      </PDFDownloadLink> */}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 className="text-lg font-semibold my-4">{label}</h2>
        <PDFViewer width="100%" height="600px" style={{ border: "1px solid #ccc" }}>
          {component}
        </PDFViewer>
      </div>

    </div>
  );
};

export default Letters;

