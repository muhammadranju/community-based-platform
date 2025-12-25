import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { WaitingListFormData } from "./schema";

const StepPortfolio = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WaitingListFormData>();

  return (
    <div className="space-y-8">
      <h3 className="text-primary-color text-2xl font-bold">Portfolio</h3>

      {/* Upload Samples of Work */}
      {/* Upload Samples of Work */}
      <div className="space-y-2">
        <Label htmlFor="image">Upload Samples of Work</Label>
        <div className="border border-gray-300 rounded-lg p-12 flex flex-col justify-center items-center bg-white gap-4">
          {/* Simple Input type=file is more reliable with register */}
          <Input
            type="file"
            id="image_input"
            {...register("image")}
            className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
          />
        </div>
        <p className="text-xs text-gray-500">
          Supported formats: PDF, JPG, PNG (Max 5MB)
        </p>
        {errors.image && (
          <p className="text-red-500 text-sm">
            {errors.image.message as string}
          </p>
        )}
      </div>

      {/* About / Project Description */}
      <div className="space-y-2">
        <Label htmlFor="about">
          Briefly describe one project you’ve worked on (optional)
        </Label>
        <Textarea id="about" {...register("about")} placeholder="Write here" />
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}
      </div>
    </div>
  );
};

export default StepPortfolio;
