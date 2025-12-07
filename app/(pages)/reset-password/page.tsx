'use client';
import { Button } from "@/app/components";
import { useState } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

const schema = yup.object({
   password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
   confirmPassword: yup.string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
}).required();

type FormData = yup.InferType<typeof schema>;

const ResetPassword = () => {
   const router = useRouter();

   const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   const [showNewPassword, setShowNewPassword] = useState(false);
   const [passwordError, setPasswordError] = useState('');
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const funnelDataMock = {
      "email": "yllipetrovci123@gmail.com",
      "selectedPlanId": "2-month",
      "image": "data:image/avif;base64,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",
      "animationStyle": "wave",
      "upgrades": {
         "customStyle": true,
         "priority": true,
         "coins": true
      }
   }
   const { funnelData } = { funnelData: funnelDataMock }; //useFunnel();

   const onSubmit = async (data: FormData) => {
      try {
         const { email } = funnelDataMock;

         console.log("RESET PASSWORD")
         console.log({ data });
         return;

         if (!email) {
            // toast.error("Email is required. Please go back and enter your email.");
            return;
         }

         // Call your unified backend signup
         const res = await fetch("/api/firebase/create-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               email,
               password: data.password,
               animationStyle: funnelDataMock.animationStyle,
               selectedPlanId: funnelDataMock.selectedPlanId,
               image: funnelDataMock.image,
            }),
         });

         const json = await res.json();

         if (!res.ok) {
            // toast.error(json.error || "Failed to create account.");
            return;
         }

         // toast.success("Account created successfully!");

         // Session cookie is already set → redirect
         // router.push('/dashboard');

      } catch (error: any) {
         console.error(error);
         toast.error(error.message || "Something went wrong");
      }
   };

   return (
      // <div className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center px-4">

         <div className="w-full max-w-md bg-magic-card p-8 rounded-3xl border border-white/10 shadow-2xl animate-fade-in relative">
            {/* No close button - Mandatory action */}

            <div className="text-center mb-6">
               <div className="w-16 h-16 bg-magic-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 text-magic-purple text-2xl animate-bounce">
                  <i className="fa-solid fa-lock"></i>
               </div>
               <h2 className="text-2xl font-black text-white">Secure Your Account</h2>
               <p className="text-gray-400 text-sm mt-1">Please set a new password to continue.</p>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">New Password</label>
                  <div className="relative">
                     <input
                        type={showNewPassword ? "text" : "password"}
                        {...register('password')}
                        className="w-full p-4 bg-black/40 rounded-xl border border-white/10 focus:border-magic-purple outline-none text-white placeholder-gray-600 pr-12"
                        placeholder="••••••••"
                        autoFocus
                     />
                     <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                     >
                        <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                     </button>
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Confirm Password</label>
                  <div className="relative">
                     <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register('confirmPassword')}
                        className="w-full p-4 bg-black/40 rounded-xl border border-white/10 focus:border-magic-purple outline-none text-white placeholder-gray-600 pr-12"
                        placeholder="••••••••"
                     />
                     <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                     >
                        <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                     </button>
                  </div>
               </div>

               {passwordError && (
                  <p className="text-red-400 text-sm font-bold text-center bg-red-500/10 py-2 rounded-lg">{passwordError}</p>
               )}

               <Button type="submit" fullWidth size="lg" className="bg-magic-purple hover:bg-purple-600 shadow-lg mt-4" disabled={!isValid}>
                  Set Password <i className="fa-solid fa-check ml-2"></i>
               </Button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
               <Check className="w-4 h-4 text-green-500" />
               <span>Secure encrypted data</span>
            </div>
         </div>
      </form>
   )
}

export default ResetPassword;