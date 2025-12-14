'use client';
import { Button } from "@/app/components";
import { useState } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check } from "lucide-react";
import { PATHS } from "@/app/constants/relativeRoutePaths";
import { useStory } from "@/app/contexts/StoryContext";
import UpsellBook from "../(upsell-pages)/upsell-book/page";

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
   const { config, hasUpSellBook, hasUpSellVideo, hasUpSellDaily, mainPaymentIsDone } = useStory();

   const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   const [showNewPassword, setShowNewPassword] = useState(false);
   const [passwordError, setPasswordError] = useState('');
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);





   // const { funnelData } = { funnelData: funnelDataMock }; //useFunnel();

   const onSubmit = async (data: FormData) => {

      // const mockConfig = {
      //    "heroName": "enes",
      //    "isAvatar": false,
      //    "theme": "superhero",
      //    "place": "The Starry Moon Base",
      //    "color": "Pink",
      //    "companions": "a friendly tiny dragon",
      //    "superPower": "",
      //    "secretWish": "hello",
      //    "email": "yllipetrovci@gmail.com",
      //    "planType": "unlimited",
      //    "archetype": "royal",
      //    "tone": "Animal Friends",
      //    "childAge": 5,
      //    "customPageCount": 6,
      //    "coverBorder": "Minimal Modern",
      //    "parentRelationship": "Mom",
      //    "includeParent": false,
      //    "parentImage": null,
      //    heroImage: "null"
      // }

      try {
         console.log({ config })
         console.log("RESET PASSWORD")
         console.log({ data });
         debugger;

         // // Call your unified backend signup
         const res = await fetch("/api/firebase/create-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               email: config?.email,
               password: data.password,
               hasUpSellBook, hasUpSellVideo, hasUpSellDaily, mainPaymentIsDone,
               selectedPlanId: config?.planType,
               config
            }),
         });

         const json = await res.json();

         if (!res.ok) {
            // toast.error(json.error || "Failed to create account.");
            return;
         }

         toast.success("Account created successfully!");

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
               {/* <p className="text-gray-400 text-sm mt-2">
                  This is only for creating your own password, so you can securely log in to your account.
               </p> */}

               <div className="flex items-start justify-start gap-2 mt-6 text-xs text-gray-500">
                  <span className="text-gray-400 text-sm text-green-500">
                     This is only for creating your own password, so you can securely log in to your account.
                  </span>
               </div>

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