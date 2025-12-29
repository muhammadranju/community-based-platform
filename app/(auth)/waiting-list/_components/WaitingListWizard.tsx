import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/authFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { WaitingListFormData, waitingListSchema } from "./schema";
import StepCommunity from "./StepCommunity";
import StepPortfolio from "./StepPortfolio";
import StepProfessionalDetails from "./StepProfessionalDetails";
import StepSignup from "./StepSignup";
import { toast } from "sonner";
import StepThankYou from "./StepThankYou";

const steps = [
  {
    id: 1,
    component: StepSignup,
    fields: ["name", "email", "country", "website"],
  },
  {
    id: 2,
    component: StepProfessionalDetails,
    fields: ["role", "expertise", "experience", "bio"],
  },
  { id: 3, component: StepPortfolio, fields: ["about", "image"] },
  {
    id: 4,
    component: StepCommunity,
    fields: ["isRoleTitle", "isAvailable", "agreedToTerms"],
  },
];

export default function WaitingListWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<WaitingListFormData>({
    resolver: zodResolver(waitingListSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      country: "",
      website: "",
      role: "" as any, // Start as empty string to match select placeholder
      expertise: "",
      experience: "",
      bio: "",
      about: "",
      image: undefined, // default for file is usually undefined
      isRoleTitle: false,
      isAvailable: false,
      agreedToTerms: false,
    },
  });

  const { trigger, handleSubmit } = methods;

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as any);

    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /* API Implementation using authFetch */
  const onSubmit = async (data: WaitingListFormData) => {
    // SAFEGUARD: Prevent submission if not on the last step
    if (currentStep !== steps.length - 1) {
      console.warn("Attempted to submit before final step. Ignoring.");
      return;
    }

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return; // Handle image separately
        if (value === null) return; // Skip nulls
        if (typeof value === "boolean") {
          formData.append(key, String(value));
        } else {
          formData.append(key, String(value));
        }
      });

      // Append image if present
      // react-hook-form "image" might be a FileList if from standard input
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const response = await authFetch("/waiting-list", {
        method: "POST",
        body: formData,
        auth: false, // Assuming public endpoint for signup, or true if token needed
      });

      if (response.ok) {
        toast.success("Successfully joined the waiting list!", {
          description: "You will be notified when the waiting list is open.",
        });
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Submission failed", {
          description: errorData.message || "Unknown error",
        });
        console.error("Submission failed", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission failed", {
        description: "An error occurred. Please try again.",
      });
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  if (isSubmitted) {
    return <StepThankYou />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.error("Form Validation Errors:", errors);
          alert("Please check for errors in the form.");
        })}
        className="space-y-8"
      >
        <CurrentStepComponent />

        <div className="pt-4 flex gap-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="w-1/3 border-amber-600 text-amber-600 hover:bg-amber-50 font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
            >
              BACK
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
            >
              NEXT
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
            >
              SUBMIT
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
