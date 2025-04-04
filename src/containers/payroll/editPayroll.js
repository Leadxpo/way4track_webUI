import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";



const salaryStatusOptions = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Hold', label: 'Hold' },
    { value: 'Other Reason', label: 'Other Reason' },
  ];

const EditPayroll = ({ initialData, onClose, onSave }) => {
    const { control, handleSubmit, watch, setValue } = useForm({ defaultValues: initialData });
    const formData = watch();
    useEffect(() => {
        if (formData.actualSalary && formData.monthDays) {
            const perDaySalary = formData.actualSalary / formData.monthDays;
            setValue("perDaySalary", perDaySalary.toFixed(2));
            setValue("perHourSalary", (perDaySalary / 9).toFixed(2));
        }

        if (formData.totalOTHours && formData.perHourSalary) {
            setValue("OTAmount", (formData.totalOTHours * formData.perHourSalary).toFixed(2));
        }

        if (formData.lateDays && formData.perHourSalary) {
            setValue("lateDeductions", (formData.lateDays * formData.perHourSalary).toFixed(2));
        }

        if (formData.actualSalary) {
            const grossSalary = parseFloat(formData.actualSalary) + (parseFloat(formData.OTAmount) || 0) + (parseFloat(formData.incentives) || 0) + (parseFloat(formData.plBikeAmount) || 0);
            setValue("grossSalary", grossSalary.toFixed(2));
            setValue("ESIC_Employee", (grossSalary * 0.0075).toFixed(2));
            setValue("ESIC_Employer", (grossSalary * 0.0325).toFixed(2));
            const pfWage = (formData.actualSalary * 0.40).toFixed(2);
            setValue("PF_Employee", (pfWage * 0.12).toFixed(2));
            setValue("PF_Employer1", (pfWage * 0.0833).toFixed(2));
            setValue("PF_Employer2", (pfWage * 0.0367).toFixed(2));
        }
    }, [formData, setValue]);

    return (
        <form onSubmit={handleSubmit(onSave)} className="p-4 bg-white shadow rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {["staffId", "staffName", "branch", "designation", "year", "monthDays", "presentDays", "month",  "actualSalary", "plBikeNeedToPay",   
   "leaveDays", "lateDays", "lateDeductions","totalLateMinutes", "carryForwardLeaves", "leaveEncashment", "perDaySalary", "perHourSalary", 
    "plBikeAmount","totalEarlyMinutes", "totalOTHours", "OTAmount", "daysOutLate6HoursOrMore", "extraHalfSalary", "incentives","foodAllowance",
    "ActualEarnedMonthlySalary", "grossSalary", "ESIC_Employee", "ESIC_Employer", "PF_Employee","PF_Employer1","PF_Employer2","professionalTax", "netSalary", "Advance",
    "paybleAmount",].map((field) => (
                    <Controller
                        key={field}
                        name={field}
                        control={control}
                        render={({ field }) => (
                            <div>
                                <p>{field.name}</p>
                                <input {...field} placeholder={field.name.replace(/([A-Z])/g, " $1")} type="number" className="w-full p-2 border rounded-md" />
                            </div>
                        )}
                    />
                ))}

<Controller
        name="salaryStatus"
        control={control}
        defaultValue=""
        rules={{ required: 'Salary status is required' }}
        render={({ field }) => (
          <select {...field}>
            <option value="" disabled>Select salary status</option>
            {salaryStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">
                    Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md" >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditPayroll;