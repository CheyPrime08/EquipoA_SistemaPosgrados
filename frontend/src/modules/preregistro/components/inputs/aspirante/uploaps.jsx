import { Upload } from "@/components/ui/uploap";

function Uploads({ p, texto, h4, onFileChange, currentFile, name }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[16px] tracking-wider font-semibold text-[#74695a]">
        {p} <span className="text-destructive">*</span>
      </p>
      <Upload
        p={texto}
        h4={h4}
        onFileChange={onFileChange}
        currentFile={currentFile}
        name={name}
      />
    </div>
  );
}

export default Uploads;
