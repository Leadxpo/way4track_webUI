import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import 'react-calendar/dist/Calendar.css'; // Required for calendar base styling
import ApiService from "../../services/ApiService";

// Utility function to format date to YYYY-MM-DD
const getTodayDate = (date = new Date()) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const MyAttendance = () => {
    const [attendenceDate, setAttendenceDate] = useState(getTodayDate());
    const [markedDates, setMarkedDates] = useState({});
    const [staffAttendance, setStaffAttendance] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [attendancePercentage, setAttendancePercentage] = useState(0);
    const timeFormate = (decimalTime) => {
        // Check if it's a valid decimal number
        const num = parseFloat(decimalTime);
      
        // Only format if it's a number AND a valid fractional day (less than 1)
        if (!isNaN(num) && num > 0 && num < 1) {
          const totalSeconds = Math.round(num * 24 * 60 * 60);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
      
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
      
        // Not a valid decimal time – return original input
        return decimalTime;
      };
        const fetchData = async () => {
        try {
            const staffId = localStorage.getItem("userId");

            const payload = {
                companyCode: "WAY4TRACK",
                unitCode: "WAY4",
                staffId,
                date: attendenceDate,
            };

            const response = await ApiService.post("/dashboards/staffAttendanceDetails", payload, {
                headers: { "Content-Type": "application/json" },
            });

            const data = response.data;
            setStaffAttendance(data);

            const today = new Date();
            const marks = {};

            data.forEach((entry) => {
                const [year, month, day] = entry.day.split("-").map(Number);
                const entryDate = new Date(year, month - 1, day);

                if (entryDate <= today) {
                    marks[entry.day] = entry;
                }
            });

            setMarkedDates(marks);

            const totalDays = data.length;
            const presentDays = data.filter(
                (record) => record.status === "P" || record.status === "Present"
            ).length;

            setAttendancePercentage(totalDays > 0 ? (presentDays / totalDays) * 100 : 0);
        } catch (error) {
            console.error("Error fetching technician data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [attendenceDate]);

    const tileClassName = ({ date }) => {
        const dateStr = date.toISOString().split("T")[0];
        const record = markedDates[dateStr];
        if (record) {
            return record.status === "P" || record.status === "Present" ? "present-day" : "absent-day";
        }
        return null;
    };

    const handleDayClick = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        const selectedAttendance = getTodayDate(date); // Convert Date to 'YYYY-MM-DD'
        setAttendenceDate(selectedAttendance);

        if (selectedDate <= today) {
            const attendanceRecord = staffAttendance?.find((item) => {
                return(item.day === selectedAttendance)});
            console.log("inTime:", attendanceRecord);
            setSelectedDate(attendanceRecord || null);
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.heading}>Attendance Calendar</h3>
            <Calendar
                onClickDay={(date) => handleDayClick(date)}
                onActiveStartDateChange={({ activeStartDate }) => {
                    const newDate = getTodayDate(activeStartDate);
                    setAttendenceDate(newDate);
                }}
                
                tileClassName={tileClassName}
            />


            <p style={styles.percentageText}>Attendance: {attendancePercentage.toFixed(2)}%</p>

            {selectedDate && (
                <div style={styles.modalOverlay} onClick={() => setSelectedDate(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3>Attendance Details</h3>
                        <p>📅 Date: {selectedDate.day}</p>
                        <p>⏰ In Time: {timeFormate(selectedDate.inTime)}</p>
                        <p>⏳ Out Time: {timeFormate(selectedDate.outTime)}</p>
                        <p
                            style={{
                                color:
                                    selectedDate.status === "P" || selectedDate.status === "Present"
                                        ? "green"
                                        : "red",
                            }}
                        >
                            {selectedDate.status === "P" || selectedDate.status === "Present"
                                ? `✅ Status: ${selectedDate.status}`
                                : `❌ Status: ${selectedDate.status}`}
                        </p>
                        <button style={styles.closeButton} onClick={() => setSelectedDate(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Inline styles for calendar day marking */}
            <style>{`
        .present-day {
          background-color: #d4edda;
          border-radius: 50%;
        }
        .absent-day {
          background-color: #f8d7da;
          border-radius: 50%;
        }
      `}</style>
        </div>
    );
};

const styles = {
    container: {
        margin: "30px auto",
        padding: 20,
        backgroundColor: "#f3f3f3",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        borderRadius: 10,
    },
    heading: {
        textAlign: "center",
        marginBottom: 20,
    },
    percentageText: {
        marginTop: 10,
        fontWeight: "bold",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        background: "#fff",
        padding: 25,
        borderRadius: 10,
        textAlign: "center",
        minWidth: 300,
    },
    closeButton: {
        marginTop: 15,
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
    },
};

export default MyAttendance;
