import React from "react";
import { Eye } from "lucide-react";

export const RevisionRow = ({
  revision,
  onClickStudent,
  onClickThesis,
  onClickTutor,
}) => {
  return (
    <tr className="hover:bg-white transition-colors cursor-pointer group">
      <td className="py-4 px-6 w-16">
        <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </td>
      <td
        className="py-4 px-6 text-sm hover:bg-[#FAF8F4] cursor-pointer transition-colors group/cell"
        onClick={onClickStudent}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-800 font-medium">{revision.student}</span>
          <Eye
            size={16}
            className="text-[#C9B29B] opacity-0 group-hover/cell:opacity-100 transition-opacity"
          />
        </div>
      </td>
      <td
        className="py-4 px-6 text-sm hover:bg-[#FAF8F4] cursor-pointer transition-colors group/cell"
        onClick={onClickThesis}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="font-medium" title={revision.thesis}>
            {revision.thesis}
          </div>
          <div className="flex items-center gap-2">
            <Eye
              size={16}
              className="text-[#C9B29B] opacity-0 group-hover/cell:opacity-100 transition-opacity flex-shrink-0"
            />
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: revision.status ? "#ACFA91" : "#FADE70",
              }}
              title={revision.status ? "Revisado" : "Pendiente"}
            />
          </div>
        </div>
      </td>
      <td
        className="py-4 px-6 text-sm hover:bg-[#FAF8F4] cursor-pointer transition-colors group/cell"
        onClick={onClickTutor}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-800 font-medium">{revision.tutor}</span>
          <Eye
            size={16}
            className="text-[#C9B29B] opacity-0 group-hover/cell:opacity-100 transition-opacity"
          />
        </div>
      </td>
    </tr>
  );
};
