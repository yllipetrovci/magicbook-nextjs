'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/app/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PATHS } from '@/app/constants/relativeRoutePaths';
import toast from 'react-hot-toast';

interface AuthFormData {
    name?: string;
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

type FormData = yup.InferType<typeof schema>;

export const Auth: React.FC = () => {
    const router = useRouter();
    // const { login} = useAuth();
    const { t } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);



    const onSubmit = async (data: AuthFormData) => {
        // Mock Login/Signup
        // login(data.email, data.name || data.email.split('@')[0]);
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/firebase/signup", {
                method: "POST",
                body: JSON.stringify({ email: data.email, password: data.password }),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                router.push(PATHS.DASHBOARD);
            } else {
                if (res.status === 409) {
                    toast.error(t('auth_user_exists') || 'An account with this email already exists.');
                } else {
                    console.error("Signup failed");
                    toast.error('Signup failed. Please try again.');
                }
            }
        } catch (error) {
            console.error("Signup failed", error);
            toast.error('Signup failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // reset(); // Clear form errors and values when switching modes
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
            <div className="bg-magic-card p-8 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full relative overflow-hidden">

                {/* Top Glow */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-magic-orange to-magic-purple"></div>

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-magic-surface rounded-full flex items-center justify-center text-4xl text-magic-purple mx-auto mb-4 shadow-inner">
                        <i className={`fa-solid ${isLogin ? 'fa-key' : 'fa-user-plus'}`}></i>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">
                        {t('auth_signup_title')}
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">{t('auth_email')}</label>
                        <input
                            {...register('email')}
                            className={`w-full p-4 bg-black/40 rounded-xl border ${errors.password ? 'border-red-500' : 'border-white/10'} focus:border-magic-purple outline-none text-white placeholder-gray-600`}
                            placeholder="email"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">{t('auth_password')}</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password')}
                                className={`w-full p-4 bg-black/40 rounded-xl border ${errors.password ? 'border-red-500' : 'border-white/10'} focus:border-magic-purple outline-none text-white placeholder-gray-600 pr-12`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        className="bg-magic-purple hover:bg-purple-600 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin mr-2" />
                                {'Processing...'}
                            </>
                        ) : (
                            t('auth_submit_signup')
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleMode}
                        className="text-gray-400 hover:text-magic-orange text-sm font-bold underline"
                    >
                        {t('auth_switch_signup')}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Auth;
