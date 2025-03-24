import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { FaDownload, FaChevronDown } from 'react-icons/fa';
import StaffDropdown from "../../components/staffDropdownId";
import ApiService from "../../services/ApiService";
const Letters = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    staffId: "",
    branch: "",
    reportingTo: "",
    salary: "",
    terminationDate: "",
    address: "",
    staffPhoneNo: "",
    staffEmail: "",
    department: "",
    paySlipMonthYear: "",
    resignationDate: "",
    experienceData: "",
    description: "",
    joiningDate: "",
    paySlipYear: "",
    paySlipMonth: "",
    greetingTo: "",
    greetingDesignation: "",
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
        joiningDate: staffDetails.joiningDate || "",
        address: staffDetails.address || "",
        department: staffDetails.department || "",
        resignationDate: staffDetails.resignationDate || "",
        terminationDate: staffDetails.terminationDate || "",
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
      padding: 15,
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
      fontWeight: "bold",
      fontSize: 12, fontFamily: "Times-Roman",
      marginTop: 5,
    },
    text: {
      fontSize: 10, fontFamily: "Times-Roman",
      textAlign: "justify", marginVertical: 4
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
      marginTop: 20,
      // borderTop: "1px solid #000",
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
      textAlign: 'right',
    },
    footerText: {
      marginBottom: 2, alignSelf: 'center', fontSize: 8, justifyContent: "center"
    },
    normalText: { letterSpacing: 2, lineHeight: 10, fontFamily: "Times-Roman" },
    title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, fontFamily: "Times-Roman" },
    payslipSection: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    column: { width: '50%' },
    paysliptext: { marginBottom: 5, fontFamily: "Times-Roman" },
    table: { width: '100%', borderWidth: 1 },
    row: { flexDirection: 'row', border: 1 },
    cell: { flex: 1, textAlign: 'left', paddingHorizontal: 5, fontFamily: "Times-Roman" },
    footer: { marginTop: 10, position: 'absolute', bottom: 5, left: 0, right: 0, textAlign: 'center', fontSize: 10, fontStyle: 'italic', fontFamily: "Times-Roman" }
  });

  const OfferLetter = ({ employee }) => {
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>
              We are pleased to extend an offer of employment for the designation of {employee?.designation} at Sharon Telematics Pvt Ltd.
            </Text>
            <View style={styles.section}>
              <Text style={styles.label}>Designation Details:</Text>
              <Text style={styles.text}>• Job Title: {employee?.designation}</Text>
              <Text style={styles.text}>• Department: {employee?.department}</Text>
              <Text style={styles.text}>• Reporting To: {employee?.reportingTo}</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA + Incentives</Text>
              <Text style={styles.text}>• Hike: Performance-based increments annually</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <Text style={styles.text}>• Life insurance coverage. </Text>
              <Text style={styles.text}>• Paid time off sick leave, and public holidays. </Text>
              <Text style={styles.text}>• Professional development and training opportunities.  </Text>
              <Text style={styles.text}>• Employee wellness programs.  </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs. </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>
              <Text style={styles.text}>• Engage with customers and recommend products</Text>
              <Text style={styles.text}>• Maintain a high level of product knowledge</Text>
              <Text style={styles.text}>• Meet or exceed sales targets</Text>
              <Text style={styles.text}>• Build and maintain strong customer relationships</Text>
              <Text style={styles.text}>• Accurately record all sales activities</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sales Targets:</Text>
              <Text style={styles.text}>•  Meet or exceed individual sales targets set by the company.</Text>
              <Text style={styles.text}>• Actively seek out new sales opportunities through cold calling, networking, and in-person meetings.</Text>
              <Text style={styles.text}>• Track and report on your sales performance, including leads generated, conversions, and revenue.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Relationship Building:</Text>
              <Text style={styles.text}>• Build and maintain strong, long-lasting customer relationships to drive repeat business.</Text>
              <Text style={styles.text}>• Follow up with existing customers to ensure satisfaction and promote additional products or services.</Text>
              <Text style={styles.text}>•  Attend industry events, trade shows, and networking opportunities to develop new sales leads.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Sales Administration:</Text>
              <Text style={styles.text}>•  Accurately record all sales activities, customer interactions, and transactions in the CRM system. </Text>
              <Text style={styles.text}>•  Prepare and submit regular sales reports to your manager.</Text>
              <Text style={styles.text}>• Collaborate with other team members and departments to ensure smooth sales operations and customer satisfaction.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Sales Administration:</Text>
              <Text style={styles.text}>•  Accurately record all sales activities, customer interactions, and transactions in the CRM system. </Text>
              <Text style={styles.text}>•  Prepare and submit regular sales reports to your manager.</Text>
              <Text style={styles.text}>• Collaborate with other team members and departments to ensure smooth sales operations and customer satisfaction.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Market Research:</Text>
              <Text style={styles.text}>• Stay informed about market trends, competitors, and industry developments. </Text>
              <Text style={styles.text}>• Provide feedback to the sales team and management on customer preferences, market conditions, and product needs.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Team Collaboration:</Text>
              <Text style={styles.text}>• Participate in sales meetings, training sessions, and team-building activities. </Text>
              <Text style={styles.text}>• Share best practices and strategies with colleagues to help the team achieve its collective goals.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check. </Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company "</Text>
              <Text style={styles.text}>• can terminate the employment relationship after the bond period, with or without cause and with or without notice."</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and on boarding costs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>
            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View>
                <Text style={styles.label}>Dear {employee?.name}</Text>
                <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Accountant. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
              </View>

            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Accountant</Text>
              <Text style={styles.text}>• Department: Finance</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings</Text>
              <Text style={styles.text}>• Performance-Based Hike: Salary increments will be based on your annual performance review</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <Text style={styles.text}>• Paid time off, sick leave, and public holidays.</Text>
              <Text style={styles.text}>• Professional development opportunities, including training and certifications.</Text>
              <Text style={styles.text}>• Employee wellness programs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required during peak periods, such as year-end financial close.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Accountant:</Text>
              <Text style={styles.text}>• Financial Records Management</Text>
              <Text style={styles.text}>• Oversee and maintain accurate financial records, including general ledger entries, accounts payable, accounts receivable, and financial statements.</Text>
              <Text style={styles.text}>• Ensure timely and accurate preparation of monthly, quarterly, and annual financial reports in compliance with accounting standards and company policies.</Text>
              <Text style={styles.text}>• Coordinate and manage budgeting and forecasting processes, providing insights and recommendations to support financial planning and decision-making.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Tax Compliance:</Text>
              <Text style={styles.text}>• Manage and ensure the accuracy of tax filings, including income tax, GST, and other applicable taxes.</Text>
              <Text style={styles.text}>• Stay updated on changes in tax regulations and advise management on compliance requirements and potential impacts.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Audit Support:</Text>
              <Text style={styles.text}>• Lead the coordination with external auditors during annual audits and ensure the timely provision of required documentation.</Text>
              <Text style={styles.text}>• Conduct internal audits to assess the accuracy and compliance of financial records and processes.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Bank Reconciliation:</Text>
              <Text style={styles.text}>• Perform regular bank reconciliations to verify the accuracy of financial transactions and statements.</Text>
              <Text style={styles.text}>• Reconcile payroll-related accounts and resolve any discrepancies in payroll data.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Financial Analysis:</Text>
              <Text style={styles.text}>• Analyze financial data to identify trends, variances, and areas for improvement.</Text>
              <Text style={styles.text}>• Prepare and present detailed financial analysis reports to senior management, including recommendations for enhancing financial performance.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Process Improvement:</Text>
              <Text style={styles.text}>• Identify and implement best practices and process improvements in financial management and payroll operations.</Text>
              <Text style={styles.text}>• Utilize the latest tools and technologies to enhance efficiency and accuracy in accounting and payroll functions.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check. </Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and on boarding costs.</Text>
              <Text style={styles.text}>• There are no Leaves and no permissions for 3 months from the Joining date.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Accountant. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Digital Marketing</Text>
              <Text style={styles.text}>• Department: Marketing</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings</Text>
              <Text style={styles.text}>• Hike: Your salary will be subject to performance-based increments, evaluated annually.</Text>
              <Text style={styles.text}>• Benefits: You will be eligible for our standard benefits package, which currently includes health insurance, paid time off, and other benefits. More details will be provided upon your joining.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required as per business needs.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>
              <Text style={styles.text}>• Digital Marketing Strategy</Text>
              <Text style={styles.text}>• Develop and implement comprehensive digital marketing strategies to increase brand awareness, drive traffic, and generate leads.</Text>
              <Text style={styles.text}>• Monitor and analyze the performance of digital marketing campaigns, making data-driven decisions to optimize results.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Content Marketing:</Text>
              <Text style={styles.text}>• Create and manage content for various digital platforms, including the company website, blog, social media, and email marketing.</Text>
              <Text style={styles.text}>• Collaborate with the design and content teams to produce engaging and SEO-friendly content.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Social Media Management:</Text>
              <Text style={styles.text}>• Manage and grow the company’s social media presence across platforms like Facebook, Twitter, LinkedIn, Instagram, and others.</Text>
              <Text style={styles.text}>• Develop and schedule posts, monitor engagement, and respond to customer inquiries on social media.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Analytics and Reporting:</Text>
              <Text style={styles.text}>• Use tools like Google Analytics, Google Search Console, and social media analytics to track the performance of digital marketing initiatives.</Text>
              <Text style={styles.text}>• Prepare and present detailed reports on campaign performance, ROI, and recommendations for improvement.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Field Sales Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Field Sales Manager</Text>
              <Text style={styles.text}>• Department: Marketing</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Commission: You will be eligible for a sales commission based on your performance and achievement of sales targets.</Text>
              <Text style={styles.text}>Benefits:</Text>
              <Text style={styles.text}>• Life insurance coverage.</Text>
              <Text style={styles.text}>• Paid time off sick leave, and public holidays.</Text>
              <Text style={styles.text}>• Professional development and training opportunities.</Text>
              <Text style={styles.text}>• Employee wellness programs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>
              <Text style={styles.text}>• Sales and Customer Interaction</Text>
              <Text style={styles.text}>• Engage with customers to understand their needs and recommend suitable products and services.</Text>
              <Text style={styles.text}>• Provide detailed information about the products and services offered by the company.</Text>
              <Text style={styles.text}>• Handle customer inquiries, resolve complaints, and ensure a positive customer experience.</Text>
              <Text style={styles.text}>• Maintain a high level of product knowledge to effectively communicate features and benefits to customers.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sales Targets:</Text>
              <Text style={styles.text}>• Meet or exceed individual sales targets set by the company.</Text>
              <Text style={styles.text}>• Actively seek out new sales opportunities through cold calling, networking, and in-person meetings.</Text>
              <Text style={styles.text}>• Track and report on your sales performance, including leads generated, conversions, and revenue.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Relationship Building:</Text>
              <Text style={styles.text}>• Build and maintain strong, long-lasting customer relationships to drive repeat business.</Text>
              <Text style={styles.text}>• Follow up with existing customers to ensure satisfaction and promote additional products or services.</Text>
              <Text style={styles.text}>• Attend industry events, trade shows, and networking opportunities to develop new sales leads.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sales Administration:</Text>
              <Text style={styles.text}>• Accurately record all sales activities, customer interactions, and transactions in the CRM system.</Text>
              <Text style={styles.text}>• Prepare and submit regular sales reports to your manager.</Text>
              <Text style={styles.text}>• Collaborate with other team members and departments to ensure smooth sales operations and customer satisfaction.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Market Research:</Text>
              <Text style={styles.text}>• Stay informed about market trends, competitors, and industry developments.</Text>
              <Text style={styles.text}>• Provide feedback to the sales team and management on customer preferences, market conditions, and product needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Team Collaboration:</Text>
              <Text style={styles.text}>• Participate in sales meetings, training sessions, and team-building activities.</Text>
              <Text style={styles.text}>• Share best practices and strategies with colleagues to help the team achieve its collective goals.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Operation Associate. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Operation Associate</Text>
              <Text style={styles.text}>• Department:Operational Support</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Rotational Shifts from Monday to Saturday:</Text>
              <Text style={styles.text}>SHIFT 1 - 8:00 AM to 5:00 PM</Text>
              <Text style={styles.text}>SHIFT 2 - 3:00 PM to 12:00 AM</Text>
              <Text style={styles.text}>• Employees working in Shift 1 will have Fridays & Sunday as their Week Off, while Sunday will be a working day with timings from 9:00 AM to 6:00 PM.</Text>
              <Text style={styles.text}>• Overtime may be required as per business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Applications:</Text>
              <Text style={styles.text}>• Act as a liaison with the business community in all aspects of report, data feed, and application development.</Text>

              <Text style={styles.label}>Complaints:</Text>
              <Text style={styles.text}>• Evaluates and resolves complaints.</Text>
              <Text style={styles.text}>• Verify complaint type and update if necessary.</Text>
              <Text style={styles.text}>• Perform follow-up activities to obtain additional information.</Text>
              <Text style={styles.text}>• Report assessments.</Text>
              <Text style={styles.text}>• Process complaints according to policies and standard operating procedures.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>System Maintenance:</Text>
              <Text style={styles.text}>• Perform regular system updates, patches, and backups to ensure data security and system integrity.</Text>

              <Text style={styles.label}>Troubleshooting:</Text>
              <Text style={styles.text}>• Provide timely support to the front-end team for dealers on any back-end related issues.</Text>

              <Text style={styles.label}>Collaboration:</Text>
              <Text style={styles.text}>• Work closely with the front-end team, developers, and other technical staff to ensure seamless system operations.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Operational Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Operational Manager</Text>
              <Text style={styles.text}>• Department:Operations</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Performance-Based Bonuses: Eligibility for performance-based bonuses contingent upon achieving operational targets and goals.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <Text style={styles.text}>• Comprehensive Life insurance coverage for you.</Text>
              <Text style={styles.text}>• Paid time off including sick leave, and public holidays.</Text>
              <Text style={styles.text}>• Professional development opportunities, including training programs and workshops.</Text>
              <Text style={styles.text}>• Employee wellness programs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Operational Oversight:</Text>
              <Text style={styles.text}>• Oversee and manage daily operations across all branches to ensure efficient and effective functioning.</Text>
              <Text style={styles.text}>• Develop and implement operational policies and procedures to enhance branch performance and standardize practices.</Text>
              <Text style={styles.text}>• Monitor and evaluate branch performance metrics, providing actionable feedback and support to branch managers.</Text>
              <Text style={styles.text}>• Conduct regular site visits to branches for operational assessments, addressing issues, and ensuring adherence to company standards and policies.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Team Management:</Text>
              <Text style={styles.text}>• Lead, mentor, and manage branch managers and operational staff, setting clear performance goals and expectations.</Text>
              <Text style={styles.text}>• Implement training and development programs to improve team skills, knowledge, and performance across all branches.</Text>
              <Text style={styles.text}>• Facilitate effective communication and collaboration between branches and the central office.</Text>

              <Text style={styles.label}>Process Improvement:</Text>
              <Text style={styles.text}>• Identify and implement process improvements across all branches to optimize efficiency and service quality.</Text>
              <Text style={styles.text}>• Develop and oversee standardized operating procedures and best practices to ensure consistent service delivery and operational excellence.</Text>

              <Text style={styles.label}>Budget and Resource Management:</Text>
              <Text style={styles.text}>• Prepare and manage branch budgets, ensuring cost-effective operations and resource allocation.</Text>
              <Text style={styles.text}>• Oversee procurement and inventory management to ensure timely and cost-effective acquisition of necessary equipment and supplies.</Text>
              <Text style={styles.text}>• Monitor and control expenses to stay within budgetary limits while meeting operational needs.</Text>

              <Text style={styles.label}>Project Management:</Text>
              <Text style={styles.text}>• Lead and manage operational projects such as branch expansions, relocations, or system upgrades, ensuring projects are completed on time and within budget.</Text>
              <Text style={styles.text}>• Coordinate with other departments and external vendors to achieve project goals and address any arising issues.</Text>

              <Text style={styles.label}>Reporting and Analysis:</Text>
              <Text style={styles.text}>• Prepare and present comprehensive reports on branch performance, including financials, key metrics, and progress towards strategic goals.</Text>
              <Text style={styles.text}>• Analyze operational data to identify trends, areas for improvement, and opportunities for growth.</Text>
              <Text style={styles.text}>• Provide strategic recommendations to senior management based on performance analysis and market conditions.</Text>

              <Text style={styles.label}>Compliance and Risk Management:</Text>
              <Text style={styles.text}>• Ensure all branches comply with company policies, industry regulations, and legal requirements.</Text>
              <Text style={styles.text}>• Develop and implement risk management strategies to mitigate operational risks and safeguard the company’s assets and reputation.</Text>
              <Text style={styles.text}>• Address and resolve any compliance or operational issues in a timely manner.</Text>

              <Text style={styles.label}>Customer Relations:</Text>
              <Text style={styles.text}>• Oversee customer service operations across branches to ensure high levels of customer satisfaction.</Text>
              <Text style={styles.text}>• Address and resolve any customer complaints or issues that arise, ensuring timely and effective solutions.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Strategic Planning:</Text>
              <Text style={styles.text}>• Contribute to strategic planning and goal-setting for branch operations, aligning branch activities with overall company objectives.</Text>
              <Text style={styles.text}>• Support the implementation of company-wide initiatives and strategies at the branch level.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Sales Manager. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Sales Manager</Text>
              <Text style={styles.text}>• Department:Sales</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Hike: Your salary will be subject to performance-based increments, evaluated annually.</Text>
              <Text style={styles.text}>• Benefits: You will be eligible for our standard benefits package, which currently includes health insurance, retirement plan, paid time off, and other benefits. More details will be provided upon your joining.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime and travel may be required as per business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Sales Strategy and Planning:</Text>
              <Text style={styles.text}>• Direct all operational aspects including distribution operations, customer service, human resources, administration, and sales.</Text>
              <Text style={styles.text}>• Develop and implement effective sales strategies to achieve company sales goals and revenue targets.</Text>
              <Text style={styles.text}>• Analyze market trends and customer needs to identify new business opportunities.</Text>

              <Text style={styles.label}>Team Management:</Text>
              <Text style={styles.text}>• Lead, mentor, and motivate the sales team to ensure high performance and team cohesion.</Text>
              <Text style={styles.text}>• Conduct regular sales training and development sessions to improve team skills and productivity.</Text>
              <Text style={styles.text}>• Bring out the best of the branch’s personnel by providing training, coaching, development, and motivation.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Client Relationship Management:</Text>
              <Text style={styles.text}>• Build and maintain strong relationships with key clients and stakeholders.</Text>
              <Text style={styles.text}>• Ensure client satisfaction by providing excellent customer service and addressing any concerns promptly.</Text>

              <Text style={styles.label}>Sales Reporting and Analysis:</Text>
              <Text style={styles.text}>• Prepare and present detailed sales reports, forecasts, and performance metrics to senior management.</Text>
              <Text style={styles.text}>• Use data-driven insights to optimize sales processes and strategies.</Text>

              <Text style={styles.label}>Collaboration:</Text>
              <Text style={styles.text}>• Work closely with other departments, such as Marketing, Product Development, and Customer Support, to align sales strategies with company objectives.</Text>
              <Text style={styles.text}>• Participate in cross-functional meetings and contribute to company-wide initiatives.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Tech Back-End Support Executive. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Tech Back-End Support Executive</Text>
              <Text style={styles.text}>• Department:IT/Technical Support</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required as per business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>System Maintenance:</Text>
              <Text style={styles.text}>• Monitor and maintain the health and performance of the company’s back-end systems and servers.</Text>
              <Text style={styles.text}>• Perform regular system updates, patches, and backups to ensure data security and system integrity.</Text>

              <Text style={styles.label}>Troubleshooting:</Text>
              <Text style={styles.text}>• Diagnose and resolve technical issues related to server performance, software bugs, and connectivity problems.</Text>
              <Text style={styles.text}>• Provide timely support to the front-end team and other departments for any back-end related issues.</Text>

              <Text style={styles.label}>Database Management:</Text>
              <Text style={styles.text}>• Manage, update, and optimize databases to ensure efficient data storage and retrieval.</Text>
              <Text style={styles.text}>• Implement data backup and recovery solutions to protect against data loss.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Technical Support:</Text>
              <Text style={styles.text}>• Assist the development team in deploying and integrating new software and system features.</Text>
              <Text style={styles.text}>• Provide technical documentation and training to team members as needed.</Text>

              <Text style={styles.label}>Security:</Text>
              <Text style={styles.text}>• Monitor system security and implement necessary measures to protect against unauthorized access and cyber threats.</Text>
              <Text style={styles.text}>• Conduct regular security audits and vulnerability assessments.</Text>

              <Text style={styles.label}>Collaboration:</Text>
              <Text style={styles.text}>• Work closely with the front-end team, developers, and other technical staff to ensure seamless system operations.</Text>
              <Text style={styles.text}>• Participate in cross-functional projects and contribute to the overall IT strategy of the company.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Tech Back-End Support Executive. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: Tech Back-End Support Executive</Text>
              <Text style={styles.text}>• Department:IT/Technical Support</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Overtime may be required as per business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Installation, Maintenance, and Rectification:</Text>
              <Text style={styles.text}>• Install, maintain, and rectify the equipment and systems as per company standards and client requirements.</Text>
              <Text style={styles.text}>• Perform routine maintenance checks and troubleshoot issues to ensure optimal operation.</Text>

              <Text style={styles.label}>Technical Support:</Text>
              <Text style={styles.text}>• Provide technical support and assistance to clients and team members.</Text>
              <Text style={styles.text}>• Respond to service calls and resolve technical problems in a timely manner.</Text>

              <Text style={styles.label}>Compliance:</Text>
              <Text style={styles.text}>• Ensure all work complies with relevant safety standards and regulations.</Text>
              <Text style={styles.text}>• Maintain accurate records of maintenance and repair activities.</Text>

              <Text style={styles.label}>Training and Development:</Text>
              <Text style={styles.text}>• Participate in training sessions to stay updated with the latest technologies and industry best practices.</Text>
              <Text style={styles.text}>• Assist in training junior technicians and new hires.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Inventory Management:</Text>
              <Text style={styles.text}>• Manage and maintain inventory of tools, equipment, and spare parts.</Text>
              <Text style={styles.text}>• Ensure proper documentation and tracking of inventory usage.</Text>

              <Text style={styles.label}>Documentation:</Text>
              <Text style={styles.text}>• Prepare and maintain detailed reports and documentation of all technical work performed.</Text>
              <Text style={styles.text}>• Document client interactions and service outcomes for future reference.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>


            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>OFFER LETTER</Text>


            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name}</Text>
                <Text style={styles.paysliptext}>{employee?.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <Text style={styles.text}>Dear {employee?.name},</Text>
            <Text style={styles.text}>This letter is to offer you a position with the company. It is with great pleasure that we offer you the position as Tele Associate. You will be based in Vishakhapatnam and Report to the Manager {employee.reportingTo}. Based on your capabilities & Accomplishments, I believe that your talents will not only benefit the company but also our mutual relationship will assist you in reaching your personal and professional goals</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Position Details:</Text>
              <Text style={styles.text}>• Job Title: tele Calling Assoiates</Text>
              <Text style={styles.text}>• Department:Sale and Marketing</Text>
              <Text style={styles.text}>• Reporting To: Suneel.G, Director of Sharon Telematics Pvt Ltd</Text>
              <Text style={styles.text}>• Start Date: {employee?.joiningDate}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Compensation and Benefits:</Text>
              <Text style={styles.text}>• Base Salary: {employee?.salary} LPA, subject to standard deductions and withholdings.</Text>
              <Text style={styles.text}>• Performance-Based Hike: Salary increments will be based on your annual performance review.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Benefits:</Text>
              <Text style={styles.text}>• Paid time off, sick leave, and public holidays.</Text>
              <Text style={styles.text}>• Opportunities for professional development, including training and certifications.</Text>
              <Text style={styles.text}>• Employee wellness programs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Work Schedule:</Text>
              <Text style={styles.text}>• Your regular work hours will be Monday to Saturday, 9:00 AM to 6:00 PM. Additional hours or weekend work may be required based on business needs.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Roles and Responsibilities:</Text>

              <Text style={styles.label}>Outbound Calls:</Text>
              <Text style={styles.text}>• Make outbound calls to potential and existing customers to promote products and services.</Text>
              <Text style={styles.text}>• Provide accurate information about products, services, and promotions to prospective customers.</Text>
              <Text style={styles.text}>• Follow up on leads and customer inquiries to drive sales opportunities.</Text>

              <Text style={styles.label}>Customer Interaction:</Text>
              <Text style={styles.text}>• Establish and maintain positive relationships with customers through effective communication.</Text>
              <Text style={styles.text}>• Address customer queries, resolve issues, and provide excellent service.</Text>
              <Text style={styles.text}>• Conduct surveys or gather feedback to understand customer needs and improve services.</Text>

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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Sales Goals:</Text>
              <Text style={styles.text}>• Meet or exceed individual and team sales targets set by the company.</Text>
              <Text style={styles.text}>• Track and report on sales performance, including calls made, leads generated, and conversions.</Text>

              <Text style={styles.label}>Data Management:</Text>
              <Text style={styles.text}>• Accurately record and maintain customer information and interactions in the CRM system.</Text>
              <Text style={styles.text}>• Ensure confidentiality and security of customer data.</Text>

              <Text style={styles.label}>Team Collaboration:</Text>
              <Text style={styles.text}>• Work closely with the sales team to achieve collective goals.</Text>
              <Text style={styles.text}>• Participate in team meetings and contribute ideas for improving processes and sales strategies.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Employment Terms:</Text>
              <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check.</Text>
              <Text style={styles.text}>• As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
              <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company can terminate the employment relationship after the bond period, with or without cause and with or without notice.</Text>
              <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and onboarding costs.</Text>
              <Text style={styles.text}>• There are no leaves and no permissions for 3 months from the joining date.</Text>
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
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Acceptance:</Text>
              <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by {employee.joiningDate}. If you have any questions, please contact{employee.greetingTo} - {employee.greetingDesignation}, contact: {employee.greetingPhoneNo}. </Text>
              <Text style={styles.text}>We look forward to welcoming you to Sharon Telematics Pvt Ltd and are confident that you will be a valuable addition to our team.</Text>
            </View>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Text style={styles.text}>Signature: ___________________________</Text>
                <Text style={styles.text}>Date: ___________________________</Text>
              </View>
            </View>
            <Text style={styles.text}>Sincerely,</Text>
            <Text style={styles.text}>{employee.greetingTo} - {employee.greetingDesignation}, Sharon Telematics Pvt Ltd</Text>
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
    const todayData = new Date().toISOString();

    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.header}>Termination Letter</Text>

            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name},</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.branch}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}>{todayData.split("T")[0]}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>{employee.designation}</Text>
              <Text style={styles.text}>{employee.department}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>
                This is an official notice that your employment with Sharon Telematics
                Pvt Ltd. is terminated effective {employee.date} for the following
              </Text>

              <Text style={styles.text}> reasons:</Text>
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
                <Text style={styles.text}>Contact: 7995512053</Text>
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
    const todayData = new Date().toISOString();
    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={styles.title}>Relieving Letter</Text>

            <View style={[styles.section, { justifyContent: "space-between", flexDirection: "row" }]}>
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name},</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.branch}</Text>
                <Text style={styles.text}>{employee.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
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
                Regarding your benefits and dues, we will initiate the necessary processes to settle any outstanding payments, including your final paycheck, accumulated vacation days, and any other eligible benefits. If you have any specific questions or concerns regarding this matter, please do not hesitate to contact our HR Department at 7995512053.
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
                <Text style={styles.text}>Contact: 7995512053</Text>
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
    const todayData = new Date().toISOString();

    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
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
              <View style={{ width: "70%" }}>
                <Text style={styles.label}>{employee?.name},</Text>
                <Text style={styles.text}>{employee.staffId}</Text>
                <Text style={styles.text}>{employee.branch}</Text>
                <Text style={styles.text}>{employee.address}</Text>
              </View>
              <View style={{ width: "30%", flexWrap: "wrap" }}>
                <Text style={{ alignItems: "flex-end" }}> {getIndiaDate()}</Text>
              </View>
            </View>

            {/* Employee Details */}
            <View style={styles.section}>
              <Text style={styles.label}>Company Name: SharlonTelematrice</Text>
              <Text style={styles.label}>Company Address: Visakhaptnam</Text>
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

    // Show loading message while fetching data
    if (!employeeData) return <Text>Loading payroll data...</Text>;
    return (
      <Document>
        <Page style={styles.page}>
          <View style={{ borderWidth: 3, padding: 20, height: "100%", borderColor: "green", borderRadius: 5 }}>

            {/* Company Header */}
            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={{ width: "60%" }}>
                <Image style={styles.logo} src="logo.png" />
              </View>
              <View style={{ width: "40%", flexWrap: "wrap" }}>
                <Text style={styles.companyDetails}>
                  Door No: 21-27 Viman Nagar, Airport road, Near INS Dega, Visakhapatnam-530009, Andhra Pradesh, India.
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              47-11-24, Flat no 501, Fifth Floor, Chillapalli Complex, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016
            </Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', borderWidth: 2, padding: 5, borderColor: "#333333", color: "#f3f3f3", backgroundColor: "#000000" }}>
              Payslip for the period of {employeeData.month} / {employeeData.year}
            </Text>

            {/* Employee Details */}
            <View style={[styles.payslipSection, { borderWidth: 2, borderColor: "#333333" }]}>
              <View style={[styles.column, { borderRightWidth: 2, borderColor: "#333333" }]}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Employee ID:</Text> <Text>{employeeData.staffId}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Name:</Text> <Text>{employeeData.staffName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Designation:</Text> <Text>{employeeData.designation}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Days Worked:</Text> <Text>{employeeData.presentDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Leave Days:</Text> <Text>{employeeData.leaveDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Late Days:</Text> <Text>{employeeData.lateDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Total Late Minutes:</Text> <Text>{employeeData.totalLateMinutes} mins</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Total Early Minutes:</Text> <Text>{employeeData.totalEarlyMinutes} mins</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Month Days:</Text> <Text>{employeeData.monthDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Total OT Hours:</Text> <Text>{employeeData.totalOTHours} hrs</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Per Day Salary:</Text> <Text>₹{employeeData.perDaySalary}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Per Hour Salary:</Text> <Text>₹{employeeData.perHourSalary}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>Bank Account No:</Text> <Text>N/A</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>PAN:</Text> <Text>N/A</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", borderBottom: 2, borderBottomColor: "#333333", paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={styles.label}>UAN:</Text> <Text>N/A</Text>
                </View>
              </View>
            </View>

            {/* Earnings & Deductions Table */}
            <Text style={{ textAlign: 'left', fontWeight: 'bold', borderWidth: 2, padding: 5, borderColor: "#333333", color: "#333333" }}>
              Calculation
            </Text>
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
              <View style={styles.row}>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>Total Earnings</Text>
                <Text style={[styles.cell, { borderRight: 2, fontWeight: 'bold' }]}>{employeeData.grossSalary}</Text>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>Total Deductions</Text>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>{employeeData.lateDeductions}</Text>
              </View>
            </View>

            {/* Net Pay */}
            <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 14 }}>
              Net Pay (Rounded): ₹{employeeData.netSalary}
            </Text>

            {/* Signature */}
            <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text>Employee's Signature</Text>
              </View>
              <View>
                <Text>Authorized Signature</Text>
              </View>
            </View>

            <Text style={styles.footer}>This is a system-generated payslip and does not require a signature.</Text>
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

