import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { FaDownload, FaChevronDown } from 'react-icons/fa';
import StaffDropdown from "../../components/staffDropdownId";
const Letters = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    reportingTo: "",
    salary: "",
    terminationDate: "",
    address: "",
    paySlipMonthYear: "",
    resignationDate: "",
    experienceData: "",
    description: "",
    joiningDate: "",
  });
  const [staffDetails, setStaffDetails] = useState(null);
  const [letterType, setLetterType] = useState("offer");

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
        name: staffDetails.name || "",
        designation: staffDetails.designation || "",
        salary: staffDetails.monthlySalary || "",
        joiningDate: staffDetails.joiningDate || "",
        address: staffDetails.address || "",
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

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Helvetica",
    },
    header: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: 20,
      fontWeight: "bold",
    },
    section: {
      marginBottom: 10,
    },
    label: {
      fontWeight: "bold",
      fontSize: 12,
      marginTop: 5,
    },
    text: {
      fontSize: 10,
      lineHeight: 1.2, letterSpacing: 1,
      textAlign: "justify", marginVertical: 5
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
      borderTop: "1px solid #000",
      paddingTop: 10,
    },
    signatureBlock: {
      marginTop: 10,
    },
    normalText: { letterSpacing: 2, lineHeight: 10 },
    title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  payslipSection: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  column: { width: '50%' },
  paysliptext: { marginBottom: 5 },
  table: { width: '100%', borderWidth: 1, marginTop: 10 },
  row: { flexDirection: 'row', borderBottomWidth: 1, padding: 5 },
  cell: { width: '50%', textAlign: 'left' },
  footer: { marginTop: 20, textAlign: 'center', fontSize: 10, fontStyle: 'italic' }
  });

  const OfferLetter = ({ employee }) => {
    const todayData = new Date().toISOString();
    return (
      <Document>
        {/* Page 1 */}
        <Page style={styles.page}>
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} src="way4tracklogo.png" />
          </View>
          <Text style={styles.header}>OFFER LETTER</Text>
          <Text style={{ alignItems: "flex-end" }}>{todayData}</Text>

          <View style={styles.section}>
            <Text style={styles.label}>{employee?.name}</Text>
            <Text style={styles.paysliptext}>{employee?.address}</Text>
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
            <Text style={styles.text}>• Base Salary: {employee?.monthlySalary} LPA + Incentives</Text>
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
        </Page>

        {/* Page 2 */}
        <Page style={styles.page}>
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
          <View style={styles.section}>
            <Text style={styles.label}>Employment Terms:</Text>
            <Text style={styles.text}>• This offer is contingent upon the successful completion of a background check and reference check. </Text>
            <Text style={styles.text}>•  As an employee of Sharon Telematics Pvt Ltd, you will be expected to comply with all company policies and procedures.</Text>
            <Text style={styles.text}>• Your employment with Sharon Telematics Pvt Ltd will be on a contractual basis, with an initial bond period of 2 years. This means that either you or the company "</Text>
          </View>
        </Page>

        {/* Page 3 */}
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>"can terminate the employment relationship after the bond period, with or without cause and with or without notice."</Text>
            <Text style={styles.text}>• During the bond period, termination of employment by the employee will require reimbursement of [specific amount or details of bond terms] to cover training and on boarding costs.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Acceptance:</Text>
            <Text style={styles.text}>• To accept this offer, please sign and date this letter and return it by 20-09-2024. If you have any questions, please contact Santhi Priya HR contact: 7995512053. </Text>
            <Text style={styles.text}>We look forward to having you join Sharon Telematics Pvt Ltd and are confident that your contributions will be significant.</Text>
          </View>

          <Text style={styles.text}>Sincerely,</Text>
          <Text style={styles.text}>Santhi Priya</Text>
          <Text style={styles.text}>Sharon Telematics Pvt Ltd </Text>
          <Text style={styles.text}>Email: hr@sharontelemattics.com</Text>
          <Text style={styles.text}>Contact: 7995512053</Text>

          <Text style={styles.label}>Acceptance of Offer:</Text>
          <Text style={styles.text}>I accept the offer of employment with Sharon Telematics Pvt Ltd as outlined in this letter.</Text>
          <View style={styles.signatureSection}>
            <View style={styles.signatureBlock}>
              <Text style={styles.text}>Signature: ___________________________</Text>
              <Text style={styles.text}>Date: ___________________________</Text>
            </View>
          </View>
          <Text style={styles.text}>Sincerely,</Text>
          <Text style={styles.text}>Santhi Priya - HR, Sharon Telematics Pvt Ltd</Text>
        </Page>
      </Document>
    )
  };

  const TerminationLetter = ({ employee }) => {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} src="way4tracklogo.png" />
          </View>
          <Text style={styles.header}>Termination Letter Template</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Employee Name:</Text>{' '}
            <Text style={styles.text}>{employee.name}</Text>
            <Text style={styles.label}>Emp ID:</Text> <Text style={styles.text}>{employee.id}</Text>
            <Text style={styles.label}>Location:</Text>{' '}
            <Text style={styles.text}>{employee.location}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Designation:</Text>{' '}
            <Text style={styles.text}>{employee.designation}</Text>
            <Text style={styles.label}>Department:</Text>{' '}
            <Text style={styles.text}>{employee.department}</Text>
            <Text style={styles.label}>Date:</Text> <Text style={styles.text}>{employee.date}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>
              This is an official notice that your employment with Sharon Telematics
              Pvt Ltd. is terminated effective {employee.date} for the following
              reasons:
            </Text>
            <Text style={styles.text}>1. Regular Leaves</Text>
            <Text style={styles.text}>2. Irregular Work</Text>
            <Text style={styles.text}>3.</Text>
            <Text style={styles.text}>4.</Text>
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
              <Text style={styles.text}>Priya</Text>
              <Text style={styles.text}>HR</Text>
              <Text style={styles.text}>Sharon Telematics Pvt. Ltd.</Text>
              <Text style={styles.text}>Contact: 7995512053</Text>
            </View>
            <View style={styles.signatureBlock}>
              <Text style={styles.text}>Signature:</Text>
              <Text style={styles.text}>Date:</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  };

  const RelievingLetterPDF = ({ employee }) => {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Relieving Letter</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Employee Name:</Text>{' '}
            <Text style={styles.text}>{employee.name}</Text>
            <Text style={styles.label}>Address:</Text>{' '}
            <Text style={styles.text}>{employee.address}</Text>
            <Text style={styles.label}>Date:</Text> <Text style={styles.text}>{employee.date}</Text>
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
          </View>

          <View style={styles.signatureSection}>
            <View style={styles.signatureBlock}>
              <Text style={styles.text}>Sincerely,</Text>
              <Text style={styles.text}>Priya</Text>
              <Text style={styles.text}>HR</Text>
              <Text style={styles.text}>Sharon Telematics (P) Ltd.</Text>
              <Text style={styles.text}>Contact: 7995512053</Text>
              <Text style={styles.text}>Email: hr@sharontelematics.com</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  };

  const ResignationLetterPDF = ({ employee }) => (
    <Document>
      <Page style={styles.page}>
        {/* Title */}
        <Text style={styles.header}>Resignation Letter</Text>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} src="way4tracklogo.png" />
        </View>
        <View>
          <Text style={styles.label}>{employee.name}</Text>
          <Text style={styles.text}>{employee.designation}</Text>
        </View>

        {/* Employee Details */}
        <View style={styles.section}>
          <Text style={styles.label}>Date: {getIndiaDate()}</Text>
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
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={styles.text}>Sincerely,</Text>
          <View style={styles.signatureBlock}>
            <Text style={styles.text}>{employee.name}</Text>
            <Text style={styles.text}>Emp ID: {employee.id}</Text>
            <Text style={styles.text}>Contact: {employee.phoneNumber}</Text>
            <Text style={styles.text}>Email: {employee.email}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const PayrollLetterPDF = ({ employee }) => {
    console.log("employee : ",employee);
    return(
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>LEADXPO IT SOLUTIONS PVT LTD</Text>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          47-11-24, Flat no 501, Fifth Floor, Chillapalli Complex, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016
        </Text>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>
          Payslip for the period of {employee.month} {employee.year}
        </Text>

        {/* Employee Details */}
        <View style={styles.payslipSection}>
          <View style={styles.column}>
            <Text style={styles.label}>Employee ID:</Text> <Text style={styles.paysliptext}>{employee.id}</Text>
            <Text style={styles.label}>Department:</Text> <Text style={styles.paysliptext}>{employee.department}</Text>
            <Text style={styles.label}>Days Worked:</Text> <Text style={styles.paysliptext}>{employee.daysWorked}</Text>
            <Text style={styles.label}>Bank Name, Branch:</Text> <Text style={styles.paysliptext}>{employee.bankName}</Text>
            <Text style={styles.label}>Overtime:</Text> <Text style={styles.paysliptext}>{employee.overtime} hrs</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Name:</Text> <Text style={styles.paysliptext}>{employee.name}</Text>
            <Text style={styles.label}>Designation:</Text> <Text style={styles.paysliptext}>{employee.designation}</Text>
            <Text style={styles.label}>Days Absent:</Text> <Text style={styles.paysliptext}>{employee.daysAbsent}</Text>
            <Text style={styles.label}>Bank Acct/Cheque Number:</Text> <Text style={styles.paysliptext}>{employee.accountNumber}</Text>
            <Text style={styles.label}>Bank IFSC Code:</Text> <Text style={styles.paysliptext}>{employee.ifscCode}</Text>
          </View>
        </View>

        {/* Earnings & Deductions Table */}
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Earnings</Text>
            <Text style={styles.cell}>Amount</Text>
            <Text style={styles.cell}>Deductions</Text>
            <Text style={styles.cell}>Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Basic Pay</Text>
            <Text style={styles.cell}>{employee.basicPay}</Text>
            <Text style={styles.cell}>Advance Payment</Text>
            <Text style={styles.cell}>{employee.advancePayment}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, { fontWeight: 'bold' }]}>Total Earnings (Rounded)</Text>
            <Text style={[styles.cell, { fontWeight: 'bold' }]}>{employee.totalEarnings}</Text>
            <Text style={[styles.cell, { fontWeight: 'bold' }]}>Total Deductions (Rounded)</Text>
            <Text style={[styles.cell, { fontWeight: 'bold' }]}>{employee.totalDeductions}</Text>
          </View>
        </View>

        {/* Net Pay */}
        <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 14 }}>
          Net Pay (Rounded): {employee.netPay}
        </Text>

        {/* Signature */}
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ textDecoration: 'underline' }}>{employee.name}</Text>
            <Text>Employee's Signature</Text>
          </View>
          <View>
            <Text style={{ textDecoration: 'underline' }}>{employee.name}</Text>
            <Text>Employee's Signature</Text>
          </View>
        </View>

        <Text style={styles.footer}>This is a system-generated payslip and does not require a signature.</Text>
      </Page>
    </Document>)};


  return (
    <div className="flex flex-col space-y-4 w-full p-4 max-w-lg mx-auto ">
      <h1>Letter Generator</h1>

      <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-gray-200">
        <select onChange={(e) => setLetterType(e.target.value)}>
          <option value="offer">Offer Letter</option>
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
            onChange={handleChange}
          />
        </div>
      )}

      {(letterType === "resignation" || letterType === "relieving") && (
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
      {letterType === "offer" ? (
        <PDFDownloadLink
          className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"

          document={<OfferLetter employee={formData} />}
          fileName="offer_letter.pdf"
        >
          Download Offer Letter
        </PDFDownloadLink>
      ) : letterType === "termination" ? (
        <PDFDownloadLink
          className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"

          document={<TerminationLetter employee={formData} />}
          fileName="termination_letter.pdf"
        >
          Download Termination Letter
        </PDFDownloadLink>
      ) : letterType === "relieving" ? (
        <PDFDownloadLink
          className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"

          document={<RelievingLetterPDF employee={formData} />}
          fileName="relieving_letter.pdf"
        >
          Download Relieving Letter
        </PDFDownloadLink>
      ) : letterType === "resignation" ? (
        <PDFDownloadLink
          className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"
          document={<ResignationLetterPDF employee={formData} />}
          fileName="resignation_letter.pdf"
        >
          Download Resignation Letter
        </PDFDownloadLink>
      ) : (
        <PDFDownloadLink
          className="bg-green-600 text-white font-semibold py-2 px-4 w-full mt-5 rounded-md hover:bg-green-700 transition"

          document={<PayrollLetterPDF employee={formData} />}
          fileName="payroll_letter.pdf"
        >
          Download PaySlip
        </PDFDownloadLink>
      )

      }
    </div>
  );
};

export default Letters;

