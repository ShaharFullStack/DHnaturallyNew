import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSubmissionSchema } from '@shared/schema';
import { Mail, MessageCircle, Clock } from 'lucide-react';

const contactFormSchema = insertContactSubmissionSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: t('success.contact.submitted', language),
        variant: 'default',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('common.error', language),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitContactMutation.mutate(data);
  };

  const subjectOptions = [
    { value: 'product-inquiry', label: language === 'he' ? 'שאלה על מוצר' : 'Product Inquiry' },
    { value: 'consultation', label: language === 'he' ? 'בקשה לייעוץ' : 'Consultation Request' },
    { value: 'order-support', label: language === 'he' ? 'תמיכה בהזמנה' : 'Order Support' },
    { value: 'general', label: language === 'he' ? 'פנייה כללית' : 'General Inquiry' },
  ];

  const faqItems = [
    {
      question: language === 'he' ? 'כמה זמן לוקח למשלוח?' : 'How long does delivery take?',
      answer: language === 'he' ? 'משלוח מתבצע תוך 24-48 שעות לכל הארץ' : 'Delivery is made within 24-48 hours nationwide',
    },
    {
      question: language === 'he' ? 'האם המוצרים בטוחים?' : 'Are the products safe?',
      answer: language === 'he' ? 'כל המוצרים עברו בדיקות איכות מחמירות' : 'All products have undergone rigorous quality testing',
    },
    {
      question: language === 'he' ? 'איך לבחור מוצר מתאים?' : 'How to choose a suitable product?',
      answer: language === 'he' ? 'צרו קשר לייעוץ אישי ומקצועי' : 'Contact us for personal and professional consultation',
    },
  ];

  return (
    <div data-testid="contact-page">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16" data-testid="contact-header">
            <h1 className="text-4xl lg:text-5xl font-bold text-dh-navy mb-6" data-testid="contact-title">
              {t('contact.title', language)}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="contact-description">
              {t('contact.description', language)}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg" data-testid="contact-form-section">
              <h2 className="text-2xl font-bold text-dh-navy mb-6" data-testid="contact-form-title">
                {t('contact.form.title', language)}
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="first-name-label">
                            {t('contact.form.firstName', language)} *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'he' ? 'הכניסו את שמכם הפרטי' : 'Enter your first name'}
                              {...field}
                              data-testid="first-name-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="last-name-label">
                            {t('contact.form.lastName', language)} *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'he' ? 'הכניסו את שם המשפחה' : 'Enter your last name'}
                              {...field}
                              data-testid="last-name-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="email-label">
                          {t('contact.form.email', language)} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            data-testid="email-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="phone-label">
                          {t('contact.form.phone', language)}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="058-657-2451"
                            {...field}
                            data-testid="phone-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="subject-label">
                          {t('contact.form.subject', language)} *
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="subject-select">
                              <SelectValue placeholder={language === 'he' ? 'בחרו נושא' : 'Select a subject'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjectOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="message-label">
                          {t('contact.form.message', language)} *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder={language === 'he' ? 'כתבו כאן את הודעתכם...' : 'Write your message here...'}
                            {...field}
                            data-testid="message-textarea"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={submitContactMutation.isPending}
                    className="w-full bg-dh-ocean text-white py-4 rounded-lg font-semibold hover:bg-dh-navy transition-colors"
                    data-testid="submit-contact-form"
                  >
                    {submitContactMutation.isPending 
                      ? t('common.loading', language) 
                      : t('contact.form.submit', language)
                    }
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg" data-testid="contact-info-section">
                <h3 className="text-2xl font-bold text-dh-navy mb-6" data-testid="contact-info-title">
                  {t('contact.info.title', language)}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse" data-testid="contact-email">
                    <div className="w-12 h-12 bg-dh-ocean text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {t('contact.info.email', language)}
                      </h4>
                      <p className="text-gray-600">dhnaturally@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse" data-testid="contact-whatsapp">
                    <div className="w-12 h-12 bg-dh-ocean text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {t('contact.info.whatsapp', language)}
                      </h4>
                      <p className="text-gray-600">058-657-2451</p>
                      <p className="text-sm text-gray-500">
                        {t('contact.info.whatsapp.note', language)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-8 rounded-2xl shadow-lg" data-testid="business-hours-section">
                <h3 className="text-2xl font-bold text-dh-navy mb-6" data-testid="business-hours-title">
                  {t('contact.hours.title', language)}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">{t('contact.hours.weekdays', language)}</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">{t('contact.hours.friday', language)}</span>
                    <span className="font-medium">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">{t('contact.hours.saturday', language)}</span>
                    <span className="font-medium text-gray-500">{t('contact.hours.closed', language)}</span>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="dh-gradient-bg p-8 rounded-2xl shadow-lg" data-testid="faq-section">
                <h3 className="text-2xl font-bold text-dh-navy mb-6" data-testid="faq-title">
                  {language === 'he' ? 'שאלות נפוצות' : 'Frequently Asked Questions'}
                </h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0" data-testid={`faq-item-${index}`}>
                      <h4 className="font-medium text-gray-800 mb-1">{item.question}</h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
