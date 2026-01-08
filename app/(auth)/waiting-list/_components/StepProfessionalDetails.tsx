import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { WaitingListFormData } from "./schema";

const StepProfessionalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WaitingListFormData>();

  return (
    <div className="space-y-8">
      <h3 className="text-primary-color text-2xl font-bold">
        Professional Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Role/Title */}
        <div className="space-y-2">
          <Label htmlFor="role">
            Role/Title (Builder, Architect, Designer, Student, Other)
          </Label>
          <div className="relative">
            <select
              id="role"
              {...register("role")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="builder">Builder</option>
              <option value="architect">Architect</option>
              <option value="designer">Designer</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Area of Expertise */}
        <div className="space-y-2">
          <Label htmlFor="expertise">
            Area of Expertise (e.g., mud houses, stone, bamboo, thatch, etc.)
          </Label>
          <Input id="expertise" {...register("expertise")} placeholder="" />
          {errors.expertise && (
            <p className="text-red-500 text-sm">{errors.expertise.message}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Input id="experience" {...register("experience")} placeholder="" />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            {...register("bio")}
            placeholder="Share a brief bio..."
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepProfessionalDetails;
