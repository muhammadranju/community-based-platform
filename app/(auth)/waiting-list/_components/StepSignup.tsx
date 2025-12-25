import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { WaitingListFormData } from "./schema";

const StepSignup = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WaitingListFormData>();

  return (
    <div className="space-y-8">
      <h3 className="text-primary-color text-2xl font-bold">
        Basic Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} placeholder="" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder=""
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Country & City */}
        <div className="space-y-2">
          <Label htmlFor="country">Country & City/Region</Label>
          <Input id="country" {...register("country")} placeholder="" />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Website or Social Media (optional)</Label>
          <Input id="website" {...register("website")} placeholder="" />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors.website.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepSignup;
