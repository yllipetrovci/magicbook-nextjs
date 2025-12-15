'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact Form Data:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center">
      <div className="max-w-3xl w-full animate-fade-in">

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-magic-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-magic-blue/30">
            <i className="fa-regular fa-paper-plane text-4xl text-magic-blue"></i>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">{t('contact_title')}</h1>
          <p className="text-xl text-gray-400">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="bg-magic-card p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-4xl animate-bounce">
                <i className="fa-solid fa-check"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t('contact_success_title')}</h2>
              <p className="text-gray-300 mb-8">{t('contact_success_desc')}</p>
              <Button onClick={() => setSubmitted(false)} variant="outline">{t('contact_btn_another')}</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-bold mb-2">{t('contact_label_name')}</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full p-4 bg-black/40 rounded-xl border ${errors.name ? 'border-red-500' : 'border-white/10'} focus:border-magic-blue outline-none text-white placeholder-gray-600`}
                    placeholder={t('contact_ph_name')}
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-2">{t('contact_label_email')}</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full p-4 bg-black/40 rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-magic-blue outline-none text-white placeholder-gray-600`}
                    placeholder="parent@example.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">{t('contact_label_subject')}</label>
                <select
                  {...register('subject')}
                  className="w-full p-4 bg-black/40 rounded-xl border border-white/10 focus:border-magic-blue outline-none text-white"
                >
                  <option value="General Inquiry">{t('contact_opt_general')}</option>
                  <option value="Technical Support">{t('contact_opt_tech')}</option>
                  <option value="Billing Question">{t('contact_opt_billing')}</option>
                  <option value="Feature Request">{t('contact_opt_feature')}</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">{t('contact_label_message')}</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  className={`w-full p-4 bg-black/40 rounded-xl border ${errors.message ? 'border-red-500' : 'border-white/10'} focus:border-magic-blue outline-none text-white placeholder-gray-600 h-40 resize-none`}
                  placeholder={t('contact_ph_message')}
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              <Button type="submit" fullWidth size="lg" className="bg-magic-blue hover:bg-blue-600 shadow-lg shadow-blue-500/20">
                {t('contact_btn_send')} <i className="fa-solid fa-paper-plane ml-2"></i>
              </Button>
            </form>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <i className="fa-solid fa-envelope text-2xl text-magic-orange mb-3"></i>
            <h3 className="text-white font-bold mb-1">{t('contact_box_email')}</h3>
            <p className="text-sm text-gray-400">support@aimagicbook.com</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <i className="fa-brands fa-facebook text-2xl text-magic-blue mb-3"></i>
            <h3 className="text-white font-bold mb-1">{t('contact_box_community')}</h3>
            <p className="text-sm text-gray-400">{t('contact_box_join')}</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <i className="fa-solid fa-bolt text-2xl text-magic-yellow mb-3"></i>
            <h3 className="text-white font-bold mb-1">{t('contact_box_response')}</h3>
            <p className="text-sm text-gray-400">{t('contact_box_time')}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;