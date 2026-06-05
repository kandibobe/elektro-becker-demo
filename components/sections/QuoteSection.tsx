'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { User, Mail, Phone, Wrench, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { SectionBadge } from '@components/ui/SectionBadge';
import { serviceOptions } from '@lib/config';
import { cn } from '@lib/utils';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(1),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em]">
        <Icon size={11} className="text-[var(--color-blue-light)]" />
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export function QuoteSection() {
  const t = useTranslations('quote');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
      toast.success(t('success'));
    } catch {
      toast.error(t('error'));
    }
  };

  const inputClass = cn(
    'w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3',
    'text-white text-sm placeholder:text-white/25',
    'focus:outline-none focus:border-[var(--color-blue-light)] focus:bg-white/[0.09]',
    'transition-all duration-200'
  );

  return (
    <section id="quote" className="section-padding relative overflow-hidden bg-quote">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-blue)]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-narrow relative">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <SectionBadge dark>{t('badge')}</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-3 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto">{t('subtitle')}</p>
          </motion.div>

          {/* Success state */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white/5 rounded-3xl border border-white/10"
            >
              <CheckCircle2 size={52} className="text-[var(--color-yellow)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t('success')}</h3>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-white/50 hover:text-white underline transition-colors"
              >
                {t('successNew')}
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/[0.04] backdrop-blur border border-white/10 rounded-3xl p-7 md:p-10 space-y-5"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t('name')} icon={User} error={errors.name && t('nameError')}>
                  <input
                    {...register('name')}
                    placeholder={t('namePlaceholder')}
                    className={cn(inputClass, errors.name && 'border-red-400/60')}
                  />
                </Field>
                <Field label={t('email')} icon={Mail} error={errors.email && t('emailError')}>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className={cn(inputClass, errors.email && 'border-red-400/60')}
                  />
                </Field>
              </div>

              {/* Phone + Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t('phone')} icon={Phone} error={errors.phone && t('phoneError')}>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    className={cn(inputClass, errors.phone && 'border-red-400/60')}
                  />
                </Field>
                <Field label={t('service')} icon={Wrench} error={errors.service && t('serviceError')}>
                  <select
                    {...register('service')}
                    defaultValue=""
                    className={cn(inputClass, 'cursor-pointer', errors.service && 'border-red-400/60')}
                  >
                    <option value="" disabled className="bg-[#0f1f3d]">{t('servicePlaceholder')}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0f1f3d]">{opt}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Message */}
              <Field label={t('message')} icon={MessageSquare}>
                <textarea
                  {...register('message')}
                  rows={3}
                  placeholder={t('messagePlaceholder')}
                  className={cn(inputClass, 'resize-none')}
                />
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[var(--color-blue)] hover:bg-[var(--color-blue-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--color-blue)]/30"
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" />{t('submitting')}</>
                ) : (
                  t('submit')
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
