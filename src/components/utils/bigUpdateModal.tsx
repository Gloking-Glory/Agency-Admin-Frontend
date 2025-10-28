// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import CircularProgress from "@mui/material/CircularProgress";
// import { X } from "lucide-react";
// // import { Course } from "@/lib/mockApi"; // adapt to your actual type

// import AlertModal, { AlertType } from "./utils/alertModal";
// import { AddCourseRspType } from "../hooks/apiTypes";

// interface UpdateCourseModalProps {
//   open: boolean;
//   onClose: () => void;
//   onUpdate: (id: string, payload: any) => Promise<void>;
//   course: AddCourseRspType | null;
//   refetchList?: () => void;
// }

// export const UpdateCourseModal: React.FC<UpdateCourseModalProps> = ({
//   open,
//   onClose,
//   onUpdate,
//   course,
//   refetchList,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       course_title: "",
//       university: "",
//       duration: "",
//       location: "",
//       fees: "",
//     },
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertType, setAlertType] = useState<AlertType>("success");
//   const [alertMessage, setAlertMessage] = useState({ title: "", subtitle: "" });

//   // Populate form when course changes
//   useEffect(() => {
//     if (course) {
//       reset({
//         course_title: course.course_title || "",
//         university: course.university || "",
//         duration: course.duration || "",
//         location: course.location || "",
//         fees: String(course.fees || ""),
//       });
//     }
//   }, [course, reset]);

//   const inputFields = [
//     { label: "Course Title", name: "course_title", required: true, errText: "Course Title is required" },
//     { label: "University", name: "university", required: true, errText: "University is required" },
//     { label: "Duration", name: "duration", required: true, errText: "Duration is required" },
//     { label: "Location", name: "location", required: true, errText: "Location is required" },
//     { label: "Fees", name: "fees", required: false },
//   ];

//   const handleUpdateCourse = async (data: any) => {
//     if (!course?.id) return;

//     setIsLoading(true);
//     try {
//       await onUpdate(course.id, {
//         course_title: data.course_title.trim(),
//         university: data.university.trim(),
//         duration: data.duration.trim(),
//         location: data.location.trim(),
//         fees: Number(data.fees || 0),
//       });

//       setAlertType("success");
//       setAlertMessage({ title: "Course Updated!", subtitle: "Course has been updated successfully." });
//       setAlertOpen(true);

//       refetchList?.();
//       onClose();
//     } catch (err) {
//       console.error("Update failed:", err);
//       setAlertType("error");
//       setAlertMessage({ title: "Update Failed", subtitle: "Failed to update the course. Try again." });
//       setAlertOpen(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gradient-to-br from-white to-blue-50 w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative border border-blue-100">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 transition"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Update Course</h2>

//         <form
//           onSubmit={handleSubmit(handleUpdateCourse)}
//           className="grid grid-cols-1 md:grid-cols-2 gap-5"
//         >
//           {inputFields.map((field) => (
//             <div key={field.name} className="flex flex-col">
//               <label className="mb-1 font-semibold text-blue-900">{field.label}</label>
//               <input
//                 type="text"
//                 className="border border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300 bg-white/80 text-blue-900 placeholder-blue-400 p-3 rounded-lg outline-none transition"
//                 {...register(field.name as keyof typeof field, {
//                   required: field.required ? field.errText : false,
//                   setValueAs: (val: string) => {
//                     if (field.name === "fees") {
//                       const num = Number(val);
//                       return isNaN(num) || val === "" ? 0 : num;
//                     }
//                     return val;
//                   },
//                 })}
//               />
//               {errors[field.name as keyof typeof errors] && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {(errors[field.name as keyof typeof errors]?.message as string) ||
//                     "This field is required"}
//                 </span>
//               )}
//             </div>
//           ))}

//           <div className="col-span-full mt-6 flex justify-end">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
//             >
//               {isLoading ? (
//                 <>
//                   <CircularProgress size={20} color="inherit" className="mr-2" />
//                   Updating...
//                 </>
//               ) : (
//                 "Update Course"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       <AlertModal
//         isOpen={alertOpen}
//         type={alertType}
//         title={alertMessage.title}
//         subtitle={alertMessage.subtitle}
//         onClose={() => setAlertOpen(false)}
//       />
//     </div>
//   );
// };
